from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.collection import Collection

uri = "mongodb+srv://hackwestern10:hackwestern10@hungergamesdb.jhpisnh.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['hgdb']
collections = db['hgcol']

def pingTest():
    try:
        client.admin.command('ping')
        return ("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        return(e)
    

def get_collection_data():
    data = {}
    for collection_name in db.list_collection_names():
        collection = db[collection_name]
        data[collection_name] = list(collection.find())
    return data

def insert_game(game_id):
    # Check if the game already exists
    if not collections.find_one({"gameId": game_id}):
        collections.insert_one({"gameId": game_id, "userIds": []})
        return f"Game {game_id} added successfully."
    else:
        return f"Game {game_id} already exists."

def insert_user(game_id, user_id):
    # Check if the user already exists in the specified game
    game = collections.find_one({"gameId": game_id})
    if game and not any(user["userId"] == user_id for user in game["userIds"]):
        collections.update_one({"gameId": game_id}, {"$push": {"userIds": {"userId": user_id, "restaurantIds": []}}})
        return f"User {user_id} added to Game {game_id}."
    else:
        return f"User {user_id} already exists in Game {game_id}."

def add_restaurant(game_id, user_id, restaurant_id, value):
    # Check if the restaurant already exists for the specified user
    game = collections.find_one({"gameId": game_id})
    if game:
        user = next((user for user in game["userIds"] if user["userId"] == user_id), None)
        if user and not any(restaurant["restaurantId"] == restaurant_id for restaurant in user["restaurantIds"]):
            collections.update_one(
                {"gameId": game_id, "userIds.userId": user_id},
                {"$push": {"userIds.$.restaurantIds": {"restaurantId": restaurant_id, "value": value}}}
            )
            return f"Restaurant {restaurant_id} added for User {user_id} in Game {game_id}."
        else:
            return f"Restaurant {restaurant_id} already exists for User {user_id} in Game {game_id}."
    else:
        return f"Game {game_id} not found."

# Example usage:
# game_id = "game123"
# user_id = "user456"
# restaurant_id = "restaurant789"
# value = 10

# print(insert_game(game_id))
# print(insert_user(game_id, user_id))
# print(add_restaurant(game_id, user_id, restaurant_id, value))
# print(get_collection_data())