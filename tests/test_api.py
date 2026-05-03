import json
import requests

from agentic_exchange.api import ApiClient
from agentic_exchange.exceptions import AuthenticationError, ValidationError, RateLimitError


def make_response(status: int, body: dict) -> requests.Response:
    r = requests.Response()
    r.status_code = status
    r._content = json.dumps(body).encode("utf-8")
    r.headers["Content-Type"] = "application/json"
    return r


def test_handle_response_auth():
    client = ApiClient(api_key="x")
    resp = make_response(401, {"message": "Unauthorized"})
    try:
        client._handle_response(resp)
        assert False, "Expected AuthenticationError"
    except AuthenticationError:
        pass


def test_handle_response_validation():
    client = ApiClient(api_key="x")
    resp = make_response(422, {"message": "Invalid"})
    try:
        client._handle_response(resp)
        assert False, "Expected ValidationError"
    except ValidationError:
        pass


def test_handle_response_rate_limit():
    client = ApiClient(api_key="x")
    resp = make_response(429, {"message": "Too many"})
    try:
        client._handle_response(resp)
        assert False, "Expected RateLimitError"
    except RateLimitError:
        pass
