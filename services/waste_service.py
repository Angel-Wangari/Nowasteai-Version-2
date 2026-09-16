from models.pantry import Pantry 
class WasteService:
    def __init__(self,panrty):
        self.pantry=panrty
    def calculate_waste_score(self):
        if len(self.pantry.ingredients)==0:
            
            return 0
        expired=self.pantry.expired_items()
        return len(expired)/ len(self.pantry.ingredients)* 100
  