import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { api, normalizarClientes, filtrarClientes } from '../services/api';
import { ClienteNormalizado } from '../types';
import {
  BaseTable,
  BaseFilter,
  BaseSelectFilter,
  BaseFilterPanel,
  BaseGroupStats,
  BaseGroupDialog,
  Column,
  SortConfig,
  GroupConfig,
} from './base';
import {
  getPrimeiraLetra,
  getFaixaVendas,
  getFaixaFrequencia,
  getMesNascimento,
  formatarData,
  formatarMoeda
} from '../utils/clientesUtils';
import { ordenacaoOptions, direcaoOptions } from '../utils/clientesOptions';
import ClienteEstatisticas from './ClienteEstatisticas';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteNormalizado[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<ClienteNormalizado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [estatisticasOpen, setEstatisticasOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteNormalizado | null>(null);

  // Estados dos filtros
  const [filtros, setFiltros] = useState({
    nome: '',
    email: '',
    minVendas: '',
    maxVendas: '',
    ordenacao: 'nome' as 'nome' | 'totalVendas' | 'mediaVendas' | 'frequenciaCompras',
    direcao: 'asc' as 'asc' | 'desc'
  });

  // Estado para ordenação da tabela
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'nomeCompleto',
    direction: 'asc'
  });

  // Estado para agrupamento da tabela
  const [groupBy, setGroupBy] = useState<keyof ClienteNormalizado | undefined>(undefined);
  const [groupConfigs, setGroupConfigs] = useState<GroupConfig[]>([]);

  // Estados de paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Gerar dados de clientes adicionais para teste
  const generateAdditionalClients = () => {
    const additionalClients: ClienteNormalizado[] = [];
    const nomes = [
      'Ana Silva', 'Bruno Santos', 'Carla Oliveira', 'Diego Costa', 'Elena Ferreira',
      'Fernando Lima', 'Gabriela Rocha', 'Henrique Alves', 'Isabela Martins', 'João Pereira',
      'Karina Souza', 'Lucas Rodrigues', 'Mariana Cardoso', 'Nicolas Barbosa', 'Olivia Castro',
      'Pedro Mendes', 'Quiteria Santos', 'Rafael Silva', 'Sofia Costa', 'Thiago Oliveira',
      'Ursula Lima', 'Vitor Martins', 'Wanda Silva', 'Xavier Costa', 'Yara Santos',
      'Zé Silva', 'Alice Costa', 'Bob Santos', 'Carol Lima', 'David Martins', 'Eva Silva'
    ];
    
    const emails = [
      'ana@email.com', 'bruno@email.com', 'carla@email.com', 'diego@email.com', 'elena@email.com',
      'fernando@email.com', 'gabriela@email.com', 'henrique@email.com', 'isabela@email.com', 'joao@email.com',
      'karina@email.com', 'lucas@email.com', 'mariana@email.com', 'nicolas@email.com', 'olivia@email.com',
      'pedro@email.com', 'quiteria@email.com', 'rafael@email.com', 'sofia@email.com', 'thiago@email.com',
      'ursula@email.com', 'vitor@email.com', 'wanda@email.com', 'xavier@email.com', 'yara@email.com',
      'ze@email.com', 'alice@email.com', 'bob@email.com', 'carol@email.com', 'david@email.com', 'eva@email.com'
    ];

    for (let i = 0; i < 30; i++) {
      const totalVendas = Math.floor(Math.random() * 15000) + 500;
      const mediaVendas = totalVendas / (Math.floor(Math.random() * 10) + 1);
      const frequenciaCompras = Math.floor(Math.random() * 120) + 15;
      
      additionalClients.push({
        id: `cliente-${i + 100}`,
        nomeCompleto: nomes[i],
        email: emails[i],
        nascimento: new Date(1980 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        vendas: [],
        totalVendas,
        mediaVendas,
        frequenciaCompras,
        primeiraLetraFaltante: Math.random() > 0.7 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : '-'
      });
    }
    
    return additionalClients;
  };

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        setLoading(true);
        const response = await api.listarClientes();
        const clientesNormalizados = normalizarClientes(response);
        
        // Adicionar clientes extras para teste
        const clientesExtras = generateAdditionalClients();
        const todosClientes = [...clientesNormalizados, ...clientesExtras];
        
        setClientes(todosClientes);
        setClientesFiltrados(todosClientes);
      } catch (error) {
        setErro('Erro ao carregar clientes');
      } finally {
        setLoading(false);
      }
    };

    carregarClientes();
  }, []);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    const clientesFiltrados = filtrarClientes(clientes, {
      nome: filtros.nome || undefined,
      email: filtros.email || undefined,
      minVendas: filtros.minVendas ? Number(filtros.minVendas) : undefined,
      maxVendas: filtros.maxVendas ? Number(filtros.maxVendas) : undefined,
      ordenacao: filtros.ordenacao,
      direcao: filtros.direcao
    });
    setClientesFiltrados(clientesFiltrados);
    setPage(0); // Resetar página quando filtrar
  }, [clientes, filtros]);

  const limparFiltros = () => {
    setFiltros({
      nome: '',
      email: '',
      minVendas: '',
      maxVendas: '',
      ordenacao: 'nome',
      direcao: 'asc'
    });
    setSortConfig({
      key: 'nomeCompleto',
      direction: 'asc'
    });
    setGroupBy(undefined);
    setGroupConfigs([]);
    setPage(0);
  };

  const handleSort = (key: keyof ClienteNormalizado) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    
    setSortConfig({ key, direction });
    
    // Atualizar também os filtros de ordenação
    const ordenacaoMap: Record<keyof ClienteNormalizado, string> = {
      nomeCompleto: 'nome',
      totalVendas: 'totalVendas',
      mediaVendas: 'mediaVendas',
      frequenciaCompras: 'frequenciaCompras',
      id: 'nome',
      email: 'nome',
      nascimento: 'nome',
      vendas: 'nome',
      primeiraLetraFaltante: 'nome'
    };
    
    setFiltros(prev => ({
      ...prev,
      ordenacao: ordenacaoMap[key] as any,
      direcao: direction
    }));
  };

  const handleGroupByChange = (key: keyof ClienteNormalizado | undefined) => {
    setGroupBy(key);
    if (key) {
      // Criar configurações iniciais para os grupos
      const uniqueValues = Array.from(new Set(clientesFiltrados.map(cliente => String(cliente[key]))));
      const newConfigs: GroupConfig[] = uniqueValues.map(value => ({
        key: value,
        expanded: true
      }));
      setGroupConfigs(newConfigs);
    } else {
      setGroupConfigs([]);
    }
  };

  const handleGroupDialogClose = () => {
    setGroupDialogOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleVerEstatisticas = (cliente: ClienteNormalizado) => {
    setClienteSelecionado(cliente);
    setEstatisticasOpen(true);
  };

  const handleFecharEstatisticas = () => {
    setEstatisticasOpen(false);
    setClienteSelecionado(null);
  };

  // Configuração das colunas da tabela
  const columns: Column<ClienteNormalizado>[] = useMemo(() => [
    {
      id: 'nomeCompleto',
      label: 'Nome Completo',
      sortable: true,
      groupable: true,
      groupTransform: getPrimeiraLetra,
      render: (value) => (
        <Typography variant="body1" fontWeight="medium">
          {value}
        </Typography>
      )
    },
    {
      id: 'email',
      label: 'Email',
      sortable: true,
      groupable: true
    },
    {
      id: 'nascimento',
      label: 'Data de Nascimento',
      sortable: true,
      groupable: true,
      groupTransform: getMesNascimento,
      render: (value) => formatarData(value)
    },
    {
      id: 'totalVendas',
      label: 'Total de Vendas',
      sortable: true,
      groupable: true,
      groupTransform: getFaixaVendas,
      render: (value) => (
        <Chip 
          label={formatarMoeda(value)}
          color="success"
          size="small"
        />
      )
    },
    {
      id: 'mediaVendas',
      label: 'Média de Vendas',
      sortable: true,
      groupable: true,
      groupTransform: getFaixaVendas,
      render: (value) => (
        <Chip 
          label={formatarMoeda(value)}
          color="info"
          size="small"
        />
      )
    },
    {
      id: 'frequenciaCompras',
      label: 'Frequência de Compras',
      sortable: true,
      groupable: true,
      groupTransform: getFaixaFrequencia,
      render: (value) => (
        <Chip 
          label={`${value} dias`}
          color="primary"
          size="small"
        />
      )
    },
    {
      id: 'primeiraLetraFaltante',
      label: 'Primeira Letra Faltante',
      sortable: true,
      groupable: true,
      render: (value) => (
        <Tooltip title={value === '-' ? 'Todas as letras presentes' : `Letra faltante: ${value}`}>
          <Chip 
            label={value}
            color={value === '-' ? "default" : "secondary"}
            size="small"
          />
        </Tooltip>
      )
    },
    {
      id: 'acoes' as keyof ClienteNormalizado,
      label: 'Ações',
      sortable: false,
      groupable: false,
      width: '120px',
      align: 'center' as const,
      render: (_, row) => (
        <Tooltip title="Ver estatísticas do cliente">
          <IconButton
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleVerEstatisticas(row);
            }}
          >
            <BarChartIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ], []);

  // Calcular estatísticas dos grupos
  const groupStats = useMemo(() => {
    if (!groupBy) return null;

    const groupColumn = columns.find(col => col.id === groupBy);
    const uniqueValues = Array.from(new Set(
      clientesFiltrados.map(cliente => {
        const rawValue = cliente[groupBy];
        return groupColumn?.groupTransform 
          ? groupColumn.groupTransform(rawValue)
          : String(rawValue);
      })
    ));
    
    const groupLabels = uniqueValues.map(value => String(value));

    return {
      totalGroups: uniqueValues.length,
      totalItems: clientesFiltrados.length,
      groupBy: groupColumn?.label || String(groupBy),
      groupLabels
    };
  }, [clientesFiltrados, groupBy, columns]);

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

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      overflow: 'hidden'
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          Lista de Clientes ({clientesFiltrados.length} de {clientes.length})
          {groupBy && (
            <Chip 
              label={`Agrupado por: ${columns.find(col => col.id === groupBy)?.label}`}
              color="secondary"
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<GroupIcon />}
            onClick={() => setGroupDialogOpen(true)}
            color={groupBy ? "secondary" : "primary"}
          >
            Agrupar
          </Button>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
          >
            Filtros
          </Button>
        </Box>
      </Box>

      {/* Painel de Filtros */}
      <BaseFilterPanel
        expanded={filtrosAbertos}
        onToggle={() => setFiltrosAbertos(!filtrosAbertos)}
        onClear={limparFiltros}
      >
        <BaseFilter
          label="Nome"
          value={filtros.nome}
          onChange={(value) => setFiltros({ ...filtros, nome: value })}
          placeholder="Buscar por nome..."
        />
        <BaseFilter
          label="Email"
          value={filtros.email}
          onChange={(value) => setFiltros({ ...filtros, email: value })}
          placeholder="Buscar por email..."
          type="email"
        />
        <BaseFilter
          label="Vendas Mín."
          value={filtros.minVendas}
          onChange={(value) => setFiltros({ ...filtros, minVendas: value })}
          placeholder="0"
          type="number"
        />
        <BaseFilter
          label="Vendas Máx."
          value={filtros.maxVendas}
          onChange={(value) => setFiltros({ ...filtros, maxVendas: value })}
          placeholder="∞"
          type="number"
        />
        <BaseSelectFilter
          label="Ordenar por"
          value={filtros.ordenacao}
          onChange={(value) => setFiltros({ ...filtros, ordenacao: value as any })}
          options={ordenacaoOptions}
        />
        <BaseSelectFilter
          label="Direção"
          value={filtros.direcao}
          onChange={(value) => setFiltros({ ...filtros, direcao: value as 'asc' | 'desc' })}
          options={direcaoOptions}
        />
      </BaseFilterPanel>

      {/* Estatísticas dos Grupos */}
      {groupBy && groupStats && (
        <BaseGroupStats
          totalGroups={groupStats.totalGroups}
          totalItems={groupStats.totalItems}
          groupBy={groupStats.groupBy}
          groupLabels={groupStats.groupLabels}
        />
      )}

      {/* Tabela de Clientes */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <BaseTable
          data={clientesFiltrados}
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
          loading={loading}
          emptyMessage="Nenhum cliente encontrado com os filtros aplicados"
          rowKey={(row) => row.id}
          groupBy={groupBy}
          onGroupByChange={handleGroupByChange}
          groupConfigs={groupConfigs}
          onGroupConfigChange={setGroupConfigs}
          pagination={true}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>

      {/* Diálogo de Agrupamento */}
      <BaseGroupDialog
        open={groupDialogOpen}
        onClose={handleGroupDialogClose}
        columns={columns}
        currentGroupBy={groupBy ? String(groupBy) : undefined}
        onGroupByChange={(columnId) => {
          handleGroupByChange(columnId as keyof ClienteNormalizado | undefined);
          handleGroupDialogClose();
        }}
      />

      {/* Modal de Estatísticas do Cliente */}
      <ClienteEstatisticas
        open={estatisticasOpen}
        onClose={handleFecharEstatisticas}
        cliente={clienteSelecionado}
      />
    </Box>
  );
};

export default ClientesList; 