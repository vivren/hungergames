from fastapi import FastAPI
import getRestaurants
import mongoConnect

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/ping")
def ping():
    return(mongoConnect.pingTest())

@app.get("/restaurants")
def get_restaurants(lat: float, long: float, radius: int, maxPrice: int):
    # FOR TESTING
    lat, long, radius, maxPrice = 43.51179542015055, -79.66749324203175, 10000, 3
    excludedTypes = []
    return(getRestaurants.main(lat, long, radius, maxPrice, excludedTypes))
