import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Code, Briefcase, BarChart3, MessageSquare, Zap } from 'lucide-react';

const agents = [
  { id: 1, name: 'Research Agent', icon: <Search size={18} />, pos: { x: 50, y: 50 } },
  { id: 2, name: 'Sales Agent', icon: <ShoppingCart size={18} />, pos: { x: 250, y: 50 } },
  { id: 3, name: 'Negotiation Agent', icon: <MessageSquare size={18} />, pos: { x: 150, y: 150 } },
  { id: 4, name: 'Code Agent', icon: <Code size={18} />, pos: { x: 50, y: 250 } },
  { id: 5, name: 'Marketing Agent', icon: <BarChart3 size={18} />, pos: { x: 250, y: 250 } },
];

const connections = [
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
];

const AgentOrchestration = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] bg-bg-card/30 rounded-3xl border border-border-main overflow-hidden backdrop-blur-sm">
      <svg className="absolute inset-0 w-full h-full p-10" viewBox="0 0 300 300">
        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const from = agents.find(a => a.id === conn.from).pos;
          const to = agents.find(a => a.id === conn.to).pos;
          return (
            <g key={i}>
              <motion.line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="var(--accent-primary)"
                strokeWidth="1"
                strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                r="2"
                fill="var(--accent-primary)"
                initial={{ offset: 0 }}
                animate={{ 
                  cx: [from.x, to.x],
                  cy: [from.y, to.y]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Agent Cards */}
      <div className="absolute inset-0 p-10 pointer-events-none">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: agent.id * 0.2 }
            }}
            className="absolute p-3 rounded-xl bg-bg-card border border-border-main flex items-center gap-3 shadow-xl backdrop-blur-md"
            style={{ 
              left: `${(agent.pos.x / 300) * 100}%`, 
              top: `${(agent.pos.y / 300) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-main flex items-center justify-center text-accent-primary">
              {agent.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-primary whitespace-nowrap">{agent.name}</span>
              <span className="text-[8px] text-text-muted uppercase tracking-tighter">Autonomous</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center Execution Card */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-accent-primary/30 flex items-center justify-center bg-accent-primary/5 shadow-[0_0_50px_rgba(99,102,241,0.1)]"
      >
        <div className="text-center">
          <div className="text-[8px] font-bold text-accent-primary uppercase tracking-[0.2em] mb-1">Engine</div>
          <Zap size={20} className="text-accent-primary mx-auto animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default AgentOrchestration;
