import React, { useEffect, useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { getBilling, getUsage, getCreatorEarnings } from '../services/MarketplaceService'

const Billing = () => {
  const { account, connected, formatAddress } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [billing, setBilling] = useState(null)
  const [usage, setUsage] = useState([])
  const [earnings, setEarnings] = useState(null)

  useEffect(() => {
    if (!connected || !account) return
    let alive = true
    setLoading(true)
    Promise.all([getBilling(account), getUsage(account), getCreatorEarnings(account)])
      .then(([b, u, e]) => {
        if (!alive) return
        setBilling(b)
        setUsage(u.items || [])
        setEarnings(e)
      })
      .catch((err) => {
        if (!alive) return
        setError(err.message || 'Failed to load billing')
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [connected, account])

  return (
    <div className="min-h-screen bg-background-primary pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-text-primary">Billing & Usage</h1>
        {!connected && <p className="text-text-muted">Connect wallet to view billing data.</p>}
        {connected && <p className="text-text-muted">Wallet: {formatAddress(account)}</p>}
        {loading && <p className="text-text-muted">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {billing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="premium-card">
              <p className="text-xs text-text-muted">Total Cost</p>
              <p className="text-2xl font-semibold text-text-primary">₹{billing.total_cost}</p>
            </div>
            <div className="premium-card">
              <p className="text-xs text-text-muted">Total Units</p>
              <p className="text-2xl font-semibold text-text-primary">{billing.total_units}</p>
            </div>
            <div className="premium-card">
              <p className="text-xs text-text-muted">Creator Net Revenue</p>
              <p className="text-2xl font-semibold text-text-primary">₹{earnings?.net_revenue ?? 0}</p>
            </div>
          </div>
        )}

        <div className="premium-card">
          <h2 className="text-xl font-semibold text-text-primary mb-3">Usage Ledger</h2>
          {!usage.length ? (
            <p className="text-text-muted text-sm">No usage rows yet.</p>
          ) : (
            <div className="space-y-2">
              {usage.map((row) => (
                <div
                  key={`${row.run_id}-${row.timestamp}`}
                  className="border border-border-main rounded-xl p-3 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-1"
                >
                  <span className="text-text-primary">{row.agent_id}</span>
                  <span className="text-text-muted">Run: {row.run_id}</span>
                  <span className="text-text-muted">Units: {row.units}</span>
                  <span className="text-text-primary">₹{row.cost}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Billing
