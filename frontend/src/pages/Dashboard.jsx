import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, History, AlertCircle } from 'lucide-react';

const Dashboard = () => (
  <div className="pt-32 pb-20 px-6 min-h-screen bg-ink-900">
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-4xl font-bold text-white font-display mb-2 italic">Agentic Dashboard</h1>
           <p className="text-slate text-sm">Welcome back! All your autonomous negotiations are running smoothly.</p>
        </div>
        <Link to="/create-deal" className="px-8 py-3 bg-gradient-to-r from-aqua to-blush text-ink-900 rounded-xl font-bold shadow-soft hover:scale-105 transition-all">Start New Deal</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Deals Active', value: '3', icon: <TrendingUp className="text-aqua" /> },
          { label: 'Escrow Volume', value: '₹14,500', icon: <History className="text-blush" /> },
          { label: 'Pending Reviews', value: '1', icon: <AlertCircle className="text-lime" /> }
        ].map((stat) => (
           <div key={stat.label} className="p-8 rounded-3xl bg-ink-800/80 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
              <div>
                 <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                 <div className="text-[10px] font-mono text-slate uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all">
                 {stat.icon}
              </div>
           </div>
        ))}
      </div>
      
      <div className="bg-ink-800/40 rounded-3xl border border-white/5 p-12 text-center space-y-4">
         <LayoutDashboard className="mx-auto text-slate/20 mb-4" size={48} />
         <h3 className="text-xl font-bold text-white">No active listings match your criteria</h3>
         <p className="text-slate max-w-sm mx-auto">Create a new deal to start your first AI-driven autonomous negotiation.</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
