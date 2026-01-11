import uvicorn
from fastapi import FastAPI, Header, HTTPException, Request, Response
from typing import Annotated
from sqlalchemy import insert, select, delete
from dataclasses import asdict
import connection
import models
import requests
import loader
import json


app =  FastAPI()

TOKEN_TYPE_IDX = 0
TOKEN_VAL_IDX = 1


@app.get("/hello")
def get_hello():
    return { "msg": "hello" }


@app.middleware("http")
async def token_verification(req: Request, next):
    if "authorization" not in req.headers.keys():
        return Response(status_code=400,headers={"Content-Type":"application/json"},content=json.dumps({"detail":"authorization header not found"}))
    token_header = req.headers["Authorization"]
    token_header_splitted: list[str] = token_header.split(" ")
    if token_header_splitted[TOKEN_TYPE_IDX] != "Bearer":
        return Response(status_code=400,headers={"Content-Type":"application/json"},content=json.dumps({"detail":"{} token type not supported".format(token_header_splitted[TOKEN_TYPE_IDX])}))

    headers = {
        "Authorization": "Bearer {}".format(token_header_splitted[TOKEN_VAL_IDX])
    }
    auth_res = requests.get("{}/authorize".format(connection.AUTH_URL),headers=headers)
    if not auth_res.ok:
        return Response(status_code=auth_res.status_code,headers=auth_res.headers,content=auth_res.content)

    req.state.myObject = auth_res.json()["uid"]
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


@app.post("/vehicletype")
def post_vehicletype(req: Request, body: models.VehicleTypeDto):
    role_res = requests.get("{}/role/{}".format(connection.AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with connection.ENGINE.connect() as conn:
        try:
            conn.execute(insert(models.VehicleType).values(asdict(body)))
            conn.commit()
        except:
            raise HTTPException(400,"Failed to insert provided vehicletype")
        else:
            return {"status":200}


@app.delete("/vehicletype/{vid}")
def delete_vehicletype(req: Request, vid: int):
    role_res = requests.get("{}/role/{}".format(connection.AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with connection.ENGINE.connect() as conn:
        conn.execute(delete(models.VehicleType).where(models.VehicleType.vehtype_id == vid))
        conn.commit()
        return {"status":200}


def load_data() -> None:
    vehicle_type_data = loader.load_csv("vehicletype.csv")
    with connection.ENGINE.connect() as conn:
        conn.execute(insert(models.VehicleType).values(vehicle_type_data))
        conn.commit()


if __name__ == "__main__":
    models.init_db(connection.ENGINE)
    load_data()
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
