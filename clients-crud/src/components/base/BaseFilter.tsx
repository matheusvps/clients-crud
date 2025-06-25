import React from 'react';
import { TextField, Box } from '@mui/material';

interface BaseFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
  fullWidth?: boolean;
  disabled?: boolean;
}

const BaseFilter: React.FC<BaseFilterProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  fullWidth = true,
  disabled = false
}) => {
  return (
    <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
      <TextField
        fullWidth={fullWidth}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        size="small"
      />
    </Box>
  );
};

export default BaseFilter; 