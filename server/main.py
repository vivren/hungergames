from fastapi import FastAPI
import mongoConnect

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/ping")
def ping():
    return(mongoConnect.pingTest())
