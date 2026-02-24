import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('sentinel.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    shortDesc TEXT NOT NULL,
    tools TEXT NOT NULL,
    scenario TEXT NOT NULL,
    image TEXT NOT NULL,
    analysis TEXT NOT NULL,
    conclusion TEXT NOT NULL,
    mitigation TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    analysis TEXT NOT NULL,
    rootCause TEXT NOT NULL,
    mitigation TEXT NOT NULL,
    lessonsLearned TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data function
export function seedDatabase() {
  const insertProject = db.prepare(`
    INSERT OR IGNORE INTO projects (id, title, category, icon, shortDesc, tools, scenario, image, analysis, conclusion, mitigation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const projects = [
    {
      id: 'brute-force',
      title: 'Brute Force Attack Detection',
      category: 'Endpoint Security',
      icon: 'TerminalIcon',
      shortDesc: 'Simulated and detected RDP brute force attempts using Windows Event Logs and SIEM integration.',
      tools: JSON.stringify(['Windows Event Viewer', 'Splunk', 'Kali Linux', 'Wazuh']),
      scenario: 'A simulated attacker used Kali Linux (Hydra) to perform a dictionary attack against a Windows Server 2022 RDP endpoint. The goal was to identify the attack pattern in the logs and trigger an automated alert.',
      image: 'https://picsum.photos/seed/brute/1200/800',
      analysis: JSON.stringify([
        { label: 'Event ID Analysis', content: 'Identified multiple instances of Event ID 4625 (An account failed to log on) within a 30-second window. The "Sub Status" code 0xC000006A indicated a wrong password for a valid account.' },
        { label: 'Attacker Profile', content: 'The source IP was identified as 192.168.1.105, which matched the Kali Linux machine in the lab environment. The attack targeted the "Administrator" account repeatedly.' },
        { label: 'SIEM Correlation', content: 'Created a Splunk query to group failed logins by Source Network Address. Set a threshold of 10 failures in 1 minute to trigger a "High" severity alert.' }
      ]),
      conclusion: 'The attack was successfully detected within 45 seconds of initiation. The high volume of failed logins from a single internal IP provided a clear indicator of compromise (IoC).',
      mitigation: JSON.stringify([
        'Implemented Account Lockout Policy (5 attempts / 30 mins).',
        'Disabled RDP on public-facing interfaces.',
        'Enforced Multi-Factor Authentication (MFA) for all administrative logins.',
        'Configured automated IP blocking via host-based firewall after 10 failures.'
      ])
    },
    {
      id: 'phishing',
      title: 'Phishing Email Analysis',
      category: 'Email Security',
      icon: 'Mail',
      shortDesc: 'Deep dive into a malicious email campaign, analyzing headers, malicious attachments, and URL reputation.',
      tools: JSON.stringify(['MXToolbox', 'VirusTotal', 'Any.Run', 'CyberChef']),
      scenario: 'Analyzed a suspicious email purportedly from "Microsoft Billing" that contained a HTML attachment. The objective was to determine the legitimacy and extract potential IOCs.',
      image: 'https://picsum.photos/seed/phish/1200/800',
      analysis: JSON.stringify([
        { label: 'Header Analysis', content: 'SPF and DKIM checks failed. The "Return-Path" (billing-update@support-msft.net) did not match the "From" display name. The originating IP was traced to a known botnet range.' },
        { label: 'Attachment Triage', content: 'The .html attachment contained obfuscated JavaScript. Using CyberChef, the script was decoded to reveal a credential harvesting form pointing to a rogue domain.' },
        { label: 'VirusTotal Scan', content: 'The extracted URL (hxxp://secure-login-msft.xyz) had 12/89 detections on VirusTotal, flagged as "Phishing" and "Malicious" by major vendors.' }
      ]),
      conclusion: 'The email was a sophisticated credential harvesting attempt. The use of a look-alike domain and obfuscated HTML was designed to bypass basic spam filters.',
      mitigation: JSON.stringify([
        'Blacklisted the rogue domain at the enterprise firewall level.',
        'Updated email gateway rules to block all emails from the identified sender IP.',
        'Initiated a "Security Awareness" training module for the targeted department.',
        'Purged similar emails from all user mailboxes using O365 Security & Compliance center.'
      ])
    },
    {
      id: 'firewall',
      title: 'Firewall Log Analysis',
      category: 'Network Security',
      icon: 'ShieldAlert',
      shortDesc: 'Identifying and blocking port scanning activity through pfSense firewall log inspection.',
      tools: JSON.stringify(['pfSense', 'Suricata', 'ELK Stack', 'Nmap']),
      scenario: 'Detected an external IP performing a stealthy SYN scan against the network perimeter. The project involved filtering logs to identify the scope of the scan and implementing a block rule.',
      image: 'https://picsum.photos/seed/firewall/1200/800',
      analysis: JSON.stringify([
        { label: 'Detection Pattern', content: 'Observed a high frequency of "TCP:S" (SYN) flags from a single external IP (203.0.113.42) hitting sequential ports (20, 21, 22, 23, 25, 80) in under 5 seconds.' },
        { label: 'Port Scanning Logic', content: 'The pattern matched an Nmap -sS (Stealth Scan). The attacker was attempting to map open services without completing the 3-way handshake.' },
        { label: 'Log Filtering', content: 'Used ELK Stack to filter pfSense logs by "Action=Block" and "Source_IP". Visualized the scan distribution across the network range.' }
      ]),
      conclusion: 'The perimeter firewall successfully dropped the packets, but the persistent nature of the scan indicated a targeted reconnaissance phase.',
      mitigation: JSON.stringify([
        'Created a temporary block rule for the source IP (24-hour ban).',
        'Enabled Suricata IDS/IPS on the WAN interface with "Emerging Threats" rulesets.',
        'Configured "Block Bogon Networks" on the firewall to reduce attack surface.',
        'Implemented rate-limiting on the WAN interface to mitigate future scanning noise.'
      ])
    },
    {
      id: 'malware-analysis',
      title: 'Static Malware Analysis',
      category: 'Digital Forensics',
      icon: 'ShieldCheck',
      shortDesc: 'Dissecting a malicious portable executable (PE) to identify C2 infrastructure and persistence mechanisms.',
      tools: JSON.stringify(['PEStudio', 'Ghidra', 'Strings', 'Capa']),
      scenario: 'Analyzed a suspicious binary (invoice.exe) discovered on an executive workstation. The objective was to perform static analysis to determine its capabilities without executing it.',
      image: 'https://picsum.photos/seed/malware_ana/1200/800',
      analysis: JSON.stringify([
        { label: 'PE Header Inspection', content: 'PEStudio flagged the binary for having a high entropy (7.8), suggesting it was packed or encrypted. The "Original Filename" field was empty, a common evasion tactic.' },
        { label: 'String Extraction', content: 'Identified several hardcoded URLs and IP addresses. One URL (hxxp://update-service.cc/v2/gate.php) was linked to the Emotet malware family in recent threat intel reports.' },
        { label: 'Capability Mapping', content: 'Using Capa, the binary was identified as having "persistence" capabilities via Registry Run keys and "data exfiltration" via HTTP POST requests.' }
      ]),
      conclusion: 'The binary was confirmed as a variant of the Emotet trojan. It was designed to establish persistence and wait for further instructions from its Command & Control (C2) server.',
      mitigation: JSON.stringify([
        'Isolated the infected workstation from the network immediately.',
        'Updated EDR signatures to block the identified file hash (SHA-256).',
        'Performed a full memory dump of the workstation for further dynamic analysis.',
        'Reset all user credentials associated with the compromised machine.'
      ])
    },
    {
      id: 'security-audit',
      title: 'Application Security Audit & Hardening',
      category: 'AppSec',
      icon: 'ShieldCheck',
      shortDesc: 'Performed a comprehensive security audit of the Sentinel Portfolio system and implemented defensive hardening.',
      tools: JSON.stringify(['OWASP ZAP', 'Helmet.js', 'Express Rate Limit', 'Snyk']),
      scenario: 'Conducted a baseline security assessment of the portfolio application to identify common web vulnerabilities (XSS, SQLi, Brute Force). The goal was to transition from a functional prototype to a hardened production-ready system.',
      image: 'https://picsum.photos/seed/audit/1200/800',
      analysis: JSON.stringify([
        { label: 'Vulnerability Scan', content: 'Identified missing security headers (HSTS, CSP, X-Frame-Options) and lack of rate limiting on API endpoints, which could lead to DoS or brute force attacks on the contact form.' },
        { label: 'Dependency Check', content: 'Used Snyk to audit package.json. Identified 2 minor vulnerabilities in older sub-dependencies, which were resolved by updating the lockfile.' },
        { label: 'Input Validation', content: 'Verified that all database interactions use prepared statements, effectively neutralizing SQL injection risks.' }
      ]),
      conclusion: 'The application was found to be structurally sound against SQLi, but vulnerable to automated abuse and header-based attacks. Hardening measures were successfully implemented.',
      mitigation: JSON.stringify([
        'Implemented Helmet.js to enforce secure HTTP headers (CSP, HSTS, etc.).',
        'Added express-rate-limit to the /api/ route to prevent automated form submission and DoS.',
        'Configured strict Content Security Policy (CSP) to mitigate XSS risks.',
        'Enforced HTTPS-only communication (simulated via HSTS headers).'
      ])
    }
  ];

  for (const p of projects) {
    insertProject.run(p.id, p.title, p.category, p.icon, p.shortDesc, p.tools, p.scenario, p.image, p.analysis, p.conclusion, p.mitigation);
  }

  const insertReport = db.prepare(`
    INSERT OR IGNORE INTO reports (title, severity, date, description, analysis, rootCause, mitigation, lessonsLearned)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const reports = [
    {
      title: 'Unauthorized SSH Brute Force Attempt',
      severity: 'High',
      date: '2024-05-12',
      description: 'Multiple failed SSH login attempts detected on the primary web server (SRV-WEB-01) originating from an external IP address.',
      analysis: 'Log analysis revealed over 5,000 failed authentication attempts within a 15-minute window. The attacker used a dictionary-based approach targeting common usernames (admin, root, user). Traffic originated from 185.x.x.x, a known malicious range.',
      rootCause: 'SSH port (22) was exposed to the public internet without rate-limiting or IP whitelisting, making it a target for automated scanning tools.',
      mitigation: 'Immediate block of the source IP at the perimeter firewall. Implemented Fail2Ban on the server to automatically ban IPs after 5 failed attempts. Moved SSH to a non-standard port and enforced SSH key-only authentication.',
      lessonsLearned: 'Standard ports should never be exposed to the public internet without additional security layers. Proactive monitoring of authentication logs is critical for early detection.'
    },
    {
      title: 'Phishing Campaign: "Urgent Invoice Update"',
      severity: 'Critical',
      date: '2024-06-05',
      description: 'A targeted phishing campaign reached 15 employees in the Finance department, leading to one confirmed credential compromise.',
      analysis: 'The email contained a link to a look-alike Microsoft 365 login page. One user entered their credentials. Post-compromise analysis showed an immediate login attempt from a foreign IP (VPN) and the creation of a new inbox forwarding rule.',
      rootCause: 'Email gateway failed to flag the look-alike domain due to its recent registration (less than 24 hours old). User lacked recent security awareness training.',
      mitigation: 'Reset user credentials and revoked all active sessions. Deleted the malicious forwarding rule. Blocked the phishing domain at the DNS level. Conducted a department-wide security briefing.',
      lessonsLearned: 'Domain age is a strong indicator of risk. MFA is the most effective defense against credential harvesting, even when the user is successfully deceived.'
    },
    {
      title: 'Anomalous Data Exfiltration via DNS',
      severity: 'Medium',
      date: '2024-07-20',
      description: 'Detected unusual DNS traffic patterns from a workstation in the R&D department, suggesting potential data exfiltration.',
      analysis: 'DNS logs showed a high volume of TXT record queries to a specific sub-domain. Payload analysis of the DNS queries revealed encoded strings consistent with internal project documentation fragments.',
      rootCause: 'A compromised browser extension was being used to tunnel data out of the network via DNS queries to bypass standard HTTP/S inspection.',
      mitigation: 'Isolated the workstation and performed a full system wipe. Blacklisted the destination domain. Updated the EDR policy to monitor and alert on high-frequency DNS TXT queries.',
      lessonsLearned: 'DNS is often overlooked as an exfiltration vector. Implementing DNS filtering and monitoring query lengths/types is essential for a comprehensive defense-in-depth strategy.'
    }
  ];

  for (const r of reports) {
    insertReport.run(r.title, r.severity, r.date, r.description, r.analysis, r.rootCause, r.mitigation, r.lessonsLearned);
  }
}

export default db;
