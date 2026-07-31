from datetime import date
class ingredient:
    def __init__(self,name,unit,quantity,expiry_date):
        self.name=name
        self.unit=unit
        self.quantity=quantity
        self.expiry_date=expiry_date
    def is_expired(self):
        return self.expiry_date < date.today()
    def update_quantity(self,quantity):
        self.quantity=quantity
    def display(self):
        print("The ingredient is:")
        print(self.name)
        print(f"{self.quantity} {self.unit}")
        
    