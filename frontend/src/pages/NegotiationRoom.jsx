import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, ArrowRight, Zap, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { getDeal, startNegotiation, acceptDealWithWallet } from '../services/DealService';
import { useWallet } from '../context/WalletContext';

const NegotiationRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const dealId = location.state?.dealId || null;
  const [dealData, setDealData] = useState(null);
  const [dealStatus, setDealStatus] = useState('created');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const { account, connected } = useWallet();

  useEffect(() => {
    if (!dealId) return;
    getDeal(dealId)
      .then((res) => {
        setDealData(res);
        setDealStatus(res?.status || 'created');
        const convo = res?.data?.result?.conversation || res?.data?.conversation || [];
        if (convo.length) {
          setMessages(mapConversation(convo));
          setIsComplete(true);
        }
      })
      .catch(() => {});
  }, [dealId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const dealTitle = useMemo(() => {
    const request = dealData?.data?.request || dealData?.data || {};
    const title = request?.title || '';
    const desc = request?.description || '';
    return title || desc.split('—')[0]?.trim() || 'New Deal';
  }, [dealData]);

  const buyerWallet = useMemo(() => {
    const request = dealData?.data?.request || dealData?.data || {};
    return (request?.buyer_wallet || '').toLowerCase();
  }, [dealData]);

  const isBuyer = useMemo(() => {
    if (!account) return false;
    return buyerWallet && account.toLowerCase() === buyerWallet;
  }, [account, buyerWallet]);

  const handleStart = async () => {
    if (!dealId) return;
    if (dealStatus !== 'accepted' && dealStatus !== 'success') {
      setError('Waiting for seller to accept.');
      return;
    }
    setLoading(true);
    setError('');
    setIsTyping(true);
    try {
      const result = await startNegotiation(dealId);
      const convo = result.conversation || [];
      setMessages(mapConversation(convo));
      setIsComplete(true);
    } catch (err) {
      setError(err.message || 'Negotiation failed');
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!connected || !account) {
      setError('Connect wallet to accept.');
      return;
    }
    if (!dealId) return;
    setAccepting(true);
    setError('');
    try {
      await acceptDealWithWallet(dealId, account);
      setDealStatus('accepted');
    } catch (err) {
      setError(err.message || 'Accept failed');
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-ink-900 flex flex-col items-center relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-aqua/5 blur-[120px] rounded-full -z-10" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blush/5 blur-[120px] rounded-full -z-10" 
      />

      <div className="w-full max-w-4xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 bg-ink-900/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Zap className="text-aqua animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display italic">Negotiation Room</h1>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isComplete ? 'bg-lime' : 'bg-aqua animate-ping'}`} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-slate">
                {isComplete ? 'Agreement Reached' : (dealStatus === 'accepted' ? 'Seller Accepted' : 'Waiting for seller to accept')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
           <div className="text-[10px] font-mono text-slate uppercase">Deal:</div>
           <div className="text-xs font-bold text-white">{dealTitle}</div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl overflow-y-auto px-6 py-10 space-y-8 no-scrollbar scroll-smooth mb-28" ref={scrollRef}>
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`flex items-end gap-3 ${msg.role === 'buyer' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'buyer' ? 'bg-aqua/20' : 'bg-blush/20'}`}>
                {msg.role === 'buyer' ? <User size={20} className="text-aqua" /> : <Bot size={20} className="text-blush" />}
              </div>
              <div className="space-y-1 max-w-[80%]">
                <div className={`px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-soft border backdrop-blur-md ${
                  msg.role === 'buyer' 
                  ? 'bg-aqua/10 border-aqua/20 text-white rounded-bl-none' 
                  : 'bg-blush/10 border-blush/20 text-white rounded-br-none'
                }`}>
                  {msg.text}
                  {msg.price && (
                    <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      msg.role === 'buyer' ? 'bg-aqua text-ink-900' : 'bg-blush text-ink-900'
                    }`}>
                      Offer: ₹{msg.price}
                    </div>
                  )}
                </div>
                <div className={`text-[9px] uppercase tracking-widest font-mono text-slate/40 ${msg.role === 'buyer' ? 'text-left' : 'text-right'}`}>
                  {msg.role === 'buyer' ? 'Buyer Agent' : 'Seller Agent'} • Just now
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      {isTyping && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border border-aqua/20 animate-ping opacity-20" />
               <MoreHorizontal size={16} className="text-slate/40" />
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {!isComplete && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-10 left-6 right-6 z-50 flex justify-center"
          >
            <div className="max-w-xl w-full p-1.5 rounded-[2rem] bg-gradient-to-r from-aqua to-blush shadow-[0_0_50px_rgba(94,240,255,0.3)]">
               <div className="bg-ink-900 rounded-[1.8rem] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                     <div className="w-14 h-14 rounded-full bg-lime/20 border border-lime/30 flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-lime" />
                     </div>
                     <div>
                        <div className="text-xs uppercase tracking-[0.3em] font-mono text-slate mb-1">
                          {dealStatus === 'accepted' ? 'Seller Accepted' : 'Awaiting Seller'}
                        </div>
                        <div className="text-2xl font-bold text-white font-display">
                          {dealStatus === 'accepted' ? 'Start Negotiation' : 'Locked'}
                        </div>
                     </div>
                  </div>
                  <button 
                    onClick={handleStart}
                    disabled={loading || (dealStatus !== 'accepted' && dealStatus !== 'success')}
                    className="px-8 py-4 bg-white text-ink-900 font-bold rounded-2xl flex items-center gap-2 hover:bg-mist transition-all group"
                  >
                    {loading ? 'Running...' : dealStatus === 'accepted' ? 'Run Agents' : 'Waiting'} <ArrowRight size={20} className="group-hover:translate-x-1" />
                  </button>
                  {dealStatus !== 'accepted' && !isBuyer && (
                    <button
                      onClick={handleAccept}
                      disabled={accepting}
                      className="px-6 py-3 rounded-2xl border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all"
                    >
                      {accepting ? 'Accepting…' : 'Accept Task'}
                    </button>
                  )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isComplete && (
        <div className="fixed bottom-10 left-6 right-6 z-50 flex justify-center">
          <button
            onClick={() => navigate('/summary', { state: { dealId } })}
            className="px-10 py-4 bg-white text-ink-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-soft"
          >
            View Summary
          </button>
        </div>
      )}

      {error && (
        <div className="text-xs text-blush mb-10">{error}</div>
      )}
    </div>
  );
};

function mapConversation(conversation) {
  const output = [];
  conversation.forEach((turn) => {
    if (turn.buyer) {
      output.push({ role: 'buyer', text: turn.buyer, price: turn.buyer_price });
    }
    if (turn.seller) {
      output.push({ role: 'seller', text: turn.seller, price: turn.seller_price });
    }
  });
  return output;
}

export default NegotiationRoom;
