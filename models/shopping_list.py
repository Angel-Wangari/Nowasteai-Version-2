class ShoppingList:
    def __init__(self):
        self.items={}
    def add_items(self,name,quantity,unit):
        if name in self.items:
            self.items[name]["Quantity"]+=quantity
        else:
            self.items[name]={"Qauantity":quantity,"unit":unit}
    def remove_item(self,name,quantity,unit):
        if name in self.items:
            del self.items[name]
        else:
            print(f"{name} not in Shopping List")
            