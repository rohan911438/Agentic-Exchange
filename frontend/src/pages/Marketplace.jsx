import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { walletService } from '../services/AlgorandWalletService';
import { submitSignedTxns } from '../services/ContractService';

const Marketplace = () => {
  const { account, connected } = useWallet();
  const [agents, setAgents] = useState([]);
  const [ownedAgentIds, setOwnedAgentIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [txStatus, setTxStatus] = useState('');

  useEffect(() => {
    // Fetch available agents from your v2.0 backend
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/agents`);
        const data = await response.json();
        
        setAgents(data.items || []);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Fetch the agents this wallet already owns to disable the purchase button
  useEffect(() => {
    const fetchMyAgents = async () => {
      if (!connected || !account) {
        setOwnedAgentIds(new Set());
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/my-agents?wallet=${account}`);
        const data = await response.json();
        if (data.items) {
          setOwnedAgentIds(new Set(data.items.map(a => a.agent_id || a.id)));
        }
      } catch (err) {
        console.error("Failed to fetch owned agents:", err);
      }
    };
    fetchMyAgents();
  }, [account, connected, txStatus]); // Re-run if txStatus changes (so it updates immediately after a purchase!)

  const handlePurchase = async (agent) => {
    if (!connected || !account) {
      setTxStatus('⚠️ Please connect your Defly wallet first.');
      return;
    }

    setTxStatus(`🔄 Initiating purchase for ${agent.name}...`);
    try {
      // 1. Get the purchase transaction group from the backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/purchase-agent/txn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyer_wallet: account,
          agent_id: agent.agent_id || agent.id,
          plan: '30-days',
          amount: agent.price_microalgos || 200000, // Sending both in case the schema expects 'amount'
          amount_microalgos: agent.price_microalgos || 200000 // Default 0.2 ALGO
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // FastAPI returns 422 with a "detail" array if validation fails
        const errorDetail = data.detail ? JSON.stringify(data.detail) : data.message || "Unknown server error";
        throw new Error(errorDetail);
      }

      setTxStatus('📝 Please sign the transaction in your Defly wallet...');
      
      // 2. Sign transaction with Defly Wallet
      const signedTxns = await walletService.signTransactions(data.txns, 'TestNet');
      
      setTxStatus('🚀 Submitting transaction to Algorand network...');
      // 3. Submit the signed transaction to the network
      const { txids } = await submitSignedTxns(signedTxns);
      
      // 4. Confirm the purchase with our backend
      await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/purchase-agent/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purchase_id: data.purchase_id, txid: txids[0] })
      });

      setTxStatus(`✅ Purchase successful! TxID: ${txids[0]}`);
    } catch (err) {
      console.error(err);
      setTxStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background-primary text-text-primary">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter">AI Agent <span className="text-gradient">Marketplace</span></h1>
          <p className="text-text-secondary">Discover, purchase, and deploy autonomous agents for your workflows.</p>
          
          <div className="pt-4">
            <Link to="/studio" className="inline-flex items-center gap-3 px-6 py-3 bg-surface border border-accent/30 text-accent font-bold rounded-xl hover:bg-accent/10 transition-colors">
              <span>Build & Publish Your Own Agent</span>
              <span className="text-[10px] px-2 py-1 bg-accent/20 rounded-md uppercase tracking-wider text-white">Earn ALGO</span>
            </Link>
          </div>
        </div>
        
        {txStatus && (
          <div className="p-4 bg-accent/10 rounded-xl border border-accent/20 text-center font-mono text-sm text-accent">
            {txStatus}
          </div>
        )}

        {loading ? (
          <p className="text-center text-text-muted">Loading available agents...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div key={agent.agent_id || agent.id || index} className="p-6 bg-surface border border-border rounded-2xl space-y-4 hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-bold">{agent.name}</h3>
                <p className="text-sm text-text-secondary h-12">{agent.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div>
                    <span className="font-mono font-bold text-accent">{(agent.price_microalgos || 200000) / 1000000} ALGO</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">30-Day Access</p>
                  </div>
                  
                  {ownedAgentIds.has(agent.agent_id || agent.id) ? (
                    <button disabled className="px-4 py-2 bg-background-secondary text-text-muted font-bold rounded-xl cursor-not-allowed">
                      Owned
                    </button>
                  ) : (
                    <button onClick={() => handlePurchase(agent)} className="px-4 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Marketplace;