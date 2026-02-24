import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Globe, Lock } from 'lucide-react';

const EXPERIENCE = [
  {
    role: 'SOC Analyst II',
    company: 'CyberGuard Solutions',
    period: '2022 - Present',
    description: 'Leading incident response for Tier 2 escalations. Developed automated SOAR playbooks reducing MTTR by 40%.',
    icon: ShieldCheck
  },
  {
    role: 'Junior Security Analyst',
    company: 'DataFortress Inc.',
    period: '2020 - 2022',
    description: 'Monitored SIEM alerts and performed initial triage. Managed vulnerability scanning and remediation tracking.',
    icon: Cpu
  },
  {
    role: 'IT Security Intern',
    company: 'Global Tech Corp',
    period: '2019 - 2020',
    description: 'Assisted in security audits and policy documentation. Conducted phishing simulation campaigns.',
    icon: Globe
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <Lock className="text-security-primary" />
          Operational History
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          A track record of defending critical infrastructure and maintaining high-availability security operations.
        </p>
      </div>

      <div className="space-y-6">
        {EXPERIENCE.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-4 rounded-xl bg-zinc-800 text-security-primary">
              <exp.icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-security-primary font-mono text-sm">{exp.period}</span>
              </div>
              <p className="text-zinc-300 font-medium mb-4">{exp.company}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
