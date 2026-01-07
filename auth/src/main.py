from fastapi import FastAPI, Header, HTTPException
import sqlalchemy
from sqlalchemy import insert, select, func
import uvicorn
import jwt
import base64
import time
from typing import Annotated, Dict
import os
from dataclasses import dataclass, asdict
import connection
import models
import loader


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


@dataclass
class TokenData:
    uid: int
    username: str


@app.post("/token")
def get_token(body: UserLoginDto):
    with connection.ENGINE.connect() as conn:
        sel = select(models.User.user_id,models.User.username).select_from(models.Person).join(models.User).where(sqlalchemy.and_(models.User.username == body.username,models.User.password == body.password))
        res = conn.execute(sel).fetchone()
        found = False
        found_user_id = 0
        found_username = ''
        if res is not None:
            found = True
            found_user_id = res[0]
            found_username = res[1]

        if not found:
            raise HTTPException(404,"Failed to find user with provided username and passowrd")
        now = time.time()
        payload = { "iss": found_user_id, "sub": found_username, "iat": now, "exp": now + expiration_time }
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
        token: dict = jwt.decode(authorization_parts[1],secret,algorithm)
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(401,"Provided token is expired")
    except:
        raise HTTPException(400,"Invalid token provided")
    token_fields = ["iss","sub"]
    token_has_fields = [k in token.keys() for k in token_fields]
    if not all(token_has_fields):
        raise HTTPException(500,"Failed to read token")
    token_data = TokenData(*(token[k] for k in token_fields))
    return asdict(token_data)


@app.get("/role/{user_id}")
def get_user_role(user_id: int):
    with connection.ENGINE.connect() as conn:
        sel = select(models.Role.name).where(models.Role.user_id == user_id)
        res = conn.execute(sel).fetchone()
        if res is None:
            raise HTTPException(404,"failed to find role for user id {}".format(user_id))
        return { "role": res[0] }


def load_secret(path: str) -> bytes:
    with open(path,"r") as file:
        data = file.read()
        secret = base64.b64decode(data)
        return secret


if __name__ == "__main__":
    models.init_db(connection.ENGINE)
    with connection.ENGINE.connect() as conn:
        user_data = loader.load_csv("user.csv")
        conn.execute(insert(models.User).values(user_data))
        person_data = loader.load_csv("person.csv")
        conn.execute(insert(models.Person).values(person_data))
        role_data = loader.load_csv("role.csv")
        conn.execute(insert(models.Role).values(role_data))
        conn.commit()
    os.environ.setdefault("PORT","8080")
    PORT = os.environ.get("PORT")
    if PORT is None:
        raise ValueError("Failed to parse PORT env")
    secret = load_secret("secret")
    uvicorn.run("main:app",port=int(PORT),host="0.0.0.0")
