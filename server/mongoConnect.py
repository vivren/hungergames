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

# Creates a new game
def insert_game() -> int:
    games = db['games']
    game_id = games.count_documents({}) + 1
    games.insert_one({"gameId": game_id, "userIds": []})
    return game_id

def insert_user(game_id: int, username: str) -> int:
    # Create a new user
    users = db['users']
    user_id = users.count_documents({"gameId": game_id}) + 1
    users.insert_one({"gameId": game_id, 
                      "userId": user_id, 
                      "name": username, 
                      "restaurants": {}})   # restaurants: key -> restaurantId, value -> points

    # Add to game document
    games = db['games']
    games.update_one({"gameId": game_id}, {"$push": {"userIds": user_id}})

    return user_id

# Add restaurants to restaurants collection
def add_restaurants(game_id: int, restaurant_dict: dict):
    restaurants = db['restaurants']
    for name in restaurant_dict.keys():
        restaurant_id = restaurants.count_documents({"gameId": game_id}) + 1
        restaurants.insert_one({"gameId": game_id, 
                                "restaurantId": restaurant_id,
                                "name": name, 
                                "address": restaurant_dict[name]["address"],
                                "rating": restaurant_dict[name]["rating"], 
                                "priceLevel": restaurant_dict[name]["priceLevel"], 
                                "photo": restaurant_dict[name]["photo"],
                                "userVotes": {}})   # userVotes: key -> userId, value -> points

# Vote for a restaurant
def vote(game_id: int, user_id: int, restaurant_id: int) -> int:
    # Tally point in user document
    users = db["users"]
    users.update_one({"gameId": game_id, "userId": user_id}, {"$inc": {"restaurants." + str(restaurant_id): 1}})

    # Tally point in restaurant document
    restaurants = db["restaurants"]
    restaurants.update_one({"gameId": game_id, "restaurantId": restaurant_id}, {"$inc": {"userVotes." + str(user_id): 1}})

    # Return the new point value
    return users.find_one({"gameId": game_id, "userId": user_id})["restaurants"][str(restaurant_id)]

# Get results
def get_results(game_id: int) -> list:
    # Get all restaurants
    restaurants = db["restaurants"]
    restaurant_list = list(restaurants.find({"gameId": game_id}))
    restaurant_points = []
    for restaurant in restaurant_list:
        points = sum(restaurant["userVotes"].values())
        restaurant_points.append((restaurant["name"], points))

    # Sort restaurants by votes
    restaurant_points.sort(key=lambda x: x[1], reverse=True)

    return restaurant_points
    
# Clear database collections
def clear_database():
    for collection_name in db.list_collection_names():
        db[collection_name].delete_many({})
    return "Database cleared. Ready for new game."
    
# FOR TESTING
if __name__ == '__main__':
    collection_data = get_collection_data()
    for collection_name in collection_data:
        print(collection_name)
        print(collection_data[collection_name])
    
    clear_database()

    collection_data = get_collection_data()
    for collection_name in collection_data:
        print(collection_name)
        print(collection_data[collection_name])

# Example usage:
# game_id = "game123"
# user_id = "user456"
# restaurant_id = "restaurant789"
# value = 10

# print(insert_game(game_id))
# print(insert_user(game_id, user_id))
# print(add_restaurant(game_id, user_id, restaurant_id, value))
# print(get_collection_data())