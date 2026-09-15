from datetime import date
from .ingredients import Ingredient
class Pantry:
    def __init__(self):
        self.ingredients=[]
    def add(self,item):
        self.ingredients.append(item)
    def expired_items(self):
        expired=[]
        for ingredient in self.ingredients:
            
            if ingredient.is_expired():
                expired.append(ingredient)
        return expired
    def remove(self,name):
        for ingredient in self.ingredients:
            if name==ingredient.name:
                self.ingredients.remove(ingredient)
                return
    def find(self,name):
        for ingredient in self.ingredients:
            if name==ingredient.name:
                return ingredient
    def __str__(self):
        return "\n".join(str(ingredient) for ingredient in self.ingredients)
        
            
            
            