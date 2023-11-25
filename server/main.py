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

@app.get("/restaurants/{game_id}")
def get_restaurants(game_id: int, lat: float, long: float, radius: int, maxPrice: int):
    excludedTypes = []  # TODO: Add this to the request
    restaurants = getRestaurants.main(lat, long, radius, maxPrice, excludedTypes)
    mongoConnect.add_restaurants(game_id, restaurants)
    return(restaurants)

# FOR TESTING
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/ping")
def ping():
    return(mongoConnect.pingTest())
