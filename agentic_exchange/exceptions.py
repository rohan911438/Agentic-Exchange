"""Compatibility wrapper for the public exceptions module."""

from agentic_exchange_sdk.exceptions import (
    AgenticExchangeError,
    AuthenticationError,
    NetworkError,
    RateLimitError,
    ValidationError,
)

__all__ = [
    "AgenticExchangeError",
    "AuthenticationError",
    "NetworkError",
    "RateLimitError",
    "ValidationError",
]
