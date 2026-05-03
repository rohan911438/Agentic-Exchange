"""Compatibility package for the Agentic Exchange SDK.

This project stores the implementation in `agentic_exchange_sdk`, but the
public import path used by tests and users is `agentic_exchange`.
"""

from agentic_exchange_sdk import AgenticClient

__all__ = ["AgenticClient"]
