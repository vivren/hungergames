from fastapi import FastAPI
import getRestaurants
import mongoConnect

app = FastAPI()

@app.post("/games/{username}")
def create_game(username: str) -> int:
    game_id = mongoConnect.insert_game()
    mongoConnect.insert_user(game_id, username)
    return game_id

@app.post("/users/{game_id}/{username}")
def create_user(game_id: int, username: str) -> int:
    return mongoConnect.insert_user(game_id, username)

@app.get("/restaurants")
def get_restaurants(lat: float, long: float, radius: int, maxPrice: int):
    # FOR TESTING
    lat, long, radius, maxPrice = 43.51179542015055, -79.66749324203175, 10000, 3
    excludedTypes = []
    return(getRestaurants.main(lat, long, radius, maxPrice, excludedTypes))

# FOR TESTING
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/ping")
def ping():
    return(mongoConnect.pingTest())
