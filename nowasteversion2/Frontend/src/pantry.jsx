import { useEffect,useState } from "react"
import "./pantry.css"
function Pantry(){
    const[showForm,setShowForm]=useState(false)
    const[ingredients,setIngredients]=useState([])
    const[name,setName]=useState("")
    const[unit,setUnit]=useState("")
    const[quantity,setQuantity]=useState("")
    const[expiryDate,setExpiryDate]=useState("")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")
    const[isSubmitting,setIsSubmitting]=useState(false)
    const handleSubmit= async (event)=>{
            event.preventDefault();
            
            setError("");
            setSuccess("");
            setIsSubmitting(true);
           const normalisedUnit = {
            
            "l": "L",
            "g": "g",
            "kg": "kg",
            "ml": "ml",
            "piece": "pieces",
            "pieces": "pieces"
        }[unit.trim().toLowerCase()];

        if (!normalisedUnit) {
            setError("Unit must be L, g, kg, ml or pieces.");
            setIsSubmitting(false);
            return;
        }

        const ingredient = {
            name: name.trim(),
            unit: normalisedUnit,
            quantity: Number(quantity),
            expiry_date: expiryDate
        };
        try{
            const response= await fetch("http://127.0.0.1:8000/Ingredient",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(ingredient)
            });
           if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const detail = errorData?.detail;

            if (Array.isArray(detail)) {
                setError(
                    detail
                        .map((item) => `${item.loc?.join(".")}: ${item.msg}`)
                        .join("; ")
                );
            } else {
                setError(
                    typeof detail === "string"
                        ? detail
                        : `Failed to add ingredient (HTTP ${response.status})`
                );
            }

            return;
        }
            const savedIngredient=await response.json();
            setIngredients((currentIngredients)=>[
                ...currentIngredients,
                savedIngredient
            ]);
            setName("");
            setUnit("");
            setQuantity("");
            setExpiryDate("");
            setShowForm(false)
            setSuccess("Ingredient added Successfully")
    }catch(error){
        setError("Could not connect to the server.Please try again")
    }finally{
        setIsSubmitting(false)
    }


    };
    const handleDelete=async(ingredientId)=>{
        setError("")
        setSuccess("")
        try{
            const response=await fetch (`http://127.0.0.1:8000/Ingredient/${ingredientId}`,
                {method:"DELETE"}
            );
            if(!response.ok){
                setError("Failed to delete Ingredient")
                return;
            }
            setIngredients((currentIngredients)=>
                currentIngredients.filter(
                    (ingredient)=>ingredient.id!==ingredientId
                )
            );
            setSuccess("Ingredient Deleted Successfully")

            

        }catch(error){
            setError("Could not connect to server")
        }
    };
    useEffect(()=>{
        const fetchIngredients=async () =>{
            const response= await fetch("http://127.0.0.1:8000/Ingredient");
            const data=await response.json();
            setIngredients(data)
        };
        fetchIngredients();
    },[]);
    
    useEffect(() => {
        if (!success) return;

        const timer = setTimeout(() => {
            setSuccess("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [success]);

    
    return(
        <main className="pantry">
            {success && <p>{success}</p>}
            <div className="pantry-header">
                <div>
                    <h2>Pantry</h2>
                    <p>Add Ingredients you currently have</p>
                </div>
            
            <button className="add-button" onClick={()=>setShowForm(true)}>Add ingredient</button>
            </div>
            {showForm &&(
                <form className="ingredient-form" onSubmit={handleSubmit}>
                    {error && <p className="form-error">{error}</p>}
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(event)=>setName(event.target.value)} required/>
                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value={quantity} onChange={(event)=>setQuantity(event.target.value)} required/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="unit">Unit:</label>
                            <input type="text" id="unit" name="unit" value={unit} onChange={(event)=>setUnit(event.target.value)} required/>
                        </div>
                    </div>
                    <label htmlFor="expiry_date">Expiry Date:</label>
                    <input type="date" id="expiry_date" name="expiry_date" value={expiryDate} onChange={(event)=>setExpiryDate(event.target.value)} required/>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={()=>setShowForm(false)}>Cancel</button>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Ingredient"}
                        </button>
                    </div>
                </form >
            )

            }
            <div className="ingredient-list">
                {ingredients.map((ingredient)=>(
                    <div className="ingredient-card" key={ingredient.id}>
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.quantity} {ingredient.unit}</p>
                        <p>Expires: {ingredient.expiry_date}</p>
                        {(()=>{
                            
                            const daysLeft = Math.ceil(
                                (
                                    new Date(`${ingredient.expiry_date}T00:00:00`).getTime()
                                    - new Date().setHours(0, 0, 0, 0)
                                ) / (1000 * 60 * 60 * 24)
                            );

                            if (daysLeft < 0){
                                return <p className="expiry-expired">Expired</p>;
                            }
                            if (daysLeft<=3){
                                return <p className="expiry-soon">Use soon</p>;
                            }
                            return <p className="expiry-ok">Still fresh</p>
                        })()}
                        <button className="delete-button" type="button" onClick={()=>handleDelete(ingredient.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>


        </main>
    )

}
export default Pantry