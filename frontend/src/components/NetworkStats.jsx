import React from 'react';
import { Activity, Users, Globe, BarChart3 } from 'lucide-react';

const stats = [
  { label: "Active Agents", value: "4,821", icon: <Users className="w-5 h-5 text-accent" />, growth: "+12%" },
  { label: "Nodes Online", value: "156", icon: <Globe className="w-5 h-5 text-accent" />, growth: "Stable" },
  { label: "Daily Volume", value: "842K ALGO", icon: <BarChart3 className="w-5 h-5 text-accent" />, growth: "+8.4%" },
  { label: "Avg Latency", value: "0.04s", icon: <Activity className="w-5 h-5 text-accent" />, growth: "-15ms" },
];

const NetworkStats = () => {
  return (
    <section className="py-20 px-6 bg-background-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="card-noir flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-background-secondary border border-border flex items-center justify-center group-hover:border-accent/30 transition-colors">
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-surface border border-border ${stat.growth.startsWith('+') ? 'text-green-500' : stat.growth.startsWith('-') ? 'text-blue-500' : 'text-text-muted'}`}>
                  {stat.growth}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary tracking-tight mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;
