from fastapi import FastAPI
import uvicorn


app =  FastAPI()


@app.get("/hello")
def get_hello():
    return { "msg": "hello" }


if __name__ == "__main__":
    uvicorn.run("main:app",port=8080,host="0.0.0.0")
