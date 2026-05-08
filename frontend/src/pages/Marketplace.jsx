import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  Code, 
  Briefcase, 
  Globe, 
  Cpu, 
  MessageSquare, 
  ExternalLink,
  Plus,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = ['All', 'Business', 'Productivity', 'Development', 'Finance', 'Creative'];
const SORT_OPTIONS = ['Most Used', 'Highest Rated', 'Trending', 'Newest'];

const AGENTS = [
  {
    id: 1,
    name: 'Negotiation Engine Pro',
    type: 'Business',
    desc: 'High-frequency intelligent negotiation agent for enterprise commerce and automated deals.',
    price: 'Usage-based',
    rep: 99.8,
    deployments: '1.2M',
    execTime: '1.5s',
    tags: ['Enterprise', 'Verified'],
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    id: 2,
    name: 'Sentinel Auditor',
    type: 'Security',
    desc: 'Autonomous smart contract security auditing and vulnerability detection for DeFi protocols.',
    price: 'Subscription',
    rep: 99.9,
    deployments: '450K',
    execTime: '12s',
    tags: ['Enterprise'],
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 3,
    name: 'DevSync Orchestrator',
    type: 'Development',
    desc: 'Type-safe multi-agent coordinator for complex software development lifecycles.',
    price: 'Usage-based',
    rep: 98.4,
    deployments: '890K',
    execTime: '0.8s',
    tags: ['Trending'],
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 4,
    name: 'Market Pulse AI',
    type: 'Finance',
    desc: 'Real-time sentiment analysis and alpha discovery across global financial markets.',
    price: 'Subscription',
    rep: 97.2,
    deployments: '150K',
    execTime: '2.1s',
    tags: ['Verified'],
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 5,
    name: 'Quant Flow',
    type: 'Finance',
    desc: 'High-performance quantitative trading strategy agent with risk management integration.',
    price: 'Usage-based',
    rep: 99.1,
    deployments: '320K',
    execTime: '0.4s',
    tags: ['Enterprise', 'Verified'],
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    id: 6,
    name: 'CopyStack V4',
    type: 'Creative',
    desc: 'SEO-optimized content generation and automated copywriting for digital platforms.',
    price: 'Subscription',
    rep: 96.5,
    deployments: '2.1M',
    execTime: '4.5s',
    tags: ['Trending'],
    icon: <Plus className="w-6 h-6" />
  }
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Used');

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]"
            >
              Platform Marketplace
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[0.9]"
            >
              Discover Intelligent <br />
              <span className="gradient-text">AI Agents.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-muted font-light leading-relaxed"
            >
              Browse and deploy specialized autonomous agents engineered for enterprise workflows, productivity, finance, and creative industries.
            </motion.p>
          </div>

          {/* Stats / Quick Info */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="flex gap-8 border-l border-border-main/30 pl-8"
          >
            <div>
              <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Total Agents</div>
              <div className="text-2xl font-bold text-text-primary">42,840</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Daily Execs</div>
              <div className="text-2xl font-bold text-accent-primary">1.2M+</div>
            </div>
          </motion.div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-2 rounded-[2rem] bg-bg-card/50 border border-border-main/50 backdrop-blur-xl sticky top-24 z-40">
          <div className="flex flex-wrap items-center gap-2 p-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-accent-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto px-4">
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search agents, capabilities..."
                className="w-full bg-background-primary/50 border border-border-main/50 rounded-2xl py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-3 bg-background-primary/50 border border-border-main/50 rounded-2xl px-6 py-3 text-xs font-bold text-text-primary hover:border-accent-primary/50 transition-all whitespace-nowrap">
                {sortBy}
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-10 hidden lg:block">
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary border-b border-border-main/20 pb-4 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                Advanced Filters
              </h4>
              
              <div className="space-y-8">
                {/* Pricing Filter */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Pricing Model</span>
                  <div className="space-y-3">
                    {['Usage-based', 'Subscription', 'Free Tier'].map(p => (
                      <label key={p} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-border-main group-hover:border-accent-primary transition-colors" />
                        <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Capability Filter */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Capabilities</span>
                  <div className="space-y-3">
                    {['API Support', 'Multi-Agent Support', 'Blockchain Enabled', 'Open Source'].map(c => (
                      <label key={c} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-border-main group-hover:border-accent-primary transition-colors" />
                        <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reputation Slider Placeholder */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Min Reputation</span>
                    <span className="text-xs font-bold text-accent-primary">95%</span>
                   </div>
                   <div className="h-1 bg-border-main rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-accent-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                   </div>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/20 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h5 className="text-lg font-bold text-text-primary mb-2 relative z-10">Premium SDK</h5>
              <p className="text-xs text-text-muted leading-relaxed mb-6 relative z-10">Build custom agents and list them on the marketplace to earn revenue.</p>
              <button className="text-xs font-bold text-accent-primary flex items-center gap-2 relative z-10 hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Agent Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card group hover:bg-bg-card/80 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary group-hover:border-accent-primary/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500">
                      {agent.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {agent.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-accent-primary/10 border border-accent-primary/20 text-[8px] font-bold text-accent-primary uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-bg-secondary border border-border-main">
                        <TrendingUp size={10} className="text-green-400" />
                        <span className="text-[10px] font-bold text-text-primary">{agent.rep}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300">{agent.name}</h3>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{agent.type}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed font-light">{agent.desc}</p>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border-main/50 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Pricing</span>
                      <span className="text-xs font-medium text-text-primary">{agent.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Deployments</span>
                      <span className="text-xs font-medium text-text-primary">{agent.deployments}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">Exec Time</span>
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-accent-primary" />
                        <span className="text-xs font-medium text-text-primary">{agent.execTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex-grow h-12 rounded-xl bg-accent-primary text-white font-bold text-sm hover:filter hover:brightness-110 transition-all flex items-center justify-center gap-2">
                      Deploy Agent <Zap size={14} className="fill-current" />
                    </button>
                    <button className="w-12 h-12 rounded-xl border border-border-main flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center items-center gap-4">
               <button className="w-10 h-10 rounded-xl border border-border-main flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30" disabled>&larr;</button>
               {[1, 2, 3, '...', 12].map((p, i) => (
                 <button key={i} className={`w-10 h-10 rounded-xl border ${p === 1 ? 'border-accent-primary text-accent-primary bg-accent-primary/5' : 'border-border-main text-text-muted hover:text-text-primary'} text-xs font-bold transition-all`}>
                   {p}
                 </button>
               ))}
               <button className="w-10 h-10 rounded-xl border border-border-main flex items-center justify-center text-text-muted hover:text-text-primary">&rarr;</button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] border border-accent-primary/30 bg-bg-card/50 p-12 lg:p-20 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

          <div className="max-w-3xl space-y-10 relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Scalable Infrastructure</span>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[0.95]">
                Build Your Own <br /> 
                Autonomous Pipelines.
              </h2>
              <p className="text-lg text-text-muted font-light leading-relaxed">
                Combine specialized agents into complex multi-step workflows. Orchestrate deep research, automated commerce, and decentralized finance actions with a single unified SDK.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button className="btn-premium-primary px-10 group">
                Create Workflow
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              </button>
              <button className="btn-premium-outline px-10">
                Read SDK Docs
              </button>
            </div>

            <div className="flex items-center gap-8 pt-10 border-t border-border-main/20">
               <div className="flex items-center gap-3">
                  <Globe size={16} className="text-accent-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Global Scale</span>
               </div>
               <div className="flex items-center gap-3">
                  <Cpu size={16} className="text-accent-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">High Availability</span>
               </div>
               <div className="flex items-center gap-3">
                  <Shield size={16} className="text-accent-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Secured by Protocol</span>
               </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Marketplace;
