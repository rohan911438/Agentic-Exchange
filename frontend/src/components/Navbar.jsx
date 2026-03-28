import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ connected, setConnected }) => {
  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const mockAddress = "0xA1B2C3D4E5F678901234567890ABCDEF12345678";

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
              <Link to="/negotiation-room" className="text-slate hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Negotiation</Link>
              <Link to="/summary" className="text-slate hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Summary</Link>
              <Link to="/active-deal" className="text-slate hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Active Deal</Link>
            </>
          )}
          
          <button
            onClick={() => setConnected(!connected)}
            className={`px-6 py-2.5 rounded-full font-medium shadow-soft transition-all duration-300 ${
              connected 
              ? 'bg-ink-700 text-aqua border border-aqua/30' 
              : 'bg-gradient-to-r from-aqua to-blush text-ink-900 hover:shadow-[0_0_20px_rgba(94,240,255,0.4)]'
            }`}
          >
            {connected ? `Connected: ${truncateAddress(mockAddress)}` : 'Connect Wallet'}
          </button>
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
};

export default Navbar;
