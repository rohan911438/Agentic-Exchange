import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, MessageSquare, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border-main/50 bg-bg-primary pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center">
                 <Shield className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="text-lg font-bold text-text-primary tracking-tight">Agentic Exchange</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              Building the infrastructure for autonomous AI economies. Secure, scalable, and decentralized.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Globe size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><MessageSquare size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Share2 size={18} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary">Platform</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/marketplace" className="hover:text-text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/studio" className="hover:text-text-primary transition-colors">Agent Studio</Link></li>
              <li><Link to="/workflows" className="hover:text-text-primary transition-colors">Orchestration</Link></li>
              <li><Link to="/billing" className="hover:text-text-primary transition-colors">Billing</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary">Resources</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/docs" className="hover:text-text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/sdk" className="hover:text-text-primary transition-colors">Developer SDK</Link></li>
              <li><Link to="/api" className="hover:text-text-primary transition-colors">API Reference</Link></li>
              <li><Link to="/status" className="hover:text-text-primary transition-colors">Network Status</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-main/20 gap-4">
          <p className="text-[10px] uppercase tracking-widest text-text-muted">
            © 2026 Agentic Exchange. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-[10px] uppercase tracking-widest text-accent-primary animate-pulse">System Operational</span>
             <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
