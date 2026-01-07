import uvicorn
from fastapi import FastAPI, Header, HTTPException
from typing import Annotated
import connection
import requests


app =  FastAPI()

TOKEN_TYPE_IDX = 0
TOKEN_VAL_IDX = 1


@app.get("/hello")
def get_hello():
    return { "msg": "hello" }


@app.get("/check")
def get_check(authorization: Annotated[str | None, Header()]):
    if authorization is None:
        raise ValueError("authorization header not found")
    auth_header: list[str] = authorization.split(" ")
    if authorization.split(" ")[TOKEN_TYPE_IDX] != "Bearer":
        raise HTTPException(400,"{} token type not supported".format(auth_header[0]))

    headers = {
        "Authorization": "Bearer {}".format(auth_header[1])
    }
    res = requests.get("{}/authorize".format(connection.AUTH_URL),headers=headers)

    return res.json()


if __name__ == "__main__":
    print(connection.get_auth_service_url())
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
