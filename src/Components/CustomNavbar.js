import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Services/AuthContext";
import "../Assets/style.css";

function CustomNavbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto de autenticación
  };

  console.log('Datos del usuario:', user); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Inicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user && user.roles && user.roles.includes("ROLE_ADMIN") && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Usuarios
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reportes
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav right-elements">
            {/* Mostrar botón de cerrar sesión solo si el usuario está logeado */}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            )}
            {/* Mostrar enlaces de inicio de sesión y registro solo si el usuario no está logeado */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrarse
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
