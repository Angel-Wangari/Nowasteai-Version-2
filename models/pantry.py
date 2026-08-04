from datetime import date
from ingredients import Ingredient
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
        for i,ingredient in enumerate(self.ingredients):
            if name==self.ingredients[i]:
                self.ingredients.remove(name)
                return
    def find(self,name):
        for ingredient in self.ingredients:
            if name==ingredient:
                return name
    def __str__(self):
        return self.name
        
            
            
            