from datetime import date
class Ingredient:
    def __init__(self,id,name,quantity,unit,expiry_date):
        if not name:
            raise ValueError("Name cannot be empty")
        if quantity<0:
            raise ValueError("Quantity cannot be negative")
        if not isinstance(expiry_date,date):
            raise TypeError("The value must be a date")
        self.name=name
        self.unit=unit
        self.quantity=quantity
        self.expiry_date=expiry_date
        self.id=id

    def is_expired(self):
        return self.expiry_date < date.today()
    #After writing the pantry rethink this its not a good design 
    def update_quantity(self,quantity):
        if quantity<0:
            raise ValueError("Quantity cannot be negative")
        self.quantity=quantity
    def __str__(self):
        return f"{self.name} - {self.quantity} {self.unit} Expiry date:({self.expiry_date})"
        
    