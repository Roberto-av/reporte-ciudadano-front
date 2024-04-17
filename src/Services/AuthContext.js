import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
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
    setUser({ id, roles });
    localStorage.setItem('user', JSON.stringify({ id, roles }));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null); 
    localStorage.removeItem('user'); 
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    console.log('Logout successful');
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ token, user, updateToken, updateUser, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
