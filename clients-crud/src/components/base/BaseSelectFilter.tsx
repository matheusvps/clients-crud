import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export interface SelectOption {
  value: string;
  label: string;
}

interface BaseSelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  fullWidth?: boolean;
  disabled?: boolean;
}

const BaseSelectFilter: React.FC<BaseSelectFilterProps> = ({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
  disabled = false
}) => {
  return (
    <Box sx={{ flex: '1 1 180px', minWidth: 0 }}>
      <FormControl fullWidth={fullWidth} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BaseSelectFilter; 