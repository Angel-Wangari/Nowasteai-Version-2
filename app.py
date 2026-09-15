from models.ingredients import Ingredient
from models.meal_planner import Mealplanner
from models.recipe import recipe
from models.pantry import Pantry
from models.shopping_list import ShoppingList
from datetime import date
item1=Ingredient(1,"eggs",30,"tray",date(2026,11,22))

item2=Ingredient(1,"bread",1,"loaf",date(2026,9,19))
pantry=Pantry()
pantry.add(item1)
pantry.add(item2)
print(pantry)

