const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json()
}

export async function getAgents({ limit = 100, offset = 0 } = {}) {
  return request(`/agents?limit=${limit}&offset=${offset}`)
}

export async function getAgentById(agentId) {
  return request(`/agents/${encodeURIComponent(agentId)}`)
}

export async function publishAgent(payload) {
  return request('/agents/publish', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function patchAgent(agentId, payload) {
  return request(`/agents/${encodeURIComponent(agentId)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function purchaseAgent(payload) {
  return request('/purchase-agent', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function createPurchaseTxn(payload) {
  return request('/purchase-agent/txn', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function confirmPurchase(payload) {
  return request('/purchase-agent/confirm', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function createSubscriptionTxn(payload) {
  return request('/subscription/txn', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function confirmSubscription(payload) {
  return request('/subscription/confirm', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getMyAgents(wallet, { limit = 50, offset = 0 } = {}) {
  return request(
    `/my-agents?wallet=${encodeURIComponent(wallet)}&limit=${limit}&offset=${offset}`
  )
}

export async function getPurchases(wallet, { limit = 50, offset = 0 } = {}) {
  const walletPart = wallet ? `wallet=${encodeURIComponent(wallet)}&` : ''
  return request(`/purchases?${walletPart}limit=${limit}&offset=${offset}`)
}

export async function runWorkflow(payload) {
  return request('/run-workflow', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getWorkflowRuns(wallet, { limit = 50, offset = 0 } = {}) {
  const walletPart = wallet ? `wallet=${encodeURIComponent(wallet)}&` : ''
  return request(`/workflow-runs?${walletPart}limit=${limit}&offset=${offset}`)
}

export async function getWorkflowRunById(runId) {
  return request(`/workflow-runs/${encodeURIComponent(runId)}`)
}

export async function getUsage(wallet, { limit = 100, offset = 0 } = {}) {
  return request(
    `/usage?wallet=${encodeURIComponent(wallet)}&limit=${limit}&offset=${offset}`
  )
}

export async function getBilling(wallet) {
  return request(`/billing?wallet=${encodeURIComponent(wallet)}`)
}

export async function getCreatorEarnings(wallet) {
  return request(`/creator-earnings?wallet=${encodeURIComponent(wallet)}`)
}
