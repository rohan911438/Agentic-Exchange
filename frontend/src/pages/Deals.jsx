import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, TrendingUp, CheckCircle2, ExternalLink, ArrowRight, Circle } from 'lucide-react';
import { listDeals, approveDeal, rejectDeal, recordOnchainAccept, fundDeal } from '../services/DealService';
import { useWallet } from '../context/WalletContext';
import { getCreateDealTxn, getAcceptTxnForDeal, getContractInfo, getDepositTxns, submitSignedTxns } from '../services/ContractService';
import { walletService } from '../services/AlgorandWalletService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [deals, setDeals] = useState([]);
  const [contractInfo, setContractInfo] = useState(null);
  const [actionStatus, setActionStatus] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const { account, connected } = useWallet();

  const loadDeals = () => {
    listDeals()
      .then((data) => {
        const items = Object.entries(data || {}).map(([id, record]) => ({
          id,
          status: record.status || 'created',
          data: record.data || {},
        }));
        setDeals(items);
      })
      .catch(() => setDeals([]));
  };

  useEffect(() => {
    loadDeals();
  }, []);
  
  useEffect(() => {
    getContractInfo()
      .then(setContractInfo)
      .catch(() => {});
  }, []);

  const normalized = useMemo(() => deals.map((deal) => {
    const request = deal.data?.request || deal.data || {};
    const title = request?.title || request?.description?.split('—')[0]?.trim() || request?.description || 'Deal';
    const finalPrice = deal.data?.result?.final_price || deal.data?.final_price || request?.budget || 0;
    const statusKey = (deal.status || '').toLowerCase();
    
    let displayStatus = 'Negotiating';
    let route = '/negotiation-room';
    let actionLabel = 'Resume';

    if (statusKey === 'rejected') {
      displayStatus = 'Rejected';
      route = '/dashboard';
      actionLabel = 'Dismiss';
    } else if (statusKey === 'negotiated' || statusKey === 'success') {
      displayStatus = 'Negotiated';
      route = '/summary';
      actionLabel = 'Review Offer';
    } else if (statusKey === 'active') {
      displayStatus = 'Active';
      route = '/active-deal';
      actionLabel = 'Track Escrow';
    } else if (statusKey === 'completed') {
      displayStatus = 'Completed';
      route = '/completion';
      actionLabel = 'View Settlement';
    }

    return {
      id: deal.id,
      title,
      price: Math.round(finalPrice),
      status: displayStatus,
      route,
      actionLabel,
      data: deal.data,
    };
  }), [deals]);

  const activeDeals = normalized.filter((d) => d.status !== 'Completed' && d.status !== 'Rejected');
  const completedDeals = normalized.filter((d) => d.status === 'Completed');
  const negotiatedDeals = normalized.filter((d) => d.status === 'Negotiated');
  const onchainActiveDeals = normalized.filter((d) => d.status === 'Active');
  
  const sellerOnchainDeals = normalized.filter((d) => {
    const request = d.data?.request || d.data || {};
    const sellerWallet = d.data?.seller_wallet || '';
    const isSeller = account && sellerWallet && account.toLowerCase() === sellerWallet.toLowerCase();
    const onchain = d.data?.onchain_accepts || {};
    return isSeller && onchain.seller && d.status !== 'Active' && d.status !== 'Completed';
  });

  const dealsNeedingYourApproval = negotiatedDeals.filter((deal) => {
    const request = deal.data?.request || deal.data || {};
    const buyerWallet = request?.buyer_wallet || '';
    const sellerWallet = deal.data?.seller_wallet || '';
    const approvals = deal.data?.approvals || { buyer: false, seller: false };
    const isBuyer = account && buyerWallet && account.toLowerCase() === buyerWallet.toLowerCase();
    const isSeller = account && sellerWallet && account.toLowerCase() === sellerWallet.toLowerCase();
    if (isBuyer) return !approvals.buyer;
    if (isSeller) return !approvals.seller;
    return false;
  });

  const currentDeals = activeTab === 'active' ? activeDeals : completedDeals;

  const handleApprove = async (deal) => {
    const request = deal.data?.request || deal.data || {};
    const buyerWallet = request?.buyer_wallet || '';
    const sellerWallet = deal.data?.seller_wallet || '';
    const role = account && account.toLowerCase() === buyerWallet.toLowerCase() ? 'buyer' : account && account.toLowerCase() === sellerWallet.toLowerCase() ? 'seller' : null;
    if (!role) return;
    if (!connected || !account) {
      setActionStatus('Connect wallet to sign on-chain.');
      return;
    }
    setActionLoading(true);
    setActionStatus('Preparing on-chain acceptance...');
    try {
      await approveDeal(deal.id, role);
      if (role === 'seller') {
        const onchain = deal.data?.onchain_accepts || {};
        if (!onchain.buyer) {
          setActionStatus('Waiting for buyer to create escrow on-chain.');
          return;
        }
        const { txn } = await getAcceptTxnForDeal(account, deal.id);
        const signed = await walletService.signTransactions(txn, 'TestNet');
        const { txids } = await submitSignedTxns(signed);
        await recordOnchainAccept(deal.id, 'seller', txids[0], account);
        setActionStatus(`Seller accepted on-chain. TxID: ${txids[0]}`);
      } else {
        const amount = Math.max(Math.round(deal.price || 0), 0);
        if (!amount) {
          setActionStatus('Final price is missing. Cannot create escrow.');
          return;
        }
        const milestones =
          deal.data?.result?.milestones?.length
            ? deal.data.result.milestones
            : [Math.round(amount * 0.4), Math.max(amount - Math.round(amount * 0.4), 0)].filter((v) => v > 0);
        const { txns } = await getCreateDealTxn(account, deal.id, amount, milestones);
        const signed = await walletService.signTransactions(txns, 'TestNet');
        const { txids } = await submitSignedTxns(signed);
        await recordOnchainAccept(deal.id, 'buyer', txids[0], account);
        const { txns: depositTxns } = await getDepositTxns(account, deal.id, amount);
        const signedDeposit = await walletService.signTransactions(depositTxns, 'TestNet');
        const { txids: depositTxids } = await submitSignedTxns(signedDeposit);
        await fundDeal(deal.id, depositTxids[0]);
        setActionStatus('Buyer created escrow and funded it on-chain.');
      }
      loadDeals();
    } catch (err) {
      setActionStatus(err.message || 'Acceptance failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (deal) => {
    const request = deal.data?.request || deal.data || {};
    const buyerWallet = request?.buyer_wallet || '';
    const sellerWallet = deal.data?.seller_wallet || '';
    const role = account && account.toLowerCase() === buyerWallet.toLowerCase() ? 'buyer' : account && account.toLowerCase() === sellerWallet.toLowerCase() ? 'seller' : null;
    if (!role) return;
    await rejectDeal(deal.id, role);
    loadDeals();
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background-primary relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]"
            >
              Control Center
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">Infrastructure <span className="text-accent-primary">Dashboard.</span></h1>
            <p className="text-text-muted text-lg font-light">Monitor and orchestrate your autonomous negotiations and settlements.</p>
          </div>
          <Link to="/create-deal" className="btn-premium-primary px-10 h-14 group">
            Provision New Deal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Active Deals', value: activeDeals.length, icon: <TrendingUp size={20} />, color: 'text-accent-primary' },
            { label: 'Completed', value: completedDeals.length, icon: <CheckCircle2 size={20} />, color: 'text-green-400' },
            { label: 'Negotiated', value: negotiatedDeals.length, icon: <MessageSquare size={20} />, color: 'text-blue-400' },
            { label: 'Total Volume', value: `${normalized.reduce((acc, d) => acc + d.price, 0).toLocaleString()} ALGO`, icon: <Activity size={20} />, color: 'text-purple-400' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-8 group hover:bg-bg-card/80"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-bg-primary border border-border-main flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary tracking-tight mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Section: Critical Actions */}
        {(dealsNeedingYourApproval.length > 0 || sellerOnchainDeals.length > 0) && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-primary flex items-center gap-2">
              <Zap size={14} />
              Pending Protocol Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dealsNeedingYourApproval.map((deal) => (
                <div key={deal.id} className="p-8 rounded-3xl bg-bg-card border border-accent-primary/20 flex flex-col justify-between gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/10 blur-2xl rounded-full" />
                  <div className="space-y-2 relative z-10">
                    <span className="text-[9px] font-bold text-accent-primary uppercase tracking-widest">Awaiting Approval</span>
                    <h4 className="text-xl font-bold text-text-primary">{deal.title}</h4>
                    <p className="text-xs text-text-muted">Finalized Offer: <span className="font-bold text-text-primary">{deal.price} ALGO</span></p>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <button
                      onClick={() => handleApprove(deal)}
                      disabled={actionLoading}
                      className="flex-1 h-12 rounded-xl bg-accent-primary text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all"
                    >
                      {actionLoading ? 'Processing...' : 'Accept Protocol'}
                    </button>
                    <button
                      onClick={() => handleReject(deal)}
                      className="px-6 h-12 rounded-xl border border-border-main text-text-muted hover:text-text-primary text-xs font-bold uppercase tracking-widest transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Main Tabs */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 p-1.5 bg-bg-card/50 rounded-2xl border border-border-main w-fit">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-accent-primary text-white shadow-glow' : 'text-text-muted hover:text-text-primary'}`}
            >
              In-Progress
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'completed' ? 'bg-accent-primary text-white shadow-glow' : 'text-text-muted hover:text-text-primary'}`}
            >
              Archived
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {currentDeals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="premium-card group p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent-primary/5 blur-xl group-hover:bg-accent-primary/10 transition-colors" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                        deal.status === 'Completed' ? 'bg-green-400/10 border-green-400/20 text-green-400' : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'
                      }`}>
                        {deal.status}
                      </div>
                      <span className="text-[10px] font-mono text-text-muted">#{deal.id.slice(0, 8)}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary leading-tight group-hover:text-accent-primary transition-colors">{deal.title}</h3>
                    <div className="text-xl font-bold text-text-primary/80">{deal.price.toLocaleString()} <span className="text-[10px] text-text-muted uppercase tracking-widest">ALGO</span></div>
                  </div>

                  <div className="pt-8 relative z-10">
                    <button 
                      onClick={() => navigate(`${deal.route}?dealId=${deal.id}`, { state: { dealId: deal.id } })}
                      className="w-full py-4 rounded-xl border border-border-main bg-bg-primary text-text-primary text-[10px] font-bold uppercase tracking-widest hover:border-accent-primary hover:text-accent-primary transition-all flex items-center justify-center gap-2"
                    >
                      {deal.actionLabel}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {currentDeals.length === 0 && (
            <div className="text-center py-32 bg-bg-card/30 rounded-[3rem] border border-dashed border-border-main">
              <LayoutDashboard size={48} className="mx-auto text-text-muted/10 mb-6" />
              <p className="text-text-muted font-light text-lg">No deal records found in this vector.</p>
              <Link to="/create-deal" className="text-accent-primary text-sm font-bold mt-4 inline-block hover:underline">Initiate first deal &rarr;</Link>
            </div>
          )}
        </div>

        {actionStatus && (
          <div className="fixed bottom-10 right-10 z-[100] max-w-md p-6 rounded-2xl bg-bg-card border border-accent-primary/30 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                   <Activity size={20} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">System Status</span>
                   <p className="text-sm text-text-primary font-medium">{actionStatus}</p>
                </div>
                <button onClick={() => setActionStatus('')} className="ml-auto text-text-muted hover:text-text-primary">&times;</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
