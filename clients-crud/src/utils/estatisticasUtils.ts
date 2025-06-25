import { ClienteNormalizado } from '../types';

/**
 * Formata um valor numérico para moeda brasileira
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

/**
 * Formata uma data para o formato brasileiro
 */
export const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

/**
 * Calcula métricas gerais baseadas na lista de clientes
 */
export const calcularMetricasGerais = (clientes: ClienteNormalizado[]) => {
  if (!clientes.length) return null;

  const totalVendas = clientes.reduce((sum, cliente) => sum + cliente.totalVendas, 0);
  const mediaVendas = totalVendas / clientes.length;
  const totalVendasGeral = clientes.reduce((sum, cliente) => 
    sum + cliente.vendas.reduce((vSum, venda) => vSum + venda.valor, 0), 0
  );
  const clientesAtivos = clientes.filter(cliente => cliente.frequenciaCompras > 1).length;
  const frequenciaMedia = clientes.reduce((sum, c) => sum + c.frequenciaCompras, 0) / clientes.length;

  return {
    totalVendas,
    mediaVendas,
    totalVendasGeral,
    clientesAtivos,
    totalClientes: clientes.length,
    frequenciaMedia
  };
};

/**
 * Prepara dados para gráfico de pizza (top 5 clientes)
 */
export const prepararDadosPizza = (clientes: ClienteNormalizado[]) => {
  return clientes.slice(0, 5).map(cliente => ({
    name: cliente.nomeCompleto.split(' ')[0],
    value: cliente.totalVendas
  }));
};

/**
 * Prepara dados para gráfico de barras (top 8 clientes)
 */
export const prepararDadosBarras = (clientes: ClienteNormalizado[]) => {
  return clientes.slice(0, 8).map(cliente => ({
    nome: cliente.nomeCompleto.split(' ')[0],
    totalVendas: cliente.totalVendas,
    mediaVendas: cliente.mediaVendas,
    frequencia: cliente.frequenciaCompras
  }));
};

/**
 * Ordena clientes por total de vendas (decrescente)
 */
export const ordenarClientesPorVendas = (clientes: ClienteNormalizado[]) => {
  return [...clientes].sort((a, b) => b.totalVendas - a.totalVendas);
};

/**
 * Obtém os top N clientes por total de vendas
 */
export const obterTopClientes = (clientes: ClienteNormalizado[], quantidade: number = 5) => {
  return ordenarClientesPorVendas(clientes).slice(0, quantidade);
};

/**
 * Calcula estatísticas de vendas por período
 */
export const calcularEstatisticasPorPeriodo = (clientes: ClienteNormalizado[]) => {
  const hoje = new Date();
  const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sessentaDiasAtras = new Date(hoje.getTime() - 60 * 24 * 60 * 60 * 1000);

  const vendasUltimos30Dias = clientes.reduce((total, cliente) => {
    const vendasRecentes = cliente.vendas.filter(venda => 
      new Date(venda.data) >= trintaDiasAtras
    );
    return total + vendasRecentes.reduce((sum, venda) => sum + venda.valor, 0);
  }, 0);

  const vendasUltimos60Dias = clientes.reduce((total, cliente) => {
    const vendasRecentes = cliente.vendas.filter(venda => 
      new Date(venda.data) >= sessentaDiasAtras
    );
    return total + vendasRecentes.reduce((sum, venda) => sum + venda.valor, 0);
  }, 0);

  return {
    vendasUltimos30Dias,
    vendasUltimos60Dias,
    crescimento30Dias: vendasUltimos30Dias > 0 ? 
      ((vendasUltimos30Dias - vendasUltimos60Dias / 2) / (vendasUltimos60Dias / 2)) * 100 : 0
  };
};

/**
 * Gera cores para gráficos baseadas em um array de cores
 */
export const gerarCoresGrafico = (quantidade: number, coresBase: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']) => {
  const cores = [];
  for (let i = 0; i < quantidade; i++) {
    cores.push(coresBase[i % coresBase.length]);
  }
  return cores;
};

/**
 * Formata percentual com 1 casa decimal
 */
export const formatarPercentual = (valor: number): string => {
  return `${valor.toFixed(1)}%`;
};

/**
 * Formata número com separadores de milhares
 */
export const formatarNumero = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR').format(valor);
}; 