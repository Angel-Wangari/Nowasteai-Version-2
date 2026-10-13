import { useState } from "react";
import "./equipment.css"
function EquipmentSetup(){
    const [equipment,setEquipment]=useState({
        has_cooker:false,
        has_microwave:false,
        has_blender:false,
        has_air_fryer:false,
        has_frying_pan:false,
        has_oven:false
    });
    const handleChange=(event)=>{
        const {name,checked}=event.target;
        setEquipment((currentEquipment)=>({
            ...currentEquipment,
            [name]:checked
        }));

    };
    return(
        <main className="equipment-page">
            <h1>Your Kitchen Equipment</h1>
            <p>Select the equipment you have so we can suggest recipes you can actually prepare.</p>
            <form>
                {[
                    {name:"has_cooker",label:"Cooker/Stovetop"},
                    {name:"has_frying_pan",label:"Frying pan"},
                    {name:"has_oven",label:"Oven"},
                    {name:"has_microwave",label:"Microwave"},
                    {name:"has_blender",label:"Blender"},
                    {name:"has_air_fryer",label:"Air fryer"}
                ].map((item)=>(
                    <label className="equipment-option" key={item.name}>
                        <input type="checkbox" name={item.name} checked={equipment[item.name]} onChange={handleChange} />
                        {item.label}
                    </label>
                ))}
                <button type="submit">Save Equipment</button>
            </form>
        </main>
    );

}
export default EquipmentSetup


