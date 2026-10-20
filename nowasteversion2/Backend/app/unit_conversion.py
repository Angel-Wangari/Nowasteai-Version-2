CONVERSION_FACTORS={
    "kg":("g",1000),
    "g":("g",1),
    "L": ("ml",1000),
    "ml" : ("ml",1),
    "pieces":("pieces",1)
}
def convert_quantity(quantity:float,from_unit:str,to_unit:str)->float:
    if from_unit not in CONVERSION_FACTORS or to_unit not in CONVERSION_FACTORS:
        raise ValueError("Unsupported unit")
    from_base,from_factor=CONVERSION_FACTORS[from_unit]
    to_base,to_factor=CONVERSION_FACTORS[to_unit]
    if from_base!= to_base:
        raise ValueError("Cannot convert between incompatible units")
    base_quantity=quantity *from_factor
    return base_quantity/to_factor