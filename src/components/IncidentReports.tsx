import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, AlertCircle, Calendar, Shield, Info, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const IncidentReports = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [reports, setReports] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/reports')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from /api/reports");
        }
        return res.json();
      })
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-zinc-500 font-mono">RETRIEVING_INCIDENT_LOGS...</div>;
  }

  return (
    <section id="reports" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-security-primary/10 border border-security-primary/20 text-security-primary text-[10px] font-bold mb-4 uppercase tracking-widest">
          Documentation
        </div>
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FileText className="text-security-primary" />
          Incident Response Reports
        </h2>
        <p className="text-zinc-400 max-w-2xl">
          Professional post-incident documentation following industry-standard reporting formats. These samples demonstrate analytical depth and remediation strategy.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report, idx) => (
          <div 
            key={idx} 
            className={cn(
              "glass-panel overflow-hidden transition-all duration-300",
              expandedIdx === idx ? "border-security-primary/40 ring-1 ring-security-primary/20" : "hover:border-zinc-700"
            )}
          >
            <button 
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              className="w-full p-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter",
                  report.severity === 'Critical' ? "bg-red-500/20 text-red-500" :
                  report.severity === 'High' ? "bg-amber-500/20 text-amber-500" :
                  "bg-blue-500/20 text-blue-500"
                )}>
                  {report.severity}
                </div>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-security-primary transition-colors">{report.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                      <Calendar className="w-3 h-3" /> {report.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                      <Shield className="w-3 h-3" /> Incident ID: IR-2024-{100 + idx}
                    </span>
                  </div>
                </div>
              </div>
              {expandedIdx === idx ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
            </button>

            <AnimatePresence>
              {expandedIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-8 pt-2 border-t border-security-border grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2 flex items-center gap-2">
                          <Info className="w-3 h-3 text-security-primary" /> Description
                        </h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">{report.description}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2 flex items-center gap-2">
                          <Shield className="w-3 h-3 text-security-primary" /> Analysis
                        </h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">{report.analysis}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                        <h4 className="text-xs font-bold uppercase text-red-500 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-3 h-3" /> Root Cause
                        </h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">{report.rootCause}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-security-primary/5 border border-security-primary/10">
                        <h4 className="text-xs font-bold uppercase text-security-primary mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" /> Mitigation
                        </h4>
                        <p className="text-zinc-300 text-xs leading-relaxed">{report.mitigation}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-3 flex items-center gap-2">
                          <FileText className="w-3 h-3" /> Lessons Learned
                        </h4>
                        <p className="text-zinc-400 text-xs leading-relaxed italic">
                          "{report.lessonsLearned}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
