"""Utility helpers: retries, backoff, serialization, logging hooks."""
import time
import logging
from functools import wraps
from typing import Callable, Any, Tuple

logger = logging.getLogger("agentic_exchange")
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
handler.setFormatter(formatter)
if not logger.handlers:
    logger.addHandler(handler)
logger.setLevel(logging.INFO)


def exponential_backoff_retry(
    retries: int = 3, initial_delay: float = 0.5, factor: float = 2.0, allowed_exceptions: Tuple = (Exception,)
) -> Callable:
    """Decorator to retry a function with exponential backoff.

    Usage:
        @exponential_backoff_retry(retries=3)
        def call(): ...
    """

    def deco(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            last_exc = None
            for attempt in range(1, retries + 1):
                try:
                    return func(*args, **kwargs)
                except allowed_exceptions as exc:
                    last_exc = exc
                    logger.debug("Attempt %s failed: %s", attempt, exc)
                    if attempt == retries:
                        logger.debug("Max retries reached")
                        raise
                    time.sleep(delay)
                    delay *= factor
            raise last_exc

        return wrapper

    return deco


def format_money(amount: float) -> str:
    return f"{amount:.2f}"
