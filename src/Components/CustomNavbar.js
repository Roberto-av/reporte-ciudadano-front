import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Services/AuthContext";
import "../Assets/css/style.css";
import { ReactComponent as HomeIcon } from "../Assets/img/home.svg";
import { ReactComponent as DocsIcon } from "../Assets/img/docs.svg";
import { ReactComponent as UserIcon } from "../Assets/img/user.svg";
import { ReactComponent as LogoutIcon } from "../Assets/img/logout.svg";

function CustomNavbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleLogout = () => {
    logout();
  };

  console.log("Datos del usuario:", user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <HomeIcon
            width="24px"
            height="24px"
            style={{ marginRight: "5px", marginBottom: "7px" }}
          />
          INICIO
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${showNav ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            {user && user.roles && user.roles.includes("ROLE_ADMIN") && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <UserIcon
                    style={{ marginRight: "5px", marginBottom: "7px" }}
                  />
                  USUARIOS
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  <DocsIcon style={{ marginRight: "5px" }} />
                  REPORTES
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav right-elements">
            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  CERRAR SESION
                  <LogoutIcon
                    style={{ marginLeft: "10px", marginBottom: "4px" }}
                  />
                </button>
              </li>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    INICIAR SESION
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    REGISTRARSE
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
