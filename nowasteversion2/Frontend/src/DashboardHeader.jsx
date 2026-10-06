import "./DashboardHeader.css"
function Header() {
    return (
        <header className="dashboard-header">
            <p className="greeting">Hello</p>
            <h1>Let's use what you have.</h1>
            <p className="header-description">
                Keep track of your ingredients and use them before they go to waste.
            </p>
        </header>
    );
}

export default Header;