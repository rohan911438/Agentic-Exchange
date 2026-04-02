import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { LogOut, Wallet } from 'lucide-react';
import { getWalletBalance } from '../services/ContractService';

const Navbar = () => {
  const { account, connected, toggleModal, disconnect, formatAddress } = useWallet();
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  // Using real address from context

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to={connected ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aqua to-blush flex items-center justify-center">
             <div className="w-4 h-4 rounded-full border-2 border-white/20" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">
            Agentic <span className="text-aqua">Exchange</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {!connected ? (
            <Link to="/" className="text-slate hover:text-white transition-colors">Home</Link>
          ) : (
            <>
              <Link to="/dashboard" className="text-slate hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Dashboard</Link>
              <Link to="/create-deal" className="text-slate hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Create Deal</Link>
            </>
          )}
          
          <div className="flex items-center gap-2 relative">
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
              className={`px-6 py-2.5 rounded-full font-medium shadow-soft transition-all duration-300 flex items-center gap-2 ${
                connected 
                ? 'bg-ink-700 text-aqua border border-aqua/30 cursor-default' 
                : 'bg-gradient-to-r from-aqua to-blush text-ink-900 hover:shadow-[0_0_20px_rgba(94,240,255,0.4)]'
              }`}
            >
              <Wallet className="w-4 h-4" />
              {connected ? `Connected: ${formatAddress(account)}` : 'Connect Wallet'}
            </button>
            {connected && showBalance && (
              <div className="absolute top-12 right-0 z-50 rounded-xl bg-ink-800/90 border border-white/10 px-4 py-2 text-xs text-slate backdrop-blur-md">
                {balanceLoading && 'Loading balance...'}
                {!balanceLoading && balance !== null && `TestNet Balance: ${(balance / 1_000_000).toFixed(3)} ALGO`}
                {!balanceLoading && balance === null && 'Balance unavailable'}
              </div>
            )}

            {connected && (
              <button
                onClick={disconnect}
                className="p-2.5 rounded-full bg-ink-700 border border-white/10 text-slate hover:text-blush hover:border-blush/30 transition-all duration-300"
                title="Disconnect Wallet"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
};

export default Navbar;
