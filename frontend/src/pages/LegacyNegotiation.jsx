import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, MessageSquare } from 'lucide-react';

const LegacyNegotiation = () => {
  return (
    <div className="min-h-screen bg-background-primary pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="premium-card p-8 md:p-12 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            Legacy Module
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary">
              Legacy Negotiation Flow
            </h1>
            <p className="text-text-muted leading-relaxed">
              Agentic Exchange 2.0 now focuses on the AI Agent Marketplace and multi-agent workflows.
              The old buyer-seller negotiation flow is still available here as a legacy module.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/legacy/create-deal"
              className="rounded-2xl border border-border-main bg-bg-card p-5 hover:border-accent-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-text-primary">Start Legacy Deal</p>
                  <p className="text-xs text-text-muted">Create buyer/seller negotiation deal</p>
                </div>
                <ArrowRight className="w-4 h-4 text-accent-primary" />
              </div>
            </Link>

            <Link
              to="/marketplace"
              className="rounded-2xl border border-border-main bg-bg-card p-5 hover:border-accent-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-text-primary">Go To Marketplace</p>
                  <p className="text-xs text-text-muted">Recommended 2.0 primary experience</p>
                </div>
                <MessageSquare className="w-4 h-4 text-accent-primary" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyNegotiation;
