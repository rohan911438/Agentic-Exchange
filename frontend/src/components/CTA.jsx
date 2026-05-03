import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const navigate = useNavigate();
  const { connected, toggleModal } = useWallet();

  return (
    <section className="py-24 lg:py-48 px-6 bg-background-primary relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl font-bold text-text-primary tracking-tighter leading-tight mb-8">
          Let Agents Handle <br />
          <span className="text-gradient">the Complexity</span>
        </h2>
        <p className="text-lg lg:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-12">
          Step into the future of autonomous commerce. Secure, intelligent, and verifiable agreements are just a few clicks away.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={() => connected ? navigate('/create-deal') : toggleModal()}
            className="btn-primary flex items-center gap-2.5 px-10 py-5 text-lg"
          >
            Create Your First Deal
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-center gap-10 opacity-30 grayscale">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Security Audited</div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Algorand Native</div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Open Source</div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

