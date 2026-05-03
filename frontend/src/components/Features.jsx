import React from 'react';
import { Brain, Lock, Layers, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "AI Negotiation Engine",
    description: "Multi-agent systems that understand nuance, handle trade-offs, and reach consensus in seconds.",
    icon: <Brain className="w-6 h-6 text-accent" />
  },
  {
    title: "Algorand Escrow",
    description: "Highly scalable, low-cost smart contracts that provide absolute certainty for all financial commitments.",
    icon: <Lock className="w-6 h-6 text-accent" />
  },
  {
    title: "Milestone Payments",
    description: "Risk mitigation via conditional release. Funds move only when the work passes cryptographic verification.",
    icon: <Layers className="w-6 h-6 text-accent" />
  },
  {
    title: "On-Chain Verification",
    description: "Immutable proofs of delivery and performance, building a portable reputation for all counterparties.",
    icon: <ShieldCheck className="w-6 h-6 text-accent" />
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 lg:py-32 px-6 bg-background-secondary/50 border-y border-border overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-10 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface border border-border text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
              Core Infrastructure
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tighter">
              Serious Tools for the <span className="text-gradient">Next Economy</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Agentic Exchange provides the industrial-grade primitives required to run complex, multi-party business logic on decentralized rails.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-text-primary font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Sub-cent transaction fees via Algorand
              </div>
              <div className="flex items-center gap-3 text-sm text-text-primary font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                End-to-end encryption for all negotiations
              </div>
              <div className="flex items-center gap-3 text-sm text-text-primary font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Deterministic execution of all deal terms
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
               <div 
                 key={i} 
                 className="card-noir flex flex-col gap-4 group"
               >
                 <div className="w-10 h-10 rounded-lg bg-background-primary border border-border flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500">
                    {feature.icon}
                 </div>
                 <h3 className="text-lg font-bold text-text-primary">{feature.title}</h3>
                 <p className="text-sm text-text-secondary leading-relaxed">
                   {feature.description}
                 </p>
               </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;

