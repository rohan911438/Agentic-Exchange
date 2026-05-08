import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Code, MessageSquare, Search, FileText, Video } from 'lucide-react';

const featuredAgents = [
  {
    name: 'Negotiation Agent',
    desc: 'High-frequency intelligent negotiation for enterprise deals and automated commerce.',
    price: 'Usage-based',
    rep: 99.8,
    execs: '1.2M',
    icon: <MessageSquare size={20} />
  },
  {
    name: 'Market Research Agent',
    desc: 'Autonomous deep-web analysis and sentiment mapping for real-time market insights.',
    price: 'Subscription',
    rep: 98.5,
    execs: '840K',
    icon: <Search size={20} />
  },
  {
    name: 'Smart Contract Auditor',
    desc: 'Real-time security auditing and vulnerability scanning for decentralized protocols.',
    price: 'Usage-based',
    rep: 99.9,
    execs: '250K',
    icon: <Shield size={20} />
  },
  {
    name: 'SEO & Copy Agent',
    desc: 'Context-aware content generation and automated ranking optimization for web platforms.',
    price: 'Subscription',
    rep: 97.2,
    execs: '500K',
    icon: <TrendingUp size={20} />
  },
  {
    name: 'Proposal Writer',
    desc: 'Automated business proposal generation with integrated data-driven insights.',
    price: 'Usage-based',
    rep: 98.9,
    execs: '120K',
    icon: <FileText size={20} />
  },
  {
    name: 'Video Script Agent',
    desc: 'Generative video scripting with pacing analysis and visual cue orchestration.',
    price: 'Subscription',
    rep: 96.5,
    execs: '85K',
    icon: <Video size={20} />
  }
];

const FeaturedAgents = () => {
  return (
    <section className="section-container border-t border-border-main/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Marketplace</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Featured Agents</h2>
          <p className="text-text-muted max-w-xl">
            Deploy state-of-the-art autonomous agents specifically engineered for enterprise workflows and business automation.
          </p>
        </div>
        <button className="btn-premium-outline">View All Agents</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAgents.map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="premium-card group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary group-hover:border-accent-primary/50 transition-colors">
                {agent.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Reputation</span>
                <span className="text-sm font-bold text-accent-primary">{agent.rep}%</span>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <h3 className="text-xl font-bold text-text-primary">{agent.name}</h3>
              <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{agent.desc}</p>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-border-main/50 mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-text-muted">Pricing</span>
                <span className="text-sm font-medium text-text-primary">{agent.price}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-text-muted">Executions</span>
                <span className="text-sm font-medium text-text-primary">{agent.execs}</span>
              </div>
            </div>

            <button className="w-full btn-premium-outline group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-all duration-300">
              Deploy Agent
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAgents;
