import React from 'react';
import { motion } from 'motion/react';
import { User, History, Target, Wrench } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <User className="text-security-primary" />
          About Me
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          The journey from troubleshooting systems to defending them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="glass-panel p-6 border-l-4 border-l-security-primary">
            <div className="flex items-center gap-3 mb-4">
              <History className="text-security-primary w-5 h-5" />
              <h3 className="text-xl font-bold">IT Background & Transition</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              My career began as an <span className="text-white font-medium">IT Support Technician</span>, where I spent years mastering the fundamentals of networking, hardware, and system administration. While resolving complex technical issues for users, I found myself increasingly drawn to the security aspect of every ticket.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              This curiosity evolved into a dedicated transition into <span className="text-security-primary font-medium">Cybersecurity</span>. I began building home labs to simulate attacks and learn defensive strategies, eventually moving from fixing systems to proactively monitoring and defending them against modern threats.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-blue-500 w-5 h-5" />
              <h3 className="text-xl font-bold">Career Goal</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              My immediate objective is to excel as a <span className="text-white font-medium">SOC Analyst</span>, leveraging my deep IT roots to provide superior threat detection and incident response. Long-term, I aim to architect resilient security frameworks and lead high-performance incident response teams in enterprise environments.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wrench className="w-32 h-32" />
          </div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Wrench className="text-security-primary w-5 h-5" />
            Core Toolset
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Splunk', level: 85 },
              { name: 'Wireshark', level: 90 },
              { name: 'Nmap', level: 80 },
              { name: 'Sentinel', level: 75 },
              { name: 'Metasploit', level: 70 },
              { name: 'Wazuh', level: 85 },
            ].map((tool, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">{tool.name}</span>
                  <span className="text-security-primary">{tool.level}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.level}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-security-primary"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-lg bg-zinc-900/50 border border-security-border italic text-sm text-zinc-500">
            "IT Support Technician transitioning into SOC Analysis with hands-on lab experience in log monitoring, threat detection, and incident response."
          </div>
        </motion.div>
      </div>
    </section>
  );
};
