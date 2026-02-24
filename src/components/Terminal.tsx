import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const COMMANDS = [
  { cmd: 'whoami', output: 'sentinel_analyst' },
  { cmd: 'status --system', output: 'All systems operational. SOC Level 1 Active.' },
  { cmd: 'ls /projects', output: 'malware_analysis/  homelab_setup/  incident_response_playbooks/' },
  { cmd: 'grep -r "threat" /logs', output: 'Found 0 active threats. System hardened.' },
];

export const Terminal = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentCmdIndex < COMMANDS.length) {
      const command = COMMANDS[currentCmdIndex];
      let charIndex = 0;
      setIsTyping(true);
      
      const timer = setInterval(() => {
        setDisplayedText(command.cmd.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === command.cmd.length) {
          clearInterval(timer);
          setTimeout(() => {
            setHistory(prev => [...prev, command]);
            setDisplayedText('');
            setCurrentCmdIndex(prev => prev + 1);
            setIsTyping(false);
          }, 1000);
        }
      }, 100);
      
      return () => clearInterval(timer);
    } else {
      // Reset after some time to keep it looping or just stop
      setTimeout(() => {
        setHistory([]);
        setCurrentCmdIndex(0);
      }, 5000);
    }
  }, [currentCmdIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, displayedText]);

  return (
    <div className="w-full max-w-2xl glass-panel overflow-hidden glow-emerald border-security-primary/20">
      <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-security-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
        </div>
        <span className="text-xs font-mono text-zinc-500 ml-2">bash — 80x24</span>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 font-mono text-sm h-64 overflow-y-auto bg-zinc-950/80 scanline relative"
      >
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            <div className="flex gap-2">
              <span className="text-security-primary">➜</span>
              <span className="text-zinc-300">~</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <div className="text-zinc-500 mt-1 ml-6">{item.output}</div>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-security-primary">➜</span>
          <span className="text-zinc-300">~</span>
          <span className="text-white">{displayedText}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-5 bg-security-primary inline-block align-middle"
          />
        </div>
      </div>
    </div>
  );
};
