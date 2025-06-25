import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar autenticação persistida ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const savedUsuario = localStorage.getItem('authUsuario');
      
      if (token && savedUsuario) {
        // Em um ambiente real, aqui você validaria o token com o backend
        // Por enquanto, vamos apenas restaurar o estado
        setIsAuthenticated(true);
        setUsuario(savedUsuario);
      }
      setIsInitialized(true);
    };

    checkAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.login(email, senha);
      setIsAuthenticated(true);
      setUsuario(response.usuario);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('authUsuario', response.usuario);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsuario(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsuario');
  };

  // Não renderizar nada até verificar a autenticação
  if (!isInitialized) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 