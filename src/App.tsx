import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from './components/Layout';
import { Terminal } from './components/Terminal';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { LabProjects } from './components/LabProjects';
import { IncidentReports } from './components/IncidentReports';
import { Experience } from './components/Experience';
import { ThreatMetrics } from './components/ThreatMetrics';
import { Shield, AlertTriangle, CheckCircle2, Info, Send } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 px-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-security-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-security-primary/10 border border-security-primary/20 text-security-primary text-xs font-bold mb-6 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-security-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-security-primary"></span>
                </span>
                System Status: Secure
              </div>
              
              <h2 className="text-security-primary font-mono font-bold text-xl mb-2 tracking-tight">ERICK MARCO</h2>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-[1.1]">
                SOC Analyst | <br />
                <span className="text-zinc-500">Cybersecurity Enthusiast</span>
              </h1>
              
              <p className="text-zinc-400 text-lg mb-8 max-w-xl leading-relaxed">
                Dedicated SOC Analyst specialized in proactive threat detection and rapid incident response. I transform complex security telemetry into actionable intelligence to safeguard critical infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="px-8 py-4 rounded-xl bg-security-primary text-security-bg font-bold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95"
                >
                  View My Lab Projects
                </a>
                <a 
                  href="#experience" 
                  className="px-8 py-4 rounded-xl border border-security-border hover:bg-zinc-900 transition-all font-bold"
                >
                  Experience
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Terminal />
              
              {/* Floating Status Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 hidden md:block"
              >
                <div className="glass-panel p-4 flex items-center gap-3 border-security-primary/30">
                  <div className="p-2 rounded-lg bg-security-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-security-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 font-bold">Uptime</p>
                    <p className="text-sm font-bold">99.99%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 hidden md:block"
              >
                <div className="glass-panel p-4 flex items-center gap-3 border-red-500/30">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 font-bold">Threats Blocked</p>
                    <p className="text-sm font-bold">12,482</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ThreatMetrics />
            </div>
            <div className="glass-panel p-8 flex flex-col justify-center">
              <div className="mb-6">
                <div className="p-3 rounded-xl bg-security-primary/10 w-fit mb-4">
                  <Shield className="w-6 h-6 text-security-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Security Posture</h3>
                <p className="text-zinc-500 text-sm">Real-time analysis of simulated environment telemetry and attack surface metrics.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 border border-security-border">
                  <span className="text-sm text-zinc-400">SIEM Coverage</span>
                  <span className="text-security-primary font-bold">94%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 border border-security-border">
                  <span className="text-sm text-zinc-400">EDR Deployment</span>
                  <span className="text-security-primary font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 border border-security-border">
                  <span className="text-sm text-zinc-400">Vulnerability Score</span>
                  <span className="text-amber-500 font-bold">A-</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Skills />
        <About />
        <LabProjects />
        <IncidentReports />
        <Experience />

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-12 border-security-primary/20 glow-emerald"
          >
            <h2 className="text-4xl font-bold mb-6">Establish Connection</h2>
            <p className="text-zinc-400 mb-10">
              Interested in collaborating or hiring? My encrypted lines are open. 
              Let's discuss how I can help secure your infrastructure.
            </p>
            
            <form 
              className="space-y-4 text-left"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries());
                
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  });
                  const result = await res.json();
                  
                  if (res.ok) {
                    alert('Message transmitted successfully. Sentinel has logged your request.');
                    (e.target as HTMLFormElement).reset();
                  } else {
                    alert(`Transmission Error: ${result.error || 'System error'}`);
                  }
                } catch (error) {
                  console.error('Contact error:', error);
                  alert('Connection failed. Please try again later.');
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-zinc-500 ml-1">Identity</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="Name / Alias"
                    className="w-full bg-zinc-900 border border-security-border rounded-xl px-4 py-3 focus:outline-none focus:border-security-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-zinc-500 ml-1">Secure Channel</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="Email Address"
                    className="w-full bg-zinc-900 border border-security-border rounded-xl px-4 py-3 focus:outline-none focus:border-security-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-zinc-500 ml-1">Payload</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message..."
                  className="w-full bg-zinc-900 border border-security-border rounded-xl px-4 py-3 focus:outline-none focus:border-security-primary transition-colors resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-security-primary text-security-bg font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group"
              >
                Transmit Message
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </button>
            </form>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
