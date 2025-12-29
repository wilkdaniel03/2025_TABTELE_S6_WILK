from fastapi import FastAPI, Header, HTTPException
import sqlalchemy
import uvicorn
import jwt
import base64
import time
from typing import Annotated, Dict
import os
from dataclasses import dataclass
import connection
import models

secret = bytes(32)
app = FastAPI()
algorithm = "HS256"
token_store: Dict[int,str] = dict()

# Hard coded user id
user_id: int = 1203129321

# Two hours
expiration_time: int = 3600 * 2

@dataclass
class UserLoginDto:
    username: str
    password: str

@app.post("/token")
def get_token(body: UserLoginDto):
    if body.username != "John" or body.password != "doe":
        raise HTTPException(404,"Failed to find user with provided username and passowrd")
    now = time.time()
    payload = { "iss": user_id, "sub": "Daniel Wilk", "iat": now, "exp": now + expiration_time }
    token = jwt.encode(payload,secret,algorithm)
    token_store[user_id] = token
    return { "token": token }

@app.get("/authorize")
def get_authorize(authorization: Annotated[str | None, Header()]):
    if authorization is None:
        raise HTTPException(400,"Failed to parse authorize header")
    authorization_parts = authorization.split(" ")
    if authorization_parts[0] != "Bearer":
        raise HTTPException(400,"Invalid token format {}. Should be Bearer".format(authorization_parts[0]))
    try:
        jwt.decode(authorization_parts[1],secret,algorithm)
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(401,"Provided token is expired")
    except:
        raise HTTPException(400,"Invalid token provided")
    return { "status": 200 }

def load_secret(path: str) -> bytes:
    with open(path,"r") as file:
        data = file.read()
        secret = base64.b64decode(data)
        return secret

if __name__ == "__main__":
    engine = sqlalchemy.create_engine(connection.get_db_url())
    models.init_db(engine)
    os.environ.setdefault("PORT","8080")
    PORT = os.environ.get("PORT")
    if PORT is None:
        raise ValueError("Failed to parse PORT env")
    secret = load_secret("secret")
    uvicorn.run("main:app",port=int(PORT),host="0.0.0.0")
