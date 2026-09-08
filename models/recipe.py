class recipe:
    def __init__(self,ingredients_needed,recipe_name):
        self.ingredients_needed=ingredients_needed
        self.name=recipe_name
    def add_ingredient(self,name,quantity,unit):
        if name in self.ingredients_needed:
            self.ingredients_needed[name]["Quantity"]+=quantity
        else:
            self.ingredients_needed[name]={"Quantity":quantity,"unit":unit}
        
    def remove_ingredients(self,name):
        if name in self.ingredients_needed:
            del self.ingredients_needed[name]
        else:
            print(f"{name} not in {self.ingredients_needed}!")
    def _str_(self):
        for name, ingredient_info in self.ingredients_needed.items():
            output += f"{name} - {ingredient_info['Quantity']} {ingredient_info['unit']}\n"
        