class AgenticApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'AgenticApiError';
    this.status = status;
    this.details = details;
  }
}

class AgenticClient {
  constructor({ apiKey, baseUrl = 'https://agentic-exchange.onrender.com', timeoutMs = 30000 } = {}) {
    if (!apiKey) {
      throw new Error('apiKey is required');
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeoutMs = timeoutMs;
  }

  async _request(path, { method = 'GET', body, params } = {}) {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });

      const text = await response.text();
      const payload = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new AgenticApiError(
          payload?.detail || payload?.message || `Request failed with status ${response.status}`,
          response.status,
          payload
        );
      }

      return payload;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new AgenticApiError(`Request timed out after ${this.timeoutMs}ms`, 408, null);
      }
      if (error instanceof AgenticApiError) {
        throw error;
      }
      throw new AgenticApiError(error.message || 'Network request failed', 0, null);
    } finally {
      clearTimeout(timeout);
    }
  }

  async listAgents({ limit = 50, offset = 0 } = {}) {
    const response = await this._request('/agents', { params: { limit, offset } });
    return response?.items || [];
  }

  async getAgent(agentId) {
    if (!agentId) throw new Error('agentId is required');
    return this._request(`/agents/${agentId}`);
  }

  async getAgentReputation(agentId) {
    if (!agentId) throw new Error('agentId is required');
    return this._request(`/agent-reputation/${agentId}`);
  }

  async recommendAgents({ intent, limit = 3 } = {}) {
    if (!intent) throw new Error('intent is required');
    const response = await this._request('/top-performing-agents', { params: { limit } });
    return Array.isArray(response) ? response : response?.items || [];
  }

  async runWorkflow({ steps, input = {}, wallet = 'SDK_DEFAULT_WALLET' } = {}) {
    if (!Array.isArray(steps) || steps.length === 0) {
      throw new Error('steps must be a non-empty array of agent IDs');
    }
    const response = await this._request('/run-workflow', {
      method: 'POST',
      body: { steps, input, wallet }
    });
    return response?.run || response;
  }

  async getWorkflowStatus(runId) {
    if (!runId) throw new Error('runId is required');
    return this._request(`/workflow-runs/${runId}`);
  }

  async estimateExecutionCost({ steps } = {}) {
    if (!Array.isArray(steps) || steps.length === 0) {
      throw new Error('steps must be a non-empty array of agent IDs');
    }

    let totalMicroalgos = 0;
    for (const agentId of steps) {
      const agent = await this.getAgent(agentId);
      totalMicroalgos += Number(agent?.price_microalgos || 0);
    }

    return {
      steps: steps.length,
      total_microalgos: totalMicroalgos,
      total_algo: totalMicroalgos / 1_000_000,
      currency: 'ALGO'
    };
  }
}

export { AgenticClient, AgenticApiError };
