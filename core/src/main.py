import uvicorn
from fastapi import FastAPI, Header, HTTPException, Request, Response
from typing import Annotated, Any
from sqlalchemy import insert, select, delete, text
from dataclasses import asdict
import shared.models as models
import shared.connection as connection
import requests
import json
import websockets.sync.client as websockets


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
        with websockets.connect("{}/internal".format(connection.GATEWAY_URL)) as conn:
            conn.send("delete,vehicle")
        return {"status":200}


@app.get("/vehicle")
def get_vehicle():
    with connection.ENGINE.connect() as conn:
        sel = select(models.Vehicle)
        vehicle_res = conn.execute(sel).fetchall()
        if len(vehicle_res) == 0:
            raise HTTPException(404,"Failed to find any vehicles")
        vehicles = [x[:-1] for x in vehicle_res]
        vehtype_ids = [x[-1] for x in vehicle_res]

        sel = select(models.VehicleType)
        vehtype_res = conn.execute(sel).fetchall()
        if len(vehtype_res) == 0:
            raise HTTPException(404,"Failed to find any vehicle types")
        vehtypes = [models.VehicleTypeRec(*x) for x in vehtype_res]

        res = []
        for i in range(len(vehicle_res)):
            vehtype_id = vehtype_ids[i] - 1
            res.append(models.VehicleRec(*vehicles[i],vehtypes[vehtype_id])) # type: ignore

        return res


@app.post("/vehicle")
def post_vehicle(req: Request, body: models.VehicleDto):
    role_res = requests.get("{}/role/{}".format(connection.AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with connection.ENGINE.connect() as conn:
        try:
            conn.execute(insert(models.Vehicle).values(asdict(body)))
            conn.commit()
        except:
            raise HTTPException(400,"Failed to insert provided vehicle")
        else:
            return {"status":200}


@app.delete("/vehicle/{vid}")
def delete_vehicle(req: Request, vid: int):
    role_res = requests.get("{}/role/{}".format(connection.AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with connection.ENGINE.connect() as conn:
        conn.execute(delete(models.Vehicle).where(models.Vehicle.veh_id == vid))
        conn.commit()
        with websockets.connect("{}/internal".format(connection.GATEWAY_URL)) as conn:
            conn.send("delete,vehicle")
        return {"status":200}


@app.get("/employee")
def get_employee():
    with connection.ENGINE.connect() as conn:
        res = conn.execute(text("SELECT user.user_id,person.name,person.surname FROM user JOIN person ON user.user_id = person.user_id JOIN role ON user.user_id = role.user_id WHERE role.name = \"agent\"")).fetchall();
        if len(res) == 0:
            raise HTTPException(404,"Failed to find any employees")
        employees = [models.EmployeeRec(*x) for x in res]
        return employees


@app.get("/reservation")
def get_reservation():
    with connection.ENGINE.connect() as conn:
        reservation_res = conn.execute(select(models.Reservation)).fetchall()
        if len(reservation_res) == 0:
            raise HTTPException(404,"Failed to find any reservations")

        vehicles = []
        for i in range(len(reservation_res)):
            vehicle_res = conn.execute(select(models.VehicleType.brand,models.VehicleType.model).select_from(models.Vehicle).join(models.VehicleType,onclause=models.Vehicle.vehtype_id == models.VehicleType.vehtype_id).where(models.Vehicle.veh_id == reservation_res[i][-1])).fetchone()
            if vehicle_res is None:
                raise HTTPException(404,"Failed to find given vehicle")
            vehicles.append("{} {}".format(vehicle_res[0],vehicle_res[1]))

        employees = []
        for i in range(len(reservation_res)):
            employee_res = conn.execute(text("SELECT person.name,person.surname FROM user JOIN person ON person.user_id = user.user_id WHERE user.user_id = {}".format(reservation_res[i][-2]))).fetchone()
            if employee_res is None:
                raise HTTPException(404,"Failed to find given employee")
            employees.append("{} {}".format(employee_res[0],employee_res[1]))

        res = [models.ReservationRec(*reservation_res[i][:-2],employees[i],vehicles[i]) for i in range(len(reservation_res))]
        return res


if __name__ == "__main__":
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
