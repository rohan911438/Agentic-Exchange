import React from 'react';
import { Link } from 'react-router-dom';

const DealSummary = () => (
  <div className="pt-40 px-6 text-center space-y-6">
    <h1 className="text-4xl font-bold font-display text-white italic">Deal Summary</h1>
    <p className="text-slate">Negotiation agents have reached a final agreement. Review the terms below before committing to the escrow.</p>
    <div className="max-w-md mx-auto p-8 bg-ink-800 border border-white/10 rounded-2xl italic text-slate/60 text-sm">
       Summary Report: [GENERATING...]
    </div>
    <Link to="/active-deal" className="inline-block px-10 py-4 bg-aqua text-ink-900 rounded-xl font-bold hover:scale-105 transition-transform">Confirm & Open Escrow</Link>
  </div>
);

export default DealSummary;
