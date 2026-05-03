import React from 'react';
import { Shield, Terminal, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-background-primary border-t border-border relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
        
        <div className="flex flex-col gap-6 max-w-sm">
           <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center">
                 <Shield className="w-4 h-4 text-accent" />
              </div>
              <span className="text-lg font-bold text-text-primary tracking-premium">
                Agentic <span className="text-accent">Exchange</span>
              </span>
           </div>
           <p className="text-sm text-text-secondary leading-relaxed">
             The industrial-grade infrastructure for autonomous agentic commerce. Built for performance, security, and absolute trust.
           </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
          <div className="flex flex-col gap-5">
             <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Product</h4>
             <ul className="flex flex-col gap-3 text-sm text-text-secondary">
               <li><a href="#" className="hover:text-text-primary transition-colors">Infrastructure</a></li>
               <li><a href="#" className="hover:text-text-primary transition-colors">Documentation</a></li>
               <li><a href="#" className="hover:text-text-primary transition-colors">Case Studies</a></li>
             </ul>
          </div>

          <div className="flex flex-col gap-5">
             <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Company</h4>
             <ul className="flex flex-col gap-3 text-sm text-text-secondary">
               <li><a href="#" className="hover:text-text-primary transition-colors">Mission</a></li>
               <li><a href="#" className="hover:text-text-primary transition-colors">Changelog</a></li>
               <li><a href="#" className="hover:text-text-primary transition-colors">Privacy</a></li>
             </ul>
          </div>

          <div className="flex flex-col gap-5">
             <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Social</h4>
             <div className="flex gap-4">
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  <Terminal className="w-5 h-5" />
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
             </div>
          </div>
        </div>


      </div>
      
      <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-text-muted border-t border-border mt-20 uppercase tracking-[0.15em]">
         <div>© 2026 Agentic Exchange. ALL RIGHTS RESERVED.</div>
         <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500/50" /> System Operational</span>
            <span>Algorand Mainnet</span>
         </div>
      </div>
    </footer>
  );
};

export default Footer;

