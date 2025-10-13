# Instruções para Build Android - LacNutry

## ⚠️ IMPORTANTE: Problema Atual

Você está tentando fazer build através do Android Studio, mas este projeto usa **Expo**, que tem um processo de build diferente do React Native puro.

## 🔴 Por que está dando erro?

1. **Backend em localhost**: O app está configurado para `http://localhost:8081`, que não funciona em builds de produção
2. **Expo não usa Android Studio diretamente**: Expo tem seu próprio sistema de build
3. **Variáveis de ambiente**: Podem não estar sendo carregadas corretamente no build

## ✅ Soluções Disponíveis

### Solução 1: Usar Expo Go (MAIS FÁCIL - Recomendado para testes)

**Vantagens**:
- Não precisa fazer build
- Funciona imediatamente
- Ideal para desenvolvimento e testes

**Como usar**:
```bash
# 1. Inicie o servidor
bun run start

# 2. Escaneie o QR code com o app Expo Go no seu celular
# Android: Expo Go app
# iOS: Câmera nativa
```

### Solução 2: Build APK Local (Para distribuição)

**Pré-requisitos**:
1. Backend precisa estar hospedado online (não pode ser localhost)
2. Atualizar variável de ambiente

**Passos**:

#### Passo 1: Hospedar o Backend

Opções gratuitas:
- **Railway** (recomendado): https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io

#### Passo 2: Atualizar .env

```env
EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend.railway.app
```

#### Passo 3: Fazer o Build

**Opção A: Build com Expo (Recomendado)**
```bash
# Instalar dependências
npx expo install

# Fazer prebuild (gera pasta android/)
npx expo prebuild --platform android

# Build de desenvolvimento
npx expo run:android

# Build de produção (APK)
npx expo run:android --variant release
```

**Opção B: Usando Android Studio (Após prebuild)**
```bash
# 1. Fazer prebuild primeiro
npx expo prebuild --platform android

# 2. Abrir Android Studio
# File > Open > Selecione a pasta 'android'

# 3. Build
# Build > Generate Signed Bundle / APK > APK
# Selecione 'release'
```

### Solução 3: Build sem Backend (Temporário)

Se você quer apenas testar o build sem o backend funcionando:

#### Passo 1: Criar modo offline

Edite `lib/trpc.ts` para adicionar um modo offline:

```typescript
const getBaseUrl = () => {
  // Modo offline para testes
  if (process.env.EXPO_PUBLIC_OFFLINE_MODE === 'true') {
    return 'https://mock-api.com'; // URL fake
  }
  
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  if (__DEV__) {
    return "http://localhost:8081";
  }

  throw new Error("No base url found");
};
```

#### Passo 2: Adicionar no .env
```env
EXPO_PUBLIC_OFFLINE_MODE=true
```

#### Passo 3: Comentar chamadas de API que falham

Nas telas que usam tRPC, adicione tratamento de erro:

```typescript
const { data, error } = trpc.recipes.list.useQuery();

if (error) {
  console.log('API offline, usando dados mockados');
  // Use dados mockados
}
```

## 🐛 Erros Comuns e Soluções

### Erro: "Cannot read property of undefined"

**Causa**: Backend não está acessível

**Solução**:
1. Verifique se o backend está rodando
2. Verifique a URL no .env
3. Teste a URL no navegador

### Erro: "Network request failed"

**Causa**: App não consegue conectar ao backend

**Solução**:
1. Se estiver usando localhost, não vai funcionar em build de produção
2. Use um backend hospedado online
3. Ou use Expo Go para desenvolvimento

### Erro: "API key not valid" (Gemini)

**Causa**: Chave da API Gemini inválida ou não carregada

**Solução**:
1. Verifique se a chave está correta no .env:
   ```
   GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
   ```
2. Reinicie o Metro bundler:
   ```bash
   bun run start -c
   ```

### Erro: Build falha no Android Studio

**Causa**: Expo não é compatível com build direto no Android Studio

**Solução**:
1. Use `npx expo prebuild` primeiro
2. Ou use `npx expo run:android`

## 📱 Testando o App

### Desenvolvimento (Recomendado)
```bash
# Inicie o servidor
bun run start

# Use Expo Go no celular
# Escaneie o QR code
```

### Build de Teste
```bash
# Build APK de desenvolvimento
npx expo run:android
```

### Build de Produção
```bash
# Build APK de produção
npx expo run:android --variant release
```

## 🚀 Publicação na Play Store

Para publicar na Play Store, você precisa:

1. **Conta Google Play Developer** ($25 taxa única)
2. **App Bundle (AAB)** em vez de APK
3. **Assinatura do app**

**Comando para gerar AAB**:
```bash
# Após prebuild
cd android
./gradlew bundleRelease
```

O arquivo AAB estará em:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 📞 Precisa de Ajuda?

Se continuar com problemas, forneça:

1. **Mensagem de erro completa** (screenshot ou texto)
2. **Qual método está usando** (Expo Go, build local, Android Studio)
3. **Status do backend** (está rodando? qual URL?)
4. **Arquivo .env** (sem expor chaves sensíveis)

## 🎯 Recomendação Final

Para o seu caso, recomendo:

1. **Agora**: Use Expo Go para testes (mais rápido)
2. **Depois**: Hospede o backend no Railway (gratuito)
3. **Por último**: Faça build de produção com `npx expo run:android --variant release`

Não tente usar Android Studio diretamente sem fazer `expo prebuild` primeiro!
