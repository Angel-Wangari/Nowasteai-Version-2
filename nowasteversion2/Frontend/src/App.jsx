import{BrowserRouter,Routes,Route} from "react-router-dom"
import Nav from "./nav.jsx";
import Header from './DashboardHeader.jsx';
import Pantry from "./pantry.jsx";
import Recipes from "./recipe.jsx";
import EquipmentSetup from "./EquipmentSetup.jsx";
function App() {
  return(
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/" element={<Header />}/>
      <Route path="/pantry" element={<Pantry />}/>
      <Route path="/recipes" element={<Recipes />}/>
      <Route path="/equipment" element={<EquipmentSetup />}/>

    </Routes>
    
    </BrowserRouter>
  );
 
}

export default App
