import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, FileText, CheckCircle } from 'lucide-react';

const ActiveDeal = () => (
  <div className="pt-32 pb-24 px-6 min-h-screen bg-ink-900">
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-display text-white uppercase tracking-widest italic">Deal Execution</h1>
        <div className="flex items-center justify-center gap-2 text-aqua text-sm">
           <Shield size={16} /> Secured by Algorand Smart Contract
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-ink-800 border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 italic">
               <Clock size={20} className="text-blush" /> Progress
            </h3>
            <div className="space-y-4">
               {[
                 { label: 'Escrow Funded', status: 'completed' },
                 { label: 'Milestone 1', status: 'active' },
                 { label: 'Milestone 2', status: 'pending' },
                 { label: 'Final Release', status: 'pending' }
               ].map((m) => (
                 <div key={m.label} className="flex items-center justify-between text-sm">
                    <span className={m.status === 'completed' ? 'text-white font-bold' : 'text-slate'}>{m.label}</span>
                    <div className={`w-3 h-3 rounded-full ${m.status === 'completed' ? 'bg-aqua shadow-[0_0_10px_rgba(94,240,255,0.4)]' : m.status === 'active' ? 'bg-white/20 animate-pulse' : 'bg-white/5'}`} />
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-ink-800 border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 italic">
               <FileText size={20} className="text-aqua" /> Details
            </h3>
            <div className="p-4 bg-ink-900 rounded-2xl border border-white/5 text-xs text-slate whitespace-pre-wrap font-mono uppercase italic tracking-tighter opacity-50">
               contract: "agentic-escrow-v1"
               hash: "0x12b...3f9"
               status: "LOCKED"
            </div>
            <Link to="/completion" className="block w-full text-center py-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all font-bold">Verify Completion</Link>
         </div>
      </div>
    </div>
  </div>
);

export default ActiveDeal;
