import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ClienteNormalizado } from '../types';
import { formatarMoeda, formatarData } from '../utils/clientesUtils';
import { gerarCoresGrafico } from '../utils/estatisticasUtils';

interface ClienteEstatisticasProps {
  open: boolean;
  onClose: () => void;
  cliente: ClienteNormalizado | null;
}

const ClienteEstatisticas: React.FC<ClienteEstatisticasProps> = ({
  open,
  onClose,
  cliente
}) => {
  if (!cliente) return null;

  // Preparar dados para gráficos
  const dadosVendas = cliente.vendas.map(venda => ({
    data: formatarData(venda.data),
    valor: venda.valor,
    dataOriginal: venda.data
  })).sort((a, b) => new Date(a.dataOriginal).getTime() - new Date(b.dataOriginal).getTime());

  const dadosPizza = [
    { name: 'Total de Vendas', value: cliente.totalVendas },
    { name: 'Média de Vendas', value: cliente.mediaVendas }
  ];

  const cores = gerarCoresGrafico(2);

  // Calcular estatísticas adicionais
  const totalVendas = cliente.vendas.length;
  const valorMedio = cliente.totalVendas / totalVendas;
  const maiorVenda = Math.max(...cliente.vendas.map(v => v.valor));
  const menorVenda = Math.min(...cliente.vendas.map(v => v.valor));
  
  // Calcular frequência média entre compras
  const datasOrdenadas = cliente.vendas
    .map(v => new Date(v.data))
    .sort((a, b) => a.getTime() - b.getTime());
  
  let frequenciaMedia = 0;
  if (datasOrdenadas.length > 1) {
    const diferencas = [];
    for (let i = 1; i < datasOrdenadas.length; i++) {
      const diff = datasOrdenadas[i].getTime() - datasOrdenadas[i-1].getTime();
      diferencas.push(diff / (1000 * 60 * 60 * 24)); // Converter para dias
    }
    frequenciaMedia = diferencas.reduce((sum, diff) => sum + diff, 0) / diferencas.length;
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <BarChartIcon color="primary" />
          <Typography variant="h6">
            📊 Estatísticas de {cliente.nomeCompleto}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Análise detalhada do comportamento de compras e métricas financeiras
          </Typography>
        </Box>

        {/* Métricas Principais */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center', flex: '1 1 200px', minWidth: '200px' }}>
            <MoneyIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" color="primary">
              {formatarMoeda(cliente.totalVendas)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Vendas
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2, textAlign: 'center', flex: '1 1 200px', minWidth: '200px' }}>
            <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" color="success.main">
              {formatarMoeda(cliente.mediaVendas)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Média por Venda
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2, textAlign: 'center', flex: '1 1 200px', minWidth: '200px' }}>
            <CartIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" color="info.main">
              {totalVendas}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Compras
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2, textAlign: 'center', flex: '1 1 200px', minWidth: '200px' }}>
            <CalendarIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" color="warning.main">
              {cliente.frequenciaCompras} dias
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Frequência de Compras
            </Typography>
          </Paper>
        </Box>

        {/* Gráficos */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Gráfico de linha - Evolução das vendas */}
          <Paper sx={{ p: 3, flex: '2 1 600px', minWidth: '400px' }}>
            <Typography variant="h6" gutterBottom>
              📈 Evolução das Vendas ao Longo do Tempo
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosVendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="data" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => formatarMoeda(value)}
                />
                <Tooltip 
                  formatter={(value: number) => [formatarMoeda(value), 'Valor da Venda']}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          {/* Gráfico de pizza - Distribuição */}
          <Paper sx={{ p: 3, flex: '1 1 300px', minWidth: '300px' }}>
            <Typography variant="h6" gutterBottom>
              🥧 Distribuição de Vendas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPizza}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                >
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatarMoeda(value), 'Valor']} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Estatísticas Detalhadas */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Paper sx={{ p: 3, flex: '1 1 400px', minWidth: '400px' }}>
            <Typography variant="h6" gutterBottom>
              📋 Métricas Detalhadas
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Valor Médio por Compra"
                  secondary={formatarMoeda(valorMedio)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUpIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Maior Venda"
                  secondary={formatarMoeda(maiorVenda)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUpIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Menor Venda"
                  secondary={formatarMoeda(menorVenda)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Frequência Média Entre Compras"
                  secondary={`${frequenciaMedia.toFixed(1)} dias`}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, flex: '1 1 400px', minWidth: '400px' }}>
            <Typography variant="h6" gutterBottom>
              🏷️ Informações do Cliente
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Nome Completo"
                  secondary={cliente.nomeCompleto}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={cliente.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Data de Nascimento"
                  secondary={formatarData(cliente.nascimento)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={
                    <Chip 
                      label={cliente.frequenciaCompras < 30 ? "Cliente Ativo" : "Cliente Regular"}
                      color={cliente.frequenciaCompras < 30 ? "success" : "default"}
                      size="small"
                    />
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClienteEstatisticas; 