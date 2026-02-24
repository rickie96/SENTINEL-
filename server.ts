import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import db, { seedDatabase } from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input Validation Schema
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy is required for express-rate-limit to work behind nginx
  app.set('trust proxy', 1);

  // Initialize and seed database
  seedDatabase();

  // 1. Security Headers (Helmet)
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for Vite dev mode compatibility
  }));

  // 2. Global Rate Limiter
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased for dashboard polling
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
  });

  // 3. Contact Form Specific Rate Limiter (Anti-Spam)
  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Increased for testing
    message: { error: 'Security Alert: Excessive contact submissions detected. Please try again later.' }
  });

  app.use(express.json());

  // API Routes
  app.get('/api/projects', apiLimiter, (req, res) => {
    try {
      const projects = db.prepare('SELECT * FROM projects').all();
      const parsedProjects = projects.map((p: any) => ({
        ...p,
        tools: JSON.parse(p.tools),
        analysis: JSON.parse(p.analysis),
        mitigation: JSON.parse(p.mitigation),
        details: {
          scenario: p.scenario,
          image: p.image,
          analysis: JSON.parse(p.analysis),
          conclusion: p.conclusion,
          mitigation: JSON.parse(p.mitigation)
        }
      }));
      res.json(parsedProjects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get('/api/reports', apiLimiter, (req, res) => {
    try {
      const reports = db.prepare('SELECT * FROM reports').all();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  });

  // Protected Endpoint: Requires Admin Key
  app.get('/api/contacts', apiLimiter, (req, res) => {
    const adminKey = req.headers['x-sentinel-key'];
    const expectedKey = process.env.SENTINEL_ADMIN_KEY || 'sentinel_secure_access_2024';

    if (adminKey !== expectedKey) {
      return res.status(403).json({ error: 'ACCESS_DENIED: Invalid Security Clearance' });
    }

    try {
      const contacts = db.prepare('SELECT * FROM contacts ORDER BY timestamp DESC LIMIT 10').all();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post('/api/contact', contactLimiter, (req, res) => {
    try {
      // 4. Input Validation & Sanitization
      const validatedData = ContactSchema.parse(req.body);
      
      const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
      stmt.run(validatedData.name, validatedData.email, validatedData.message);
      res.json({ success: true, message: 'Payload received and logged securely.' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: error.flatten() });
      }
      res.status(500).json({ error: 'Internal System Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
