from fastapi import FastAPI
import uvicorn
import base64

secret = bytes(32)
app = FastAPI()

@app.get("/status")
def get_status():
    return { "status": 200 }

if __name__ == "__main__":
    with open("./secret","r") as file:
        data = file.read(32)
        secret = base64.b64decode(data)
    print(secret)

    uvicorn.run("main:app",port=8082)
