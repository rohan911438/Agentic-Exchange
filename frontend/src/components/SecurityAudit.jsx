import React from 'react';
import { ShieldCheck, Lock, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const SecurityAudit = () => {
  return (
    <section className="py-24 lg:py-32 px-6 bg-background-secondary/30 relative border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
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
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-accent" />, title: "Audited Contracts", desc: "Our TEAL smart contracts have undergone rigorous third-party security audits to ensure zero vulnerabilities." },
              { icon: <Lock className="w-8 h-8 text-accent" />, title: "Immutable Escrow", desc: "Funds are locked in logic signatures that can only be triggered by the pre-defined agentic consensus." },
              { icon: <Eye className="w-8 h-8 text-accent" />, title: "Open Source", desc: "Complete transparency. Review our agent logic and contract code on GitHub anytime." },
              { icon: <Zap className="w-8 h-8 text-accent" />, title: "Instant Finality", desc: "Transactions are finalized in less than 4 seconds, eliminating any risk of double-spending." }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="card-noir space-y-4">
                {feature.icon}
                <h3 className="text-lg font-bold text-text-primary">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityAudit;

