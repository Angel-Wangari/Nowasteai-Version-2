from models.ingredients import Ingredient
from models.meal_planner import Mealplanner
from models.recipe import Recipe
from models.pantry import Pantry
from models.shopping_list import ShoppingList
from datetime import date
from services.waste_service import WasteService
item1=Ingredient(1,"Eggs",30,"tray",date(2026,11,22))

item2=Ingredient(1,"bread",1,"loaf",date(2026,9,16))
pantry=Pantry()
pantry.add(item1)
pantry.add(item2)
print(pantry)

recipe=Recipe("Scrambled Eggs")
recipe.add_ingredient("Eggs",2,"pieces")
recipe.add_ingredient("Tomatoes",1,"pieces")
recipe.add_ingredient("Onion",1,"piece")
recipe.add_ingredient("Salt",1,"pinch")
print(recipe)
mealplan=Mealplanner(pantry)
missing=mealplan.find_missing_ingredients(recipe)
print(missing)
shopping=ShoppingList(missing)
print(shopping)
waste=WasteService(pantry)
print(waste.calculate_waste_score())
