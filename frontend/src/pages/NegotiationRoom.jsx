import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, ArrowRight, Zap, CheckCircle2, MoreHorizontal } from 'lucide-react';

const NegotiationRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  const dealData = location.state || { 
    title: 'Custom Website Design', 
    minBudget: 300, 
    maxBudget: 600, 
    priority: 'Quality' 
  };

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [step, setStep] = useState(0);

  const negotiationSteps = [
    { role: 'buyer', text: `Hi there! I'm interested in the "${dealData.title}". My initial offer is ₹${dealData.minBudget}.`, price: dealData.minBudget },
    { role: 'seller', text: "Thanks for reaching out! Given the complexity and standard market rates, I'd usually start at ₹650 for this level of quality.", price: 650 },
    { role: 'buyer', text: `I understand your expertise, but my maximum budget is capped at ₹${dealData.maxBudget}. Can we find a middle ground?`, status: "negotiating" },
    { role: 'seller', text: `Since you're prioritizing ${dealData.priority.toLowerCase()}, I can optimize my workflow. How about ₹480?`, price: 480 },
    { role: 'buyer', text: "₹480 sounds more reasonable, but I was hoping for something closer to ₹420 if we define clear milestones.", price: 420 },
    { role: 'seller', text: "Alright, if we set the deadline strictly, ₹450 is my final counter-offer. It covers the essential premium assets.", price: 450 },
    { role: 'buyer', text: "That works for me. ₹450 it is! Let's proceed with the smart contract.", price: 450, finalized: true }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Simulation Loop
  useEffect(() => {
    if (step < negotiationSteps.length) {
      const delay = step === 0 ? 1000 : 2500;
      
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        // Simulate "thinking" time
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, negotiationSteps[step]]);
          setStep(s => s + 1);
          
          if (step === negotiationSteps.length - 1) {
            setIsComplete(true);
          }
        }, 1500);

        return () => clearTimeout(typingTimer);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="pt-24 min-h-screen bg-ink-900 flex flex-col items-center relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-aqua/5 blur-[120px] rounded-full -z-10" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blush/5 blur-[120px] rounded-full -z-10" 
      />

      {/* Header Container */}
      <div className="w-full max-w-4xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 bg-ink-900/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Zap className="text-aqua animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display italic">Negotiation Room</h1>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isComplete ? 'bg-lime' : 'bg-aqua animate-ping'}`} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-slate">
                {isComplete ? 'Agreement Reached' : 'Simulation Active'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
           <div className="text-[10px] font-mono text-slate uppercase">Current Range:</div>
           <div className="text-xs font-bold text-white">₹{dealData.minBudget} — ₹{dealData.maxBudget}</div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 w-full max-w-3xl overflow-y-auto px-6 py-10 space-y-8 no-scrollbar scroll-smooth mb-28"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex items-end gap-3 ${msg.role === 'buyer' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'buyer' ? 'bg-aqua/20' : 'bg-blush/20'}`}>
                {msg.role === 'buyer' ? <User size={20} className="text-aqua" /> : <Bot size={20} className="text-blush" />}
              </div>
              
              <div className="space-y-1 max-w-[80%]">
                <div className={`px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-soft border backdrop-blur-md ${
                  msg.role === 'buyer' 
                  ? 'bg-aqua/10 border-aqua/20 text-white rounded-bl-none' 
                  : 'bg-blush/10 border-blush/20 text-white rounded-br-none'
                }`}>
                  {msg.text}
                  {msg.price && (
                    <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      msg.role === 'buyer' ? 'bg-aqua text-ink-900' : 'bg-blush text-ink-900'
                    }`}>
                      Offer: ₹{msg.price}
                    </div>
                  )}
                </div>
                <div className={`text-[9px] uppercase tracking-widest font-mono text-slate/40 ${msg.role === 'buyer' ? 'text-left' : 'text-right'}`}>
                  {msg.role === 'buyer' ? 'Buyer Agent' : 'Seller Agent'} • Just now
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-end gap-3 ${step % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border border-aqua/20 animate-ping opacity-20" />
               <MoreHorizontal size={16} className="text-slate/40" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Finalize Banner */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-10 left-6 right-6 z-50 flex justify-center"
          >
            <div className="max-w-xl w-full p-1.5 rounded-[2rem] bg-gradient-to-r from-aqua to-blush shadow-[0_0_50px_rgba(94,240,255,0.3)]">
               <div className="bg-ink-900 rounded-[1.8rem] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                     <div className="w-14 h-14 rounded-full bg-lime/20 border border-lime/30 flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-lime" />
                     </div>
                     <div>
                        <div className="text-xs uppercase tracking-[0.3em] font-mono text-slate mb-1">Agreement Reached</div>
                        <div className="text-2xl font-bold text-white font-display">₹450.00 Total</div>
                     </div>
                  </div>
                  <button 
                    onClick={() => navigate('/summary')}
                    className="px-8 py-4 bg-white text-ink-900 font-bold rounded-2xl flex items-center gap-2 hover:bg-mist transition-all group"
                  >
                    View Summary <ArrowRight size={20} className="group-hover:translate-x-1" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NegotiationRoom;
