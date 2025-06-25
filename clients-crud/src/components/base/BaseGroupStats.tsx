import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper
} from '@mui/material';

interface GroupStatsProps {
  totalGroups: number;
  totalItems: number;
  groupBy: string;
  groupLabels: string[];
}

const BaseGroupStats: React.FC<GroupStatsProps> = ({
  totalGroups,
  totalItems,
  groupBy,
  groupLabels
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Typography variant="body2" color="text.secondary">
          Agrupado por: <strong>{groupBy}</strong>
        </Typography>
        <Chip 
          label={`${totalGroups} grupo${totalGroups !== 1 ? 's' : ''}`}
          size="small"
          color="primary"
          variant="outlined"
        />
        <Chip 
          label={`${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          size="small"
          color="secondary"
          variant="outlined"
        />
        {groupLabels.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap">
            <Typography variant="body2" color="text.secondary">
              Grupos:
            </Typography>
            {groupLabels.slice(0, 5).map((label, index) => (
              <Chip 
                key={index}
                label={label}
                size="small"
                variant="outlined"
              />
            ))}
            {groupLabels.length > 5 && (
              <Chip 
                label={`+${groupLabels.length - 5} mais`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default BaseGroupStats; 