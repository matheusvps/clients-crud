import { ApiResponse, EstatisticasGerais, ClienteNormalizado } from '../types';

// Dados mockados expandidos da API
const mockApiResponse: ApiResponse = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: "Ana Beatriz Silva Santos",
          detalhes: {
            email: "ana.b@example.com",
            nascimento: "1992-05-01"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 150 },
            { data: "2024-01-02", valor: 50 },
            { data: "2024-01-05", valor: 200 },
            { data: "2024-01-10", valor: 75 },
            { data: "2024-01-15", valor: 120 },
            { data: "2024-01-20", valor: 90 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Carlos Eduardo Oliveira",
          detalhes: {
            email: "cadu@example.com",
            nascimento: "1987-08-15"
          }
        },
        duplicado: {
          nomeCompleto: "Carlos Eduardo Oliveira"
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-03", valor: 300 },
            { data: "2024-01-08", valor: 120 },
            { data: "2024-01-12", valor: 80 },
            { data: "2024-01-18", valor: 250 },
            { data: "2024-01-25", valor: 180 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Maria Fernanda Costa",
          detalhes: {
            email: "maria.fernanda@example.com",
            nascimento: "1995-12-20"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 100 },
            { data: "2024-01-04", valor: 250 },
            { data: "2024-01-07", valor: 180 },
            { data: "2024-01-11", valor: 90 },
            { data: "2024-01-15", valor: 220 },
            { data: "2024-01-22", valor: 150 },
            { data: "2024-01-28", valor: 300 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "João Pedro Lima",
          detalhes: {
            email: "joao.pedro@example.com",
            nascimento: "1990-03-10"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-02", valor: 80 },
            { data: "2024-01-06", valor: 150 },
            { data: "2024-01-14", valor: 200 },
            { data: "2024-01-21", valor: 120 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Beatriz Almeida",
          detalhes: {
            email: "beatriz.almeida@example.com",
            nascimento: "1988-07-25"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 120 },
            { data: "2024-01-03", valor: 90 },
            { data: "2024-01-09", valor: 160 },
            { data: "2024-01-14", valor: 110 },
            { data: "2024-01-19", valor: 180 },
            { data: "2024-01-26", valor: 140 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Lucas Mendes Xavier",
          detalhes: {
            email: "lucas.mendes@example.com",
            nascimento: "1993-11-08"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-05", valor: 400 },
            { data: "2024-01-12", valor: 280 },
            { data: "2024-01-19", valor: 320 },
            { data: "2024-01-26", valor: 450 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Isabella Rodrigues",
          detalhes: {
            email: "isabella.rodrigues@example.com",
            nascimento: "1991-04-15"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-03", valor: 95 },
            { data: "2024-01-08", valor: 130 },
            { data: "2024-01-16", valor: 85 },
            { data: "2024-01-23", valor: 110 },
            { data: "2024-01-29", valor: 95 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Rafael Santos Costa",
          detalhes: {
            email: "rafael.santos@example.com",
            nascimento: "1989-09-22"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-02", valor: 200 },
            { data: "2024-01-09", valor: 150 },
            { data: "2024-01-17", valor: 180 },
            { data: "2024-01-24", valor: 220 },
            { data: "2024-01-30", valor: 190 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Gabriela Oliveira Silva",
          detalhes: {
            email: "gabriela.oliveira@example.com",
            nascimento: "1994-06-30"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-04", valor: 175 },
            { data: "2024-01-11", valor: 125 },
            { data: "2024-01-18", valor: 200 },
            { data: "2024-01-25", valor: 160 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Thiago Pereira Lima",
          detalhes: {
            email: "thiago.pereira@example.com",
            nascimento: "1986-02-14"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-06", valor: 300 },
            { data: "2024-01-13", valor: 250 },
            { data: "2024-01-20", valor: 180 },
            { data: "2024-01-27", valor: 220 }
          ]
        }
      }
    ]
  },
  meta: {
    registroTotal: 10,
    pagina: 1
  },
  redundante: {
    status: "ok"
  }
};

// Função utilitária para gerar clientes extras
function generateAdditionalClients(): any[] {
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
  const clientes: any[] = [];
  for (let i = 0; i < 30; i++) {
    clientes.push({
      info: {
        nomeCompleto: nomes[i],
        detalhes: {
          email: emails[i],
          nascimento: new Date(1980 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10)
        }
      },
      estatisticas: {
        vendas: [
          { data: '2024-01-01', valor: Math.floor(Math.random() * 1000) + 100 },
          { data: '2024-01-10', valor: Math.floor(Math.random() * 1000) + 100 },
          { data: '2024-01-20', valor: Math.floor(Math.random() * 1000) + 100 }
        ]
      }
    });
  }
  return clientes;
}

// Adiciona os clientes extras ao mockApiResponse
mockApiResponse.data.clientes = [
  ...mockApiResponse.data.clientes,
  ...generateAdditionalClients()
];

// Função para normalizar dados da API
export const normalizarClientes = (apiResponse: ApiResponse): ClienteNormalizado[] => {
  return apiResponse.data.clientes.map((cliente, index) => {
    const vendas = cliente.estatisticas.vendas;
    const totalVendas = vendas.reduce((sum, venda) => sum + venda.valor, 0);
    const mediaVendas = vendas?.length > 0 ? totalVendas / vendas.length : 0;
    const diasUnicos = new Set(vendas.map(v => v.data)).size;
    
    // Encontrar primeira letra faltante no alfabeto
    const nomeCompleto = cliente.info.nomeCompleto.toLowerCase();
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let primeiraLetraFaltante = '-';
    
    for (let letra of alfabeto) {
      if (!nomeCompleto.includes(letra)) {
        primeiraLetraFaltante = letra.toUpperCase();
        break;
      }
    }

    return {
      id: `cliente-${index}`,
      nomeCompleto: cliente.info.nomeCompleto,
      email: cliente.info.detalhes.email,
      nascimento: cliente.info.detalhes.nascimento,
      vendas,
      totalVendas,
      mediaVendas,
      frequenciaCompras: diasUnicos,
      primeiraLetraFaltante
    };
  });
};

// Função para filtrar clientes
export const filtrarClientes = (
  clientes: ClienteNormalizado[], 
  filtros: {
    nome?: string;
    email?: string;
    minVendas?: number;
    maxVendas?: number;
    ordenacao?: 'nome' | 'totalVendas' | 'mediaVendas' | 'frequenciaCompras';
    direcao?: 'asc' | 'desc';
  }
): ClienteNormalizado[] => {
  let clientesFiltrados = [...clientes];

  // Filtro por nome
  if (filtros.nome) {
    clientesFiltrados = clientesFiltrados.filter(cliente =>
      cliente.nomeCompleto.toLowerCase().includes(filtros.nome!.toLowerCase())
    );
  }

  // Filtro por email
  if (filtros.email) {
    clientesFiltrados = clientesFiltrados.filter(cliente =>
      cliente.email.toLowerCase().includes(filtros.email!.toLowerCase())
    );
  }

  // Filtro por valor mínimo de vendas
  if (filtros.minVendas !== undefined) {
    clientesFiltrados = clientesFiltrados.filter(cliente =>
      cliente.totalVendas >= filtros.minVendas!
    );
  }

  // Filtro por valor máximo de vendas
  if (filtros.maxVendas !== undefined) {
    clientesFiltrados = clientesFiltrados.filter(cliente =>
      cliente.totalVendas <= filtros.maxVendas!
    );
  }

  // Ordenação
  if (filtros.ordenacao) {
    clientesFiltrados.sort((a, b) => {
      let valorA: string | number;
      let valorB: string | number;

      switch (filtros.ordenacao) {
        case 'nome':
          valorA = a.nomeCompleto;
          valorB = b.nomeCompleto;
          break;
        case 'totalVendas':
          valorA = a.totalVendas;
          valorB = b.totalVendas;
          break;
        case 'mediaVendas':
          valorA = a.mediaVendas;
          valorB = b.mediaVendas;
          break;
        case 'frequenciaCompras':
          valorA = a.frequenciaCompras;
          valorB = b.frequenciaCompras;
          break;
        default:
          return 0;
      }

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return filtros.direcao === 'desc' 
          ? valorB.localeCompare(valorA)
          : valorA.localeCompare(valorB);
      } else {
        return filtros.direcao === 'desc'
          ? (valorB as number) - (valorA as number)
          : (valorA as number) - (valorB as number);
      }
    });
  }

  return clientesFiltrados;
};

// Simular delay da API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Listar clientes
  async listarClientes(): Promise<ApiResponse> {
    await delay(800);
    return mockApiResponse;
  },

  // Obter estatísticas
  async obterEstatisticas(): Promise<EstatisticasGerais> {
    await delay(600);
    
    const clientesNormalizados = normalizarClientes(mockApiResponse);
    
    // Calcular total de vendas por dia
    const vendasPorDia = new Map<string, number>();
    clientesNormalizados.forEach(cliente => {
      cliente.vendas.forEach(venda => {
        const data = venda.data;
        vendasPorDia.set(data, (vendasPorDia.get(data) || 0) + venda.valor);
      });
    });
    
    const totalVendasPorDia = Array.from(vendasPorDia.entries())
      .map(([data, total]) => ({ data, total }))
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    // Encontrar clientes com maiores valores
    const clienteMaiorVolume = clientesNormalizados.reduce((max, cliente) => 
      cliente.totalVendas > max.totalVendas ? cliente : max, clientesNormalizados[0]);
    
    const clienteMaiorMedia = clientesNormalizados.reduce((max, cliente) => 
      cliente.mediaVendas > max.mediaVendas ? cliente : max, clientesNormalizados[0]);
    
    const clienteMaiorFrequencia = clientesNormalizados.reduce((max, cliente) => 
      cliente.frequenciaCompras > max.frequenciaCompras ? cliente : max, clientesNormalizados[0]);

    return {
      totalVendasPorDia,
      clienteMaiorVolume,
      clienteMaiorMedia,
      clienteMaiorFrequencia
    };
  },

  // Autenticação mockada
  async login(email: string, senha: string): Promise<{ token: string; usuario: string }> {
    await delay(500);
    
    if (email === 'admin@example.com' && senha === '123456') {
      return {
        token: 'mock-jwt-token-12345',
        usuario: 'Administrador'
      };
    }
    
    throw new Error('Credenciais inválidas');
  }
}; 