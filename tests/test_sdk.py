import pytest
from unittest.mock import MagicMock, patch
from agentic_exchange import AgenticClient
from agentic_exchange.exceptions import AuthenticationError, ResourceNotFoundError

@pytest.fixture
def client():
    return AgenticClient(api_key="test_key", base_url="http://mock-api")

@patch("requests.Session.request")
def test_list_agents(mock_request, client):
    # Mock successful response
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "items": [
            {"agent_id": "a1", "name": "Agent 1", "category": "Data", "description": "Desc", "price_microalgos": 1000}
        ]
    }
    mock_request.return_value = mock_resp

    agents = client.list_agents()
    assert len(agents) == 1
    assert agents[0].name == "Agent 1"
    assert agents[0].price_microalgos == 1000

@patch("requests.Session.request")
def test_auth_error(mock_request, client):
    # Mock 401 error
    mock_resp = MagicMock()
    mock_resp.status_code = 401
    mock_resp.json.return_value = {"detail": "Invalid key"}
    mock_request.return_value = mock_resp

    with pytest.raises(AuthenticationError):
        client.get_agent("a1")

@patch("requests.Session.request")
def test_not_found_error(mock_request, client):
    # Mock 404 error
    mock_resp = MagicMock()
    mock_resp.status_code = 404
    mock_resp.json.return_value = {"detail": "Not found"}
    mock_request.return_value = mock_resp

    with pytest.raises(ResourceNotFoundError):
        client.get_agent("unknown")

@patch("requests.Session.request")
def test_run_workflow(mock_request, client):
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "run": {
            "run_id": "r1",
            "status": "completed",
            "wallet": "w1",
            "cost": 500,
            "runtime_ms": 100,
            "final_output": {"result": "Done"}
        }
    }
    mock_request.return_value = mock_resp

    run = client.run_workflow(steps=["a1", "a2"], input_data={"p": "1"})
    assert run.run_id == "r1"
    assert run.status == "completed"
    assert run.final_output["result"] == "Done"
