import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import ChatDemo from './ChatDemo';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const { connected, toggleModal } = useWallet();
  
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden bg-radial-gradient">
      {/* Subtle Grid / Noise Overlay could go here */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#EDEDED 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Empowering the Agentic Economy
          </div>
          
          <h1 className="text-5xl lg:text-[72px] font-bold text-text-primary leading-[1.05] tracking-tighter animate-fade-in-up [animation-delay:200ms]">
            Autonomous AI Agents for Real <span className="text-gradient">Economic Transactions</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            From negotiation to settlement — executed seamlessly on-chain. Let AI handle the complexity of commerce while you focus on the vision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up [animation-delay:600ms]">
            <button 
              onClick={() => connected ? navigate('/dashboard') : toggleModal()}
              className="btn-primary group flex items-center gap-2 text-base"
            >
              {connected ? 'Go to Dashboard' : 'Start a Deal'}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="btn-premium flex items-center gap-2 text-base">
              <Play className="w-4 h-4 fill-current" />
              View Demo
            </button>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-12 opacity-50 animate-fade-in-up [animation-delay:800ms]">
             <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary tracking-tight">1.2M+</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Negotiations</span>
             </div>
             <div className="h-8 w-px bg-border hidden sm:block" />
             <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary tracking-tight">$45M+</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Volume Secured</span>
             </div>
             <div className="h-8 w-px bg-border hidden sm:block" />
             <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary tracking-tight">0.02s</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Avg Settlement</span>
             </div>
          </div>
        </div>

        {/* Right Content - Chat Demo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up [animation-delay:400ms]">
          <div className="relative w-full max-w-[480px]">
            {/* Decorative background for the chat */}
            <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full" />
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

