import { NavLink} from "react-router-dom";
import logo from  "../assets/logo.svg";

function NavBar() {
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
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/admin">Admin</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/donor">Donor</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/representativelogin">Representative</NavLink>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  );
}

export default NavBar;