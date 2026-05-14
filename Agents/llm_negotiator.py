import os
import re
import warnings
from dotenv import load_dotenv

warnings.filterwarnings(
    "ignore",
    message=r"All support for the `google\.generativeai` package has ended.*",
    category=FutureWarning,
)

import google.generativeai as genai

# Ensure .env is loaded even if this module is imported early
load_dotenv()

# Setup Gemini API (support both env var names)
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# A default model to be used
# It might require configuration based on the user's specific gemini setup
try:
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception:
    model = None

def call_gemini(prompt: str) -> str:
    """Calls Gemini API with the given prompt."""
    try:
        # Lazy-configure in case env was loaded after import
        global model
        if not api_key:
            key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
            if key:
                genai.configure(api_key=key)
        if model is None:
            model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text
    except Exception as e:
        print(f"Error calling Gemini: {e}")
    # Return a fallback format if it fails for testing
    return "MESSAGE: Error calling LLM\nPRICE: 0"
