// Utilitários de clientes
export {
  getPrimeiraLetra,
  getFaixaVendas,
  getFaixaFrequencia,
  getMesNascimento
} from './clientesUtils';

export * from './clientesOptions';

// Utilitários de estatísticas
export {
  formatarMoeda as formatarMoedaEstatisticas,
  formatarData as formatarDataEstatisticas,
  calcularMetricasGerais,
  prepararDadosPizza,
  prepararDadosBarras,
  ordenarClientesPorVendas,
  obterTopClientes,
  calcularEstatisticasPorPeriodo,
  gerarCoresGrafico,
  formatarPercentual,
  formatarNumero
} from './estatisticasUtils'; 