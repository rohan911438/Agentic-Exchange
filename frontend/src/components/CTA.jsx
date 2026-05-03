import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const navigate = useNavigate();
  const { connected, toggleModal } = useWallet();

  return (
    <section className="py-24 lg:py-48 px-6 bg-background-primary relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-bold text-text-primary tracking-tighter leading-tight mb-8"
        >
          Let Agents Handle <br />
          <span className="text-gradient">the Complexity</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg lg:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-12"
        >
          Step into the future of autonomous commerce. Secure, intelligent, and verifiable agreements are just a few clicks away.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => connected ? navigate('/create-deal') : toggleModal()}
            className="btn-primary flex items-center gap-2.5 px-10 py-5 text-lg"
          >
            Create Your First Deal
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border flex flex-wrap justify-center gap-10 grayscale"
        >
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Security Audited</div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Algorand Native</div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Open Source</div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;


