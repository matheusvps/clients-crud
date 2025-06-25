export const getPrimeiraLetra = (nome: string) => nome.charAt(0).toUpperCase();

export const getFaixaVendas = (totalVendas: number) => {
  if (totalVendas < 1000) return 'Até R$ 1.000';
  if (totalVendas < 5000) return 'R$ 1.000 - R$ 5.000';
  if (totalVendas < 10000) return 'R$ 5.000 - R$ 10.000';
  return 'Acima de R$ 10.000';
};

export const getFaixaFrequencia = (frequencia: number) => {
  if (frequencia <= 30) return 'Muito Frequente (≤ 30 dias)';
  if (frequencia <= 60) return 'Frequente (31-60 dias)';
  if (frequencia <= 90) return 'Moderado (61-90 dias)';
  return 'Ocasional (> 90 dias)';
};

export const getMesNascimento = (data: string) => {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const mes = new Date(data).getMonth();
  return meses[mes];
};

export const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR');
};

export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}; 