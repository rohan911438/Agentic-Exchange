import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, LayoutDashboard, PlusCircle, MessageSquare, Shield, History, LogOut } from 'lucide-react';

const menuLinks = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Create Deal', path: '/create-deal', icon: <PlusCircle size={18} /> },
  { name: 'Negotiation', path: '/negotiation-room', icon: <MessageSquare size={18} /> },
  { name: 'Active Deals', path: '/active-deal', icon: <Shield size={18} /> },
  { name: 'History', path: '/completion', icon: <History size={18} /> },
];

const SideMenu = ({ isOpen, onClose, connected, account, disconnect, formatAddress }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-[300px] bg-[#111111] border-r border-[#262626] z-[70] shadow-2xl rounded-r-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-[#262626]">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#EDEDED] tracking-tight">Agentic Exchange</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest mt-0.5">Navigation</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#1A1A1A] text-text-muted hover:text-[#EDEDED] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-grow py-6 px-3">
              <div className="space-y-1">
                {menuLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-accent/10 text-accent font-bold' 
                        : 'text-text-secondary hover:bg-[#1A1A1A] hover:text-[#EDEDED]'}
                    `}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="text-sm tracking-wide">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Footer / Wallet */}
            <div className="p-6 border-t border-[#262626] bg-[#0A0A0A]/50">
              {connected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#262626]">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                      <Shield size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Wallet Connected</span>
                      <span className="text-xs font-mono text-[#EDEDED]">{formatAddress(account)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <LogOut size={14} /> Disconnect
                  </button>
                </div>
              ) : (
                <p className="text-xs text-text-muted text-center italic">Wallet not connected</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
