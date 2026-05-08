import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, LayoutDashboard, PlusCircle, MessageSquare, Shield, History, LogOut } from 'lucide-react';

const menuLinks = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Marketplace', path: '/marketplace', icon: <PlusCircle size={18} /> },
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Workflows', path: '/workflows', icon: <MessageSquare size={18} /> },
  { name: 'Agent Studio', path: '/studio', icon: <Shield size={18} /> },
  { name: 'Billing', path: '/billing', icon: <History size={18} /> },
  { name: 'Developer Docs', path: '/docs', icon: <X size={18} /> },
];

const SideMenu = ({ isOpen, onClose, connected, account, disconnect, formatAddress }) => {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-bg-secondary border-l border-border-main z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b border-border-main">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary tracking-tight">Agentic Exchange</span>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] mt-1">Platform Navigation</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-bg-card border border-transparent hover:border-border-main text-text-muted hover:text-text-primary transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-grow py-8 px-4 overflow-y-auto">
              <div className="space-y-2">
                {menuLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-accent-primary/10 text-accent-primary' 
                        : 'text-text-muted hover:bg-bg-card hover:text-text-primary'}
                    `}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium tracking-wide">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="p-8 border-t border-border-main bg-bg-primary/50">
              {connected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card border border-border-main">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                      <Shield size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Active Protocol</span>
                      <span className="text-xs font-mono text-text-primary">{formatAddress(account)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <LogOut size={14} /> Decommission Session
                  </button>
                </div>
              ) : (
                <div className="text-center p-6 rounded-2xl border border-dashed border-border-main">
                  <p className="text-xs text-text-muted italic">Authentication Required</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
