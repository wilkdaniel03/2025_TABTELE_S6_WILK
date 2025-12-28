from fastapi import FastAPI, Header, HTTPException
import uvicorn
import jwt
import base64
import time
from typing import Annotated, Dict
import os

secret = bytes(32)
app = FastAPI()
algorithm = "HS256"
token_store: Dict[int,str] = dict()

user_id: int = 1203129321

@app.get("/token")
def get_token():
    now = time.time()
    payload = { "iss": user_id, "sub": "Daniel Wilk", "iat": now, "exp": now + 300 }
    token = jwt.encode(payload,secret,algorithm)
    token_store[user_id] = token
    return { "token": token }

def load_secret(path: str) -> bytes:
    with open(path,"r") as file:
        data = file.read()
        secret = base64.b64decode(data)
        return secret

if __name__ == "__main__":
    os.environ.setdefault("PORT","8080")
    PORT = os.environ.get("PORT")
    if PORT is None:
        raise ValueError("Failed to parse PORT env")
    secret = load_secret("secret")
    uvicorn.run("main:app",port=int(PORT))
