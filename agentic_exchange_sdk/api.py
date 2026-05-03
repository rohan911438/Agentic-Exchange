"""HTTP API client layer for Agentic Exchange SDK."""
from typing import Any, Dict, Optional
import requests
from requests import Session
from .exceptions import AuthenticationError, RateLimitError, NetworkError, ValidationError
from .utils import exponential_backoff_retry, logger


class ApiClient:
    def __init__(self, api_key: str, base_url: str = "https://api.agentic.exchange", timeout: int = 15):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session: Session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        })

    def _url(self, path: str) -> str:
        return f"{self.base_url}{path}"

    @exponential_backoff_retry(retries=3, initial_delay=0.5, factor=2.0, allowed_exceptions=(requests.RequestException,))
    def post(self, path: str, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        url = self._url(path)
        try:
            resp = self.session.post(url, json=json, timeout=self.timeout)
        except requests.RequestException as e:
            logger.debug("Network error posting to %s: %s", url, e)
            raise NetworkError("Network error", e)
        return self._handle_response(resp)

    @exponential_backoff_retry(retries=3, initial_delay=0.5, factor=2.0, allowed_exceptions=(requests.RequestException,))
    def get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        url = self._url(path)
        try:
            resp = self.session.get(url, params=params, timeout=self.timeout)
        except requests.RequestException as e:
            logger.debug("Network error getting %s: %s", url, e)
            raise NetworkError("Network error", e)
        return self._handle_response(resp)

    def _handle_response(self, resp: requests.Response) -> Dict[str, Any]:
        status = resp.status_code
        try:
            payload = resp.json()
        except ValueError:
            payload = {"message": resp.text}

        if status == 401:
            raise AuthenticationError(payload.get("message", "Unauthorized"))
        if status == 422:
            raise ValidationError(payload.get("message", "Validation error"))
        if status == 429:
            raise RateLimitError(payload.get("message", "Rate limited"))
        if status >= 400:
            raise NetworkError(f"HTTP {status}: {payload}")

        return payload
