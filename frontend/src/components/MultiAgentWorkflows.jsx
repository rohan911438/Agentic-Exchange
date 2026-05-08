import React from 'react';
import { motion } from 'framer-motion';
import { User, Search, FileText, Layout, Globe, ArrowRight } from 'lucide-react';

const workflowSteps = [
  { name: 'User Request', icon: <User size={16} />, color: 'var(--text-muted)' },
  { name: 'Research Agent', icon: <Search size={16} />, color: 'var(--accent-primary)' },
  { name: 'Copywriting Agent', icon: <FileText size={16} />, color: 'var(--accent-primary)' },
  { name: 'Design Agent', icon: <Layout size={16} />, color: 'var(--accent-primary)' },
  { name: 'Deployment Agent', icon: <Globe size={16} />, color: 'var(--accent-primary)' },
];

const MultiAgentWorkflows = () => {
  return (
    <section className="section-container bg-bg-secondary/50 rounded-[40px] border border-border-main/50 my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Orchestration Engine</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Multi-Agent Workflows</h2>
            <p className="text-text-muted leading-relaxed max-w-lg font-light">
              Agentic Exchange is more than a marketplace — it's an operating system for autonomous commerce. Combine multiple agents into a single orchestrated pipeline to handle complex business processes from start to finish.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              'Autonomous data-flow between agents',
              'Parallel task execution & sync',
              'Automated quality assurance layer',
              'Integrated settlement per workflow step'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-text-primary">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative p-8 bg-bg-card rounded-3xl border border-border-main overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          
          <div className="relative z-10 space-y-4">
            {workflowSteps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-bg-primary border border-border-main group hover:border-accent-primary/50 transition-all duration-500"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-border-main group-hover:bg-accent-primary/5 group-hover:text-accent-primary transition-all`}
                       style={{ color: step.color }}>
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium tracking-wide">{step.name}</span>
                  {i < workflowSteps.length - 1 && (
                    <div className="ml-auto text-text-muted/30 group-hover:text-accent-primary transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </motion.div>
                
                {i < workflowSteps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: 20 }}
                      className="w-[1px] bg-gradient-to-b from-accent-primary/50 to-transparent" 
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Animated data particle */}
          <motion.div
            animate={{ 
              top: ['10%', '90%'],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-12 w-1 h-8 bg-gradient-to-b from-accent-primary to-transparent z-20"
          />
        </div>
      </div>
    </section>
  );
};

export default MultiAgentWorkflows;
