import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Mail, 
  ShieldAlert, 
  LayoutDashboard, 
  ChevronRight, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  FileText,
  Terminal as TerminalIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectDetailProps {
  project: any;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-panel bg-zinc-950 border-security-primary/30 shadow-2xl flex flex-col">
        <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-security-border p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-security-primary/10 text-security-primary">
              <project.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">{project.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <ShieldAlert className="w-6 h-6 rotate-45" />
          </button>
        </div>

        <div className="p-8 space-y-12">
          {/* Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-security-primary" />
                Scenario & Objective
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {project.details.scenario}
              </p>
            </div>
            <div className="glass-panel p-6 bg-zinc-900/50">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Tools Utilized</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-mono rounded border border-zinc-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Analysis Section */}
          <section className="space-y-6">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Search className="w-5 h-5 text-security-primary" />
              Technical Analysis
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-security-border bg-zinc-900 aspect-video relative group">
                  <img 
                    src={project.details.image} 
                    alt="Analysis Screenshot" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono bg-security-primary text-security-bg px-3 py-1 rounded font-bold">LOG_EVIDENCE.PNG</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 italic text-center">Fig 1.0: Captured telemetry showing anomalous patterns during the simulation.</p>
              </div>

              <div className="space-y-6">
                {project.details.analysis.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="text-security-primary font-mono text-sm font-bold uppercase tracking-tighter">{item.label}</h5>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Conclusion & Mitigation */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 border-l-4 border-l-amber-500 bg-amber-500/5">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Conclusion
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.details.conclusion}
              </p>
            </div>
            <div className="glass-panel p-6 border-l-4 border-l-security-primary bg-security-primary/5">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-security-primary" />
                Mitigation Steps
              </h4>
              <ul className="space-y-2">
                {project.details.mitigation.map((step, i) => (
                  <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-security-primary mt-0.5 shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const SOCDashboardSimulation = () => {
  const [alerts, setAlerts] = useState([
    { id: 'AL-902', type: 'Brute Force', severity: 'High', source: '192.168.1.45', time: '2 mins ago', status: 'Active' },
    { id: 'AL-903', type: 'SQL Injection', severity: 'Critical', source: '45.23.11.9', time: '5 mins ago', status: 'Investigating' },
    { id: 'AL-904', type: 'Phishing Link', severity: 'Medium', source: 'Internal-User-02', time: '12 mins ago', status: 'Closed' },
  ]);
  const [dbStatus, setDbStatus] = useState('CONNECTING...');
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          setDbStatus('DB_CONNECTED');
        } else {
          setDbStatus('DB_ERROR');
        }
      } catch {
        setDbStatus('OFFLINE');
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contacts', {
          headers: {
            'x-sentinel-key': 'sentinel_secure_access_2024' // In a real app, this would be a session token
          }
        });
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            setRecentMessages(data);
          } else {
            console.warn("Received non-JSON response from /api/contacts");
          }
        } else if (res.status === 403) {
          setDbStatus('ACCESS_DENIED');
        } else {
          console.error(`Fetch messages failed with status: ${res.status}`);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    checkStatus();
    fetchMessages();
    const interval = setInterval(() => {
      checkStatus();
      fetchMessages();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel overflow-hidden border-security-primary/20 flex flex-col h-full bg-zinc-950/50">
      <div className="p-4 border-b border-security-border bg-zinc-900/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-security-primary" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Sentinel SOC Dashboard v2.4</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            dbStatus === 'DB_CONNECTED' ? "bg-emerald-500" : "bg-red-500"
          )} />
          <span className="text-[10px] font-mono text-zinc-500 uppercase">{dbStatus}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4">
          <h6 className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-2">
            <AlertCircle className="w-3 h-3" /> Active Alerts
          </h6>
          {alerts.map((alert) => (
            <div key={alert.id} className="glass-panel p-3 bg-zinc-900/30 border-zinc-800 hover:border-security-primary/30 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter",
                    alert.severity === 'Critical' ? "bg-red-500/20 text-red-500" :
                    alert.severity === 'High' ? "bg-amber-500/20 text-amber-500" :
                    "bg-blue-500/20 text-blue-500"
                  )}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{alert.id}</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">{alert.time}</span>
              </div>
              <h5 className="text-sm font-bold group-hover:text-security-primary transition-colors">{alert.type} Detected</h5>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] font-mono text-zinc-500">SRC: {alert.source}</span>
                <span className="text-[10px] font-mono text-security-primary">{alert.status}</span>
              </div>
            </div>
          ))}
        </div>

        {recentMessages.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h6 className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-2">
              <Mail className="w-3 h-3" /> Incoming Intel (DB)
            </h6>
            <div className="space-y-2">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="p-2 rounded bg-zinc-900/50 border border-zinc-800 text-[10px] font-mono">
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>{msg.name}</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-zinc-300 truncate">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-security-border bg-zinc-900/30">
        <h6 className="text-[10px] font-bold uppercase text-zinc-500 mb-3">Quick Incident Report</h6>
        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Incident Title" 
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-security-primary transition-colors"
          />
          <select className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-500 focus:outline-none focus:border-security-primary transition-colors">
            <option>Select Severity</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <button className="w-full py-2 bg-security-primary text-security-bg text-[10px] font-bold uppercase rounded hover:bg-emerald-400 transition-colors">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

const ICON_MAP: Record<string, any> = {
  TerminalIcon: TerminalIcon,
  Mail: Mail,
  ShieldAlert: ShieldAlert,
  ShieldCheck: ShieldCheck
};

export const LabProjects = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from /api/projects");
        }
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-zinc-500 font-mono">INITIALIZING_LAB_DATA...</div>;
  }

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-security-primary/10 border border-security-primary/20 text-security-primary text-[10px] font-bold mb-4 uppercase tracking-widest">
            Case Studies
          </div>
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <TerminalIcon className="text-security-primary" />
            Security Lab Reports
          </h2>
          <p className="text-zinc-400">
            Detailed analysis of simulated threats, incident response procedures, and defensive architecture implementations.
          </p>
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-security-primary" /> Completed</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> In Progress</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Projects Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => {
            const Icon = ICON_MAP[project.icon] || TerminalIcon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="glass-panel group cursor-pointer hover:border-security-primary/40 transition-all flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-zinc-900 text-security-primary group-hover:bg-security-primary group-hover:text-security-bg transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-security-primary transition-colors">{project.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0, 3).map((tool: string, i: number) => (
                      <span key={i} className="text-[9px] font-bold px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded uppercase">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded uppercase">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-security-border flex items-center justify-between group-hover:bg-security-primary/5 transition-colors">
                  <span className="text-xs font-bold text-security-primary flex items-center gap-1">
                    View Case Study <ChevronRight className="w-3 h-3" />
                  </span>
                  <Clock className="w-3 h-3 text-zinc-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar: SOC Dashboard Simulation */}
        <div className="lg:col-span-4 space-y-8">
          <div className="h-[500px]">
            <SOCDashboardSimulation />
          </div>
          
          <div className="glass-panel p-6 bg-security-primary/5 border-security-primary/20">
            <h4 className="text-sm font-bold uppercase tracking-widest text-security-primary mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Lab Methodology
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              All projects are conducted within a controlled, isolated virtual environment using industry-standard tools to replicate enterprise-level security challenges.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-security-primary" />
                <span className="text-[10px] font-mono text-zinc-300">Isolated VLAN Segment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-security-primary" />
                <span className="text-[10px] font-mono text-zinc-300">Snapshot-based Recovery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-security-primary" />
                <span className="text-[10px] font-mono text-zinc-300">Real-world Adversary TTPs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={{
              ...selectedProject,
              icon: ICON_MAP[selectedProject.icon] || TerminalIcon
            }} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
