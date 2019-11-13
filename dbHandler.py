import MySQLdb


class dbHandler:
    print("hello");
    #creates an object of the dbHandler, to be initialized in main flask server
    def __init__(self):
        pass

    #establishes connection to database, using info stored in infoFile
    def connectDB(self, infoFile):
        pass

    #will create necessary tables and permissions read in from a file
    def setupDB(self, fileName):
        pass

    #used by queries coming into flask, this one is to search for a specific Food Recipe
    #returns a json with the name, ingredients, steps, link for the image
    def getFoodRecipe(recipeName):
        pass

    #used by queries to search for a specific Drink Recipe
    #returns a json with the name, ingredients, steps, link for the image
    def getDrinkRecipe(self):
        pass


    #general search using a keyword, will return a list of Food Recipes
    #list of recipes will be in json format
    def searchFoods(foodWord):
        pass

    # general search using a keyword, will return a list of Drink Recipes
    #list of recipes will be in json format
    def searchDrinks(drinkWord):
        pass


    #queries the db to get a food recipe, but only returns the link to the image of the food recipe
    def getFoodImage(self):
        foodImageLink=None
        return foodImageLink

    # queries the db to get a drink recipe, but only returns the link to image of the drink recipe
    def getDrinkImage(self):
        drinkImageLink=None
        return drinkImageLink


    #used by admin to add recipes to databases
    def uploadRecipe(self):
        pass

