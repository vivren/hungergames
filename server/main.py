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

    if mongoConnect.check_restaurants(game_id):
        # If restaurants exist, return them
        restaurants = mongoConnect.get_restaurants(game_id)
    else:
        # If restaurants do not exist, get them from the API and add them to the database
        restaurants = getRestaurants.main(lat, long, radius, maxPrice, excludedTypes)
        restaurants = mongoConnect.get_restaurants(game_id, restaurants)

    # Make restaurants JSON serializable
    restaurants_list = []
    for restaurant in restaurants:
        restaurants_list.append({"gameId": restaurant["gameId"],
                                 "restaurantId": restaurant["restaurantId"],
                                 "name": restaurant["name"],
                                 "address": restaurant["address"],
                                 "rating": restaurant["rating"],
                                 "priceLevel": restaurant["priceLevel"],
                                 "photo": restaurant["photo"]})

    return restaurants_list

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
