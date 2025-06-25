import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Tabs,
  Tab
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: number;
  onTabChange: (tab: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🧸 Loja de Brinquedos - Sistema de Clientes
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Olá, {usuario}!
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={(_, newValue) => onTabChange(newValue)}>
            <Tab label="Lista de Clientes" />
            <Tab label="Estatísticas" />
          </Tabs>
        </Box>

        {children}
      </Container>
    </Box>
  );
};

export default Layout; 