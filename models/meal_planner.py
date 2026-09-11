from pantry import Pantry
from recipe import recipe
def __init__(self,pantry):
    self.pantry=pantry
def find_missing_ingredients(self,recipe):
    missing={}
    for name,ingredients_info in recipe.ingredients_needed.items():
        pantry_ingredient=self.pantry.find(name)
        if pantry_ingredient is None:
            missing[name]=ingredients_info
        elif pantry_ingredient.quantity < ingredients_info['Quantity']:
            missing[name]={
                "Quantity":ingredients_info['Quantity']-pantry_ingredient.quantity,
                "unit":ingredients_info['unit']
            }
    return missing