import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const DATA = [
  { time: '00:00', alerts: 12, threats: 2 },
  { time: '04:00', alerts: 8, threats: 1 },
  { time: '08:00', alerts: 45, threats: 5 },
  { time: '12:00', alerts: 32, threats: 3 },
  { time: '16:00', alerts: 58, threats: 8 },
  { time: '20:00', alerts: 24, threats: 4 },
  { time: '23:59', alerts: 15, threats: 2 },
];

export const ThreatMetrics = () => {
  return (
    <div className="glass-panel p-6 h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Live Telemetry</h3>
          <p className="text-xl font-bold">Security Event Distribution</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-security-primary" />
            <span className="text-[10px] text-zinc-400 uppercase">Alerts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] text-zinc-400 uppercase">Threats</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA}>
            <defs>
              <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#18181b', 
                border: '1px solid #27272a',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="alerts" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorAlerts)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorThreats)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
