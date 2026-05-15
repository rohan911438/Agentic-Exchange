"""Resilient HTTP API client for the Agentic Exchange SDK."""

import logging
import time
from typing import Any, Dict, Optional, Tuple, Type

import requests
from requests import Session

from .exceptions import (
    AuthenticationError,
    NetworkError,
    RateLimitError,
    ResourceNotFoundError,
    ValidationError,
)
from .utils import exponential_backoff_retry

# Configure default logger
logger = logging.getLogger("agentic_exchange")


class ApiClient:
    """Internal client handling HTTP communication, retries, and error mapping."""

    def __init__(
        self, 
        api_key: str, 
        base_url: str = "http://127.0.0.1:8000", 
        timeout: int = 30,
        debug: bool = False
    ):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.debug = debug
        self.session: Session = requests.Session()
        
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "AgenticExchange-PythonSDK/0.1.0"
        })
        
        if self.debug:
            logger.setLevel(logging.DEBUG)

    def _url(self, path: str) -> str:
        # Ensure path starts with /
        if not path.startswith("/"):
            path = f"/{path}"
        return f"{self.base_url}{path}"

    @exponential_backoff_retry(
        retries=3,
        initial_delay=1.0,
        factor=2.0,
        allowed_exceptions=(requests.RequestException, NetworkError),
    )
    def request(
        self, 
        method: str, 
        path: str, 
        json: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Perform an HTTP request with automatic retries and error handling."""
        url = self._url(path)
        if self.debug:
            logger.debug(f"Request: {method} {url} | Params: {params} | Body: {json}")

        try:
            resp = self.session.request(
                method=method,
                url=url,
                json=json,
                params=params,
                timeout=self.timeout
            )
            return self._handle_response(resp)
        except requests.Timeout as e:
            logger.error(f"Timeout connecting to {url}")
            raise NetworkError(f"Request timed out after {self.timeout}s", e)
        except requests.RequestException as e:
            logger.error(f"Network error: {e}")
            raise NetworkError("Failed to connect to Agentic Exchange API", e)

    def _handle_response(self, resp: requests.Response) -> Dict[str, Any]:
        """Maps HTTP status codes to custom SDK exceptions."""
        status = resp.status_code
        
        try:
            payload = resp.json()
        except ValueError:
            payload = {"detail": resp.text}

        if self.debug:
            logger.debug(f"Response: {status} | Payload: {payload}")

        if 200 <= status < 300:
            return payload

        error_msg = payload.get("detail", payload.get("message", "An unexpected error occurred"))
        
        if status == 401:
            raise AuthenticationError(f"Authentication failed: {error_msg}", payload)
        if status == 404:
            raise ResourceNotFoundError(f"Resource not found: {error_msg}", payload)
        if status == 422:
            raise ValidationError(f"Invalid request parameters: {error_msg}", payload)
        if status == 429:
            raise RateLimitError(f"Rate limit exceeded: {error_msg}", payload)
        if status >= 500:
            raise NetworkError(f"Server error (HTTP {status}): {error_msg}")
            
        raise NetworkError(f"Unexpected HTTP {status}: {error_msg}", payload)

    def get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self.request("GET", path, params=params)

    def post(self, path: str, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self.request("POST", path, json=json)

    def patch(self, path: str, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self.request("PATCH", path, json=json)
