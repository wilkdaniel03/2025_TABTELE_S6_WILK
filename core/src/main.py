import uvicorn
from fastapi import FastAPI, Header, HTTPException
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
