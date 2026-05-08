import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  Code, 
  Globe, 
  Cpu, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  Terminal,
  Copy,
  Check,
  Star,
  Users,
  Activity,
  Layers,
  ArrowLeft,
  ExternalLink,
  Plus
} from 'lucide-react';

const AgentDetails = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Mock data for a single agent - in a real app, this would be fetched based on ID
  const agent = {
    name: 'Negotiation Engine Pro',
    category: 'Business Automation',
    version: 'v4.2.0',
    repScore: 99.8,
    totalDeployments: '1.2M',
    pricing: 'Usage-based ($0.05/exec)',
    description: 'A high-frequency intelligent negotiation agent specifically engineered for enterprise commerce, supply chain optimization, and automated B2B deal closing.',
    longDesc: 'Negotiation Engine Pro leverages state-of-the-art game theory models and natural language understanding to orchestrate complex multi-party negotiations. It is designed to operate autonomously within predefined parameters, ensuring optimal outcomes while maintaining strict adherence to business rules and compliance requirements.',
    metrics: {
      avgResponse: '1.5s',
      reliability: '99.99%',
      successRate: '94.2%',
      uptime: '100%'
    },
    capabilities: [
      'Multi-party deal orchestration',
      'Dynamic price discovery',
      'Legal compliance checking',
      'Automated contract generation',
      'Sentiment-aware communication'
    ],
    codeSnippet: `const { Agent } = require('@agentic/sdk');

// Initialize the Negotiation Engine
const negotiator = new Agent('negotiation-pro-v4');

// Execute a complex deal negotiation
const deal = await negotiator.negotiate({
  parties: ['Supplier_A', 'Retailer_B'],
  terms: {
    minPrice: 450,
    volume: 10000,
    deadline: '2026-06-01'
  },
  strategy: 'aggressive'
});

console.log(deal.status); // 'closed_optimized'`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(agent.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]">
                 {agent.category}
               </span>
               <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{agent.version}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[0.9]">
              {agent.name}
            </h1>
            <p className="text-xl text-text-muted font-light leading-relaxed">
              {agent.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-border-main flex items-center justify-center text-accent-primary">
                  <TrendingUp size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Reputation</span>
                  <span className="text-sm font-bold text-text-primary">{agent.repScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-border-main flex items-center justify-center text-accent-primary">
                  <Users size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Deployments</span>
                  <span className="text-sm font-bold text-text-primary">{agent.totalDeployments}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-border-main flex items-center justify-center text-accent-primary">
                  <Shield size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Pricing</span>
                  <span className="text-sm font-bold text-text-primary">{agent.pricing}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-4">
            <button className="btn-premium-primary h-14 px-12 text-base group">
              Deploy Agent
              <Zap size={18} className="fill-current" />
            </button>
            <button className="btn-premium-outline h-14 px-12 text-base">
              Add to Workflow
            </button>
          </div>
        </div>

        {/* Hero Visual Section */}
        <div className="relative w-full aspect-[21/9] rounded-[3rem] bg-bg-card border border-border-main overflow-hidden mb-24 group">
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
          
          {/* Mock Visualization Nodes */}
          <div className="absolute inset-0 flex items-center justify-center gap-12 lg:gap-24 p-10">
            {[1, 2, 3].map((node) => (
              <motion.div
                key={node}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: node * 0.5 }}
                className="w-40 h-56 rounded-3xl bg-bg-primary/50 border border-border-main backdrop-blur-xl flex flex-col items-center justify-center gap-6 p-6"
              >
                <div className={`w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary`}>
                  {node === 1 ? <Cpu size={24} /> : node === 2 ? <Layers size={24} /> : <Globe size={24} />}
                </div>
                <div className="h-2 w-full bg-border-main rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-accent-primary" 
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Node 0{node}</span>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines Placeholder */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="10 10" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Overview Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-text-primary tracking-tight">Agent Overview</h2>
              <div className="space-y-6">
                <p className="text-lg text-text-muted leading-relaxed font-light">
                  {agent.longDesc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-bg-secondary/50 border border-border-main space-y-4">
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent-primary" />
                      Compliance & Security
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Built-in SOC2 Type II compliance layers and end-to-end encryption for all negotiation data flows.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-bg-secondary/50 border border-border-main space-y-4">
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                      <Activity className="w-4 h-4 text-accent-primary" />
                      Real-time Execution
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Optimized for low-latency response times across global edge networks with high availability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Capabilities Section */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-text-primary tracking-tight">Capabilities & Tasks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agent.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-bg-card border border-border-main group hover:border-accent-primary/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                    <span className="text-sm font-medium text-text-primary">{cap}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* API & SDK Integration Section */}
            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-text-primary tracking-tight">Developer Integration</h2>
                  <p className="text-sm text-text-muted">Deploy using our type-safe Node.js or Python SDK.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-main text-[10px] font-bold text-text-primary uppercase">Node.js</span>
                  <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-main text-[10px] font-bold text-text-muted uppercase opacity-50">Python</span>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative rounded-3xl border border-border-main bg-bg-card overflow-hidden shadow-2xl">
                  {/* Window Header */}
                  <div className="flex items-center justify-between px-6 py-4 bg-bg-secondary border-b border-border-main">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-medium uppercase tracking-widest">
                      <Terminal size={12} />
                      negotiate_deal.js
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="text-text-muted hover:text-text-primary transition-colors"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Code Content */}
                  <div className="p-8 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed text-text-muted">
                      {agent.codeSnippet.split('\n').map((line, i) => (
                        <div key={i} className="flex gap-6">
                          <span className="w-4 text-border-main select-none">{i + 1}</span>
                          <span className={line.startsWith('//') ? 'text-text-muted/50' : line.includes('const') || line.includes('await') ? 'text-accent-primary' : 'text-text-primary'}>
                            {line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Execution Metrics Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Real-time Metrics */}
            <div className="p-8 rounded-[2.5rem] border border-border-main bg-bg-secondary/30 backdrop-blur-xl space-y-10">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5" />
                Execution Metrics
              </h4>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Avg. Response</span>
                    <span className="text-xl font-bold text-text-primary">{agent.metrics.avgResponse}</span>
                  </div>
                  <div className="w-12 h-1 bg-border-main rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent-primary w-[70%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Reliability</span>
                    <span className="text-xl font-bold text-text-primary">{agent.metrics.reliability}</span>
                  </div>
                  <div className="w-12 h-1 bg-border-main rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent-primary w-[98%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Success Rate</span>
                    <span className="text-xl font-bold text-text-primary">{agent.metrics.successRate}</span>
                  </div>
                  <div className="w-12 h-1 bg-border-main rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent-primary w-[94%]" />
                  </div>
                </div>
              </div>

              <button className="w-full h-12 rounded-xl border border-accent-primary/20 bg-accent-primary/5 text-accent-primary text-xs font-bold uppercase tracking-widest hover:bg-accent-primary/10 transition-all">
                View Performance Logs
              </button>
            </div>

            {/* Workflow Compatibility */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                Compatibility
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Stripe', 'Twilio', 'Vercel', 'Linear', 'GitHub'].map(tool => (
                  <span key={tool} className="px-4 py-2 rounded-xl bg-bg-card border border-border-main text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Reputation Section */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary flex items-center gap-2">
                <Star className="w-3.5 h-3.5" />
                Top Reviews
              </h4>
              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <div key={review} className="p-5 rounded-2xl bg-bg-card/50 border border-border-main space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-accent-primary text-accent-primary" />)}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      "Essential for our automated procurement pipeline. The negotiation logic is far superior to standard heuristic models."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent-primary/20 border border-accent-primary/30" />
                      <span className="text-[9px] font-bold text-text-primary uppercase tracking-widest">TechCorp Solutions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-24 pt-16 border-t border-border-main/50 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-text-primary tracking-tight">Ready to orchestrate?</h3>
            <p className="text-text-muted">Start deploying {agent.name} in minutes with our unified SDK.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <button className="flex-grow md:flex-none btn-premium-primary h-14 px-10 text-base">
              Deploy Now
            </button>
            <button className="flex-grow md:flex-none btn-premium-outline h-14 px-10 text-base">
              Purchase Subscription
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentDetails;
