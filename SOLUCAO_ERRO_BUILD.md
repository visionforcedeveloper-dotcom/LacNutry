# 🔧 Solução para Erros de Build Android

## 📋 Resumo do Problema

Você está tentando gerar um arquivo APK para publicar na Play Store através do Android Studio, mas está enfrentando problemas de JavaScript.

## ❌ O Problema Principal

**Este projeto usa Expo, não React Native puro!**

Expo tem um processo de build diferente e **não funciona diretamente com Android Studio** sem preparação prévia.

Além disso, o backend está configurado para `localhost:8081`, que não funciona em builds de produção.

## ✅ Soluções (Escolha uma)

### 🎯 Solução 1: Expo Go (RECOMENDADO para testes)

**Melhor para**: Testar o app rapidamente sem fazer build

**Como usar**:
1. Baixe o app "Expo Go" na Play Store
2. Execute no terminal:
   ```bash
   bun run start
   ```
3. Escaneie o QR code com o Expo Go
4. O app abre instantaneamente!

**Vantagens**:
- ✅ Funciona imediatamente
- ✅ Não precisa fazer build
- ✅ Perfeito para desenvolvimento

**Desvantagens**:
- ❌ Não gera APK para distribuição
- ❌ Precisa do Expo Go instalado

---

### 🏗️ Solução 2: Build Local (Para gerar APK)

**Melhor para**: Gerar APK para distribuir ou publicar

#### Pré-requisitos OBRIGATÓRIOS:

1. **Backend precisa estar online** (não pode ser localhost)
   - Opções gratuitas: Railway, Render, Fly.io
   - Tutorial Railway: https://railway.app

2. **Atualizar arquivo .env**:
   ```env
   EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend.railway.app
   ```

#### Passos para Build:

**Passo 1: Preparar o projeto**
```bash
# Limpar cache
npx expo start -c

# Instalar dependências
bun install
```

**Passo 2: Fazer Prebuild (IMPORTANTE!)**
```bash
# Isso gera a pasta 'android' necessária
npx expo prebuild --platform android
```

**Passo 3: Build de Desenvolvimento**
```bash
# Build APK de teste
npx expo run:android
```

**Passo 4: Build de Produção (APK final)**
```bash
# Build APK de produção
npx expo run:android --variant release
```

O APK estará em:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

### 🏢 Solução 3: Usar Android Studio (Após Prebuild)

**IMPORTANTE**: Só funciona DEPOIS de fazer o prebuild!

**Passos**:

1. **Fazer prebuild primeiro**:
   ```bash
   npx expo prebuild --platform android
   ```

2. **Abrir no Android Studio**:
   - File > Open
   - Selecione a pasta `android` do projeto

3. **Fazer Build**:
   - Build > Generate Signed Bundle / APK
   - Selecione "APK"
   - Escolha "release"
   - Configure a assinatura (keystore)

---

## 🚨 Erros Comuns e Como Resolver

### Erro 1: "Network request failed" ou "Cannot connect to localhost"

**Causa**: O app está tentando conectar ao localhost, que não existe no celular

**Solução**:
1. Hospede o backend online (Railway, Render, etc.)
2. Atualize o .env:
   ```env
   EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend-online.com
   ```
3. Reinicie o servidor:
   ```bash
   bun run start -c
   ```

### Erro 2: "API key not valid" (Gemini)

**Causa**: Chave da API não está sendo carregada

**Solução**:
1. Verifique o arquivo .env:
   ```env
   GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
   ```
2. Reinicie o Metro bundler:
   ```bash
   bun run start -c
   ```

### Erro 3: "Unable to resolve module" ou erros de JavaScript

**Causa**: Cache corrompido ou dependências desatualizadas

**Solução**:
```bash
# Limpar tudo
rm -rf node_modules
rm -rf .expo
rm -rf android
rm -rf ios

# Reinstalar
bun install

# Limpar cache do Metro
npx expo start -c
```

### Erro 4: Build falha no Android Studio

**Causa**: Tentou usar Android Studio sem fazer prebuild

**Solução**:
```bash
# SEMPRE faça isso primeiro
npx expo prebuild --platform android

# Depois pode abrir no Android Studio
```

---

## 📱 Para Publicar na Play Store

### Requisitos:

1. **Conta Google Play Developer** ($25 taxa única)
2. **App Bundle (AAB)** em vez de APK
3. **Keystore para assinar o app**

### Gerar AAB:

```bash
# 1. Fazer prebuild
npx expo prebuild --platform android

# 2. Entrar na pasta android
cd android

# 3. Gerar AAB
./gradlew bundleRelease

# O arquivo estará em:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Criar Keystore (primeira vez):

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore lacnutry.keystore -alias lacnutry -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANTE**: Guarde o keystore e a senha em local seguro! Você precisará deles para todas as atualizações futuras.

---

## 🎯 Minha Recomendação para Você

Baseado no seu caso, sugiro esta ordem:

### 1️⃣ AGORA (Testes):
```bash
bun run start
# Use Expo Go no celular
```

### 2️⃣ DEPOIS (Preparar para produção):
1. Hospede o backend no Railway (gratuito)
2. Atualize o .env com a URL do Railway
3. Teste novamente com Expo Go

### 3️⃣ POR ÚLTIMO (Gerar APK):
```bash
npx expo prebuild --platform android
npx expo run:android --variant release
```

---

## 🆘 Ainda com Problemas?

Se continuar com erros, me envie:

1. **Screenshot do erro completo**
2. **Qual comando você executou**
3. **Conteúdo do arquivo .env** (sem expor chaves)
4. **O backend está rodando?** (sim/não e qual URL)

---

## 📚 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
bun run start

# Limpar cache
npx expo start -c

# Fazer prebuild
npx expo prebuild --platform android

# Build de desenvolvimento
npx expo run:android

# Build de produção
npx expo run:android --variant release

# Limpar prebuild e refazer
npx expo prebuild --clean --platform android

# Ver configuração do Expo
npx expo config
```

---

## ⚡ Atalho Rápido

Se você só quer testar o app AGORA:

```bash
# 1. Baixe "Expo Go" na Play Store
# 2. Execute:
bun run start
# 3. Escaneie o QR code
# 4. Pronto! 🎉
```

---

## 🔗 Links Úteis

- **Expo Documentation**: https://docs.expo.dev
- **Railway (hosting gratuito)**: https://railway.app
- **Render (hosting gratuito)**: https://render.com
- **Expo Build Guide**: https://docs.expo.dev/build/setup/

---

**Última atualização**: Arquivo criado para resolver problemas de build Android com Expo
