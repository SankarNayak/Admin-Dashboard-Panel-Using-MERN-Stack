import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/authContext";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink style={{ fontSize: "3.2rem" }} to="/">
              Sankar
            </NavLink>
          </div>
          <nav>
            <ul className="navbar">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/service">Service</NavLink>
              </li>
              {isLoggedIn ? (
                user.isAdmin ? (
                  <>
                    <li>
                      <NavLink to="/logout">Logout</NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin">Admin</NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/logout">Logout</NavLink>
                  </li>
                )
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
