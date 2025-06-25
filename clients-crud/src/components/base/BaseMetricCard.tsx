import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface BaseMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: SvgIconComponent;
  iconColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  valueColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  flex?: string;
  minWidth?: string;
}

const BaseMetricCard: React.FC<BaseMetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'primary',
  valueColor = 'primary',
  flex = '1 1 200px',
  minWidth = '0'
}) => {
  return (
    <Card sx={{ flex, minWidth }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon color={iconColor} />
          <Typography variant="h6" color={`${iconColor}.main`}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" color={`${valueColor}.main`}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BaseMetricCard; 