import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Dashboard = () => {
  const { account, connected } = useWallet();
  const [myAgents, setMyAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Workflow states
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflowInput, setWorkflowInput] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState('');
  const [workflowResult, setWorkflowResult] = useState(null);
  const [apiModalAgent, setApiModalAgent] = useState(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!connected || !account) {
      setLoading(false);
      return;
    }

    const fetchMyAgents = async () => {
      try {
        // Fetch agents purchased by this wallet from your backend
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/my-agents?wallet=${account}`);
        const data = await response.json();
        
        if (data.items) {
          setMyAgents(data.items);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard agents:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyAgents();
  }, [account, connected]);

  // Generate a mock API key unique to their wallet
  const apiKey = account ? `sk_test_51Nx${account.slice(2, 6).toUpperCase()}${account.slice(-8).toLowerCase()}` : '';

  const getPythonCode = (agent) => {
    if (!agent) return '';
    return `from agentic_exchange import AgenticClient\n\nclient = AgenticClient(api_key="${apiKey}")\n\n# Trigger the ${agent.name} programmatically\nresponse = client.run_workflow(\n    steps=["${agent.agent_id || agent.id}"],\n    input={"prompt": "Your task objective here"}\n)\n\nprint(response["final_output"])`;
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const toggleAgentSelection = (agent) => {
    if (selectedAgents.find(a => a.agent_id === agent.agent_id)) {
      setSelectedAgents(selectedAgents.filter(a => a.agent_id !== agent.agent_id));
    } else {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const handleRunWorkflow = async () => {
    if (!workflowInput.trim()) return;
    setWorkflowStatus('⏳ Orchestrating workflow with agent...');
    setWorkflowResult(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/run-workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: account,
          steps: selectedAgents.map(a => a.agent_id || a.id),
          input: { prompt: workflowInput }
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorDetail = data.detail ? JSON.stringify(data.detail) : "Unknown server error";
        throw new Error(errorDetail);
      }
      
      setWorkflowStatus('✅ Execution Complete!');
      setWorkflowResult(data.run || data);
    } catch (err) {
      console.error(err);
      setWorkflowStatus(`❌ Error: ${err.message}`);
    }
  };

  if (!connected) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-background-primary flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Connect Your Wallet</h1>
        <p className="text-text-secondary max-w-xs mx-auto">Please connect your Defly wallet to view your purchased AI agents.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background-primary text-text-primary relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4 mb-12 border-b border-border pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter">My <span className="text-gradient">Workforce</span></h1>
          <p className="text-text-secondary font-mono text-sm">Wallet: {account.slice(0, 8)}...{account.slice(-8)}</p>
        </div>

        {loading ? (
          <p className="text-text-muted">Loading your agents...</p>
        ) : myAgents.length === 0 ? (
          <div className="p-12 border border-border border-dashed rounded-3xl text-center space-y-6">
            <h3 className="text-2xl font-bold text-text-primary">No Agents Yet</h3>
            <p className="text-text-secondary">You haven't purchased any autonomous agents.</p>
            <Link to="/marketplace" className="inline-block px-6 py-3 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAgents.map((agent, index) => (
              <div key={agent.agent_id || index} className="p-6 bg-surface border border-accent/30 rounded-2xl space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded-md tracking-wider border border-accent/20">Active</span>
                </div>
                <h3 className="text-xl font-bold">{agent.name || `Agent ${agent.agent_id}`}</h3>
                <p className="text-sm text-text-secondary h-12">{agent.description || "Ready for workflow orchestration."}</p>
                
                <div className="pt-4 border-t border-border flex gap-2">
                  <button 
                    onClick={() => toggleAgentSelection(agent)}
                    className={`flex-1 px-4 py-2 font-bold rounded-xl transition-colors text-sm ${selectedAgents.find(a => a.agent_id === agent.agent_id) ? 'bg-accent text-white border-accent' : 'bg-background-primary border-border text-text-primary hover:border-accent hover:text-accent'}`}
                  >
                    {selectedAgents.find(a => a.agent_id === agent.agent_id) ? 'Added to Pipeline' : 'Select Agent'}
                  </button>
                  <button 
                    onClick={() => setApiModalAgent(agent)}
                    className="px-4 py-2 bg-background-primary border border-border text-text-primary font-bold rounded-xl hover:border-accent hover:text-accent transition-colors text-sm"
                  >
                    API Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Floating Pipeline Action Bar */}
      {selectedAgents.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-xl border border-accent/50 p-4 rounded-2xl shadow-2xl flex items-center gap-6 z-40">
          <div className="flex flex-col">
            <span className="font-bold text-accent">{selectedAgents.length} Agents Selected</span>
            <span className="text-xs text-text-secondary">Ready for orchestration</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-6 py-3 bg-accent text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-accent/20"
          >
            Configure Pipeline ➔
          </button>
        </div>
      )}
      
      {/* Workflow Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-3xl p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => { setIsModalOpen(false); setWorkflowResult(null); setWorkflowStatus(''); setWorkflowInput(''); }}
              className="absolute top-6 right-6 text-text-muted hover:text-white font-bold"
            >
              Close ✕
            </button>
            <h2 className="text-2xl font-bold">Orchestrate Pipeline</h2>
            
            <div className="flex flex-wrap items-center gap-2 p-4 bg-background-primary rounded-xl border border-border">
              <span className="text-xs text-text-muted uppercase tracking-widest font-bold w-full mb-1">Execution Order:</span>
              {selectedAgents.map((a, i) => (
                <React.Fragment key={i}>
                  <div className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-bold rounded-lg text-sm">{a.name}</div>
                  {i < selectedAgents.length - 1 && <span className="text-text-muted font-bold">➔</span>}
                </React.Fragment>
              ))}
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-text-secondary">Task Objective / Prompt</label>
              <textarea 
                value={workflowInput}
                onChange={(e) => setWorkflowInput(e.target.value)}
                placeholder="e.g. Research Algorand consensus mechanism and generate a summary..."
                className="w-full bg-background-primary border border-border rounded-xl p-4 text-text-primary h-32 focus:border-accent focus:outline-none transition-colors resize-none"
              />
              <button 
                onClick={handleRunWorkflow}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Execute Task
              </button>
            </div>
            
            {workflowStatus && (
              <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl text-sm font-bold text-accent">
                {workflowStatus.includes('⏳') && <div className="w-4 h-4 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />}
                {workflowStatus}
              </div>
            )}
            
            {workflowResult && (
              <div className="space-y-4">
                {workflowResult.final_output?.result && (
                  <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl">
                    <h3 className="text-accent font-bold mb-4 flex items-center gap-2">
                      ✨ Task Completed
                    </h3>
                    <div className="text-text-primary text-sm leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown>{workflowResult.final_output.result}</ReactMarkdown>
                    </div>
                  </div>
                )}
                <details className="group">
                  <summary className="cursor-pointer text-xs font-bold text-text-muted hover:text-text-primary transition-colors">
                    View Execution Trace (JSON)
                  </summary>
                  <div className="mt-2 p-4 bg-background-primary border border-border rounded-xl max-h-64 overflow-y-auto font-mono text-xs text-text-secondary">
                    <pre>{JSON.stringify(workflowResult, null, 2)}</pre>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      )}

      {/* API Settings Modal */}
      {apiModalAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-3xl p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setApiModalAgent(null)}
              className="absolute top-6 right-6 text-text-muted hover:text-white font-bold"
            >
              Close ✕
            </button>
            <h2 className="text-2xl font-bold">API Integration: {apiModalAgent.name}</h2>
            <p className="text-text-secondary text-sm">
              Integrate this agent directly into your own applications. Executions will be billed automatically to your Algorand wallet.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">Your API Key</label>
                <div className="flex justify-between items-center p-3 bg-background-primary border border-border rounded-xl">
                  <span className="font-mono text-sm text-accent">{apiKey}</span>
                  <button onClick={() => handleCopy(apiKey, 'key')} className="text-text-muted hover:text-accent text-xs font-bold px-3 py-1 rounded-lg border border-border bg-surface transition-colors">
                    {copiedKey ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">Python SDK Example</label>
                <div className="relative p-4 bg-[#0d1117] border border-border rounded-xl font-mono text-xs overflow-x-auto text-gray-300">
                  <button onClick={() => handleCopy(getPythonCode(apiModalAgent), 'code')} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xs font-bold px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 transition-colors">
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                  <pre>
<span className="text-pink-400">from</span> agentic_exchange <span className="text-pink-400">import</span> AgenticClient{'\n\n'}
client = AgenticClient(api_key=<span className="text-green-300">"{apiKey}"</span>){'\n\n'}
<span className="text-gray-500"># Trigger the {apiModalAgent.name} programmatically</span>{'\n'}
response = client.run_workflow({'\n'}
    steps=[<span className="text-green-300">"{apiModalAgent.agent_id || apiModalAgent.id}"</span>],{'\n'}
    input=<span className="text-blue-300">&#123;</span><span className="text-green-300">"prompt"</span>: <span className="text-green-300">"Your task objective here"</span><span className="text-blue-300">&#125;</span>{'\n'}
){'\n\n'}
<span className="text-blue-400">print</span>(response[<span className="text-green-300">"final_output"</span>])
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default Dashboard;