import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
  username: string;
  password: string;
  [key: string]: any;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
  );
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  
  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };
  
  const logout = (): void => {
    setIsLoggedIn(false);
  };
  
  const value: AuthContextType = {
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