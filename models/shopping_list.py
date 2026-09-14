class ShoppingList:
    def __init__(self,missing):
        self.items=missing
    def add_item(self,name,quantity,unit):
        if name in self.items:
            self.items[name]["Quantity"]+=quantity
        else:
            self.items[name]={"Quantity":quantity,"unit":unit}
    def remove_item(self,name):
        if name in self.items:
            del self.items[name]
        else:
            print(f"{name} not in Shopping List")
    def __str__(self):
        output=""
        for name,info in self.items.items():
            output+= f"{name}- {info['Quantity']} {info['unit']}\n"
        return output
            