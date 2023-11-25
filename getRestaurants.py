import requests
from datetime import datetime
from unicodedata import normalize


# Return list of restaurant types that can be filtered for
def getTypes():
    types = [
        "american_restaurant",
        "bar",
        "barbecue_restaurant",
        "brazilian_restaurant",
        "breakfast_restaurant",
        "chinese_restaurant",
        "fast_food_restaurant",
        "french_restaurant",
        "greek_restaurant",
        "hamburger_restaurant",
        "indian_restaurant",
        "indonesian_restaurant",
        "italian_restaurant",
        "japanese_restaurant",
        "korean_restaurant",
        "lebanese_restaurant",
        "mediterranean_restaurant"
        "mexican_restaurant",
        "middle_eastern_restaurant"
        "pizza_restaurant",
        "ramen_restaurant",
        "sandwich_shop",
        "seafood_restaurant",
        "spanish_restaurant",
        "steak_house",
        "sushi_restaurant",
        "thai_restaurant",
        "turkish_restaurant",
        "vegan_restaurant",
        "vegetarian_restaurant",
        "vietnamese_restaurant"
    ]
    return types


# Filter out restaurants that have a filtered out type
def filterRestaurants(restaurants, excludedTypes):
    filteredRestaurants = {}

    for restaurant in restaurants:
        # We only want the 24 highest rated restaurants that match our criteria
        if len(filteredRestaurants) == 16:
            break
    #     for type in restaurant["types"]:
    #         if type in excludedTypes:
    #             break
        filteredRestaurants[restaurant["name"]] = restaurant

    return filteredRestaurants


# Retrieve the image given the photo details
def retrieveImage(photoId):
    api_key = "AIzaSyCnZE3QKFsl7FtQk8ATy2XL8VG9lBCH6CI"
    url = f"https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photo_reference={photoId}&key={api_key}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(response.reason)

    return response.url


# Parse data to only retain relevant info (name, address, phone, rating, price, closing time, photo)
def parseRestaurants(restaurants):
    parsedRestaurants = {}

    for restaurant, oldHash in restaurants.items():
        newHash = {}
        if "vicinity" in oldHash or "formatted_address" in oldHash:
            newHash["address"] = oldHash["vicinity"] if "vicinity" in oldHash else oldHash["formatted_address"]
        if "formatted_phone_number" in oldHash:
            newHash["phoneNumber"] = oldHash["formatted_phone_number"]
        if "rating" in oldHash:
            newHash["rating"] = oldHash["rating"]
        if "price_level" in oldHash:
            newHash["priceLevel"] = oldHash["price_level"]
        if "photos" in oldHash:
            newHash["photo"] = retrieveImage(restaurants[restaurant]["photos"][0]["photo_reference"])

        # Only display closing time today
        if ("current_opening_hours" in oldHash and "weekday_text" in oldHash["current_opening_hours"]) or ("opening_hours" in oldHash and "weekday_text" in oldHash["opening_hours"]):
            if "current_opening_hours" in oldHash and "weekday_text" in oldHash["current_opening_hours"]:
                currDayOfWeekHours = oldHash["current_opening_hours"]["weekday_text"][datetime.today().weekday()]
            else:
                currDayOfWeekHours = oldHash["opening_hours"]["weekday_text"][datetime.today().weekday()]

            closingTimeToday = normalize('NFKD', currDayOfWeekHours).split(":")[1][1:]
            # Edge case: Open 24 hours
            if closingTimeToday != "Open 24 hours":
                closingTimeToday = closingTimeToday.split("–")[-1][1:]
            newHash["closingTimeToday"] = closingTimeToday

        parsedRestaurants[restaurant] = newHash

    return parsedRestaurants


# Return list of potential restaurants based on input filters
def getRestaurants(searchLat, searchLong, searchRadius, maxPrice):
    api_key = "AIzaSyCnZE3QKFsl7FtQk8ATy2XL8VG9lBCH6CI"
    url = f"""https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={searchLat}%2C{searchLong}
    &radius={searchRadius}&opennow&type=restaurant&maxprice={maxPrice}&key={api_key}"""
    response = requests.get(url).json()

    if response["status"] != "OK":
        raise Exception(response.reason)

    if "next_page_token" in response:
        return response["results"], response["next_page_token"]
    return response["results"], None


def getAdditionalResults(nextPageToken):
    additionalResults = []
    api_key = "AIzaSyCnZE3QKFsl7FtQk8ATy2XL8VG9lBCH6CI"

    while nextPageToken:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={nextPageToken}&key={api_key}"
        response = requests.get(url).json()

        if response["status"] != "OK":
            raise Exception(response.reason)

        additionalResults += response["results"]
        nextPageToken = None
        if "next_page_token" in response:
            nextPageToken = response["next_page_token"]

    return additionalResults


def main(searchLat, searchLong, searchRadius, maxPrice, excludedTypes):
    restaurants, nextPageToken = getRestaurants(searchLat, searchLong, searchRadius, maxPrice)
    restaurants += getAdditionalResults(nextPageToken)
    filteredRestaurants = filterRestaurants(restaurants, excludedTypes)
    parsedRestaurants = parseRestaurants(filteredRestaurants)

    return parsedRestaurants

# FOR TESTING
# if __name__ == '__main__':
#     restaurants, nextPageToken = getRestaurants(43.51179542015055, -79.66749324203175,10000,3)
#     restaurants += getAdditionalResults(nextPageToken)
#     filteredRestaurants = filterRestaurants(restaurants, [])
#     parsedRestaurants = parseRestaurants(filteredRestaurants)

