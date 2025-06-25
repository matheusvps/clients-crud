import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip
} from '@mui/material';

interface BaseClienteCardProps {
  cliente: {
    nomeCompleto: string;
    email: string;
    totalVendas?: number;
    mediaVendas?: number;
    frequenciaCompras?: number;
  };
  tipo: 'volume' | 'media' | 'frequencia';
  valor: string | number;
  descricao: string;
  flex?: string;
  minWidth?: string;
}

const BaseClienteCard: React.FC<BaseClienteCardProps> = ({
  cliente,
  tipo,
  valor,
  descricao,
  flex = '1 1 300px',
  minWidth = '0'
}) => {
  const getTipoConfig = () => {
    switch (tipo) {
      case 'volume':
        return {
          label: '🏆 Maior Volume',
          color: 'success' as const,
          borderColor: '#4caf50',
          valueColor: 'success.main'
        };
      case 'media':
        return {
          label: '⭐ Maior Média',
          color: 'warning' as const,
          borderColor: '#ff9800',
          valueColor: 'warning.main'
        };
      case 'frequencia':
        return {
          label: '🔄 Maior Frequência',
          color: 'info' as const,
          borderColor: '#2196f3',
          valueColor: 'info.main'
        };
    }
  };

  const config = getTipoConfig();

  return (
    <Card sx={{ 
      flex, 
      minWidth, 
      border: `2px solid ${config.borderColor}` 
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Chip 
            label={config.label}
            color={config.color}
            size="small"
          />
        </Box>
        
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {cliente.nomeCompleto}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {cliente.email}
        </Typography>
        
        <Typography variant="h5" color={config.valueColor} fontWeight="bold">
          {valor}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BaseClienteCard; 