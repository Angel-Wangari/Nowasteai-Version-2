import { useState } from "react"
import "./pantry.css"
function Pantry(){
    const[showForm,setShowForm]=useState(false)
    const[name,setName]=useState("")
    const[unit,setUnit]=useState("")
    const[quantity,setQuantity]=useState("")
    const[expiryDate,setExpiryDate]=useState("")
    const[error,setError]=useState("")
    const handleSubmit= async (event)=>{event.preventDefault();
            const ingredient = {
            name: name,
            unit: unit,
            quantity: quantity,
            expiry_date: expiryDate
            };
        const response= await fetch("http://127.0.0.1:8000/Ingredient",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(ingredient)
        });
        if(!response.ok){
            setError("Failed to add Ingredient")
            return;
        }
    }
    
    return(
        <main className="pantry">
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
                        <button type="submit">Add Ingredient</button>
                    </div>
                </form >
            )

            }


        </main>
    )

}
export default Pantry