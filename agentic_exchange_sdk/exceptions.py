"""SDK exception types."""
from typing import Optional


class AgenticExchangeError(Exception):
    """Base SDK error."""


class AuthenticationError(AgenticExchangeError):
    pass


class RateLimitError(AgenticExchangeError):
    pass


class ValidationError(AgenticExchangeError):
    pass


class NetworkError(AgenticExchangeError):
    def __init__(self, message: str, inner: Optional[Exception] = None):
        super().__init__(message)
        self.inner = inner
