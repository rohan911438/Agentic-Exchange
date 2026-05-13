import React, { useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { runWorkflow } from '../services/MarketplaceService'

const WorkflowBuilder = () => {
  const { account, connected } = useWallet()
  const [objective, setObjective] = useState('')
  const [stepsText, setStepsText] = useState('Research\nCopywriter\nQA')
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleRun = async () => {
    if (!connected || !account) return
    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!steps.length) {
      setError('Please add at least one step')
      return
    }
    try {
      setRunning(true)
      setError('')
      setResult(null)
      const res = await runWorkflow({
        wallet: account,
        steps,
        input: { objective },
      })
      setResult(res.run)
    } catch (e) {
      setError(e.message || 'Workflow run failed')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-text-primary">Workflow Builder</h1>
        <p className="text-text-muted">Run multi-agent workflows via `/run-workflow`.</p>

        <div className="premium-card space-y-4">
          <div>
            <label className="text-xs text-text-muted">Objective</label>
            <input
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g. Launch a startup landing page"
              className="mt-2 w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted">Steps (one per line)</label>
            <textarea
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              rows={6}
              className="mt-2 w-full bg-bg-card border border-border-main rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent-primary/50"
            />
          </div>
          <button
            disabled={!connected || running}
            onClick={handleRun}
            className="h-11 px-6 rounded-xl bg-accent-primary text-white font-semibold disabled:opacity-50"
          >
            {connected ? (running ? 'Running...' : 'Run Workflow') : 'Connect wallet to run'}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {result && (
          <div className="premium-card">
            <h2 className="text-xl font-semibold text-text-primary mb-3">Run Result</h2>
            <pre className="text-xs text-text-muted whitespace-pre-wrap break-words">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowBuilder
