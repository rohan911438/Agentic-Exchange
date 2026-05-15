import os
import json
import google.generativeai as genai
from typing import List, Dict, Any
from .database import get_database

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

def get_recommendations(intent: str, wallet: str = None) -> Dict[str, Any]:
    db = get_database()
    
    # 1. Intent Decomposition using Gemini
    prompt = f"""
    You are the Intelligence Layer of 'Agentic Exchange'. 
    User intent: "{intent}"
    
    Decompose this intent into 2-3 specific subtasks that AI agents can perform.
    Return a JSON object with:
    - tasks: list of task descriptions
    - keywords: list of technical keywords for agent matching
    - insights: a brief professional summary of the recommended approach
    """
    
    response = model.generate_content(prompt)
    try:
        # Extract JSON from response text
        text = response.text
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        intel = json.loads(text)
    except:
        intel = {"tasks": [intent], "keywords": intent.split(), "insights": "Analyzing requirements..."}

    # 2. Capability Matching & Ranking
    # Fetch all agents for comparison
    agents = list(db.agents.find({}, {"_id": 0}))
    
    scored_agents = []
    keywords = [k.lower() for k in intel.get("keywords", [])]
    
    for agent in agents:
        score = 0.0
        match_count = 0
        
        # Keyword matching (Semantic proximity proxy)
        name_desc = (agent.get("name", "") + " " + agent.get("description", "")).lower()
        for k in keywords:
            if k in name_desc:
                match_count += 1
        
        # Base relevance score
        score += (match_count / len(keywords)) * 50 if keywords else 0
        
        # Performance/Reputation metrics
        score += agent.get("reputation", 0) * 4  # Max 20 points
        score += agent.get("success_rate", 0) * 20  # Max 20 points
        
        # Popularity bonus
        score += min(agent.get("deployments", 0) / 100, 10) # Max 10 points
        
        agent["recommendation_score"] = round(score, 2)
        scored_agents.append(agent)

    # Sort by score
    scored_agents.sort(key=lambda x: x["recommendation_score"], reverse=True)
    top_agents = scored_agents[:5]

    # 3. Workflow Suggestion (Collaborative Pattern)
    # Mocking historical compatibility for now, would use execution logs in production
    suggested_workflows = []
    if len(top_agents) >= 2:
        suggested_workflows.append({
            "name": f"{top_agents[0]['name']} + {top_agents[1]['name']} Pipeline",
            "description": f"Automated workflow combining {top_agents[0]['name']} for initial processing and {top_agents[1]['name']} for final output.",
            "steps": [top_agents[0]['agent_id'], top_agents[1]['agent_id']],
            "total_estimated_price": (top_agents[0].get('price_microalgos', 0) + top_agents[1].get('price_microalgos', 0)) / 1000000,
            "confidence_score": min(top_agents[0]['recommendation_score'], top_agents[1]['recommendation_score']),
            "compatibility_index": 0.95
        })

    return {
        "intent_id": os.urandom(4).hex(),
        "decomposed_tasks": intel.get("tasks", []),
        "recommended_agents": top_agents,
        "suggested_workflows": suggested_workflows,
        "insights": intel.get("insights", "Based on your goals, we recommend a multi-agent approach.")
    }

def get_related_agents(agent_id: str) -> List[Dict[str, Any]]:
    db = get_database()
    current_agent = db.agents.find_one({"agent_id": agent_id})
    if not current_agent:
        return []
        
    tags = current_agent.get("tags", [])
    related = list(db.agents.find({
        "agent_id": {"$ne": agent_id},
        "tags": {"$in": tags}
    }, {"_id": 0}).limit(4))
    
    return related
