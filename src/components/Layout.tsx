import React from 'react';
import { Shield, Mail, Linkedin, Github, Twitter } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-security-border bg-security-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 rounded bg-security-primary/10 border border-security-primary/20 group-hover:bg-security-primary/20 transition-colors">
            <Shield className="w-5 h-5 text-security-primary" />
          </div>
          <span className="font-mono font-bold tracking-tighter text-lg">ERICK<span className="text-security-primary">MARCO</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-security-primary transition-colors">About</a>
          <a href="#skills" className="hover:text-security-primary transition-colors">Arsenal</a>
          <a href="#projects" className="hover:text-security-primary transition-colors">Labs</a>
          <a href="#reports" className="hover:text-security-primary transition-colors">Reports</a>
          <a href="#experience" className="hover:text-security-primary transition-colors">Intel</a>
          <a href="#contact" className="px-4 py-2 rounded-lg bg-security-primary text-security-bg font-bold hover:bg-emerald-400 transition-colors">
            Deploy Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-security-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-security-primary" />
          <span className="font-mono font-bold tracking-tighter">ERICK<span className="text-security-primary">MARCO</span></span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-zinc-500 hover:text-security-primary transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-zinc-500 hover:text-security-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="text-zinc-500 hover:text-security-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-zinc-500 hover:text-security-primary transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
        
        <p className="text-zinc-600 text-xs font-mono">
          © {new Date().getFullYear()} ERICK MARCO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
