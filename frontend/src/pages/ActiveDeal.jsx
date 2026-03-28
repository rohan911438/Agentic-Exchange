import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle2, Circle, ArrowRight, UploadCloud, AlertCircle } from 'lucide-react';

const ActiveDeal = () => {
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([
    { id: 1, task: "UI/UX Design & Wireframing", status: "Completed", amount: 150 },
    { id: 2, task: "Frontend Implementation & Logic", status: "In Progress", amount: 200 },
    { id: 3, task: "Final Testing & Handover", status: "Pending", amount: 100 }
  ]);

  const toggleMilestone = (id) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return m;
    }));
  };

  const completedCount = milestones.filter(m => m.status === 'Completed').length;
  const progressPercent = (completedCount / milestones.length) * 100;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-ink-900 flex flex-col items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aqua/5 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-10"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/20 text-[10px] font-mono uppercase tracking-[0.2em] text-aqua">
                <ShieldCheck size={12} /> Escrow Active
             </div>
             <h1 className="text-4xl lg:text-5xl font-display font-bold text-white italic">Active Deal Tracker</h1>
          </div>
          <div className="flex gap-8 border-l border-white/10 pl-8 h-fit">
             <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate tracking-widest block">Total Price</span>
                <span className="text-xl font-bold text-white uppercase tracking-tight italic">₹450.00</span>
             </div>
             <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate tracking-widest block">Remaining</span>
                <span className="text-xl font-bold text-aqua uppercase tracking-tight italic">₹300.00</span>
             </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-ink-800/50 border border-white/5 p-8 rounded-[2rem] space-y-6">
           <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-slate">
              <span>Overall Progress</span>
              <span className="text-white">{Math.round(progressPercent)}%</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-aqua to-blush shadow-[0_0_15px_rgba(94,240,255,0.4)]"
              />
           </div>
           <div className="flex items-center gap-2 text-[10px] text-slate/60 italic">
              <Clock size={12} /> Est. Delivery: Apr 15, 2026 (7 days remaining)
           </div>
        </div>

        {/* Milestones Section */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white font-display flex items-center gap-3 italic">
              <CheckCircle2 size={24} className="text-aqua" /> Project Milestones
           </h2>

           <div className="space-y-4">
              {milestones.map((m, i) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-3xl border transition-all duration-300 ${
                    m.status === 'Completed' 
                    ? 'bg-lime/5 border-lime/20' 
                    : m.status === 'In Progress' 
                    ? 'bg-ink-800/80 border-white/10 active-shadow' 
                    : 'bg-ink-800/40 border-white/5 opacity-60'
                  }`}
                >
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-2xl ${m.status === 'Completed' ? 'bg-lime/10 text-lime' : 'bg-white/5 text-slate'}`}>
                            {m.status === 'Completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                         </div>
                         <div>
                            <h3 className={`font-bold transition-colors ${m.status === 'Completed' ? 'text-white' : 'text-slate'}`}>{m.task}</h3>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-slate/50">Release: ₹{m.amount}.00</div>
                         </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        {m.status === 'In Progress' ? (
                          <button 
                            onClick={() => toggleMilestone(m.id)}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-white text-ink-900 text-xs font-bold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                          >
                             Approve & Release <CheckCircle2 size={14} />
                          </button>
                        ) : m.status === 'Pending' ? (
                          <div className="text-[10px] font-mono text-slate uppercase italic flex items-center gap-1.5 opacity-50 px-4">
                             <AlertCircle size={12} /> Locked until previous stage
                          </div>
                        ) : (
                          <div className="px-4 py-2 rounded-lg bg-lime/10 text-lime text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                             <CheckCircle2 size={12} /> Verified On-Chain
                          </div>
                        )}
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Final CTA if all done */}
        <AnimatePresence>
           {completedCount === milestones.length && (
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="p-8 rounded-[2.5rem] bg-gradient-to-r from-aqua/10 to-blush/10 border border-aqua/30 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-aqua/10 blur-[60px] rounded-full animate-pulse" />
                <div className="space-y-1">
                   <h3 className="text-xl font-bold text-white font-display italic">All Milestones Fulfilled!</h3>
                   <p className="text-slate text-xs italic">Review the final audit before completing the lifecycle.</p>
                </div>
                <button 
                  onClick={() => navigate('/completion')}
                  className="px-10 py-4 bg-white text-ink-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-soft flex items-center gap-2 z-10"
                >
                   Finalize Deal <ArrowRight size={20} />
                </button>
             </motion.div>
           )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default ActiveDeal;
