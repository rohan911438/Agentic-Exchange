"""Custom exception hierarchy for the Agentic Exchange SDK."""

from typing import Optional, Any


class AgenticExchangeError(Exception):
    """Base class for all Agentic Exchange SDK errors."""
    def __init__(self, message: str, raw_response: Optional[Any] = None):
        super().__init__(message)
        self.raw_response = raw_response


class AuthenticationError(AgenticExchangeError):
    """Raised when API key is invalid or authentication fails (HTTP 401)."""
    pass


class RateLimitError(AgenticExchangeError):
    """Raised when the API rate limit is exceeded (HTTP 429)."""
    pass


class ValidationError(AgenticExchangeError):
    """Raised when request parameters are malformed or invalid (HTTP 422)."""
    pass


class WorkflowExecutionError(AgenticExchangeError):
    """Raised when a multi-agent workflow fails during execution."""
    pass


class NetworkError(AgenticExchangeError):
    """Raised when a network-level error occurs (DNS, timeout, etc)."""
    def __init__(self, message: str, inner: Optional[Exception] = None):
        super().__init__(message)
        self.inner = inner


class ResourceNotFoundError(AgenticExchangeError):
    """Raised when a requested resource (Agent, Workflow) does not exist (HTTP 404)."""
    pass
