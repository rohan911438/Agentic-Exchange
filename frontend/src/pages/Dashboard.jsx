import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, TrendingUp, History, CheckCircle2, Clock, ArrowRight, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const activeDeals = [
    { id: 1, title: "Fintech App UI Design", price: 450, status: "Negotiating", date: "Mar 28, 2026" },
    { id: 2, title: "Solidity Smart Contract Audit", price: 1200, status: "Execution", date: "Mar 25, 2026" },
    { id: 3, title: "Algorand Marketplace Integration", price: 800, status: "Negotiating", date: "Mar 27, 2026" }
  ];

  const completedDeals = [
    { id: 4, title: "Landing Page Development", price: 300, status: "Completed", date: "Mar 10, 2026" },
    { id: 5, title: "Tokenomics Consultation", price: 1500, status: "Completed", date: "Feb 22, 2026" },
    { id: 6, title: "Whitepaper Copywriting", price: 600, status: "Completed", date: "Jan 15, 2026" }
  ];

  const currentDeals = activeTab === 'active' ? activeDeals : completedDeals;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-ink-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-white font-display italic tracking-tight">Your Deals</h1>
            <p className="text-slate text-sm">Monitor and manage your autonomous negotiations.</p>
          </div>
          <Link to="/create-deal" className="px-8 py-3.5 bg-gradient-to-r from-aqua to-blush text-ink-900 rounded-2xl font-bold shadow-soft transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(94,240,255,0.4)]">
            Start New Deal
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Active Deals', value: activeDeals.length, icon: <TrendingUp className="text-aqua" />, color: 'aqua' },
            { label: 'Funds in Escrow', value: '₹2,450', icon: <History className="text-blush" />, color: 'blush' },
            { label: 'Total Completed', value: completedDeals.length, icon: <CheckCircle2 className="text-lime" />, color: 'lime' }
          ].map((stat) => (
            <div key={stat.label} className="p-8 rounded-[2rem] bg-ink-800/50 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors backdrop-blur-sm">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono text-slate uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs & Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 p-1.5 bg-ink-800/50 rounded-2xl border border-white/5 w-fit">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-aqua text-ink-900 shadow-lg' : 'text-slate hover:text-white'}`}
            >
              Active Deals
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'completed' ? 'bg-blush text-ink-900 shadow-lg' : 'text-slate hover:text-white'}`}
            >
              Completed Deals
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentDeals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-ink-800/40 border border-white/10 rounded-[2rem] p-8 hover:bg-ink-800/60 transition-all hover:border-white/20 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border ${
                        deal.status === 'Completed' ? 'bg-lime/10 border-lime/20 text-lime' : 'bg-aqua/10 border-aqua/20 text-aqua'
                      }`}>
                        {deal.status}
                      </div>
                      <span className="text-[10px] font-mono text-slate opacity-50">{deal.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-aqua transition-colors">{deal.title}</h3>
                    <div className="text-2xl font-display font-bold text-white/90">₹{deal.price}</div>
                  </div>

                  <div className="pt-6 flex justify-between items-center bg-ink-800/50">
                    <button 
                      onClick={() => navigate(deal.status === 'Completed' ? '/completion' : '/negotiation-room')}
                      className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 group/btn"
                    >
                      View <ExternalLink size={12} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                    {deal.status === 'Execution' && (
                      <div className="flex gap-1">
                        <span className="w-1 h-1 rounded-full bg-aqua animate-pulse" />
                        <span className="w-1 h-1 rounded-full bg-aqua animate-pulse delay-75" />
                        <span className="w-1 h-1 rounded-full bg-aqua animate-pulse delay-150" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {currentDeals.length === 0 && (
            <div className="text-center py-20 bg-ink-800/20 rounded-[3rem] border border-dashed border-white/10">
              <LayoutDashboard size={48} className="mx-auto text-slate/20 mb-4" />
              <p className="text-slate font-display">No deals found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
