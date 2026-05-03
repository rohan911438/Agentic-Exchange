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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-primary/70 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 rounded-xl border border-border bg-surface text-text-primary hover:border-accent/50 transition-all active:scale-90"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-accent/50 transition-colors duration-500">
               <Shield className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-text-primary tracking-premium leading-none">
                Agentic <span className="text-accent">Exchange</span>
              </span>
              <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em] mt-1">
                Autonomous Infrastructure
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8 mr-4">
            {connected && (
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/create-deal" 
                  className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Create Deal
                </NavLink>
              </>
            )}
            {!connected && (
              <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                How it Works
              </a>
            )}
          </div>
          
          <div className="flex items-center gap-3">
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
              className={`btn-premium flex items-center gap-2.5 relative ${connected ? 'border-accent/20 text-accent bg-accent/5' : ''}`}
            >
              <Wallet className="w-4 h-4" />
              <span className="tracking-tight text-xs">
                {connected ? formatAddress(account) : 'Connect'}
              </span>
              
              {connected && showBalance && (
                <div className="absolute top-full mt-3 right-0 z-50 min-w-[200px] p-4 rounded-2xl bg-surface border border-border shadow-premium animate-fade-in-up">
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

            {connected && (
              <button
                onClick={disconnect}
                className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary hover:text-red-400 hover:border-red-400/30 transition-all duration-300 active:scale-95"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Wallet Icon Only */}
        <div className="lg:hidden flex items-center gap-3">
          {!connected && (
            <button 
              onClick={toggleModal}
              className="p-2 rounded-xl border border-border bg-surface text-accent hover:bg-accent/5 transition-all"
            >
              <Wallet size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Side Menu Integration */}
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


