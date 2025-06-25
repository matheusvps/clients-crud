# 🧸 Sistema de Gerenciamento de Clientes - Loja de Brinquedos

Este é um frontend React mockado para um sistema de gerenciamento de clientes de uma loja de brinquedos, desenvolvido como parte de um teste técnico.

## 🚀 Funcionalidades Implementadas

### ✅ Backend (Mockado)
- [x] API para listar clientes com dados normalizados
- [x] API de estatísticas com cálculos de performance
- [x] Sistema de autenticação mockado
- [x] Tratamento de dados desorganizados da API
- [x] **10 clientes mockados** com dados realistas
- [x] **Sistema de filtros avançados** (nome, email, vendas, ordenação)

### ✅ Frontend
- [x] Interface moderna com Material-UI
- [x] Sistema de autenticação simples
- [x] Lista de clientes com informações normalizadas
- [x] **Filtros avançados** com accordion expansível
- [x] **Ordenação por múltiplos critérios**
- [x] Gráfico de vendas por dia usando Recharts
- [x] **Dashboard completo** com múltiplos gráficos
- [x] **Métricas gerais** em cards destacados
- [x] **Gráfico de barras** para top clientes
- [x] **Gráfico de pizza** para distribuição
- [x] **Ranking completo** dos clientes
- [x] Destaque visual dos clientes com melhor performance
- [x] Campo visual da primeira letra faltante no alfabeto
- [x] Responsivo e com boa UX

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Material-UI** para interface
- **Recharts** para gráficos (linha, barras, pizza)
- **React Router** para navegação
- **Axios** para requisições HTTP

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
- **10 clientes** com dados realistas e variados
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
- Interface com accordion para filtros
- Contador de resultados
- Tooltips informativos

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

### 3. Normalização de Dados
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
- **Responsive design** para diferentes telas
- **Tratamento de erros** e loading states
- **Formatação de dados** (moeda, datas)
- **Filtros em tempo real** com debounce
- **Gráficos interativos** com tooltips
- **Interface intuitiva** com ícones e cores

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx       # Tela de login
│   ├── Layout.tsx      # Layout principal
│   ├── ClientesList.tsx # Lista de clientes com filtros
│   └── Estatisticas.tsx # Dashboard completo
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── services/           # Serviços e APIs
│   └── api.ts         # API mockada + filtros
├── types/              # Definições TypeScript
│   └── index.ts       # Interfaces e tipos
└── App.tsx            # Componente principal
```

## 🚀 Como Executar

1. Certifique-se de ter o Node.js instalado (versão 14 ou superior)
2. Execute os comandos de instalação acima
3. Acesse a aplicação no navegador
4. Faça login com as credenciais fornecidas
5. Explore as funcionalidades!

## 📝 Notas

- **10 clientes mockados** com dados realistas e variados
- **Sistema de filtros avançado** implementado
- **Dashboard completo** com múltiplos tipos de gráficos
- A API simula delays reais para uma experiência mais realista
- O sistema está pronto para integração com um backend real
- Código limpo e bem documentado seguindo boas práticas
- Interface moderna e intuitiva com Material-UI 