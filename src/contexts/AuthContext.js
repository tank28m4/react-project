import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setIsLoggedIn(false);
  };
  
  const value = {
    isLoggedIn,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 