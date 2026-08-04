from datetime import date
from ingredients import Ingredient
class Pantry:
    def __init__(self,ingredient):
        self.ingredients=[]
    def add(self,item):
        self.ingredient.append(item)
    def expired_items(self):
        return 
    def remove(self,name):
        for ingredient in self.ingredients:
            if name==ingredient:
                self.ingredient.remove(name)
                return
    def find(self,name):
        for ingredient in self.ingredients:
            if name==ingredient:
                return f"{name} found in pantry"
    def __str__(self):
        return self.name
        
            
            
            