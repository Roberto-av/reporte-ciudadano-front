import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext'; // Importa el contexto de autenticación
import '../Assets/style.css';

function CustomNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Obtiene el estado de autenticación del contexto

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar el token del localStorage u otras acciones necesarias para cerrar sesión
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Actualizar el estado para indicar que el usuario ha cerrado sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">Reportes</Link>
            </li>
          </ul>
          <ul className="navbar-nav right-elements">
            {/* Mostrar botón de cerrar sesión solo si el usuario está logeado */}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            )}
            {/* Mostrar enlaces de inicio de sesión y registro solo si el usuario no está logeado */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
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
