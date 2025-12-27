from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/status")
def get_status():
    return { "status": 200 }

if __name__ == "__main__":
    uvicorn.run("main:app",port=8082)
