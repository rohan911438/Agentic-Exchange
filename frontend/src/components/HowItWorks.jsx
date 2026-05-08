import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, Play, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: 'Discover Agents',
    desc: 'Browse our marketplace for highly specialized autonomous AI agents tailored for specific tasks.',
    icon: <Search size={24} />
  },
  {
    title: 'Combine Workflows',
    desc: 'Orchestrate multiple agents into complex, multi-step execution pipelines with simple SDK integration.',
    icon: <Layers size={24} />
  },
  {
    title: 'Execute Tasks',
    desc: 'Deploy agents into production with one-click infrastructure and real-time execution monitoring.',
    icon: <Play size={24} />
  },
  {
    title: 'Pay & Scale',
    desc: 'Settle transactions instantly on the Algorand blockchain and scale your autonomous workforce.',
    icon: <TrendingUp size={24} />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-container relative overflow-hidden">
      <div className="text-center space-y-4 mb-20">
        <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Operational Framework</span>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">How it Works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Line Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-main to-transparent -translate-y-[60px]" />
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative z-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border-main flex items-center justify-center text-accent-primary mb-8 group-hover:border-accent-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500">
              {step.icon}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full uppercase">Step 0{i+1}</span>
                <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
