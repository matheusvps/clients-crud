import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  Group as GroupIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { Column } from './BaseTable';

interface BaseGroupDialogProps {
  open: boolean;
  onClose: () => void;
  columns: Column<any>[];
  currentGroupBy?: string;
  onGroupByChange: (columnId: string | undefined) => void;
}

const BaseGroupDialog: React.FC<BaseGroupDialogProps> = ({
  open,
  onClose,
  columns,
  currentGroupBy,
  onGroupByChange
}) => {
  const handleToggleGroup = (columnId: string) => {
    if (currentGroupBy === columnId) {
      onGroupByChange(undefined);
    } else {
      onGroupByChange(columnId);
    }
  };

  const groupableColumns = columns.filter(col => col.groupable);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <GroupIcon color="primary" />
          <Typography variant="h6">Agrupar por Coluna</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Selecione uma coluna para agrupar os dados da tabela. 
          O agrupamento permite visualizar padrões e organizar melhor as informações.
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        {groupableColumns.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
            Nenhuma coluna disponível para agrupamento.
          </Typography>
        ) : (
          <List>
            {groupableColumns.map((column) => (
              <ListItem
                key={String(column.id)}
                component="div"
                onClick={() => handleToggleGroup(String(column.id))}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemIcon>
                  <SortIcon color={currentGroupBy === String(column.id) ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText
                  primary={column.label}
                  secondary={
                    column.groupTransform 
                      ? "Agrupamento personalizado disponível"
                      : "Agrupamento por valor exato"
                  }
                />
                <Switch
                  edge="end"
                  checked={currentGroupBy === String(column.id)}
                  onChange={() => handleToggleGroup(String(column.id))}
                  color="primary"
                />
              </ListItem>
            ))}
          </List>
        )}
        
        {currentGroupBy && (
          <Box mt={2} p={2} bgcolor="primary.50" borderRadius={1}>
            <Typography variant="body2" color="primary.main" fontWeight="medium">
              Agrupamento ativo: {columns.find(col => String(col.id) === currentGroupBy)?.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Clique no toggle acima para desativar o agrupamento
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseGroupDialog; 