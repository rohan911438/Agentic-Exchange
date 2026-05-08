import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Upload, 
  Settings, 
  Code, 
  Database, 
  Zap, 
  Shield, 
  Globe, 
  Activity, 
  Cpu, 
  MessageSquare, 
  Terminal, 
  Save, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Layers,
  Share2,
  Clock,
  ExternalLink,
  User,
  DollarSign
} from 'lucide-react';

const STEPS = [
  { id: 'identity', title: 'Agent Identity', icon: <User size={16} /> },
  { id: 'capabilities', title: 'Capabilities', icon: <Zap size={16} /> },
  { id: 'runtime', title: 'Runtime & Logic', icon: <Cpu size={16} /> },
  { id: 'monetization', title: 'Monetization', icon: <DollarSign size={16} /> },
  { id: 'publish', title: 'Publish', icon: <Rocket size={16} /> },
];

const AgentStudio = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('configuration');

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsPublishing(false);
    // Logic for success modal
  };

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6 lg:px-12 flex flex-col gap-12 text-text-primary">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]"
          >
            Developer Environment
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[0.9]">
            Agent <br />
            <span className="gradient-text">Studio.</span>
          </h1>
          <p className="text-text-muted text-lg font-light max-w-xl leading-relaxed">
            Architect, deploy, and monetize high-performance autonomous agents on the global protocol.
          </p>
        </div>

        <div className="flex items-center gap-4">
           <button className="btn-secondary h-12 px-6 text-xs font-bold gap-2">
              <Save size={16} /> Save Draft
           </button>
           <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="btn-premium-primary h-12 px-8 text-xs font-bold gap-2 group"
           >
              {isPublishing ? <Activity size={16} className="animate-spin" /> : <Rocket size={16} />}
              {isPublishing ? 'Provisioning...' : 'Publish to Marketplace'}
           </button>
        </div>
      </div>

      {/* Main Studio Interface */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Sidebar: Navigation & Wizard */}
        <div className="lg:col-span-3 space-y-10">
           <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary border-b border-border-main/20 pb-4">Studio Navigator</h3>
              <div className="space-y-1">
                 {['Configuration', 'Prompt IDE', 'Integrations', 'Logs', 'Version History'].map(tab => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.toLowerCase() 
                        ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' 
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-card'
                    }`}
                   >
                     {tab}
                     {activeTab === tab.toLowerCase() && <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-glow" />}
                   </button>
                 ))}
              </div>
           </div>

           {/* Quick Stats Panel */}
           <div className="p-6 rounded-[2rem] bg-bg-card border border-border-main space-y-6">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Metrics</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] text-text-muted">Reputation</span>
                    <span className="text-xs font-bold text-green-400">99.8%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] text-text-muted">Total Sales</span>
                    <span className="text-xs font-bold text-text-primary">14.2k ALGO</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] text-text-muted">Uptime</span>
                    <span className="text-xs font-bold text-accent-primary">100%</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Center Content: Editor / Configuration */}
        <div className="lg:col-span-9 space-y-8">
           
           <div className="p-8 lg:p-12 rounded-[3rem] bg-bg-card border border-border-main relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'configuration' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-12"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Agent Label</label>
                             <input 
                              placeholder="e.g. Negotiator Pro"
                              className="w-full bg-bg-primary border border-border-main rounded-2xl p-4 text-sm focus:outline-none focus:border-accent-primary/50 text-text-primary"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Description</label>
                             <textarea 
                              rows={4}
                              placeholder="Describe the agent's core capabilities..."
                              className="w-full bg-bg-primary border border-border-main rounded-2xl p-4 text-sm focus:outline-none focus:border-accent-primary/50 text-text-primary resize-none"
                             />
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Agent Icon / Badge</label>
                             <div className="w-full h-32 rounded-2xl border-2 border-dashed border-border-main flex flex-col items-center justify-center gap-2 text-text-muted hover:border-accent-primary transition-all cursor-pointer">
                                <Upload size={24} />
                                <span className="text-xs font-medium">Click to upload badge</span>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Pricing Strategy</label>
                             <select className="w-full bg-bg-primary border border-border-main rounded-2xl p-4 text-sm focus:outline-none focus:border-accent-primary/50 text-text-primary appearance-none">
                                <option>Usage-based ($ALGO per execution)</option>
                                <option>Monthly Subscription</option>
                                <option>Tiered Enterprise</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h3 className="text-xl font-bold tracking-tight">Capabilities & Constraints</h3>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Autonomous', 'High Speed', 'DeFi Ready', 'B2B Optimized'].map(cap => (
                            <div key={cap} className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border-main group hover:border-accent-primary/30 transition-all cursor-pointer">
                               <span className="text-[11px] font-bold text-text-muted group-hover:text-text-primary transition-colors">{cap}</span>
                               <CheckCircle2 size={14} className="text-accent-primary" />
                            </div>
                          ))}
                          <div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-border-main text-text-muted hover:border-accent-primary hover:text-accent-primary transition-all cursor-pointer">
                             <Plus size={14} />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-end">
                          <h3 className="text-xl font-bold tracking-tight">API Infrastructure</h3>
                          <button className="text-accent-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                             <Code size={14} /> Configure Webhooks
                          </button>
                       </div>
                       <div className="p-6 rounded-2xl bg-bg-primary border border-border-main space-y-4">
                          <div className="flex items-center gap-4">
                             <Globe size={18} className="text-text-muted" />
                             <input 
                              readOnly
                              value="https://api.agentic.exchange/v1/deploy/neg_pro_42"
                              className="flex-grow bg-transparent text-xs font-mono text-text-muted focus:outline-none"
                             />
                             <button className="text-accent-primary text-[10px] font-bold uppercase">Copy URL</button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary/20">
                        <Terminal size={32} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-bold">IDE Mode Restricted</h3>
                        <p className="text-sm text-text-muted max-w-sm">Detailed editor for {activeTab} is currently in staging. Please complete base configuration first.</p>
                     </div>
                     <button onClick={() => setActiveTab('configuration')} className="btn-premium-outline px-8 h-12 text-xs font-bold uppercase">Back to Configuration</button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Secondary Controls: Logic & Versioning */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-main space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">Version Management</h3>
                    <button className="text-accent-primary hover:underline text-[9px] uppercase tracking-widest">Snapshot</button>
                 </div>
                 <div className="space-y-4">
                    {[
                      { v: 'v4.2.0', label: 'Production', time: '2d ago', status: 'live' },
                      { v: 'v4.1.9', label: 'Legacy', time: '12d ago', status: 'archived' },
                    ].map(ver => (
                      <div key={ver.v} className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border-main">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold">{ver.v}</span>
                            <span className="text-[9px] text-text-muted uppercase tracking-widest">{ver.label} • {ver.time}</span>
                         </div>
                         <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${ver.status === 'live' ? 'bg-green-500/10 text-green-400' : 'bg-text-muted/10 text-text-muted'}`}>
                            {ver.status}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-main space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">Memory Configuration</h3>
                    <Settings size={14} className="text-text-muted" />
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-text-muted">Context Window</span>
                          <span className="text-accent-primary">128k Tokens</span>
                       </div>
                       <div className="h-1 bg-bg-primary rounded-full overflow-hidden">
                          <div className="h-full w-[80%] bg-accent-primary shadow-glow" />
                       </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary border border-border-main">
                       <Database size={16} className="text-text-muted" />
                       <span className="text-xs font-medium text-text-primary">Vector DB: Pinecone_Cluster_7</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AgentStudio;
