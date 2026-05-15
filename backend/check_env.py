import os
from dotenv import load_dotenv

load_dotenv()
print(f"CONTRACT_APP_ID: {os.getenv('CONTRACT_APP_ID')}")
print(f"MARKETPLACE_APP_ID: {os.getenv('MARKETPLACE_APP_ID')}")
