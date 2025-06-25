import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import ClientesList from './components/ClientesList';
import Estatisticas from './components/Estatisticas';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {currentTab === 0 && <ClientesList />}
      {currentTab === 1 && <Estatisticas />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 