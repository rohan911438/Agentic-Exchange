import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

const defaultForm = {
  budget: 500,
  deadline: '',
  task_description: '',
  min_price: 350,
  initial_offer: 300,
  initial_price: 500,
  max_rounds: 8,
  increase_pct: 0.1,
  decrease_pct: 0.1,
  threshold: 20,
  personality: 'neutral',
  randomness: 0.02,
}

function App() {
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const payload = useMemo(
    () => ({
      budget: Number(form.budget),
      min_price: Number(form.min_price),
      initial_offer: Number(form.initial_offer),
      initial_price: Number(form.initial_price),
      max_rounds: Number(form.max_rounds),
      increase_pct: Number(form.increase_pct),
      decrease_pct: Number(form.decrease_pct),
      threshold: Number(form.threshold),
      personality: form.personality,
      randomness: Number(form.randomness),
      deadline: form.deadline || null,
      task_description: form.task_description || null,
    }),
    [form]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const createResponse = await fetch(`${API_BASE}/create-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!createResponse.ok) {
        const message = await createResponse.text()
        throw new Error(message || 'Failed to create task')
      }

      const created = await createResponse.json()

      const startResponse = await fetch(
        `${API_BASE}/start-negotiation?task_id=${created.task_id}`,
        { method: 'POST' }
      )

      if (!startResponse.ok) {
        const message = await startResponse.text()
        throw new Error(message || 'Failed to start negotiation')
      }

      const dealResponse = await fetch(
        `${API_BASE}/get-deal?task_id=${created.task_id}`
      )

      if (!dealResponse.ok) {
        const message = await dealResponse.text()
        throw new Error(message || 'Failed to fetch deal')
      }

      const deal = await dealResponse.json()
      setResult(deal)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-900">
      <div className="bg-noise min-h-screen">
        <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 pt-10">
          <div className="flex items-center justify-between">
            <span className="tag">Agentic Exchange</span>
            <div className="pill">
              <span className="h-2 w-2 rounded-full bg-lime"></span>
              Stage 3 · UI MVP
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h1 className="font-display text-4xl font-semibold leading-tight text-mist sm:text-5xl">
                Close AI-negotiated deals in minutes, not meetings.
              </h1>
              <p className="text-lg text-slate">
                Plug your task details into the negotiation engine. The backend will run buyer and seller agents,
                then return a deal you can escrow on Algorand in the next stage.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="button-main" type="button">
                  Live Negotiation
                </button>
                <button className="button-ghost" type="button">
                  View Deal Output
                </button>
              </div>
            </div>
            <div className="gradient-border glass relative rounded-2xl p-6 shadow-soft">
              <div className="absolute right-6 top-6 h-24 w-24 animate-floaty rounded-full bg-hero-sheen blur-2xl"></div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate">Negotiation Loop</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate">Buyer Agent</p>
                  <p className="mt-2 text-sm text-mist">Budget-aware, adaptive counter-offers.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate">Seller Agent</p>
                  <p className="mt-2 text-sm text-mist">Strategic price control with thresholds.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate">Engine</p>
                  <p className="mt-2 text-sm text-mist">Loop until agreement or max rounds.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="gradient-border glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-mist">Create Task</h2>
              <span className="text-xs uppercase tracking-[0.25em] text-slate">Stage 3</span>
            </div>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <label className="input-shell">
                Budget (USD)
                <input
                  type="number"
                  name="budget"
                  min="1"
                  step="1"
                  value={form.budget}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="input-shell">
                Deadline
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
              </label>
              <label className="input-shell">
                Task description
                <textarea
                  name="task_description"
                  placeholder="Describe the deliverable, milestones, or scope."
                  value={form.task_description}
                  onChange={handleChange}
                />
              </label>

              <button
                type="button"
                className="button-ghost w-full"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                {showAdvanced ? 'Hide' : 'Show'} negotiation settings
              </button>

              {showAdvanced && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="input-shell">
                    Min price
                    <input
                      type="number"
                      name="min_price"
                      step="1"
                      value={form.min_price}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Initial offer
                    <input
                      type="number"
                      name="initial_offer"
                      step="1"
                      value={form.initial_offer}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Initial price
                    <input
                      type="number"
                      name="initial_price"
                      step="1"
                      value={form.initial_price}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Max rounds
                    <input
                      type="number"
                      name="max_rounds"
                      step="1"
                      min="1"
                      value={form.max_rounds}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Increase %
                    <input
                      type="number"
                      name="increase_pct"
                      step="0.01"
                      min="0"
                      value={form.increase_pct}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Decrease %
                    <input
                      type="number"
                      name="decrease_pct"
                      step="0.01"
                      min="0"
                      value={form.decrease_pct}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Threshold
                    <input
                      type="number"
                      name="threshold"
                      step="1"
                      min="0"
                      value={form.threshold}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="input-shell">
                    Personality
                    <select
                      name="personality"
                      value={form.personality}
                      onChange={handleChange}
                      className="rounded-xl border border-white/10 bg-ink-800/70 px-4 py-3 text-base text-mist outline-none transition focus:border-aqua/70 focus:ring-2 focus:ring-aqua/20"
                    >
                      <option value="aggressive">Aggressive</option>
                      <option value="neutral">Neutral</option>
                      <option value="conservative">Conservative</option>
                    </select>
                  </label>
                  <label className="input-shell">
                    Randomness
                    <input
                      type="number"
                      name="randomness"
                      step="0.01"
                      min="0"
                      max="1"
                      value={form.randomness}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="button-main w-full" type="submit" disabled={loading}>
                  {loading ? 'Negotiating…' : 'Start negotiation'}
                </button>
                <button
                  className="button-ghost w-full"
                  type="button"
                  onClick={() => {
                    setForm(defaultForm)
                    setResult(null)
                    setError('')
                  }}
                >
                  Reset
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
            </form>
          </section>

          <section className="gradient-border glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-mist">Deal Output</h2>
              <span className="text-xs uppercase tracking-[0.25em] text-slate">Live JSON</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-ink-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate">Status</p>
                <p className="mt-2 text-lg text-mist">
                  {result ? result.status : 'Waiting for negotiation'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate">Final Price</p>
                <p className="mt-2 text-3xl font-semibold text-lime">
                  {result?.deal?.final_price ? `$${result.deal.final_price}` : '--'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-ink-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate">Raw Deal JSON</p>
                <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-mist">
                  {result ? JSON.stringify(result, null, 2) : '{\n  "deal": null\n}'}
                </pre>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
