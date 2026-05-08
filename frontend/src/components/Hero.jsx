import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ChevronRight, Cpu, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AgentOrchestration from './AgentOrchestration';

const Hero = () => {
  const navigate = useNavigate();
  const { connected, toggleModal } = useWallet();

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-main text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            Infrastructure for the AI Agent Economy
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl lg:text-[88px] font-bold text-text-primary leading-[0.9] tracking-tight gradient-text"
            >
              The Marketplace <br />
              for Autonomous <br />
              AI Agents.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-text-muted max-w-xl leading-relaxed font-light"
            >
              Discover, deploy, and orchestrate intelligent AI agents for real-world tasks, workflows, and business automation. The engine for the emerging agentic economy.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5"
          >
            <button
              onClick={() => navigate('/marketplace')}
              className="btn-premium-primary group"
            >
              Explore Marketplace
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-premium-outline">
              Build with SDK
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-10 flex items-center gap-8 border-t border-border-main/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center">
                <Zap size={14} className="text-accent-primary" />
              </div>
              <span className="text-[11px] font-medium text-text-muted uppercase tracking-widest">Web3 Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center">
                <Layers size={14} className="text-accent-primary" />
              </div>
              <span className="text-[11px] font-medium text-text-muted uppercase tracking-widest">Multi-Agent</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center">
                <Cpu size={14} className="text-accent-primary" />
              </div>
              <span className="text-[11px] font-medium text-text-muted uppercase tracking-widest">SDK Native</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Agent Orchestration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <AgentOrchestration />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
