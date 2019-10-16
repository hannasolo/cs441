import MySQLdb


class dbHandler:

    #creates an object of the dbHandler, to be initialized in main flask server
    def __init__(self):

    #establishes connection to database, using info stored in infoFile
    def connectDB(self, infoFile):

    #will create necessary tables and permissions read in from a file
    def setupDB(self, fileName):

    #used by queries coming into flask, this one is to search for a specific Food Recipe
    def getFoodRecipe(recipeName):

    #used by queries to search for a specific Drink Recipe
    def getDrinkRecipe(self):

    #general search using a keyword, will return a list of Food Recipes
    def searchFoods(foodWord):

    # general search using a keyword, will return a list of Drink Recipes
    def searchDrinks(drinkWord):

    #queries the db to get a food recipe, but only returns the image of the food recipe
    def getFoodImage():

    # queries the db to get a drink recipe, but only returns the image of the drink recipe
    def getDrinkImage():




    #used by admin to add recipes to databases
    def uploadRecipe(self, ):

