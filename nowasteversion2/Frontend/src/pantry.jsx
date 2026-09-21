import { useState } from "react"
function Pantry(){
    const[showForm,setShowForm]=useState(false)
    return(
        <>
        <h1>Pantry</h1>
        <button onClick={()=>setShowForm(true)}>Add ingredient</button>
        {showForm &&(
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required/>
                <label htmlFor="unit">Unit:</label>
                <input type="text" id="unit" name="unit" required/>
                <label htmlFor="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" required/>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <input type="text" id="expiry_date" name="expiry_date" required/>
                <button type="submit">Add Ingredient</button>
            </form>
        )

        }


        </>
    )

}
export default Pantry