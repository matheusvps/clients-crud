import { SelectOption } from '../components/base';

export const ordenacaoOptions: SelectOption[] = [
  { value: 'nome', label: 'Nome' },
  { value: 'totalVendas', label: 'Total de Vendas' },
  { value: 'mediaVendas', label: 'Média de Vendas' },
  { value: 'frequenciaCompras', label: 'Frequência' }
];

export const direcaoOptions: SelectOption[] = [
  { value: 'asc', label: 'Crescente' },
  { value: 'desc', label: 'Decrescente' }
]; 