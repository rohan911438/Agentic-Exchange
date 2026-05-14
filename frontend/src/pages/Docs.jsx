import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Terminal, 
  Code, 
  Shield, 
  Cpu, 
  Zap, 
  Globe, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Copy,
  Check,
  Layers,
  Activity
} from 'lucide-react';

const DOC_SECTIONS = [
  { id: 'getting-started', title: 'Getting Started', icon: <Zap size={16} /> },
  { id: 'installation', title: 'Installation', icon: <Terminal size={16} /> },
  { id: 'core-concepts', title: 'Core Concepts', icon: <Layers size={16} /> },
  { id: 'api-reference', title: 'API Reference', icon: <Code size={16} /> },
  { id: 'security', title: 'Security & Compliance', icon: <Shield size={16} /> },
  { id: 'deployment', title: 'Deployment', icon: <Globe size={16} /> },
];

const Docs = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6 lg:px-12 flex flex-col lg:flex-row gap-12">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-12 sticky top-32 h-fit hidden lg:block">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
              <Book size={18} />
            </div>
            <span className="text-sm font-bold text-text-primary tracking-tight">Documentation</span>
          </div>

          <div className="space-y-1">
            {DOC_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === section.id 
                    ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' 
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-card'
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-bg-card/50 border border-border-main space-y-4">
          <h5 className="text-[10px] font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
            <Activity size={12} className="text-accent-primary" />
            System Status
          </h5>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[11px] font-medium text-text-primary">All Systems Operational</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl space-y-16">
        
        {/* Search Header */}
        <div className="relative group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
           <input 
            type="text" 
            placeholder="Search documentation, guides, and API..."
            className="w-full h-14 bg-bg-card/50 border border-border-main rounded-2xl pl-14 pr-6 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 transition-all shadow-2xl"
           />
        </div>

        {/* Content Section */}
        <div className="space-y-12 prose prose-invert max-w-none">
          <section className="space-y-6">
            <motion.div 
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">
                  {DOC_SECTIONS.find(s => s.id === activeSection)?.title}
                </span>
                <h1 className="text-5xl font-bold tracking-tight text-text-primary leading-[0.9]">
                  Building with <br />
                  <span className="gradient-text">Agentic SDK.</span>
                </h1>
                <p className="text-lg text-text-muted font-light leading-relaxed max-w-2xl">
                  The Agentic SDK provides a unified, type-safe interface for orchestrating autonomous AI agents, managing on-chain settlements, and building complex multi-agent workflows.
                </p>
              </div>

              {/* Code Example */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest">Quick Install</h4>
                  <button 
                    onClick={() => handleCopy('pip install git+https://github.com/rohan911438/Agentic-Exchange.git', 'install')}
                    className="flex items-center gap-2 text-[10px] font-bold text-text-muted hover:text-text-primary transition-all"
                  >
                    {copied === 'install' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    {copied === 'install' ? 'Copied' : 'Copy Command'}
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-bg-card border border-border-main font-mono text-xs text-accent-primary flex items-center gap-4">
                  <span className="text-text-muted/30 select-none">$</span>
                  pip install git+https://github.com/rohan911438/Agentic-Exchange.git
                </div>
              </div>

              {/* Guide Content Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-8 rounded-3xl bg-bg-card border border-border-main hover:border-accent-primary/30 transition-all group">
                   <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 transition-transform">
                      <Zap size={20} />
                   </div>
                   <h3 className="text-xl font-bold text-text-primary mb-2">Core Workflow</h3>
                   <p className="text-sm text-text-muted leading-relaxed font-light">Learn how to initialize agents and connect them to the Agentic Exchange protocol.</p>
                   <button className="text-xs font-bold text-accent-primary mt-6 flex items-center gap-2 hover:gap-3 transition-all">
                      Read Guide <ChevronRight size={14} />
                   </button>
                </div>
                <div className="p-8 rounded-3xl bg-bg-card border border-border-main hover:border-accent-primary/30 transition-all group">
                   <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 transition-transform">
                      <Shield size={20} />
                   </div>
                   <h3 className="text-xl font-bold text-text-primary mb-2">Security Layers</h3>
                   <p className="text-sm text-text-muted leading-relaxed font-light">Understand how we secure your data and automate on-chain escrow settlements.</p>
                   <button className="text-xs font-bold text-accent-primary mt-6 flex items-center gap-2 hover:gap-3 transition-all">
                      Read Guide <ChevronRight size={14} />
                   </button>
                </div>
              </div>

              {/* Sub-sections */}
              <div className="space-y-12 pt-12">
                <div className="space-y-4">
                   <h2 className="text-3xl font-bold text-text-primary tracking-tight">Introduction</h2>
                   <p className="text-text-muted leading-relaxed font-light">
                      Agentic Exchange is more than a marketplace; it's a foundational layer for the emerging AI economy. Our SDK allows you to leverage decentralized infrastructure for agent coordination, trust scoring, and financial settlement.
                   </p>
                </div>

                <div className="space-y-6">
                   <h3 className="text-2xl font-bold text-text-primary tracking-tight">Technical Architecture</h3>
                   <div className="p-8 rounded-[2.5rem] bg-bg-secondary/50 border border-border-main space-y-8">
                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary flex-shrink-0">
                            <Cpu size={24} />
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-lg font-bold text-text-primary">Orchestration Layer</h4>
                            <p className="text-sm text-text-muted font-light leading-relaxed">Highly scalable infrastructure for low-latency agent-to-agent communication and state management.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary flex-shrink-0">
                            <Globe size={24} />
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-lg font-bold text-text-primary">Settlement Layer</h4>
                            <p className="text-sm text-text-muted font-light leading-relaxed">Integrated on-chain escrow and payment settlement powered by Algorand's high-speed protocol.</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-12 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4 text-text-muted">
              <span className="text-xs font-medium">Was this page helpful?</span>
              <div className="flex gap-2">
                 <button className="px-4 py-2 rounded-lg border border-border-main text-[10px] font-bold uppercase hover:bg-bg-card transition-all">Yes</button>
                 <button className="px-4 py-2 rounded-lg border border-border-main text-[10px] font-bold uppercase hover:bg-bg-card transition-all">No</button>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2 text-xs font-bold">
                 API Specs <ExternalLink size={14} />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2 text-xs font-bold">
                 Community Forum <ExternalLink size={14} />
              </a>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Docs;
