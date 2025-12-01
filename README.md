# Brasil Beauty

Plataforma web moderna e sofisticada que conecta clientes com prestadoras de serviço premium (modelos, tradutoras e massagistas) para momentos especiais.

## 🎯 Sobre o Projeto

O **Brasil Beauty** é uma plataforma desenvolvida com foco em qualidade, discrição e sofisticação. Oferece uma experiência premium para conectar clientes com profissionais selecionadas em diferentes categorias.

### Características Principais

- ✨ **Design Sofisticado**: Interface moderna com gradientes elegantes e animações suaves
- 🔒 **Segurança e Discrição**: Ambiente seguro com perfis verificados
- 🎨 **Design System Completo**: Sistema de cores, tipografia e componentes reutilizáveis
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🤖 **Chatbot Inteligente**: Assistente virtual para ajudar na busca de profissionais
- 🏗️ **Clean Architecture**: Código organizado seguindo princípios SOLID

## 🚀 Tecnologias

### Core
- **React 18.3.1** - Biblioteca UI
- **TypeScript 5.8.3** - Tipagem estática
- **Vite 5.4.19** - Build tool e dev server
- **React Router DOM 6.30.1** - Roteamento

### UI/UX
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **shadcn/ui** - Componentes acessíveis baseados em Radix UI
- **Lucide React** - Biblioteca de ícones
- **Playfair Display** - Tipografia serifada elegante
- **Inter** - Tipografia sans-serif moderna

### Estado e Dados
- **TanStack Query 5.83.0** - Gerenciamento de estado servidor e cache
- **React Hook Form 7.61.1** - Gerenciamento de formulários
- **Zod 3.25.76** - Validação de esquemas

### Notificações
- **Sonner 1.7.4** - Sistema de notificações toast

### Infraestrutura
- **Docker** - Containerização
- **Nginx** - Web server
- **Traefik** - Reverse proxy

## 📁 Estrutura do Projeto

```
src/
├── domain/                      # Camada de Domínio
│   ├── entities/                # Entidades de negócio
│   ├── repositories/            # Interfaces dos repositórios
│   └── errors/                 # Erros de domínio
├── application/                 # Camada de Aplicação
│   ├── use-cases/              # Casos de uso
│   ├── dto/                     # Data Transfer Objects
│   └── validators/             # Validadores Zod
├── infrastructure/             # Camada de Infraestrutura
│   ├── repositories/           # Implementações dos repositórios
│   ├── logging/                # Sistema de logging
│   └── http/                   # Cliente HTTP
├── presentation/                # Camada de Apresentação
│   ├── pages/                  # Páginas da aplicação
│   ├── components/             # Componentes React
│   └── hooks/                  # Custom hooks
├── shared/                     # Código compartilhado
│   ├── di/                     # Container de injeção de dependências
│   ├── constants/              # Constantes
│   ├── data/                   # Dados mockados
│   └── utils/                  # Utilitários
├── components/                 # Componentes UI globais (shadcn/ui)
├── contexts/                   # Contextos React
├── App.tsx                     # Componente principal
└── main.tsx                    # Arquivo de entrada
```

## 🎨 Design System

### Cores
- **Primary**: Rosa vibrante (`hsl(345 80% 65%)`)
- **Gold**: Dourado elegante (`hsl(45 100% 70%)`)
- **Gradients**: Gradientes suaves para elementos premium
- **Dark Mode**: Suporte completo a tema escuro

### Tipografia
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Componentes
- Cards com efeito glass
- Animações suaves (fade-in, hover-lift, hover-glow)
- Gradientes elegantes
- Sistema de sombras personalizado

## 📋 Funcionalidades

### Páginas Principais

1. **Home** (`/`)
   - Hero section com call-to-action
   - Seção de serviços
   - Features e benefícios
   - Design sofisticado e moderno

2. **Busca** (`/search`)
   - Listagem de profissionais por categoria
   - Filtros por tipo (Modelos, Tradutoras, Massagistas)
   - Cards visuais com informações essenciais
   - Grid responsivo

3. **Perfil de Profissional** (`/profile/:id`)
   - Informações detalhadas
   - Galeria de fotos
   - Informações de contato (WhatsApp)
   - Detalhes físicos e profissionais
   - Redes sociais

