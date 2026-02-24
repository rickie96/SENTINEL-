import React from 'react';
import { ExternalLink, Github, FolderCode, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

const PROJECTS = [
  {
    title: 'Enterprise SOC Home Lab',
    description: 'Built a full-scale virtualized SOC environment using Proxmox, featuring Active Directory, pfSense, and a centralized Wazuh SIEM.',
    tags: ['Proxmox', 'Wazuh', 'Active Directory', 'pfSense'],
    image: 'https://picsum.photos/seed/lab/800/450',
    link: '#'
  },
  {
    title: 'Malware Analysis Sandbox',
    description: 'Automated malware analysis pipeline using Cuckoo Sandbox and custom Python scripts to extract IOCs from malicious binaries.',
    tags: ['Python', 'Cuckoo', 'Reverse Engineering', 'Automation'],
    image: 'https://picsum.photos/seed/malware/800/450',
    link: '#'
  },
  {
    title: 'Threat Intel Dashboard',
    description: 'Real-time dashboard aggregating threat feeds from AlienVault OTX and MISP, visualized with ELK Stack.',
    tags: ['ELK Stack', 'API Integration', 'Threat Intel', 'Docker'],
    image: 'https://picsum.photos/seed/intel/800/450',
    link: '#'
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto bg-zinc-950/50">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <FolderCode className="text-security-primary" />
          Security Labs & Projects
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          Hands-on experience building defensive infrastructure and analyzing real-world attack vectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel overflow-hidden group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl group-hover:text-security-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a href={project.link} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={project.link} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <p className="text-zinc-400 text-sm mb-6 flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
