import React from 'react';
import { 
  Shield, 
  Terminal as TerminalIcon, 
  Activity,
  Wrench,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

const SKILLS = [
  {
    category: 'Technical Skills',
    icon: Cpu,
    items: [
      'Log Analysis',
      'SIEM Basics',
      'Incident Response',
      'Network Monitoring',
      'Windows & Linux Administration'
    ],
    color: 'text-emerald-400',
    emoji: '🛠'
  },
  {
    category: 'Tools',
    icon: Wrench,
    items: [
      'Wireshark',
      'Nmap',
      'Kali Linux',
      'Splunk',
      'VirusTotal'
    ],
    color: 'text-blue-400',
    emoji: '🧰'
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <TerminalIcon className="text-security-primary" />
          Technical Arsenal
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          Specialized in proactive threat detection and rapid incident response across hybrid environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 hover:border-security-primary/40 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <skill.icon className="w-32 h-32" />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl bg-zinc-800/50 group-hover:scale-110 transition-transform`}>
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
              </div>
              <h3 className="font-bold text-2xl flex items-center gap-2">
                <span className="text-xl">{skill.emoji}</span>
                {skill.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skill.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 group-hover:border-security-primary/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-security-primary" />
                  <span className="text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
