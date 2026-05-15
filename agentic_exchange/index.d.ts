export type Agent = {
  agent_id: string;
  name: string;
  category?: string;
  description?: string;
  price_microalgos?: number;
  owner_wallet?: string;
  status?: string;
  capabilities?: string[];
  [key: string]: unknown;
};

export type WorkflowRun = {
  run_id?: string;
  status: string;
  wallet?: string;
  cost?: number;
  runtime_ms?: number;
  steps?: string[];
  input?: Record<string, unknown>;
  outputs?: Record<string, unknown>[];
  final_output?: Record<string, unknown>;
  trace?: Record<string, unknown>[];
  [key: string]: unknown;
};

export type AgentReputation = {
  reputation_score?: number;
  metrics?: Record<string, unknown>;
  trust_indicators?: Record<string, unknown>;
  [key: string]: unknown;
};

export class AgenticApiError extends Error {
  status: number;
  details: unknown;
  constructor(message: string, status: number, details: unknown);
}

export class AgenticClient {
  constructor(config: {
    apiKey: string;
    baseUrl?: string;
    timeoutMs?: number;
  });

  listAgents(args?: { limit?: number; offset?: number }): Promise<Agent[]>;
  getAgent(agentId: string): Promise<Agent>;
  getAgentReputation(agentId: string): Promise<AgentReputation>;
  recommendAgents(args: { intent: string; limit?: number }): Promise<Agent[]>;
  runWorkflow(args: {
    steps: string[];
    input?: Record<string, unknown>;
    wallet?: string;
  }): Promise<WorkflowRun>;
  getWorkflowStatus(runId: string): Promise<WorkflowRun>;
  estimateExecutionCost(args: {
    steps: string[];
  }): Promise<{
    steps: number;
    total_microalgos: number;
    total_algo: number;
    currency: 'ALGO';
  }>;
}
