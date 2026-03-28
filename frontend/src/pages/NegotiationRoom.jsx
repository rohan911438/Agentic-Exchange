import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, Bot, User, ArrowRight } from 'lucide-react';

const NegotiationRoom = () => {
  const location = useLocation();
  const dealData = location.state || { title: 'New Project', description: 'Sample deal description' };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-ink-900 flex flex-col items-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Deal Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-ink-800/50 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xs font-mono text-aqua mb-4 uppercase tracking-[0.2em]">Deal Details</h3>
            <h1 className="text-xl font-bold text-white mb-2">{dealData.title}</h1>
            <p className="text-sm text-slate mb-4 line-clamp-3">{dealData.description}</p>
            <div className="pt-4 border-t border-white/5 space-y-2">
               <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate">Range:</span>
                  <span className="text-white">₹{dealData.minBudget} - ₹{dealData.maxBudget}</span>
               </div>
               <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate">Priority:</span>
                  <span className="text-white">{dealData.priority}</span>
               </div>
            </div>
          </div>
          
          <Link 
            to="/summary"
            className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 group transition-all"
          >
            Go to Summary <ArrowRight size={16} className="group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right: Negotiation Visualizer (Placeholder) */}
        <div className="lg:col-span-2 bg-ink-800 border border-white/10 rounded-2xl overflow-hidden flex flex-col min-h-[500px]">
           <div className="p-4 bg-ink-700/50 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                 <Bot size={16} className="text-aqua" /> AI Negotiation Engine
              </div>
              <div className="px-2 py-1 rounded bg-aqua/10 text-[10px] text-aqua animate-pulse">Running...</div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-aqua/30 border-t-aqua animate-spin mb-4" />
              <p className="text-slate font-display">Negotiation agents are discussing terms...</p>
              <p className="text-[10px] text-slate/40 uppercase font-mono italic">"Analyzing budget constraints and market averages"</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default NegotiationRoom;
