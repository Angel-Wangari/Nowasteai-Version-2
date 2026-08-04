from datetime import date
class Pantry:
    def __init__(self,name,quantity,unit,expiry_date):
        if not name:
            raise ValueError("Cannot be empty")
        if not isinstance(date,expiry_date):
            raise TypeError("Not a date")
        if quantity<0:
            raise ValueError("Quantity cannot be negative")
        
        self.name=name
        self.quantity=quantity
        self.unit=unit
        self.expiry_date=expiry_date
    def add(self):
            pass
    def expired_items(self):
            return self.expiry_date<date.today()
    def remove(self,name):
            pass
    def find(self,name):
            if name:
                return "Item in pantry"
    def __str__(self):
            return self.name
        
            
            
            