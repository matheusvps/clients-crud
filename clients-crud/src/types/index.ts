export interface Venda {
  data: string;
  valor: number;
}

export interface DetalhesCliente {
  email: string;
  nascimento: string;
}

export interface InfoCliente {
  nomeCompleto: string;
  detalhes: DetalhesCliente;
}

export interface EstatisticasCliente {
  vendas: Venda[];
}

export interface Cliente {
  info: InfoCliente;
  duplicado?: {
    nomeCompleto: string;
  };
  estatisticas: EstatisticasCliente;
}

export interface Meta {
  registroTotal: number;
  pagina: number;
}

export interface Redundante {
  status: string;
}

export interface ApiResponse {
  data: {
    clientes: Cliente[];
  };
  meta: Meta;
  redundante: Redundante;
}

export interface ClienteNormalizado {
  id: string;
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
  totalVendas: number;
  mediaVendas: number;
  frequenciaCompras: number;
  primeiraLetraFaltante: string;
}

export interface EstatisticasGerais {
  totalVendasPorDia: { data: string; total: number }[];
  clienteMaiorVolume: ClienteNormalizado | null;
  clienteMaiorMedia: ClienteNormalizado | null;
  clienteMaiorFrequencia: ClienteNormalizado | null;
}

export interface LoginForm {
  email: string;
  senha: string;
} 