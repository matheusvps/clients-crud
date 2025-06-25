# 🧸 Sistema de Gerenciamento de Clientes - Loja de Brinquedos

Este é um frontend React mockado para um sistema de gerenciamento de clientes de uma loja de brinquedos, desenvolvido como parte de um teste técnico.

## 🌐 Acesso Online

**Aplicação disponível em:** [https://clients-crud-eight.vercel.app/](https://clients-crud-eight.vercel.app/)

## 🚀 Funcionalidades Implementadas

### ✅ Backend (Mockado)
- [x] API para listar clientes com dados normalizados
- [x] API de estatísticas com cálculos de performance
- [x] Sistema de autenticação mockado
- [x] Tratamento de dados desorganizados da API
- [x] **40 clientes mockados** com dados realistas (10 originais + 30 adicionais)
- [x] **Sistema de filtros avançados** (nome, email, vendas, ordenação)
- [x] **Sistema de agrupamento** por diferentes critérios
- [x] **Paginação** com controle de itens por página
- [x] **Ordenação dinâmica** da tabela

### ✅ Frontend
- [x] Interface moderna com Material-UI
- [x] Sistema de autenticação simples
- [x] Lista de clientes com informações normalizadas
- [x] **Filtros avançados** com accordion expansível
- [x] **Ordenação por múltiplos critérios**
- [x] **Sistema de agrupamento** com estatísticas por grupo
- [x] **Paginação** com navegação intuitiva
- [x] **Tabela responsiva** com ordenação por colunas
- [x] **Modal de estatísticas individuais** por cliente
- [x] Gráfico de vendas por dia usando Recharts
- [x] **Dashboard completo** com múltiplos gráficos
- [x] **Métricas gerais** em cards destacados
- [x] **Gráfico de barras** para top clientes
- [x] **Gráfico de pizza** para distribuição
- [x] **Ranking completo** dos clientes
- [x] Destaque visual dos clientes com melhor performance
- [x] Campo visual da primeira letra faltante no alfabeto
- [x] **Sistema de navegação por abas**
- [x] **Context API** para gerenciamento de estado
- [x] **Componentes base reutilizáveis**
- [x] **Utilitários para formatação** (moeda, datas, números)
- [x] Responsivo e com boa UX

## 🛠️ Tecnologias Utilizadas

- **React 19** com TypeScript
- **Material-UI v7** para interface
- **Recharts** para gráficos (linha, barras, pizza)
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Emotion** para estilização
- **Context API** para gerenciamento de estado

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd clients-crud
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm start
```

4. Acesse `http://localhost:3000` no navegador

## 🔐 Credenciais de Acesso

Para acessar o sistema, use as seguintes credenciais:
- **Email:** `admin@example.com`
- **Senha:** `123456`

## 📊 Funcionalidades Principais

### 1. Lista de Clientes com Filtros Avançados
- **40 clientes** com dados realistas e variados (10 originais + 30 gerados)
- **Filtros por:**
  - Nome (busca parcial)
  - Email (busca parcial)
  - Valor mínimo de vendas
  - Valor máximo de vendas
- **Ordenação por:**
  - Nome (A-Z ou Z-A)
  - Total de vendas (crescente/decrescente)
  - Média de vendas (crescente/decrescente)
  - Frequência de compras (crescente/decrescente)
- **Sistema de agrupamento:**
  - Por primeira letra do nome
  - Por faixa de vendas
  - Por faixa de frequência
  - Por mês de nascimento
  - Estatísticas por grupo
- **Paginação:**
  - Controle de itens por página (10, 25, 50, 100)
  - Navegação entre páginas
  - Contador de resultados
- **Tabela interativa:**
  - Ordenação por cliques nas colunas
  - Tooltips informativos
  - Botão para ver estatísticas individuais
- Interface com accordion para filtros
- Botão para limpar todos os filtros

### 2. Dashboard de Estatísticas Completo
- **Métricas Gerais:**
  - Total de vendas geral
  - Média por cliente
  - Clientes ativos vs total
  - Frequência média de compras

- **Gráficos:**
  - 📈 Evolução de vendas por dia (linha)
  - 🏆 Top 8 clientes por volume (barras)
  - 🥧 Distribuição de vendas (pizza)

- **Cards de Destaque:**
  - Cliente com maior volume de vendas
  - Cliente com maior média por venda
  - Cliente com maior frequência de compras

- **Ranking Completo:**
  - Lista dos top 5 clientes
  - Avatares numerados
  - Informações detalhadas

### 3. Estatísticas Individuais por Cliente
- **Modal dedicado** para cada cliente
- **Gráfico de vendas** por período
- **Métricas específicas** do cliente
- **Histórico completo** de compras

### 4. Sistema de Navegação
- **Navegação por abas** entre lista e estatísticas
- **Layout responsivo** com sidebar
- **Sistema de logout** integrado

### 5. Normalização de Dados
A aplicação trata automaticamente a estrutura complexa da API:
```json
{
  "data": {
    "clientes": [
      {
        "info": {
          "nomeCompleto": "Nome do Cliente",
          "detalhes": {
            "email": "email@example.com",
            "nascimento": "1990-01-01"
          }
        },
        "estatisticas": {
          "vendas": [...]
        }
      }
    ]
  }
}
```

## 🎯 Características Técnicas

- **TypeScript** para tipagem estática
- **Componentes funcionais** com hooks
- **Context API** para gerenciamento de estado
- **Componentes base reutilizáveis** (BaseTable, BaseFilter, etc.)
- **Utilitários especializados** para formatação e cálculos
- **Responsive design** para diferentes telas
- **Tratamento de erros** e loading states
- **Formatação de dados** (moeda, datas, números)
- **Filtros em tempo real** com debounce
- **Gráficos interativos** com tooltips
- **Interface intuitiva** com ícones e cores
- **Sistema de autenticação** com localStorage

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── base/           # Componentes base reutilizáveis
│   │   ├── BaseTable.tsx
│   │   ├── BaseFilter.tsx
│   │   ├── BaseSelectFilter.tsx
│   │   ├── BaseFilterPanel.tsx
│   │   ├── BaseGroupDialog.tsx
│   │   ├── BaseGroupStats.tsx
│   │   ├── BaseMetricCard.tsx
│   │   ├── BaseClienteCard.tsx
│   │   ├── BaseClienteListItem.tsx
│   │   └── BaseChartContainer.tsx
│   ├── Login.tsx       # Tela de login
│   ├── Layout.tsx      # Layout principal com navegação
│   ├── ClientesList.tsx # Lista de clientes com filtros avançados
│   ├── ClienteEstatisticas.tsx # Modal de estatísticas individuais
│   └── Estatisticas.tsx # Dashboard completo
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── services/           # Serviços e APIs
│   └── api.ts         # API mockada + filtros + agrupamento
├── types/              # Definições TypeScript
│   └── index.ts       # Interfaces e tipos
├── utils/              # Utilitários
│   ├── estatisticasUtils.ts # Funções para cálculos estatísticos
│   ├── clientesUtils.ts # Funções para manipulação de clientes
│   ├── clientesOptions.ts # Opções para filtros e ordenação
│   └── index.ts       # Utilitários gerais
└── App.tsx            # Componente principal
```

## 🚀 Como Executar

1. Certifique-se de ter o Node.js instalado (versão 18 ou superior)
2. Execute os comandos de instalação acima
3. Acesse a aplicação no navegador
4. Faça login com as credenciais fornecidas
5. Explore as funcionalidades!

## 📝 Notas

- **40 clientes mockados** com dados realistas e variados
- **Sistema de filtros avançado** implementado com múltiplos critérios
- **Sistema de agrupamento** com estatísticas por grupo
- **Dashboard completo** com múltiplos tipos de gráficos
- **Modal de estatísticas individuais** para cada cliente
- **Sistema de paginação** com controle de itens por página
- **Tabela interativa** com ordenação por colunas
- **Componentes base reutilizáveis** para melhor organização
- **Utilitários especializados** para formatação e cálculos
- A API simula delays reais para uma experiência mais realista
- O sistema está pronto para integração com um backend real
- Código limpo e bem documentado seguindo boas práticas
- Interface moderna e intuitiva com Material-UI
- **Deploy automático** na Vercel com URL pública 