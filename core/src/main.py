import uvicorn
from fastapi import FastAPI, Header, HTTPException, Request, Response
from typing import Annotated, Any, Dict, Union
import sqlalchemy
from sqlalchemy import insert, select, delete, update
from dataclasses import asdict
import shared.models as models
import shared.connection as connection
import requests
import json
import websockets.sync.client as websockets


ENGINE = sqlalchemy.create_engine(connection.get_db_url())
AUTH_URL = connection.get_auth_service_url()
GATEWAY_URL = connection.get_gateway_url()

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
    auth_res = requests.get("{}/authorize".format(AUTH_URL),headers=headers)
    if not auth_res.ok:
        return Response(status_code=auth_res.status_code,headers=auth_res.headers,content=auth_res.content)

    req.state.myObject = auth_res.json()["uid"]
    return await next(req)


@app.get("/vehicletype")
def get_vehicletype():
    with ENGINE.connect() as conn:
        sel = select(models.VehicleType)
        res = conn.execute(sel).fetchall()
        if len(res) == 0:
            raise HTTPException(404,"Failed to find any vehicle types")
        res = [models.VehicleTypeRec(*x) for x in res]
        return res


@app.post("/vehicletype")
def post_vehicletype(req: Request, body: models.VehicleTypeDto):
    headers = {"Authorization":"Bearer {}".format(req.state.myObject)}
    role_res = requests.get("{}/role".format(AUTH_URL),headers=headers)
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with ENGINE.connect() as conn:
        try:
            conn.execute(insert(models.VehicleType).values(asdict(body)))
            conn.commit()
        except:
            raise HTTPException(400,"Failed to insert provided vehicletype")
        else:
            return {"status":200}


@app.delete("/vehicletype/{vid}")
def delete_vehicletype(req: Request, vid: int):
    headers = {"Authorization":"Bearer {}".format(req.state.myObject)}
    role_res = requests.get("{}/role".format(AUTH_URL),headers=headers)
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with ENGINE.connect() as conn:
        conn.execute(delete(models.VehicleType).where(models.VehicleType.vehtype_id == vid))
        conn.commit()
        with websockets.connect("{}/internal".format(GATEWAY_URL)) as conn:
            conn.send("delete,vehicle")
        return {"status":200}


@app.get("/vehicle")
def get_vehicle():
    with ENGINE.connect() as conn:
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
    role_res = requests.get("{}/role/{}".format(AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with ENGINE.connect() as conn:
        try:
            conn.execute(insert(models.Vehicle).values(asdict(body)))
            conn.commit()
        except:
            raise HTTPException(400,"Failed to insert provided vehicle")
        else:
            return {"status":200}


@app.delete("/vehicle/{vid}")
def delete_vehicle(req: Request, vid: int):
    role_res = requests.get("{}/role/{}".format(AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")
    with ENGINE.connect() as conn:
        conn.execute(delete(models.Vehicle).where(models.Vehicle.veh_id == vid))
        conn.commit()
        with websockets.connect("{}/internal".format(GATEWAY_URL)) as conn:
            conn.send("delete,vehicle")
        return {"status":200}


@app.get("/employee")
def get_employee():
    with ENGINE.connect() as conn:
        sql = select(models.User.user_id,models.Person.name,models.Person.surname).select_from(models.User).join(models.Person,onclause=models.User.user_id == models.Person.user_id).join(models.Role,onclause=models.User.user_id == models.Role.user_id).where(models.Role.name == "agent")
        res = conn.execute(sql).fetchall();
        if len(res) == 0:
            raise HTTPException(404,"Failed to find any employees")
        employees = [models.EmployeeRec(*x) for x in res]
        return employees


@app.get("/reservation")
def get_reservation():
    with ENGINE.connect() as conn:
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
            sql = select(models.Person.name,models.Person.surname).select_from(models.User).join(models.Person,onclause=models.Person.user_id == models.User.user_id)
            employee_res = conn.execute(sql).fetchone()
            if employee_res is None:
                raise HTTPException(404,"Failed to find given employee")
            employees.append("{} {}".format(employee_res[0],employee_res[1]))

        res = [models.ReservationRec(*reservation_res[i][:-2],employees[i],vehicles[i]) for i in range(len(reservation_res))]
        return res


@app.delete("/reservation/{res_id}")
def delete_reservation(req: Request, res_id: int):
    role_res = requests.get("{}/role/{}".format(AUTH_URL,req.state.myObject))
    if role_res.json()["role"] != "admin":
        raise HTTPException(403,"User have to be admin to access this resource")

    with ENGINE.connect() as conn:
        sql = delete(models.Reservation).where(models.Reservation.res_id == res_id)
        conn.execute(sql)
        conn.commit()
        with websockets.connect("{}/internal".format(GATEWAY_URL)) as conn:
            conn.send("delete,reservation")
        return {"status":200}


@app.get("/user")
def get_user_by_id(req: Request):
    user_id = req.state.myObject
    with ENGINE.connect() as conn:
        sql_fields = (models.User.user_id,models.Person.name,models.Person.surname,models.Person.date_of_birth,models.Person.phone_number,models.Person.pesel,models.Person.nationality)
        sql = select(*sql_fields).select_from(models.User).join(models.Person,onclause = models.User.user_id == models.Person.user_id).where(models.User.user_id == user_id)
        res = conn.execute(sql).fetchone()
        if res is None:
            raise HTTPException(404,"Failed to find user with given id")
        user = models.UserRec(*res)
        return user


@app.post("/user")
def update_user_by_id(req: Request, body: Dict[str,Union[str,int]]):
    user_id = req.state.myObject
    for k in body.keys():
        if k not in models.UserRec.__dict__["__dataclass_fields__"].keys():
            raise HTTPException(400,"Cannot use provided {} field".format(k))
        elif k == "user_id":
            raise HTTPException(400,"Cannot use user_id field".format(k))

    with ENGINE.connect() as conn:
        sql = update(models.Person).where(models.Person.user_id == user_id).values(**body)
        conn.execute(sql)
        conn.commit()

    return {"status":200}

if __name__ == "__main__":
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
