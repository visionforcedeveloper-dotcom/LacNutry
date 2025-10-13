# Guia de Build para Android - LacNutry

## Problemas Comuns e Soluções

### 1. Erro de JavaScript no Build

**Problema**: O app está configurado para usar `localhost` como base URL da API, o que não funciona em builds de produção.

**Solução**: 

#### Opção A: Usar Expo Go (Recomendado para testes)
- Não requer build nativo
- Funciona com o QR code
- Ideal para desenvolvimento e testes

#### Opção B: Build de Produção (Requer servidor backend)

Para fazer build de produção, você precisa:

1. **Hospedar o backend em um servidor real** (não localhost)
   - Opções: Railway, Render, Vercel, Heroku, etc.
   - O backend precisa estar acessível publicamente

2. **Atualizar a variável de ambiente**:
   ```
   EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend.com
   ```

3. **Criar arquivo .env.production**:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://ggkjubgpftgaxlxivqgh.supabase.co
   EXPO_PUBLIC_SUPABASE_KEY=sua_chave_aqui
   GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
   EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend-producao.com
   ```

### 2. Build com Android Studio

**IMPORTANTE**: Este projeto usa Expo, que não é compatível com builds diretos no Android Studio.

Para fazer build Android, você tem 3 opções:

#### Opção 1: EAS Build (Recomendado - mas você mencionou que não está disponível)
```bash
eas build --platform android
```

#### Opção 2: Expo Prebuild + Android Studio
```bash
# 1. Fazer prebuild
npx expo prebuild --platform android

# 2. Abrir no Android Studio
# Abra a pasta 'android' no Android Studio

# 3. Build no Android Studio
# Build > Generate Signed Bundle / APK
```

#### Opção 3: Build Local com Expo
```bash
# Build APK local
npx expo run:android --variant release
```

### 3. Problemas Específicos de JavaScript

Se você está vendo erros como:
- "Cannot read property of undefined"
- "Network request failed"
- "API key not valid"

**Causas comuns**:

1. **Backend não está rodando**: O app tenta conectar ao localhost:8081
   - Solução: Inicie o backend antes de testar

2. **Variáveis de ambiente não carregadas**:
   - Solução: Reinicie o Metro bundler após alterar .env

3. **API Keys inválidas**:
   - Verifique se as chaves no .env estão corretas
   - Gemini API Key: AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g

### 4. Checklist antes do Build

- [ ] Backend está hospedado e acessível
- [ ] EXPO_PUBLIC_RORK_API_BASE_URL aponta para o backend de produção
- [ ] Todas as API keys estão corretas
- [ ] Testou o app no Expo Go primeiro
- [ ] Removeu referências a localhost

### 5. Alternativa: Remover Backend Temporariamente

Se você quer apenas testar o build sem backend:

1. Comente as chamadas tRPC que falham
2. Use dados mockados
3. Faça o build

## Comandos Úteis

```bash
# Limpar cache
npx expo start -c

# Verificar configuração
npx expo config

# Build de desenvolvimento
npx expo run:android

# Build de produção (requer configuração)
npx expo run:android --variant release
```

## Próximos Passos Recomendados

1. **Para testes**: Continue usando Expo Go com QR code
2. **Para produção**: 
   - Configure um servidor backend (Railway é gratuito e fácil)
   - Atualize as variáveis de ambiente
   - Use EAS Build ou expo prebuild

## Suporte

Se continuar com problemas, forneça:
- Mensagem de erro completa
- Qual método de build está usando
- Se o backend está rodando e acessível
