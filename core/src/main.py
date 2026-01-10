import uvicorn
from fastapi import FastAPI, Header, HTTPException, Request, Response
from typing import Annotated
from sqlalchemy import insert, select
import connection
import models
import requests
import loader


app =  FastAPI()

TOKEN_TYPE_IDX = 0
TOKEN_VAL_IDX = 1


@app.get("/hello")
def get_hello():
    return { "msg": "hello" }


@app.middleware("http")
async def token_verification(req: Request, next):
    token_header = req.headers["Authorization"]
    if token_header is None:
        raise HTTPException(400,"authorization header not found")
    token_header_splitted: list[str] = token_header.split(" ")
    if token_header_splitted[TOKEN_TYPE_IDX] != "Bearer":
        raise HTTPException(400,"{} token type not supported".format(token_header_splitted[TOKEN_TYPE_IDX]))

    headers = {
        "Authorization": "Bearer {}".format(token_header_splitted[TOKEN_VAL_IDX])
    }
    auth_res = requests.get("{}/authorize".format(connection.AUTH_URL),headers=headers)
    if not auth_res.ok:
        return Response(status_code=auth_res.status_code,headers=auth_res.headers,content=auth_res.content)
    return await next(req)


@app.get("/vehicletype")
def get_vehicletype():
    with connection.ENGINE.connect() as conn:
        sel = select(models.VehicleType)
        res = conn.execute(sel).fetchall()
        if len(res) == 0:
            raise HTTPException(404,"Failed to find any vehicle types")
        res = [models.VehicleTypeRec(*x) for x in res]
        return res


def load_data() -> None:
    vehicle_type_data = loader.load_csv("vehicletype.csv")
    with connection.ENGINE.connect() as conn:
        conn.execute(insert(models.VehicleType).values(vehicle_type_data))
        conn.commit()


if __name__ == "__main__":
    models.init_db(connection.ENGINE)
    load_data()
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
