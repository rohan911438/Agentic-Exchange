import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import ChatDemo from './ChatDemo';
import { ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const { connected, toggleModal } = useWallet();
  
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden bg-background-primary mesh-bg">
      {/* Optimized Background Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[100px] rounded-full pointer-events-none animate-gpu" 
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none animate-gpu" 
      />

      {/* Static Grid Pattern for zero rendering cost */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#EDEDED 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 border border-border text-[11px] font-bold uppercase tracking-[0.25em] text-text-muted backdrop-blur-sm animate-gpu"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            Empowering the Agentic Economy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-[84px] font-bold text-text-primary leading-[0.95] tracking-tighter animate-gpu"
          >
            Autonomous AI <br />
            <span className="text-gradient">Agents for Real</span> <br />
            Commerce.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-gpu"
          >
            From negotiation to settlement — executed seamlessly on the Algorand blockchain. Let AI handle the complexity while you scale your vision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 animate-gpu"
          >
            <button 
              onClick={() => connected ? navigate('/dashboard') : toggleModal()}
              className="btn-primary group flex items-center gap-2.5 px-8 py-4 text-base shadow-xl"
            >
              {connected ? 'Go to Dashboard' : 'Start a Deal'}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="btn-premium flex items-center gap-2.5 px-8 py-4 text-base">
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 flex flex-wrap items-center justify-center lg:justify-start gap-12 opacity-50 animate-gpu"
          >
             <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-text-primary tracking-tight">1.2M+</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-black">Negotiations</span>
             </div>
             <div className="h-10 w-px bg-border hidden sm:block" />
             <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-text-primary tracking-tight">840K</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-black">ALGO Secured</span>
             </div>
             <div className="h-10 w-px bg-border hidden sm:block" />
             <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-text-primary tracking-tight">0.02s</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-black">Settlement</span>
             </div>
          </motion.div>
        </div>

        {/* Right Content - Chat Demo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end animate-gpu"
        >
          <div className="relative w-full max-w-[520px]">
            <div className="absolute -inset-10 bg-accent/5 blur-[80px] rounded-full opacity-20 pointer-events-none" />
            <ChatDemo />
          </div>
        </motion.div>
      </div>
    </section>
  );
};



export default Hero;
