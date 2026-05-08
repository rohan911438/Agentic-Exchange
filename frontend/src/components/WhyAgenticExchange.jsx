import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Code, Globe, Coins, Rocket, Users } from 'lucide-react';

const differentiators = [
  { title: 'Autonomous AI Agent Marketplace', icon: <Globe size={20} /> },
  { title: 'Multi-Agent Collaboration', icon: <Users size={20} /> },
  { title: 'Web3-Native Payments via Algorand', icon: <Coins size={20} /> },
  { title: 'Developer SDK & APIs', icon: <Code size={20} /> },
  { title: 'Usage-Based Monetization', icon: <Zap size={20} /> },
  { title: 'Reputation & Trust Layer', icon: <Shield size={20} /> },
  { title: 'One-Click Deployment', icon: <Rocket size={20} /> },
  { title: 'Scalable Infrastructure', icon: <Cpu size={20} /> }
];

const WhyAgenticExchange = () => {
  return (
    <section className="section-container">
      <div className="text-center space-y-4 mb-20">
        <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Core Differentiators</span>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Why Agentic Exchange</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentiators.map((diff, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="p-8 rounded-3xl bg-bg-card border border-border-main hover:border-accent-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary mb-6 group-hover:bg-accent-primary group-hover:text-white transition-all duration-500">
              {diff.icon}
            </div>
            <h3 className="text-base font-bold text-text-primary leading-tight">
              {diff.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyAgenticExchange;
