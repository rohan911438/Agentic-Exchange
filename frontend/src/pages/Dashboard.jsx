import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Zap, 
  Activity, 
  Clock, 
  DollarSign, 
  Key, 
  Settings, 
  CreditCard, 
  Layers, 
  User,
  Bell,
  Search,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Plus,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Workflow Runs', value: '42,840', change: '+12.5%', trend: 'up', icon: <Zap size={18} /> },
    { label: 'AI Agent Deployments', value: '156', change: '+4.2%', trend: 'up', icon: <Cpu size={18} /> },
    { label: 'Marketplace Spending', value: '2,450 ALGO', change: '-2.1%', trend: 'down', icon: <ArrowDownRight size={18} /> },
    { label: 'Agent Revenue', value: '8,920 ALGO', change: '+18.7%', trend: 'up', icon: <TrendingUp size={18} /> },
    { label: 'Success Rate', value: '99.92%', change: '+0.01%', trend: 'up', icon: <Shield size={18} /> },
  ];

  const recentActivity = [
    { type: 'deployment', title: 'Negotiator Pro v4.2 Deployed', time: '2m ago', icon: <Cpu size={14} className="text-accent-primary" /> },
    { type: 'execution', title: 'Content Pipeline #482 Completed', time: '15m ago', icon: <Zap size={14} className="text-yellow-500" /> },
    { type: 'settlement', title: 'On-chain Settlement: 150 ALGO', time: '1h ago', icon: <DollarSign size={14} className="text-green-500" /> },
    { type: 'purchase', title: 'Acquired Sentinel Auditor License', time: '3h ago', icon: <Layers size={14} className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6 lg:px-12 flex flex-col gap-12 text-text-primary">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 blur-[180px] rounded-full pointer-events-none" />
      
      {/* Header & Greeting */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-text-muted"
          >
            <div className="w-10 h-10 rounded-full bg-bg-card border border-border-main flex items-center justify-center overflow-hidden">
               <User size={20} className="text-text-primary" />
            </div>
            <span className="text-sm font-medium">System Operator: <span className="text-text-primary font-bold">Rohan</span></span>
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9]">
            Enterprise <br />
            <span className="gradient-text">Control Center.</span>
          </h1>
          <p className="text-text-muted font-light">Autonomous infrastructure management and performance analytics.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="bg-bg-card/50 border border-border-main rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-accent-primary/50 w-64"
              />
           </div>
           <button className="w-12 h-12 rounded-2xl bg-bg-card border border-border-main flex items-center justify-center text-text-muted hover:text-text-primary transition-all relative">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent-primary rounded-full border-2 border-bg-card" />
           </button>
           <button className="btn-premium-primary h-12 px-6 text-xs font-bold gap-2">
              <Plus size={16} /> New Workflow
           </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card p-6 flex flex-col justify-between min-h-[160px] group hover:bg-bg-card/80"
          >
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                  {stat.icon}
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
               </div>
            </div>
            <div className="space-y-1">
               <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
               <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Middle Column: Performance & Consumption */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Usage Metrics Visualization Placeholder */}
           <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-main relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full" />
              <div className="flex justify-between items-center mb-10">
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight">API Consumption</h3>
                    <p className="text-xs text-text-muted">Usage distribution across deployed agent clusters.</p>
                 </div>
                 <div className="flex items-center gap-2">
                    {['24H', '7D', '30D', '1Y'].map(t => (
                      <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${t === '7D' ? 'bg-accent-primary text-white shadow-glow' : 'text-text-muted hover:text-text-primary'}`}>
                        {t}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Minimal Chart Placeholder */}
              <div className="h-64 w-full flex items-end gap-2 px-2">
                 {[40, 65, 45, 80, 55, 90, 75, 45, 60, 85, 95, 70].map((h, i) => (
                   <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className="flex-grow bg-gradient-to-t from-accent-primary/10 to-accent-primary/40 rounded-t-lg relative group/bar"
                   >
                     <div className="absolute inset-0 bg-accent-primary opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg shadow-glow" />
                   </motion.div>
                 ))}
              </div>
              <div className="flex justify-between px-2 mt-6">
                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                   <span key={m} className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{m}</span>
                 ))}
              </div>
           </div>

           {/* Running Workflows & Active Agents */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary flex items-center justify-between">
                    Saved Workflows
                    <button className="text-accent-primary hover:underline text-[9px] uppercase">View All</button>
                 </h3>
                 <div className="space-y-4">
                    {['Content_Gen_V2', 'Audit_Pipeline_Final', 'Data_Scraper_Pro'].map(w => (
                      <div key={w} className="p-5 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:border-accent-primary/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                               <Layers size={18} />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-text-primary">{w}</span>
                               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">5 Agents Connected</span>
                            </div>
                         </div>
                         <ChevronRight size={14} className="text-text-muted group-hover:text-accent-primary transition-all" />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary flex items-center justify-between">
                    Favorite Agents
                    <button className="text-accent-primary hover:underline text-[9px] uppercase">Browse Store</button>
                 </h3>
                 <div className="space-y-4">
                    {['Negotiator Pro', 'Sentinel Auditor', 'DevSync Engine'].map(a => (
                      <div key={a} className="p-5 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:border-accent-primary/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                               <Cpu size={18} />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-text-primary">{a}</span>
                               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Active License</span>
                            </div>
                         </div>
                         <ChevronRight size={14} className="text-text-muted group-hover:text-accent-primary transition-all" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Activity, Billing & API */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Activity Feed */}
           <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-main flex flex-col gap-8 h-fit">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary border-b border-border-main/20 pb-4">Live Activity</h3>
              <div className="space-y-6">
                 {recentActivity.map((act, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-main flex items-center justify-center flex-shrink-0 group-hover:border-accent-primary/30 transition-all">
                         {act.icon}
                      </div>
                      <div className="flex flex-col gap-0.5">
                         <span className="text-xs font-medium text-text-primary leading-tight">{act.title}</span>
                         <span className="text-[10px] text-text-muted">{act.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full h-12 rounded-xl border border-border-main text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-primary hover:border-text-primary transition-all">
                 View Full Audit Log
              </button>
           </div>

           {/* Subscription & Billing */}
           <div className="p-8 rounded-[2.5rem] border border-accent-primary/20 bg-gradient-to-br from-accent-primary/5 to-transparent space-y-6">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <h4 className="text-xs font-bold text-accent-primary uppercase tracking-widest">Premium Plan</h4>
                    <div className="text-2xl font-bold text-text-primary">Enterprise Pro</div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-accent-primary text-white flex items-center justify-center shadow-glow">
                    <Shield size={20} />
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-text-muted">Renewal in 12 days</span>
                    <span className="text-text-primary">150 ALGO</span>
                 </div>
                 <div className="h-1.5 w-full bg-bg-primary rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-accent-primary shadow-glow" />
                 </div>
              </div>
              <button className="w-full h-12 rounded-xl bg-bg-primary border border-border-main text-text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-bg-secondary transition-all">
                 Manage Billing
              </button>
           </div>

           {/* API Keys */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary flex items-center gap-2 px-2">
                 <Key size={12} className="text-accent-primary" />
                 API Keys
              </h3>
              <div className="p-5 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group">
                 <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-text-muted">ak_live_****************8f2</span>
                    <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest mt-1">Production Active</span>
                 </div>
                 <button className="text-text-muted hover:text-text-primary transition-colors">
                    <Settings size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
