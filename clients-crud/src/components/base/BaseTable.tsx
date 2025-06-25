import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Collapse,
  Chip,
  TablePagination
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

export interface Column<T> {
  id: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  groupable?: boolean;
  groupTransform?: (value: any) => string;
}

export interface SortConfig {
  key: keyof any;
  direction: 'asc' | 'desc';
}

export interface GroupConfig {
  key: keyof any;
  expanded: boolean;
}

interface BaseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: keyof T) => void;
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  hover?: boolean;
  groupBy?: keyof T;
  onGroupByChange?: (key: keyof T | undefined) => void;
  groupConfigs?: GroupConfig[];
  onGroupConfigChange?: (configs: GroupConfig[]) => void;
  pagination?: boolean;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

interface GroupedData<T> {
  groupKey: string;
  groupValue: any;
  rows: T[];
  expanded: boolean;
}

function BaseTable<T>({
  data,
  columns,
  sortConfig,
  onSort,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  rowKey,
  onRowClick,
  hover = true,
  groupBy,
  onGroupByChange,
  groupConfigs = [],
  onGroupConfigChange,
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 20, 50]
}: BaseTableProps<T>) {
  const [localGroupConfigs, setLocalGroupConfigs] = useState<GroupConfig[]>([]);

  const currentGroupConfigs = groupConfigs.length > 0 ? groupConfigs : localGroupConfigs;
  const setCurrentGroupConfigs = onGroupConfigChange || setLocalGroupConfigs;

  const getSortIcon = (columnId: keyof T) => {
    if (!sortConfig || sortConfig.key !== columnId) {
      return <UnfoldMoreIcon />;
    }
    return sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  };

  const handleSort = (columnId: keyof T) => {
    if (onSort) {
      onSort(columnId);
    }
  };

  const handleGroupBy = (columnId: keyof T) => {
    if (onGroupByChange) {
      onGroupByChange(groupBy === columnId ? undefined : columnId);
    }
  };

  const toggleGroupExpansion = (groupKey: string) => {
    const newConfigs = currentGroupConfigs.map(config => 
      config.key === groupKey 
        ? { ...config, expanded: !config.expanded }
        : config
    );
    setCurrentGroupConfigs(newConfigs);
  };

  const getRowKey = (row: T, index: number) => {
    if (rowKey) {
      return rowKey(row);
    }
    return index;
  };

  // Calcular dados paginados
  const paginatedData = useMemo(() => {
    if (!pagination) return data;
    
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, pagination, page, rowsPerPage]);

  // Usar dados paginados ou originais
  const displayData = pagination ? paginatedData : data;

  // Agrupar dados se necessário
  const groupedData = useMemo(() => {
    if (!groupBy) {
      return null;
    }

    const groups = new Map<string, GroupedData<T>>();
    const groupColumn = columns.find(col => col.id === groupBy);
    
    displayData.forEach(row => {
      const rawValue = row[groupBy];
      const groupValue = groupColumn?.groupTransform 
        ? groupColumn.groupTransform(rawValue)
        : rawValue;
      const groupKey = String(groupValue);
      
      if (!groups.has(groupKey)) {
        const existingConfig = currentGroupConfigs.find(c => c.key === groupKey);
        groups.set(groupKey, {
          groupKey,
          groupValue,
          rows: [],
          expanded: existingConfig?.expanded ?? true
        });
      }
      
      groups.get(groupKey)!.rows.push(row);
    });

    return Array.from(groups.values()).sort((a, b) => {
      if (typeof a.groupValue === 'string' && typeof b.groupValue === 'string') {
        return a.groupValue.localeCompare(b.groupValue);
      }
      return a.groupValue > b.groupValue ? 1 : -1;
    });
  }, [displayData, groupBy, currentGroupConfigs, columns]);

  const renderGroupHeader = (group: GroupedData<T>) => {
    return (
      <TableRow 
        key={`group-${group.groupKey}`}
        sx={{ 
          backgroundColor: 'grey.100',
          '&:hover': { backgroundColor: 'grey.200' }
        }}
      >
        <TableCell
          colSpan={columns.length}
          sx={{ 
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          onClick={() => toggleGroupExpansion(group.groupKey)}
        >
          <IconButton size="small">
            {group.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Chip 
            label={`${group.rows.length} item${group.rows.length !== 1 ? 's' : ''}`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Typography variant="body2" fontWeight="medium">
            {String(group.groupValue)}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  const renderRows = (rows: T[]) => {
    return rows.map((row, index) => (
      <TableRow
        key={getRowKey(row, index)}
        hover={hover}
        onClick={() => onRowClick && onRowClick(row)}
        sx={{
          cursor: onRowClick ? 'pointer' : 'default',
          '&:hover': onRowClick ? {
            backgroundColor: 'action.hover'
          } : {}
        }}
      >
        {columns.map((column) => (
          <TableCell
            key={String(column.id)}
            sx={{ textAlign: column.align || 'left' }}
          >
            {column.render
              ? column.render(row[column.id], row)
              : String(row[column.id] || '')}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2,
        maxHeight: 'calc(100vh - 400px)', // Altura máxima mais conservadora
        minHeight: '400px', // Altura mínima para garantir visibilidade
        overflow: 'auto',
        flex: 1
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  width: column.width,
                  textAlign: column.align || 'left',
                  cursor: (column.sortable || column.groupable) ? 'pointer' : 'default',
                  zIndex: 2,
                  position: 'sticky',
                  top: 0,
                  '&:hover': (column.sortable || column.groupable) ? {
                    backgroundColor: 'primary.dark'
                  } : {}
                }}
                onClick={() => {
                  if (column.sortable) {
                    handleSort(column.id);
                  } else if (column.groupable) {
                    handleGroupBy(column.id);
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">
                    {column.label}
                  </Typography>
                  {column.sortable && (
                    <IconButton
                      size="small"
                      sx={{ color: 'white', p: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort(column.id);
                      }}
                    >
                      {getSortIcon(column.id)}
                    </IconButton>
                  )}
                  {column.groupable && groupBy === column.id && (
                    <Chip 
                      label="Agrupado"
                      size="small"
                      color="secondary"
                      sx={{ color: 'white', borderColor: 'white' }}
                      variant="outlined"
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData ? (
            groupedData.map((group) => (
              <React.Fragment key={group.groupKey}>
                {renderGroupHeader(group)}
                <TableRow>
                  <TableCell colSpan={columns.length} sx={{ p: 0, border: 0 }}>
                    <Collapse in={group.expanded} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableBody>
                          {renderRows(group.rows)}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            renderRows(displayData)
          )}
        </TableBody>
      </Table>
      
      {data.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      )}
      
      {pagination && data.length > 0 && (
        <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={(_, newPage) => onPageChange?.(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value, 10))}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Box>
      )}
    </TableContainer>
  );
}

export default BaseTable; 