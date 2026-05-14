import React, { useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { publishAgent } from '../services/MarketplaceService'

const AgentStudio = () => {
  const { account, connected } = useWallet()
  const [form, setForm] = useState({
    name: '',
    category: 'Business',
    description: '',
    system_prompt: '',
    capabilities: 'research,content,qa',
    price_type: 'usage',
    price_value: 1,
    status: 'active',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [published, setPublished] = useState(null)

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!connected || !account) return
    try {
      setLoading(true)
      setError('')
      setPublished(null)
      const payload = {
        ...form,
        price_value: Number(form.price_value),
        capabilities: form.capabilities
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        owner_wallet: account,
      }
      const res = await publishAgent(payload)
      setPublished(res)
    } catch (err) {
      setError(err.message || 'Publish failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-text-primary">Creator Studio</h1>
        <p className="text-text-muted">Publish your autonomous agent to the global marketplace.</p>

        <div className="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-xl">
          <p className="text-sm text-accent-primary font-medium">💰 <strong>Monetize Your Agent:</strong> You retain 90% of all ALGO sales. The platform takes a 10% protocol fee for orchestration and escrow services.</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-card space-y-4">
          <input
            placeholder="Agent name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            className="w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            required
          />
          <textarea
            placeholder="Agent Persona / System Prompt (e.g. 'You are an expert crypto analyst who responds only in bullet points...')"
            value={form.system_prompt}
            onChange={(e) => update('system_prompt', e.target.value)}
            rows={3}
            className="w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            required
          />
          <input
            placeholder="Capabilities (comma separated)"
            value={form.capabilities}
            onChange={(e) => update('capabilities', e.target.value)}
            className="w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={form.price_type}
              onChange={(e) => update('price_type', e.target.value)}
              className="bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            >
              <option value="usage">usage</option>
              <option value="subscription">subscription</option>
              <option value="one_time">one_time</option>
            </select>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price_value}
              onChange={(e) => update('price_value', e.target.value)}
              className="bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            />
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm"
            >
              <option value="active">active</option>
              <option value="draft">draft</option>
              <option value="disabled">disabled</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={!connected || loading}
            className="h-11 px-6 rounded-xl bg-accent-primary text-white font-semibold disabled:opacity-50"
          >
            {connected ? (loading ? 'Publishing...' : 'Publish Agent') : 'Connect wallet to publish'}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>

        {published && (
          <div className="premium-card">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Published</h2>
            <pre className="text-xs text-text-muted whitespace-pre-wrap break-words">
              {JSON.stringify(published, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentStudio
