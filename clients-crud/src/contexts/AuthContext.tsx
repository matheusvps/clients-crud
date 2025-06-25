import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  usuario: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<string | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.login(email, senha);
      setIsAuthenticated(true);
      setUsuario(response.usuario);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsuario(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 