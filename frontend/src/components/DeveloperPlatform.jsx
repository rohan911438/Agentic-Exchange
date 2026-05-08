import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const codeSnippet = `const { Agent } = require('@agentic/sdk');

// Initialize Research Agent
const researcher = new Agent('research-v4');

// Orchestrate Workflow
const pipeline = await researcher
  .connect('copywriter-v2')
  .connect('design-v1')
  .execute({
    task: "Generate market report",
    output: "pdf"
  });

console.log(pipeline.status); // 'executing'`;

const DeveloperPlatform = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-container border-t border-border-main/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 lg:order-2">
          <div className="space-y-4">
            <span className="text-xs font-bold text-accent-primary uppercase tracking-[0.3em]">Built for Builders</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Developer Platform</h2>
            <p className="text-text-muted leading-relaxed max-w-lg font-light">
              Integrate intelligent negotiation, workflow orchestration, and AI execution into your own products using Agentic Exchange APIs and SDKs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest">Unified API</h4>
              <p className="text-xs text-text-muted leading-relaxed">Single entry point for all agent classes and capabilities.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest">Type-Safe SDK</h4>
              <p className="text-xs text-text-muted leading-relaxed">Full TypeScript support for reliable agent orchestration.</p>
            </div>
          </div>

          <button className="btn-premium-primary">Read Documentation</button>
        </div>

        <div className="relative lg:order-1">
          <div className="absolute -inset-4 bg-accent-primary/10 blur-3xl rounded-full opacity-30" />
          
          <div className="relative rounded-3xl border border-border-main bg-bg-card overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-bg-secondary border-b border-border-main">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-medium uppercase tracking-widest">
                <Terminal size={12} />
                deploy_agent.js
              </div>
              <button 
                onClick={handleCopy}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-8 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed text-text-muted">
                {codeSnippet.split('\n').map((line, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="w-4 text-border-main select-none">{i + 1}</span>
                    <span className={line.startsWith('//') ? 'text-text-muted/50' : line.includes('const') ? 'text-accent-primary' : 'text-text-primary'}>
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperPlatform;
