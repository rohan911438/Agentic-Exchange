import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  ExternalLink, 
  Shield, 
  Zap, 
  Cpu, 
  Globe, 
  Wallet,
  Plus,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Billing = () => {
  const { account, connected, formatAddress } = useWallet();
  
  const transactions = [
    { id: 'TXN-84291', agent: 'Negotiator Pro', workflow: 'Procurement_V2', cost: '12.5 ALGO', status: 'Confirmed', date: '2026-05-08 14:20' },
    { id: 'TXN-84290', agent: 'Sentinel Auditor', workflow: 'Security_Audit', cost: '45.0 ALGO', status: 'Confirmed', date: '2026-05-08 12:45' },
    { id: 'TXN-84289', agent: 'Market Pulse AI', workflow: 'Alpha_Discovery', cost: '8.2 ALGO', status: 'Confirmed', date: '2026-05-07 18:30' },
    { id: 'TXN-84288', agent: 'DevSync Engine', workflow: 'Deploy_Pipeline', cost: '5.5 ALGO', status: 'Failed', date: '2026-05-07 15:10' },
    { id: 'TXN-84287', agent: 'CopyStack AI', workflow: 'Content_Gen', cost: '3.2 ALGO', status: 'Confirmed', date: '2026-05-07 10:05' },
  ];

  const cards = [
    { label: 'Total Spent (30d)', value: '1,240.50 ALGO', icon: <ArrowUpRight className="text-red-400" />, trend: 'up' },
    { label: 'Active Subscriptions', value: '12', icon: <Zap className="text-accent-primary" />, trend: 'neutral' },
    { label: 'Agent Revenue', value: '8,420.00 ALGO', icon: <TrendingUp className="text-green-400" />, trend: 'up' },
    { label: 'Pending Payouts', value: '450.20 ALGO', icon: <Clock className="text-yellow-500" />, trend: 'neutral' },
  ];

  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6 lg:px-12 flex flex-col gap-12 text-text-primary">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]"
          >
            Financial Protocol
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[0.9]">
            Billing & <br />
            <span className="gradient-text">Settlements.</span>
          </h1>
          <p className="text-text-muted text-lg font-light max-w-xl leading-relaxed">
            Transparent on-chain billing and automated revenue distribution for the autonomous agent economy.
          </p>
        </div>

        {/* Wallet Connection Status */}
        <div className="p-6 rounded-[2.5rem] bg-bg-card border border-border-main flex items-center gap-6 shadow-2xl">
           <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
              <Wallet size={24} />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Settlement Wallet</span>
              <span className="text-sm font-mono text-text-primary">{connected ? formatAddress(account) : 'Not Connected'}</span>
           </div>
           {connected && (
             <div className="flex items-center gap-2 ml-4 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Balance: 1,420 ALGO
             </div>
           )}
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card p-8 group hover:bg-bg-card/80 flex flex-col justify-between min-h-[180px]"
          >
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-all duration-500">
                  {card.icon}
               </div>
               <button className="text-text-muted hover:text-text-primary transition-colors"><ExternalLink size={14} /></button>
            </div>
            <div className="space-y-1">
               <div className="text-3xl font-bold tracking-tight text-text-primary">{card.value}</div>
               <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Main Content: Transaction History */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary">Transaction History</h3>
              <div className="flex gap-4">
                 <button className="text-text-muted hover:text-text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Download size={14} /> Download Invoices
                 </button>
                 <button className="text-text-muted hover:text-text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <History size={14} /> Full History
                 </button>
              </div>
           </div>

           <div className="rounded-[2.5rem] bg-bg-card border border-border-main overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-bg-primary/50 border-b border-border-main">
                       <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">ID</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">Agent / Workflow</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">Status</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Cost</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border-main/30">
                    {transactions.map((txn, i) => (
                      <motion.tr 
                        key={txn.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-white/5 transition-all cursor-pointer"
                      >
                         <td className="px-8 py-6">
                            <div className="flex flex-col">
                               <span className="text-xs font-mono text-text-primary">{txn.id}</span>
                               <span className="text-[9px] text-text-muted">{txn.date}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                                  {txn.agent === 'Sentinel Auditor' ? <Shield size={14} /> : txn.agent === 'Negotiator Pro' ? <Zap size={14} /> : <Cpu size={14} />}
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-sm font-bold text-text-primary">{txn.agent}</span>
                                  <span className="text-[10px] text-text-muted uppercase tracking-widest">{txn.workflow}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex justify-center">
                               <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                 txn.status === 'Confirmed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                               }`}>
                                  {txn.status}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-right font-mono text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                            {txn.cost}
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Sidebar: Plans & Management */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Current Plan Card */}
           <div className="p-8 rounded-[2.5rem] border border-accent-primary/20 bg-gradient-to-br from-accent-primary/10 to-transparent space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-2xl rounded-full" />
              <div className="space-y-2 relative z-10">
                 <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.2em]">Current Protocol</span>
                 <h3 className="text-3xl font-bold text-text-primary">Enterprise Pro</h3>
                 <p className="text-xs text-text-muted leading-relaxed max-w-[200px]">Unlimited multi-agent workflows and high-frequency settlement support.</p>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-text-muted">Monthly Limit</span>
                    <span className="text-text-primary">84% Used</span>
                 </div>
                 <div className="h-1.5 w-full bg-bg-primary rounded-full overflow-hidden">
                    <div className="h-full w-[84%] bg-accent-primary shadow-glow" />
                 </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                 <button className="w-full h-12 rounded-xl bg-bg-primary border border-border-main text-text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-bg-secondary transition-all">
                    Upgrade Protocol
                 </button>
                 <button className="w-full h-12 rounded-xl border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                    View Plan Features
                 </button>
              </div>
           </div>

           {/* Wallet Management */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary flex items-center gap-2 px-2">
                 <Activity size={12} className="text-accent-primary" />
                 Wallet Orchestration
              </h3>
              <div className="space-y-3">
                 <button className="w-full p-5 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:border-accent-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                          <Plus size={18} />
                       </div>
                       <span className="text-xs font-bold">Add Funds to Wallet</span>
                    </div>
                    <ChevronRight size={14} className="text-text-muted group-hover:text-accent-primary transition-all" />
                 </button>
                 <button className="w-full p-5 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:border-accent-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                          <Globe size={18} />
                       </div>
                       <span className="text-xs font-bold">Block Explorer</span>
                    </div>
                    <ExternalLink size={14} className="text-text-muted group-hover:text-accent-primary transition-all" />
                 </button>
              </div>
           </div>

           {/* Security / Compliance Badge */}
           <div className="p-6 rounded-2xl bg-bg-card/30 border border-border-main flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                 <CheckCircle2 size={20} />
              </div>
              <p className="text-[10px] text-text-muted font-medium leading-relaxed">
                 All transactions are secured by Algorand's PPoS consensus and audited by Agentic Protocol.
              </p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Billing;
