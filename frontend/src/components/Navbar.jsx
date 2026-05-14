import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { LogOut, Wallet, Shield, Menu } from 'lucide-react';
import { getWalletBalance } from '../services/ContractService';
import SideMenu from './SideMenu';

const Navbar = () => {
  const { account, connected, toggleModal, disconnect, formatAddress } = useWallet();
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-bg-card border border-border-main flex items-center justify-center group-hover:border-accent-primary/50 transition-all duration-500 shadow-sm">
             <Shield className="w-5 h-5 text-accent-primary group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-text-primary tracking-tight leading-none">
              Agentic <span className="text-accent-primary">Exchange</span>
            </span>
            <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em] mt-1">
              Infrastructure Layer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8 mr-4">
            <NavLink to="/marketplace" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Marketplace</NavLink>
            <NavLink to="/dashboard" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">My Agents</NavLink>
            <NavLink to="/studio" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Creator Studio</NavLink>
            
            {/* External Docs Link */}
            <a 
              href="/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-muted hover:text-accent-primary transition-colors flex items-center gap-1"
            >
              Docs
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={connected ? undefined : toggleModal}
              onMouseEnter={async () => {
                if (!connected || !account) return;
                setShowBalance(true);
                if (balanceLoading || balance !== null) return;
                setBalanceLoading(true);
                try {
                  const data = await getWalletBalance(account);
                  setBalance(data.microalgos || 0);
                } catch (e) {
                  setBalance(null);
                } finally {
                  setBalanceLoading(false);
                }
              }}
              onMouseLeave={() => setShowBalance(false)}
              className={`btn-premium-outline py-2 px-5 text-xs tracking-widest uppercase ${connected ? 'border-accent-primary/30 text-accent-primary bg-accent-primary/5' : ''}`}
              style={connected ? { boxShadow: '0 0 15px rgba(99, 102, 241, 0.1)' } : {}}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>
                {connected ? formatAddress(account) : 'Connect Wallet'}
              </span>
              
              {connected && showBalance && (
                <div className="absolute top-full mt-3 right-0 z-50 min-w-[200px] p-4 rounded-2xl bg-bg-card border border-border-main shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Available Balance</div>
                  <div className="text-sm font-bold text-text-primary">
                    {balanceLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : balance !== null ? (
                      `${(balance / 1_000_000).toFixed(3)} ALGO`
                    ) : (
                      'Unavailable'
                    )}
                  </div>
                </div>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 rounded-xl border border-border-main bg-bg-card text-text-primary hover:border-accent-primary/50 transition-all active:scale-90"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        connected={connected}
        account={account}
        disconnect={disconnect}
        formatAddress={formatAddress}
      />
    </nav>
  );
};

export default Navbar;
