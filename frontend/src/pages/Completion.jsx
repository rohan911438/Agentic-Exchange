import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Share2, Download } from 'lucide-react';

const Completion = () => (
  <div className="pt-32 pb-20 px-6 min-h-screen bg-ink-900 flex items-center justify-center relative overflow-hidden">
     {/* Celebration backglow */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aqua/10 blur-[150px] -z-10 rounded-full" />

     <div className="max-w-xl w-full text-center space-y-10 animate-fadeInUp">
        <div className="flex justify-center flex-col items-center gap-4">
           <div className="w-24 h-24 rounded-full bg-aqua/20 border border-aqua/30 flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-aqua" />
           </div>
           <h1 className="text-5xl font-bold font-display text-white italic">Deal Finalized</h1>
           <p className="text-slate italic max-w-sm mx-auto">The autonomous agents have fulfilled the milestones. Funds have been securely released to the service provider.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="p-4 bg-ink-800 border border-white/10 rounded-2xl text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-ink-700 transition-colors">
              <Download size={14} /> Download Receipt
           </button>
           <button className="p-4 bg-ink-800 border border-white/10 rounded-2xl text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-ink-700 transition-colors">
              <Share2 size={14} /> Share Success
           </button>
        </div>

        <div className="pt-10 border-t border-white/5">
           <Link 
             to="/dashboard" 
             className="px-10 py-5 bg-aqua text-ink-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-soft inline-flex items-center gap-2"
           >
              Return to Dashboard <ArrowRight size={20} />
           </Link>
        </div>
     </div>
  </div>
);

export default Completion;
