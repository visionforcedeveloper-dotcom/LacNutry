# LactoFree - App de Receitas sem Lactose

## 📱 Sobre o App

LactoFree é um aplicativo premium e inteligente desenvolvido para pessoas com intolerância à lactose. O app oferece uma experiência elegante e profissional com receitas deliciosas, ferramentas de scanner de produtos e assistência de IA.

## 🎨 Design

### Paleta de Cores
- **Primária**: Turquesa (#4FD1C5, #38B2AC)
- **Secundária**: Verde menta (#81E6D9)
- **Texto**: Cinza neutro (#2D3748, #4A5568)
- **Background**: Tons claros (#F7FAFC)
- **Gradientes**: Suaves e premium

### Inspiração
- Airbnb (navegação limpa e cards elegantes)
- Headspace (cores suaves e interface calma)
- Yummly/Tasty (apresentação visual de receitas)
- Apps de saúde premium (profissionalismo e confiança)

## 🚀 Funcionalidades

### ✅ Implementadas
1. **Tela Início (Home)**
   - Feed de receitas em destaque
   - Cards visuais com imagens de alta qualidade
   - Sistema de favoritos
   - Estatísticas rápidas
   - Busca de receitas

2. **Explorar**
   - 6 categorias de receitas (Café da Manhã, Almoço, Jantar, Sobremesas, Lanches, Bebidas)
   - Filtros rápidos (Rápido, Fácil, Vegano, Sem Glúten, etc.)
   - Interface com cards coloridos

3. **Scanner de Produtos**
   - Placeholder para scanner de código de barras
   - Placeholder para análise por foto
   - Interface preparada para integração com IA
   - Design premium com gradientes

4. **Nutricionista IA**
   - Placeholder para chat com IA
   - Perguntas sugeridas
   - Features destacadas
   - Preparado para integração com Gemini

5. **Perfil**
   - Estatísticas do usuário
   - Menu de configurações
   - Card premium para upgrade
   - Opções de privacidade e ajuda

### 🔮 Próximas Integrações (Futuras)
- Integração com Gemini AI para nutricionista virtual
- Scanner de produtos com reconhecimento de imagem
- Análise de níveis de lactose em produtos
- Gerador de receitas personalizado
- Planos alimentares customizados

## 📂 Estrutura do Projeto

```
app/
├── (tabs)/
│   ├── index.tsx          # Tela Home
│   ├── explore.tsx        # Tela Explorar
│   ├── scanner.tsx        # Scanner de Produtos
│   ├── nutritionist.tsx   # Nutricionista IA
│   ├── profile.tsx        # Perfil do Usuário
│   └── _layout.tsx        # Layout das Tabs
├── _layout.tsx            # Layout Raiz
└── +not-found.tsx         # Página 404

constants/
├── colors.ts              # Paleta de cores
└── types.ts               # TypeScript types

mocks/
└── recipes.ts             # Dados mockados de receitas
```

## 🎯 Características Técnicas

### Design System
- **Cores**: Sistema de cores consistente com gradientes
- **Tipografia**: Hierarquia clara com pesos variados
- **Espaçamento**: Generoso para breathing room
- **Sombras**: Suaves para profundidade
- **Bordas**: Arredondadas (12-24px)

### Componentes
- Cards com sombras e bordas arredondadas
- Botões com gradientes e estados ativos
- Tab bar flutuante e customizada
- Ícones do Lucide React Native
- Imagens de alta qualidade do Unsplash

### Animações
- Transições suaves
- Estados de hover/press
- Feedback visual em interações

## 🔧 Tecnologias

- **React Native** - Framework mobile
- **Expo Router** - Navegação file-based
- **TypeScript** - Type safety
- **Expo Linear Gradient** - Gradientes
- **Lucide React Native** - Ícones
- **React Query** - State management (preparado)

## 📱 Navegação

### Tab Bar Customizada
- 5 tabs principais
- Botão central destacado (Scanner)
- Design flutuante com sombra
- Ícones animados no estado ativo

### Estrutura de Rotas
- `/` - Home (Receitas em destaque)
- `/explore` - Explorar categorias
- `/scanner` - Scanner de produtos
- `/nutritionist` - Nutricionista IA
- `/profile` - Perfil do usuário

## 🎨 Componentes Visuais

### Cards de Receita
- Imagem em tela cheia
- Gradiente overlay
- Tags de dificuldade e tempo
- Informações de porções
- Botão de favoritar

### Stats Cards
- Gradientes coloridos
- Ícones temáticos
- Valores destacados
- Labels descritivas

### Feature Cards
- Ícones em círculos coloridos
- Títulos e descrições
- Sombras suaves
- Espaçamento generoso

## 🌟 Diferenciais

1. **Design Premium**: Interface elegante e profissional
2. **Cores Suaves**: Paleta turquesa calma e convidativa
3. **UX Intuitiva**: Navegação clara e fácil
4. **Preparado para IA**: Estrutura pronta para integrações
5. **Cross-platform**: Funciona em iOS, Android e Web
6. **Type-safe**: TypeScript em todo o código
7. **Escalável**: Arquitetura preparada para crescimento

## 📝 Dados Mockados

### Receitas (6 receitas de exemplo)
- Panquecas de Aveia sem Lactose
- Risoto de Cogumelos Cremoso
- Brownie de Chocolate Vegano
- Smoothie Bowl Tropical
- Pasta ao Pesto de Manjericão
- Tacos Veganos Mexicanos

### Categorias (6 categorias)
- Café da Manhã (24 receitas)
- Almoço (48 receitas)
- Jantar (36 receitas)
- Sobremesas (32 receitas)
- Lanches (28 receitas)
- Bebidas (20 receitas)

## 🚀 Como Executar

```bash
# Instalar dependências
bun install

# Iniciar em modo web
bun run start-web

# Iniciar em modo desenvolvimento
bun run start

# Escanear QR code com Expo Go no celular
```

## 📱 Testar no Celular

1. Baixe o Expo Go (iOS/Android)
2. Execute `bun run start`
3. Escaneie o QR code
4. Aproveite o app!

## 🎯 Próximos Passos

1. **Integrar Gemini AI** para nutricionista virtual
2. **Implementar Scanner** com reconhecimento de imagem
3. **Adicionar Autenticação** de usuários
4. **Criar Sistema de Favoritos** persistente
5. **Implementar Busca** de receitas
6. **Adicionar Filtros** avançados
7. **Criar Planos Alimentares** personalizados
8. **Integrar Backend** para sincronização

## 💡 Notas de Desenvolvimento

- Todas as telas usam headers nativos do Expo Router
- Tab bar customizada com design flutuante
- Cores definidas em constants/colors.ts
- Types centralizados em constants/types.ts
- Dados mockados em mocks/recipes.ts
- Preparado para integração com IA (placeholders prontos)

---

**Desenvolvido com ❤️ para pessoas com intolerância à lactose**
