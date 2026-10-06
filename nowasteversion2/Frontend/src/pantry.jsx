import { useState } from "react"
function Pantry(){
    const[showForm,setShowForm]=useState(false)
    const[name,setName]=useState("")
    const[unit,setUnit]=useState("")
    const[quantity,setQuantity]=useState("")
    const[expiryDate,setExpiryDate]=useState("")
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
        })
    }
    
    return(
        <>
        <h1>Pantry</h1>
        <button onClick={()=>setShowForm(true)}>Add ingredient</button>
        {showForm &&(
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(event)=>setName(event.target.value)} required/>
                <label htmlFor="unit">Unit:</label>
                <input type="text" id="unit" name="unit" value={unit} onChange={(event)=>setUnit(event.target.value)} required/>
                <label htmlFor="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={quantity} onChange={(event)=>setQuantity(event.target.value)} required/>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <input type="text" id="expiry_date" name="expiry_date" value={expiryDate} onChange={(event)=>setExpiryDate(event.target.value)} required/>
                <button type="submit">Add Ingredient</button>
            </form >
        )

        }


        </>
    )

}
export default Pantry