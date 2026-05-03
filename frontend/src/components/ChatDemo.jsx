import React, { useState, useEffect } from 'react';
import { Coins, Sparkles, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const messages = [
  { role: 'buyer', text: "Proposal: 1,500 ALGO for smart contract auditing service.", delay: 1000 },
  { role: 'seller', text: "Current network demand is high. I can secure a slot for 1,850 ALGO.", delay: 2000 },
  { role: 'buyer', text: "Counter: 1,700 ALGO with 48-hour delivery guarantee.", delay: 2500 },
  { role: 'seller', text: "Terms accepted. Initializing on-chain settlement...", delay: 2000 },
  { role: 'system', text: "DEAL VERIFIED: 1,700 ALGO SECURED IN ESCROW", delay: 1500 }
];

const ChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, messages[index]]);
        setIndex((prev) => prev + 1);
      }, messages[index].delay);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setVisibleMessages([]);
        setIndex(0);
      }, 6000);
      return () => clearTimeout(resetTimer);
    }
  }, [index]);

  return (
    <div className="w-full bg-surface border border-border rounded-3xl shadow-lg overflow-hidden relative group transition-all duration-300 hover:border-accent/20 animate-gpu">
      {/* Optimized background glow - single simple gradient */}
      <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Chat header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background-secondary/50 relative z-10">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-background-primary border border-border flex items-center justify-center">
                <Terminal className="w-4 h-4 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-text-primary uppercase tracking-[0.15em]">Negotiation Console</span>
              <span className="text-[9px] text-text-muted flex items-center gap-1.5 font-medium">
                <Activity className="w-3 h-3 text-green-500/70" />
                SECURE CHANNEL
              </span>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full border border-border bg-background-primary overflow-hidden">
                <div className="w-full h-full bg-accent/20" />
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="p-7 h-[420px] overflow-y-auto space-y-7 no-scrollbar flex flex-col relative z-10">
        {visibleMessages.map((msg, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${msg.role === 'buyer' ? 'items-start' : msg.role === 'seller' ? 'items-end' : 'items-center'} animate-gpu`}
          >
            <div className={`
              max-w-[85%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed tracking-wide
              ${msg.role === 'buyer' 
                ? 'bg-background-secondary text-text-primary border border-border rounded-tl-none' 
                : msg.role === 'seller' 
                ? 'bg-accent/10 text-accent border border-accent/20 rounded-tr-none' 
                : 'bg-accent text-white border border-accent/30 text-center font-bold mt-6 px-8 py-4 rounded-xl shadow-glow'}
            `}>
              {msg.text}
            </div>
            {msg.role !== 'system' && (
                <span className="text-[10px] mt-2 text-text-muted uppercase font-bold tracking-[0.2em] px-1 opacity-70">
                    {msg.role === 'buyer' ? 'Agent Alpha' : 'Agent Sigma'}
                </span>
            )}
          </motion.div>
        ))}
        {index < messages.length && (
            <div className="flex gap-2 items-center px-1 animate-gpu">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-text-muted font-medium ml-2 tracking-wide">Syncing...</span>
            </div>
        )}
      </div>
      
      {/* Footer Decoration */}
      <div className="px-6 py-4 border-t border-border bg-background-secondary/30 flex items-center justify-between relative z-10">
         <div className="flex gap-2.5">
            <div className="w-16 h-1.5 rounded-full bg-border/50" />
            <div className="w-8 h-1.5 rounded-full bg-border/50" />
         </div>
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ALGO</span>
            <Sparkles className="w-3.5 h-3.5 text-accent/50" />
         </div>
      </div>
    </div>
  );
};


export default ChatDemo;
