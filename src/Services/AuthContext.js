import React, { createContext, useContext, useState } from 'react';

// Crea el contexto de React
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // **Nueva propiedad**

  // Función para actualizar el token
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsLoggedIn(true); // **Actualiza el estado de isLoggedIn**
  };

  // Función para eliminar el token (cerrar sesión)
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false); // **Actualiza el estado de isLoggedIn**
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; // Solo exporta AuthContext y AuthProvider
