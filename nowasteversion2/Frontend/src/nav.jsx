import { Link } from "react-router-dom";
import "./nav.css";
function Nav(){
    return(

        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-brand">
                    <Link to="/">NoWasteAI</Link>
                </li>

                <li className="nav-link">
                    <Link to="/pantry">Pantry</Link>
                </li>
            </ul>
        </nav>
);
}
export default Nav