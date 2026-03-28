import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, ListChecks, ArrowRight, XCircle, ShieldCheck } from 'lucide-react';

const DealSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default fallback data if navigated directly
  const dealData = location.state || {
    title: "Mobile App Development",
    finalPrice: 450,
    deadline: "2026-04-15",
    priority: "Quality"
  };

  const milestones = [
    { task: "UI/UX Design & Wireframing", amount: 150 },
    { task: "Frontend Implementation & Logic", amount: 200 },
    { task: "Testing & Deployment", amount: 100 }
  ];

  const handleAccept = () => {
    // Navigate to Active Deal for "Execution" simulation
    navigate('/active-deal');
  };

  const handleReject = () => {
    navigate('/create-deal');
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-ink-900 flex flex-col items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-aqua/5 to-transparent -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/20 text-[10px] font-mono uppercase tracking-[0.2em] text-lime">
              <CheckCircle size={12} /> Negotiation Successful
           </div>
           <h1 className="text-4xl lg:text-5xl font-display font-bold text-white italic">Deal Finalized</h1>
           <p className="text-slate text-sm">Please review the final agreement reached by your AI agents.</p>
        </div>

        {/* Summary Card */}
        <div className="bg-ink-800/50 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-soft space-y-8">
           
           {/* Price & Deadline Row */}
           <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/5">
              <div className="space-y-1">
                 <div className="text-[10px] uppercase font-mono text-slate tracking-widest flex items-center gap-1.5">
                    Final Price
                 </div>
                 <div className="text-4xl font-display font-bold text-white">
                    ₹{dealData.finalPrice || 450}
                 </div>
              </div>
              <div className="space-y-1 text-right">
                 <div className="text-[10px] uppercase font-mono text-slate tracking-widest flex items-center justify-end gap-1.5">
                    <Calendar size={12} className="text-aqua" /> Deadline
                 </div>
                 <div className="text-xl font-bold text-white">
                    {dealData.deadline || "Apr 15, 2026"}
                 </div>
              </div>
           </div>

           {/* Milestones List */}
           <div className="space-y-5">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <ListChecks size={18} className="text-aqua" /> Milestones Breakout
                 </h3>
                 <span className="text-[10px] text-slate/50 font-mono tracking-tighter italic">3 Total Stages</span>
              </div>

              <div className="space-y-3">
                 {milestones.map((m, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                      <span className="text-sm text-slate group-hover:text-white transition-colors">{m.task}</span>
                      <span className="text-sm font-bold text-white font-mono">₹{m.amount}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Trust Indicator */}
           <div className="p-4 rounded-2xl bg-aqua/5 border border-aqua/10 flex items-center gap-4">
              <ShieldCheck size={24} className="text-aqua shrink-0" />
              <div className="text-[10px] leading-relaxed text-slate italic">
                 Terms are verified and ready for deployment to the Algorand Smart Contract. Funds will be held in secure escrow.
              </div>
           </div>

           {/* Buttons */}
           <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={handleAccept}
                className="w-full py-5 bg-gradient-to-r from-aqua to-blush text-ink-900 font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-soft flex items-center justify-center gap-2 group"
              >
                 Accept Deal & Deploy <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
              <button 
                onClick={handleReject}
                className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                 <XCircle size={18} /> Reject Agreement
              </button>
           </div>

        </div>
      </motion.div>
    </div>
  );
};

export default DealSummary;
