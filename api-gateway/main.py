from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List
import httpx

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

class VehicleData(BaseModel):
    brand: str
    model: str
    price: float

@app.post("/new-vehicle")
async def create_vehicle_gateway(vehicle: VehicleData):
    print(f"GATEWAY: Otrzymano {vehicle.brand}")

    core_service_url = "http://localhost:8082/vehicletype" 
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(core_service_url, json=vehicle.dict())
            
            if response.status_code not in [200, 201]:
                return {"status": "error", "message": "Błąd zapisu w Core API", "core_response": response.text}
                
        except httpx.RequestError as exc:
            return {"status": "error", "message": f"Nie można połączyć się z Core API: {exc}"}

    notification = {
        "event": "NEW_CAR",
        "message": f"Pomyślnie dodano do bazy: {vehicle.brand} {vehicle.model}",
        "details": vehicle.dict()
    }
    await manager.broadcast(notification)
    
    return {"status": "success", "message": "Zapisano w bazie i powiadomiono klientów"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)