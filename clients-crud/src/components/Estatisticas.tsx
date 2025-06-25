import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  List
} from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { api, normalizarClientes } from '../services/api';
import { EstatisticasGerais, ClienteNormalizado } from '../types';
import {
  BaseMetricCard,
  BaseClienteCard,
  BaseClienteListItem,
  BaseChartContainer
} from './base';
import {
  formatarMoeda,
  calcularMetricasGerais,
  prepararDadosPizza,
  prepararDadosBarras,
  obterTopClientes,
  gerarCoresGrafico
} from '../utils/estatisticasUtils';

const COLORS = gerarCoresGrafico(5);

const Estatisticas: React.FC = () => {
  const [estatisticas, setEstatisticas] = useState<EstatisticasGerais | null>(null);
  const [clientes, setClientes] = useState<ClienteNormalizado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [estatisticasData, clientesResponse] = await Promise.all([
          api.obterEstatisticas(),
          api.listarClientes()
        ]);
        
        setEstatisticas(estatisticasData);
        const clientesNormalizados = normalizarClientes(clientesResponse);
        setClientes(clientesNormalizados);
      } catch (error) {
        setErro('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (erro) {
    return <Alert severity="error">{erro}</Alert>;
  }

  if (!estatisticas) {
    return <Alert severity="info">Nenhuma estatística disponível</Alert>;
  }

  const metricas = calcularMetricasGerais(clientes);
  const dadosPizza = prepararDadosPizza(clientes);
  const dadosBarras = prepararDadosBarras(clientes);
  const topClientes = obterTopClientes(clientes, 5);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      overflow: 'auto'
    }}>
      <Typography variant="h4" gutterBottom>
        📊 Dashboard de Estatísticas
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Análise completa do desempenho dos clientes e métricas de vendas
      </Typography>

      {/* Métricas Gerais */}
      <Typography variant="h5" gutterBottom>
        📈 Métricas Gerais
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <BaseMetricCard
          title="Total de Vendas"
          value={formatarMoeda(metricas?.totalVendasGeral || 0)}
          icon={MoneyIcon}
          iconColor="success"
          valueColor="success"
        />
        <BaseMetricCard
          title="Média por Cliente"
          value={formatarMoeda(metricas?.mediaVendas || 0)}
          icon={TrendingUpIcon}
          iconColor="info"
          valueColor="info"
        />
        <BaseMetricCard
          title="Clientes Ativos"
          value={`${metricas?.clientesAtivos || 0} de ${metricas?.totalClientes || 0}`}
          icon={PeopleIcon}
          iconColor="warning"
          valueColor="warning"
        />
        <BaseMetricCard
          title="Frequência Média"
          value={`${(metricas?.frequenciaMedia || 0).toFixed(1)} dias`}
          icon={CartIcon}
          iconColor="secondary"
          valueColor="secondary"
        />
      </Box>

      {/* Gráficos */}
      <Typography variant="h5" gutterBottom>
        📈 Gráficos de Análise
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {/* Gráfico de barras - Top 8 clientes */}
        <BaseChartContainer title="🏆 Top 8 Clientes por Volume de Vendas" flex="1 1 600px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis tickFormatter={(value) => formatarMoeda(value)} />
              <Tooltip formatter={(value: number) => [formatarMoeda(value), 'Total de Vendas']} />
              <Bar dataKey="totalVendas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </BaseChartContainer>

        {/* Gráfico de pizza - Distribuição */}
        <BaseChartContainer title="🥧 Distribuição de Vendas (Top 5)" flex="1 1 400px">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dadosPizza}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
              >
                {dadosPizza.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatarMoeda(value), 'Total de Vendas']} />
            </PieChart>
          </ResponsiveContainer>
        </BaseChartContainer>
      </Box>

      {/* Cards de destaque */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🎯 Clientes em Destaque
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {/* Cliente com maior volume */}
        {estatisticas.clienteMaiorVolume && (
          <BaseClienteCard
            cliente={estatisticas.clienteMaiorVolume}
            tipo="volume"
            valor={formatarMoeda(estatisticas.clienteMaiorVolume.totalVendas)}
            descricao={`${estatisticas.clienteMaiorVolume.frequenciaCompras} dias únicos de compra`}
          />
        )}

        {/* Cliente com maior média */}
        {estatisticas.clienteMaiorMedia && (
          <BaseClienteCard
            cliente={estatisticas.clienteMaiorMedia}
            tipo="media"
            valor={formatarMoeda(estatisticas.clienteMaiorMedia.mediaVendas)}
            descricao="Média por venda"
          />
        )}

        {/* Cliente com maior frequência */}
        {estatisticas.clienteMaiorFrequencia && (
          <BaseClienteCard
            cliente={estatisticas.clienteMaiorFrequencia}
            tipo="frequencia"
            valor={`${estatisticas.clienteMaiorFrequencia.frequenciaCompras} dias`}
            descricao="Dias únicos com compras"
          />
        )}
      </Box>

      {/* Lista dos top 5 clientes */}
      <Paper sx={{ p: 3, mt: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          📋 Ranking Completo dos Clientes
        </Typography>
        <List>
          {topClientes.map((cliente, index) => (
            <BaseClienteListItem
              key={cliente.id}
              cliente={cliente}
              index={index}
              colors={COLORS}
              formatarMoeda={formatarMoeda}
              showDivider={index < 4}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Estatisticas; 