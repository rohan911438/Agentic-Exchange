import React, { useState, useEffect } from 'react';
import { Coins, Sparkles, Terminal } from 'lucide-react';

const messages = [
  { role: 'buyer', text: "Proposal: 5,000 USDC for Q3 Infrastructure setup.", delay: 1000 },
  { role: 'seller', text: "Analyzing market rates. Current volatility suggests 5,500 USDC.", delay: 2000 },
  { role: 'buyer', text: "Counter: 5,200 USDC with immediate settlement.", delay: 2500 },
  { role: 'seller', text: "Acceptable. Initializing smart contract terms...", delay: 2000 },
  { role: 'system', text: "DEAL VERIFIED: 5,200 USDC ESCROWED", delay: 1500 }
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
    <div className="w-full bg-surface border border-border rounded-2xl shadow-premium overflow-hidden backdrop-blur-sm">
      {/* Chat header */}
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-background-secondary/50">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background-primary border border-border flex items-center justify-center">
                <Terminal className="w-4 h-4 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Negotiation Console</span>
              <span className="text-[9px] text-text-muted">v2.0.4 - SECURE CHANNEL</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[9px] text-accent font-bold animate-pulse">ENCRYPTED</span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="p-6 h-[380px] overflow-y-auto space-y-6 no-scrollbar flex flex-col">
        {visibleMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${msg.role === 'buyer' ? 'items-start' : msg.role === 'seller' ? 'items-end' : 'items-center'} animate-fade-in-up`}
          >
            <div className={`
              max-w-[85%] px-4 py-3 rounded-xl text-xs leading-relaxed tracking-wide
              ${msg.role === 'buyer' 
                ? 'bg-background-secondary text-text-primary border border-border' 
                : msg.role === 'seller' 
                ? 'bg-accent/5 text-accent border border-accent/20' 
                : 'bg-accent text-white border border-accent/20 text-center font-bold shadow-glow mt-4'}
            `}>
              {msg.text}
            </div>
            {msg.role !== 'system' && (
                <span className="text-[9px] mt-1.5 text-text-muted uppercase font-bold tracking-[0.15em] px-1">
                    {msg.role === 'buyer' ? 'Agent Alpha' : 'Agent Sigma'}
                </span>
            )}
          </div>
        ))}
        {index < messages.length && (
            <div className="flex gap-1.5 items-center px-1">
                <div className="w-1 h-1 rounded-full bg-accent/40 animate-bounce" />
                <div className="w-1 h-1 rounded-full bg-accent/40 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 rounded-full bg-accent/40 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-text-muted font-medium ml-1">Analyzing transaction...</span>
            </div>
        )}
      </div>
      
      {/* Footer Decoration */}
      <div className="px-6 py-4 border-t border-border bg-background-secondary/30 flex items-center justify-between">
         <div className="flex gap-2">
            <div className="w-4 h-1 rounded-full bg-border" />
            <div className="w-12 h-1 rounded-full bg-border" />
         </div>
         <Sparkles className="w-3 h-3 text-text-muted" />
      </div>
    </div>
  );
};

export default ChatDemo;
