import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface BaseFilterPanelProps {
  title?: string;
  expanded: boolean;
  onToggle: () => void;
  onClear: () => void;
  children: React.ReactNode;
  showClearButton?: boolean;
  clearButtonText?: string;
}

const BaseFilterPanel: React.FC<BaseFilterPanelProps> = ({
  title = 'Filtros e Ordenação',
  expanded,
  onToggle,
  onClear,
  children,
  showClearButton = true,
  clearButtonText = 'Limpar Filtros'
}) => {
  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {children}
          {showClearButton && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<ClearIcon />}
                onClick={onClear}
                size="small"
              >
                {clearButtonText}
              </Button>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default BaseFilterPanel; 