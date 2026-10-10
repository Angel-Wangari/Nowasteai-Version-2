import{BrowserRouter,Routes,Route} from "react-router-dom"
import Nav from "./nav.jsx";
import Header from './DashboardHeader.jsx';
import Pantry from "./pantry.jsx";
function App() {
  return(
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/" element={<Header />}/>
      <Route path="/pantry" element={<Pantry />}/>

    </Routes>
    
    </BrowserRouter>
  );
 
}

export default App
