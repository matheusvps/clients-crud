import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Chip,
  Divider
} from '@mui/material';
import { ClienteNormalizado } from '../../types';

interface BaseClienteListItemProps {
  cliente: ClienteNormalizado;
  index: number;
  colors: string[];
  formatarMoeda: (valor: number) => string;
  showDivider?: boolean;
}

const BaseClienteListItem: React.FC<BaseClienteListItemProps> = ({
  cliente,
  index,
  colors,
  formatarMoeda,
  showDivider = true
}) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: colors[index % colors.length] }}>
            {index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                {cliente.nomeCompleto}
              </Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {formatarMoeda(cliente.totalVendas)}
              </Typography>
            </Box>
          }
          secondary={
            <Box display="flex" gap={2} mt={1}>
              <Chip 
                label={`${cliente.frequenciaCompras} dias`}
                size="small"
                color="primary"
              />
              <Chip 
                label={`Média: ${formatarMoeda(cliente.mediaVendas)}`}
                size="small"
                color="secondary"
              />
              <Chip 
                label={`Letra: ${cliente.primeiraLetraFaltante}`}
                size="small"
                variant="outlined"
              />
            </Box>
          }
        />
      </ListItem>
      {showDivider && index < 4 && <Divider />}
    </>
  );
};

export default BaseClienteListItem; 