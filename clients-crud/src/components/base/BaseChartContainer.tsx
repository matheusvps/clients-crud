import React from 'react';
import {
  Paper,
  Typography,
  Box
} from '@mui/material';

interface BaseChartContainerProps {
  title: string;
  children: React.ReactNode;
  flex?: string;
  minWidth?: string;
  height?: number;
}

const BaseChartContainer: React.FC<BaseChartContainerProps> = ({
  title,
  children,
  flex = '1 1 600px',
  minWidth = '0',
  height = 300
}) => {
  return (
    <Paper sx={{ p: 3, flex, minWidth }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height }}>
        {children}
      </Box>
    </Paper>
  );
};

export default BaseChartContainer; 