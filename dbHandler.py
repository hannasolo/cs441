import MySQLdb


class dbHandler:

    #creates an object of the dbHandler, to be initialized in main flask server
    def __init__(self):

    #establishes connection to database, using info stored in infoFile
    def connectDB(self, infoFile):

    #will create necessary tables and permissions read in from a file
    def setupDB(self, fileName):

    #used by queries coming into flask, this one is to search for a specific Food Recipe
    #returns a json with the name, ingredients, steps, link for the image
    def getFoodRecipe(recipeName):

    #used by queries to search for a specific Drink Recipe
    #returns a json with the name, ingredients, steps, link for the image
    def getDrinkRecipe(self):



    #general search using a keyword, will return a list of Food Recipes
    #list of recipes will be in json format
    def searchFoods(foodWord):

    # general search using a keyword, will return a list of Drink Recipes
    #list of recipes will be in json format
    def searchDrinks(drinkWord):



    #queries the db to get a food recipe, but only returns the link to the image of the food recipe
    def getFoodImage():

        return foodImageLink

    # queries the db to get a drink recipe, but only returns the link to image of the drink recipe
    def getDrinkImage():

        return drinkImageLink


    #used by admin to add recipes to databases
    def uploadRecipe(self, ):

