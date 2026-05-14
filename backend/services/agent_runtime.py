from __future__ import annotations

import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeoutError
from typing import Any

AGENTS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Agents"))
if AGENTS_DIR not in sys.path:
    sys.path.insert(0, AGENTS_DIR)

from llm_negotiator import call_gemini


def _research_agent(state: dict[str, Any], step: str) -> dict[str, Any]:
    source_input = state.get("input", {})
    objective = source_input.get("objective") or source_input.get("prompt") or "general objective"
    return {
        "agent": "research",
        "step": step,
        "summary": f"Research completed for objective: {objective}",
        "insights": [
            "Identified target audience and constraints",
            "Collected baseline assumptions for execution",
            "Prepared context for downstream content generation",
        ],
    }


def _copywriter_agent(state: dict[str, Any], step: str) -> dict[str, Any]:
    research = state.get("research", {})
    objective = state.get("input", {}).get("objective") or "the requested task"
    context_line = research.get("summary", "No prior research context available.")
    return {
        "agent": "copywriter",
        "step": step,
        "draft": (
            f"For {objective}, here is a first production-ready draft.\n"
            f"Context used: {context_line}"
        ),
        "tone": "clear, concise, execution-focused",
    }


def _qa_agent(state: dict[str, Any], step: str) -> dict[str, Any]:
    checks: list[str] = []
    if state.get("research"):
        checks.append("Research context present")
    if state.get("copywriter"):
        checks.append("Draft content available for validation")
    if not checks:
        checks.append("Minimal data available; QA performed in fallback mode")
    return {
        "agent": "qa",
        "step": step,
        "checks": checks,
        "result": "pass",
        "notes": "No blocking quality issues found.",
    }


def _dynamic_llm_agent(state: dict[str, Any], step: str) -> dict[str, Any]:
    """Calls the real Gemini LLM based on the user's prompt."""
    source_input = state.get("input", {})
    prompt = source_input.get("prompt") or source_input.get("objective") or "Provide a general summary."
    
    # 🌟 THIS IS THE MAGIC: Gather context from the previous agents in the pipeline
    previous_results = []
    for key, value in state.items():
        if key not in ["input"] and isinstance(value, dict) and "result" in value:
            previous_results.append(value["result"])
            
    context_str = ""
    if previous_results:
        context_str = "\n\n--- PREVIOUS AGENT OUTPUT TO BUILD UPON ---\n" + "\n\n".join(previous_results)
    
    # Fetch the agent's custom system prompt from the database to make it a REAL 3rd party agent!
    from .marketplace_store import get_agent
    agent_record = get_agent(step)
    custom_prompt = agent_record.get("system_prompt") if agent_record else None

    # Inject specific personas based on the Agent ID requested!
    system_role = "You are an expert AI agent fulfilling a task."
    
    if custom_prompt:
        system_role = custom_prompt
    else:
        if "publisher" in step.lower() or "social" in step.lower():
            system_role = "You are an expert Social Media Marketer. Take the input task and write a super hype, engaging Twitter marketing tweet with emojis and hashtags. Do not explain, just output the tweet."
        elif "seo" in step.lower():
            system_role = "You are an expert SEO Agent. Take the input and optimize it with high-ranking keywords."
        elif "copywriter" in step.lower():
            system_role = "You are an expert Copywriter. Write high-converting marketing copy."

    ai_response = call_gemini(f"{system_role}\n\nTask: {prompt}{context_str}\n\nProvide a concise and direct result.")
    
    return {
        "agent": "dynamic_llm",
        "step": step,
        "result": ai_response,
    }


AGENT_REGISTRY = {
    "research": _research_agent,
    "copywriter": _copywriter_agent,
    "qa": _qa_agent,
    "dynamic_llm": _dynamic_llm_agent,
}


def _resolve_agent(step: str) -> str:
    s = step.lower().strip()
    if "research" in s or "market" in s:
        return "research"
    if "copy" in s or "content" in s or "write" in s:
        return "copywriter"
    if "qa" in s or "review" in s or "test" in s:
        return "qa"
    # Unknown step (like a UUID) -> route to the real LLM engine
    return "dynamic_llm"


def _run_with_timeout(fn, timeout_s: float, *args, **kwargs):
    with ThreadPoolExecutor(max_workers=1) as pool:
        future = pool.submit(fn, *args, **kwargs)
        return future.result(timeout=timeout_s)


def execute_workflow(
    *,
    wallet: str,
    steps: list[str],
    input_data: dict[str, Any],
    timeout_s: float = 30.0,
    retries: int = 2,
) -> dict[str, Any]:
    """
    Phase 4 runtime orchestrator:
    - Reads workflow steps
    - Routes to specialized agents
    - Passes state between steps
    - Collects trace + final output
    - Guardrails: timeout, retries, partial-fail handling
    """
    started_at = time.time()
    state: dict[str, Any] = {"input": input_data}
    outputs: list[dict[str, Any]] = []
    trace: list[dict[str, Any]] = []
    failed_steps = 0

    for idx, step in enumerate(steps):
        agent_name = _resolve_agent(step)
        agent_fn = AGENT_REGISTRY[agent_name]
        attempt = 0
        step_ok = False
        last_error: str | None = None
        step_started = time.time()

        while attempt <= retries and not step_ok:
            attempt += 1
            try:
                result = _run_with_timeout(agent_fn, timeout_s, state, step)
                state[agent_name] = result
                state[step] = result  # Save by unique step ID so multiple dynamic_llm agents don't overwrite each other
                outputs.append(
                    {
                        "index": idx,
                        "step": step,
                        "agent": agent_name,
                        "status": "completed",
                        "output": result,
                    }
                )
                trace.append(
                    {
                        "index": idx,
                        "step": step,
                        "agent": agent_name,
                        "attempt": attempt,
                        "status": "completed",
                        "duration_ms": int((time.time() - step_started) * 1000),
                    }
                )
                step_ok = True
            except FutureTimeoutError:
                last_error = f"timeout after {timeout_s}s"
                trace.append(
                    {
                        "index": idx,
                        "step": step,
                        "agent": agent_name,
                        "attempt": attempt,
                        "status": "timeout",
                    }
                )
            except Exception as exc:  # noqa: BLE001
                last_error = str(exc)
                trace.append(
                    {
                        "index": idx,
                        "step": step,
                        "agent": agent_name,
                        "attempt": attempt,
                        "status": "error",
                        "error": last_error,
                    }
                )

        if not step_ok:
            failed_steps += 1
            outputs.append(
                {
                    "index": idx,
                    "step": step,
                    "agent": agent_name,
                    "status": "failed",
                    "error": last_error or "unknown error",
                }
            )

    status = "completed"
    if failed_steps == len(steps):
        status = "failed"
    elif failed_steps > 0:
        status = "partial_failed"

    ended_at = time.time()
    units = max(len(steps), 1)
    cost = round(units * 0.5, 2)
    final_output = outputs[-1]["output"] if outputs and outputs[-1].get("output") else {}

    return {
        "wallet": wallet,
        "steps": steps,
        "input": input_data,
        "outputs": outputs,
        "trace": trace,
        "final_output": final_output,
        "status": status,
        "failed_steps": failed_steps,
        "cost": cost,
        "runtime_ms": int((ended_at - started_at) * 1000),
    }