4. **Autenticação** (`/auth`)
   - Login e cadastro unificados
   - Validação com Zod
   - Máscara de telefone brasileiro
   - Integração com AuthContext

5. **Conta** (`/account`)
   - Gerenciamento de perfil do usuário
   - Edição de informações
   - Rota protegida

6. **Teste do Chatbot** (`/testar-chatbot`)
   - Interface de teste do chatbot
   - Jornadas de conversação
   - Visualização em mockup de celular

### Componentes Principais

- **Navbar**: Navegação principal com autenticação
- **ModelCard**: Card para exibição de profissionais
- **Chatbot**: Assistente virtual inteligente
- **ProtectedRoute**: Rota protegida por autenticação

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório
cd brazil-beauty

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O aplicativo estará disponível em http://localhost:5173
```

### Build

```bash
# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

### Lint

```bash
# Execute o linter
npm run lint
```

## 🐳 Docker

### Desenvolvimento

```bash
# Build e start com Docker Compose
docker-compose up --build
```

### Produção

```bash
# Build e start em produção
docker-compose -f docker-compose-production.yml up --build
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://api-brazil-beauty.gwan.com.br/api
VITE_CHAT_API_URL=https://api-brazil-beauty.gwan.com.br/api/chat
VITE_APP_NAME=Brasil Beauty
VITE_APP_VERSION=1.0.0
```

## 📚 Arquitetura

O projeto segue os princípios de **Clean Architecture** adaptada para frontend:

### Camadas

1. **Domain**: Entidades e regras de negócio puras
2. **Application**: Casos de uso e orquestração
3. **Infrastructure**: Integrações externas e acesso a dados
4. **Presentation**: Interface do usuário e interação

### Padrões Implementados

- **Repository Pattern**: Abstração de acesso a dados
- **Use Case Pattern**: Encapsulamento de lógica de negócio
- **Dependency Injection**: Container centralizado
- **Observer Pattern**: Context API para estado global
- **Custom Hooks**: Lógica reutilizável

### Princípios SOLID

- ✅ Single Responsibility
- ✅ Open/Closed
- ✅ Liskov Substitution
- ✅ Interface Segregation
- ✅ Dependency Inversion

## 🧪 Testes

A estrutura está preparada para testes. Para implementar:

```bash
# Instalar dependências de teste (quando implementado)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📦 Deploy

### Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

### Docker

O projeto inclui configuração Docker completa:

- `Dockerfile`: Build multi-stage otimizado
- `docker-compose.yml`: Configuração para desenvolvimento
- `docker-compose-production.yml`: Configuração para produção
- `nginx.conf`: Configuração do Nginx

### Deploy com Traefik

O projeto está configurado para deploy com Traefik:

- Domínio: `brazil-beauty.gwan.com.br`
- SSL automático com Let's Encrypt
- Health checks configurados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Padrões de Código

### Nomenclatura

- **Componentes**: PascalCase (`ModelCard.tsx`)
- **Interfaces**: PascalCase com prefixo I ou sem prefixo (`ModelCardProps`)
- **Funções**: camelCase (`handleSubmit`)
- **Variáveis**: camelCase (`userData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Páginas**: Sufixo `.page.tsx` (opcional) ou apenas `.tsx`

### Estrutura de Componentes

```typescript
import React from 'react'
import { toast } from 'sonner'

interface ComponentProps {
  // props
}

export const Component: React.FC<ComponentProps> = ({ ... }) => {
  // hooks
  // handlers
  // effects
  // render
}
```

### Regras Importantes

- ❌ **NUNCA** usar `any` type
- ❌ **NUNCA** usar `console.log` (usar logger estruturado)
- ❌ **NUNCA** usar `alert()` (usar sonner toast)
- ✅ **SEMPRE** tipar corretamente
- ✅ **SEMPRE** validar com Zod
- ✅ **SEMPRE** tratar erros adequadamente

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Equipe

Desenvolvido pela equipe Gwan seguindo os mais altos padrões de qualidade e arquitetura.

## 🔗 Links

- **Produção**: https://brazil-beauty.gwan.com.br
- **API**: https://api-brazil-beauty.gwan.com.br

---

**Brasil Beauty** - Conexões sofisticadas entre clientes e prestadoras de serviço premium ✨
