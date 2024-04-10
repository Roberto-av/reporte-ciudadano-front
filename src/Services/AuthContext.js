import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null); // Agregamos el estado del usuario
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
        setIsLoggedIn(true);
        localStorage.setItem('token', newToken);
    } else {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    }
};

  const updateUser = ({ id, roles }) => {
    setUser({
      id: id,
      roles: roles
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null); // Limpiamos el usuario al cerrar sesión
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Removemos el estado de autenticación del almacenamiento local
    console.log('Logout successful');
  };

  useEffect(() => {
    // Almacenar el estado de autenticación en el almacenamiento local
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ token, user, updateToken, updateUser, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
