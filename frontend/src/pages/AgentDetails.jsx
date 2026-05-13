import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { walletService } from '../services/AlgorandWalletService'
import { submitSignedTxns } from '../services/ContractService'
import { getAgentById, createPurchaseTxn, confirmPurchase } from '../services/MarketplaceService'

const AgentDetails = () => {
  const { id } = useParams()
  const { account, connected } = useWallet()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    getAgentById(id)
      .then((data) => {
        if (!alive) return
        setAgent(data)
      })
      .catch((e) => {
        if (!alive) return
        setError(e.message || 'Failed to load agent')
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [id])

  const handleBuy = async () => {
    if (!connected || !account || !agent) return
    try {
      setBuying(true)
      setError('')
      setSuccess('')
      const amountMicroalgos = Number(agent.price_value || 0)
      const txnRes = await createPurchaseTxn({
        buyer_wallet: account,
        agent_id: agent.agent_id,
        plan: 'default',
        amount_microalgos: amountMicroalgos,
      })
      const unsigned = txnRes.txns || []
      if (!unsigned.length) throw new Error('No payment transaction returned')

      const signed = await walletService.signTransactions(unsigned)
      const submitRes = await submitSignedTxns(signed)
      const txid = submitRes?.txids?.[0]
      if (!txid) throw new Error('No txid returned after submit')

      await confirmPurchase({ purchase_id: txnRes.purchase_id, txid })
      setSuccess(`Purchase successful on-chain. TxID: ${txid}`)
    } catch (e) {
      setError(e.message || 'Purchase failed')
    } finally {
      setBuying(false)
    }
  }

  if (loading) return <div className="pt-32 px-6 text-text-muted">Loading agent...</div>
  if (error && !agent) return <div className="pt-32 px-6 text-red-400">{error}</div>

  return (
    <div className="min-h-screen bg-background-primary pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/marketplace" className="text-sm text-text-muted hover:text-text-primary">
          ← Back to Marketplace
        </Link>

        <div className="premium-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest text-accent-primary">{agent.category}</span>
            <span className="text-xs text-text-muted">{agent.status}</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-3">{agent.name}</h1>
          <p className="text-text-muted mb-4">{agent.description}</p>
          <p className="text-text-primary mb-2">Pricing: {agent.price_type}</p>
          <p className="text-text-primary mb-4">Price: ₹{agent.price_value}</p>
          <div className="mb-4">
            <p className="text-sm text-text-muted mb-2">Capabilities</p>
            <div className="flex flex-wrap gap-2">
              {(agent.capabilities || []).map((c) => (
                <span key={c} className="px-2 py-1 rounded-md bg-bg-card border border-border-main text-xs">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <button
            disabled={!connected || buying}
            onClick={handleBuy}
            className="w-full h-11 rounded-xl bg-accent-primary text-white font-semibold disabled:opacity-50"
          >
            {connected ? (buying ? 'Purchasing...' : 'Purchase Agent') : 'Connect wallet to purchase'}
          </button>
          {success && <p className="text-green-400 text-sm mt-3">{success}</p>}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default AgentDetails
