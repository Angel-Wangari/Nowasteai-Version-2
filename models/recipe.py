class Recipe:
    def __init__(self,recipe_name):
        self.ingredients_needed={}
        self.recipe_name=recipe_name
    def add_ingredient(self,name,quantity,unit):
        if name in self.ingredients_needed:
            self.ingredients_needed[name]["Quantity"]+=quantity
        else:
            self.ingredients_needed[name]={"Quantity":quantity,"unit":unit}
        
    def remove_ingredient(self,name):
        if name in self.ingredients_needed:
            del self.ingredients_needed[name]
        else:
            print(f"{name} not in {self.ingredients_needed}!")
    def __str__(self):
        output=self.recipe_name + "\n"
        for name, ingredient_info in self.ingredients_needed.items():
            output += f"{name} - {ingredient_info['Quantity']} {ingredient_info['unit']}\n"
        return output
    