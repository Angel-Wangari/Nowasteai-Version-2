from pantry import Pantry
from recipe import recipe
def __init__(self,pantry):
    self.pantry=pantry
def find_missing_ingredients(self,recipe):
    for name,ingredients_info in recipe.ingredients_needed.items():
        self.pantry.find(name)