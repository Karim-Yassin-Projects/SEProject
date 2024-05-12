import {NavLink, useLocation} from "react-router-dom";
import logo from "../assets/logo.svg";

function NavBar() {
    const location = useLocation();
    const showLogout = !(location.pathname.includes('login') || location.pathname.includes('register') || location.pathname === "/");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="logo" width="60" height="48"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to="/adminlogin">Admin</NavLink>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/donor/login">Donor</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/representative/login">Representative</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact us</NavLink>
                        </li>


                    </ul>
                    {showLogout &&<ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="navbar-text">Logged in as: Kareem</span>
                            <NavLink className="btn btn-link nav-link" to="/">Logout</NavLink>
                        </li>
                    </ul> }
                </div>
            </div>
        </nav>
    );
}

export default NavBar;