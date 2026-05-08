import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Play, 
  Save, 
  Share2, 
  Rocket, 
  Search, 
  Settings, 
  Cpu, 
  MessageSquare, 
  Code, 
  Shield, 
  Globe, 
  Activity, 
  Layers, 
  MoreVertical,
  Trash2,
  ChevronRight,
  Zap,
  BarChart3,
  Clock,
  Database
} from 'lucide-react';

const AGENT_CATEGORIES = [
  { name: 'Research', icon: <Search size={14} />, color: '#6366F1' },
  { name: 'Content', icon: <MessageSquare size={14} />, color: '#EC4899' },
  { name: 'Technical', icon: <Code size={14} />, color: '#8B5CF6' },
  { name: 'Financial', icon: <Activity size={14} />, color: '#10B981' },
  { name: 'Security', icon: <Shield size={14} />, color: '#F59E0B' },
];

const INITIAL_NODES = [
  { id: '1', x: 100, y: 150, name: 'User Intent', type: 'Input', status: 'idle' },
  { id: '2', x: 400, y: 150, name: 'Deep Research V2', type: 'Research', status: 'idle' },
  { id: '3', x: 700, y: 150, name: 'CopyStack AI', type: 'Content', status: 'idle' },
];

const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [workflowName, setWorkflowName] = useState('Untitled_Workflow_01');
  const canvasRef = useRef(null);

  const handleDrag = (id, info) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, x: node.x + info.delta.x, y: node.y + info.delta.y } : node
    ));
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    for (const node of nodes) {
      setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'running' } : n));
      await new Promise(r => setTimeout(r, 1500));
      setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'success' } : n));
    }
    setIsRunning(false);
  };

  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden text-text-primary">
      
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-border-main bg-bg-card/50 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                <Layers size={18} />
             </div>
             <input 
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-transparent border-none focus:outline-none font-bold text-sm text-text-primary tracking-tight w-48"
             />
          </div>
          <div className="h-4 w-[1px] bg-border-main" />
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Autosaved 2m ago</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary h-10 px-4 text-xs font-bold gap-2">
            <Share2 size={14} /> Share
          </button>
          <button className="btn-secondary h-10 px-4 text-xs font-bold gap-2">
            <Save size={14} /> Save
          </button>
          <div className="h-6 w-[1px] bg-border-main mx-2" />
          <button 
            onClick={runWorkflow}
            disabled={isRunning}
            className="btn-premium-outline h-10 px-6 text-xs font-bold gap-2 group border-accent-primary/30 text-accent-primary hover:bg-accent-primary/5"
          >
            <Play size={12} className={isRunning ? 'animate-pulse' : ''} /> Run Test
          </button>
          <button className="btn-premium-primary h-10 px-6 text-xs font-bold gap-2">
            <Rocket size={14} /> Deploy Workflow
          </button>
        </div>
      </header>

      <div className="flex-grow flex relative">
        
        {/* Left Sidebar - Agent Palette */}
        <aside className="w-72 border-r border-border-main bg-bg-card/30 backdrop-blur-xl p-6 flex flex-col gap-8 z-40">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">Agent Inventory</h3>
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
               <input 
                type="text" 
                placeholder="Search components..."
                className="w-full bg-bg-primary/50 border border-border-main rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-accent-primary/50"
               />
            </div>
          </div>

          <div className="space-y-6">
            {AGENT_CATEGORIES.map(cat => (
              <div key={cat.name} className="space-y-3">
                <span className="text-[9px] font-bold text-text-muted/50 uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full" style={{ backgroundColor: cat.color }} />
                   {cat.name}
                </span>
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="p-3 rounded-xl bg-bg-primary border border-border-main flex items-center justify-between group cursor-grab active:cursor-grabbing hover:border-accent-primary/30 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors">
                      {cat.icon}
                    </div>
                    <span className="text-[11px] font-medium">{cat.name} Node</span>
                  </div>
                  <Plus size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-accent-primary/5 border border-accent-primary/10 space-y-3">
             <div className="flex items-center gap-2 text-accent-primary font-bold text-[10px] uppercase tracking-widest">
                <Zap size={12} /> Pro Tip
             </div>
             <p className="text-[10px] text-text-muted leading-relaxed">
                Connect nodes by dragging from output sockets. High-frequency execution enabled.
             </p>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-grow relative bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:32px_32px] overflow-hidden" ref={canvasRef}>
          
          {/* Animated Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                <stop offset="50%" stopColor="rgba(99,102,241,0.8)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.2)" />
              </linearGradient>
            </defs>
            {nodes.map((node, i) => {
              if (i === nodes.length - 1) return null;
              const nextNode = nodes[i + 1];
              return (
                <motion.path
                  key={`line-${node.id}`}
                  d={`M ${node.x + 220} ${node.y + 40} L ${nextNode.x} ${nextNode.y + 40}`}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              );
            })}
          </svg>

          {/* Draggable Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDrag={(e, info) => handleDrag(node.id, info)}
              onClick={() => setActiveNode(node.id)}
              className={`absolute w-56 p-5 rounded-2xl bg-bg-card/80 border backdrop-blur-md cursor-move select-none transition-all duration-300 ${
                activeNode === node.id ? 'border-accent-primary ring-4 ring-accent-primary/10' : 'border-border-main'
              } ${node.status === 'running' ? 'shadow-[0_0_20px_rgba(99,102,241,0.3)]' : ''}`}
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center ${
                   node.status === 'running' ? 'text-accent-primary' : node.status === 'success' ? 'text-green-400' : 'text-text-muted'
                }`}>
                  {node.type === 'Input' ? <Zap size={16} /> : node.type === 'Research' ? <Search size={16} /> : <Code size={16} />}
                </div>
                <div className="flex items-center gap-1.5">
                   {node.status === 'running' && <Activity size={10} className="text-accent-primary animate-spin" />}
                   {node.status === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                   <span className="text-[8px] font-bold uppercase tracking-widest text-text-muted">{node.status}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text-primary">{node.name}</h4>
                <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{node.type} Agent</p>
              </div>

              <div className="mt-4 pt-4 border-t border-border-main flex items-center justify-between">
                <button className="text-text-muted hover:text-text-primary transition-colors">
                  <Settings size={12} />
                </button>
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-border-main" />
                   <div className="w-1.5 h-1.5 rounded-full bg-border-main" />
                </div>
              </div>

              {/* Node sockets */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-bg-primary border border-border-main" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-bg-primary border border-border-main hover:bg-accent-primary transition-colors" />
            </motion.div>
          ))}
        </main>

        {/* Right Sidebar - Config & Monitoring */}
        <aside className="w-80 border-l border-border-main bg-bg-card/30 backdrop-blur-xl flex flex-col z-40">
          <div className="p-6 border-b border-border-main space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">Configuration</h3>
                <button className="text-text-muted hover:text-text-primary"><MoreVertical size={14} /></button>
             </div>
             
             {activeNode ? (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="space-y-6"
               >
                 <div className="p-4 rounded-2xl bg-bg-primary border border-border-main space-y-3">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Selected Agent</span>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                          <Cpu size={16} />
                       </div>
                       <span className="text-sm font-bold text-text-primary">{nodes.find(n => n.id === activeNode)?.name}</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Model Parameters</label>
                       <select className="w-full bg-bg-primary border border-border-main rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-accent-primary/50 text-text-primary appearance-none">
                          <option>Optimized_Logic_v4</option>
                          <option>Deep_Reasoning_Pro</option>
                          <option>High_Speed_Execution</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Temperature</label>
                          <span className="text-xs font-bold text-accent-primary">0.7</span>
                       </div>
                       <div className="h-1 bg-border-main rounded-full overflow-hidden">
                          <div className="h-full w-[70%] bg-accent-primary" />
                       </div>
                    </div>
                 </div>
               </motion.div>
             ) : (
               <div className="h-40 flex flex-col items-center justify-center text-center space-y-3 text-text-muted/40">
                  <Activity size={32} />
                  <p className="text-xs font-light">Select a node to <br />view parameters</p>
               </div>
             )}
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-8">
             <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">Workflow Insights</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-4 rounded-2xl bg-bg-primary border border-border-main space-y-1">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Est. Cost</span>
                      <div className="text-sm font-bold text-text-primary">12.4 ALGO</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-bg-primary border border-border-main space-y-1">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Exec Time</span>
                      <div className="text-sm font-bold text-text-primary">4.2s</div>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">API Connections</h3>
                <div className="space-y-2">
                   {['Stripe_Payments', 'Linear_Sync', 'GitHub_Actions'].map(api => (
                     <div key={api} className="flex items-center justify-between p-3 rounded-xl bg-bg-primary/50 border border-border-main">
                        <span className="text-[11px] font-medium text-text-muted">{api}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-border-main bg-bg-primary/50">
             <button className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors text-[10px] font-bold uppercase tracking-widest">
                <Trash2 size={12} /> Clear Canvas
             </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default WorkflowBuilder;
