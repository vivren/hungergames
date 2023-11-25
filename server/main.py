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
    return(restaurants) # TODO: Return the restaurants from the database, not the API (it includes IDs)

@app.post("/vote/{game_id}/{user_id}/{restaurant_id}")
def vote(game_id: int, user_id: int, restaurant_id: int):
    return mongoConnect.vote(game_id, user_id, restaurant_id)

@app.get("/results/{game_id}")
def get_results(game_id: int):
    return mongoConnect.get_results(game_id)

@app.delete("/clear")
def newGame():
    return mongoConnect.clear_database()

# FOR TESTING
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/ping")
def ping():
    return(mongoConnect.pingTest())
