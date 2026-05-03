import React from 'react';
import { Target, MessageSquare, Zap, ShieldCheck, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

const valueProps = [
  {
    title: "Autonomous Negotiation",
    description: "Our agents leverage advanced game theory to secure optimal pricing and terms without human intervention.",
    icon: <MessageSquare className="w-6 h-6 text-accent" />
  },
  {
    title: "Trustless Execution",
    description: "Contracts are deployed to the Algorand blockchain, ensuring funds are moved only when conditions are met.",
    icon: <ShieldCheck className="w-6 h-6 text-accent" />
  },
  {
    title: "Programmable Agreements",
    description: "Convert complex legal prose into executable code with milestone-based payouts and penalty clauses.",
    icon: <Briefcase className="w-6 h-6 text-accent" />
  }
];

const steps = [
  {
    title: "Define Intent",
    number: "01",
    description: "Specify your goals, budget, and constraints in plain English. Our system handles the technical abstraction.",
    icon: <Target className="w-5 h-5" />
  },
  {
    title: "AI Negotiates Terms",
    number: "02",
    description: "Autonomous agents communicate across the network to find the perfect counterparty and reach consensus.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Smart Contract Executes",
    number: "03",
    description: "Agreement terms are etched into the ledger. Escrow is initialized instantly with zero friction.",
    icon: <FileText className="w-5 h-5" />
  },
  {
    title: "Settlement is Enforced",
    number: "04",
    description: "Upon verification of deliverables, funds are distributed according to the immutable contract rules.",
    icon: <CheckCircle2 className="w-5 h-5" />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-6 bg-background-primary relative">
      <div className="max-w-7xl mx-auto">
        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {valueProps.map((prop, i) => (
            <div key={i} className="flex flex-col gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shadow-premium">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mt-2">{prop.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6">
            The Workflow
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter mb-6">
            How it <span className="text-gradient">Actually Works</span>
          </h2>
          <p className="text-text-muted max-w-2xl text-lg">
            A sophisticated layer of abstraction that translates human intent into immutable on-chain actions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="card-noir relative overflow-hidden group"
            >
              {/* Step Number Decoration */}
              <div className="absolute -top-4 -right-4 text-[80px] font-bold text-white/[0.02] select-none group-hover:text-accent/[0.05] transition-colors duration-500">
                {step.number}
              </div>
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-background-secondary border border-border flex items-center justify-center text-text-muted mb-6 group-hover:text-accent group-hover:border-accent/30 transition-all duration-500">
                  {step.icon}
                </div>
                <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">{step.number}</div>
                <h3 className="text-lg font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

