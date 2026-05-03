import React from 'react';
import { ShieldCheck, Lock, Eye, Zap } from 'lucide-react';

const SecurityAudit = () => {
  return (
    <section className="py-24 lg:py-32 px-6 bg-background-secondary/30 relative border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
              Trust & Safety
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-tight">
              Fortified by <br />
              <span className="text-gradient">Algorand Mainnet</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Every negotiation is encrypted end-to-end, and every settlement is protected by the most secure and decentralized carbon-neutral blockchain in existence.
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-accent font-bold">256-bit</div>
                <div className="text-xs text-text-muted uppercase tracking-widest font-bold">Encryption</div>
              </div>
              <div className="space-y-2">
                <div className="text-accent font-bold">100%</div>
                <div className="text-xs text-text-muted uppercase tracking-widest font-bold">Uptime</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card-noir space-y-4">
              <ShieldCheck className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-text-primary">Audited Contracts</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Our TEAL smart contracts have undergone rigorous third-party security audits to ensure zero vulnerabilities.
              </p>
            </div>
            <div className="card-noir space-y-4">
              <Lock className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-text-primary">Immutable Escrow</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Funds are locked in logic signatures that can only be triggered by the pre-defined agentic consensus.
              </p>
            </div>
            <div className="card-noir space-y-4">
              <Eye className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-text-primary">Open Source</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Complete transparency. Review our agent logic and contract code on GitHub anytime.
              </p>
            </div>
            <div className="card-noir space-y-4">
              <Zap className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-text-primary">Instant Finality</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Transactions are finalized in less than 4 seconds, eliminating any risk of double-spending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityAudit;
