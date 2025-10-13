# 📱 Como Gerar APK do LacNutry

## 🎯 Resumo Rápido

Você tem **3 opções** para usar/distribuir o app:

### 1️⃣ Expo Go (Mais Fácil) ⭐ RECOMENDADO
```bash
bun run start
# Escaneie o QR code com o app Expo Go
```
✅ Funciona imediatamente  
✅ Não precisa fazer build  
❌ Não gera APK  

### 2️⃣ Build Local (APK para Distribuir)
```bash
npx expo prebuild --platform android
npx expo run:android --variant release
```
✅ Gera APK  
✅ Pode distribuir  
⚠️ Precisa backend online  

### 3️⃣ Android Studio (Após Prebuild)
```bash
npx expo prebuild --platform android
# Depois abra a pasta 'android' no Android Studio
```
✅ Interface visual  
✅ Mais controle  
⚠️ Mais complexo  

---

## ⚠️ IMPORTANTE: Problema Atual

**Seu app usa backend em localhost!**

```env
EXPO_PUBLIC_RORK_API_BASE_URL=http://localhost:8081
```

Isso **NÃO funciona** em builds de produção!

### Solução:

1. **Hospede o backend online** (Railway, Render, Fly.io)
2. **Atualize o .env**:
   ```env
   EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend.railway.app
   ```
3. **Reinicie o servidor**:
   ```bash
   bun run start -c
   ```

---

## 🚀 Passo a Passo Completo

### Preparação (Faça UMA VEZ)

#### 1. Hospedar Backend

**Opção A: Railway (Recomendado)**
1. Acesse https://railway.app
2. Crie conta (gratuito)
3. New Project > Deploy from GitHub
4. Selecione seu repositório
5. Copie a URL gerada

**Opção B: Render**
1. Acesse https://render.com
2. Crie conta (gratuito)
3. New > Web Service
4. Conecte seu repositório
5. Copie a URL gerada

#### 2. Atualizar .env

```env
EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend.railway.app
GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
EXPO_PUBLIC_SUPABASE_URL=https://ggkjubgpftgaxlxivqgh.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sua_chave_aqui
```

#### 3. Testar no Expo Go

```bash
bun run start
# Teste TUDO antes de fazer build!
```

### Build (Quando Tudo Funcionar)

#### Passo 1: Limpar Projeto
```bash
rm -rf node_modules .expo android
bun install
```

#### Passo 2: Prebuild
```bash
npx expo prebuild --platform android
```

#### Passo 3: Build de Teste
```bash
npx expo run:android
```

#### Passo 4: Build de Produção
```bash
npx expo run:android --variant release
```

#### Passo 5: Pegar o APK
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🐛 Erros Comuns

### "Network request failed"
**Causa**: Backend não está acessível  
**Solução**: Verifique se o backend está online e a URL está correta

### "API key not valid"
**Causa**: Chave Gemini não carregada  
**Solução**: Verifique o .env e reinicie com `bun run start -c`

### "Unable to resolve module"
**Causa**: Cache corrompido  
**Solução**: 
```bash
rm -rf node_modules .expo
bun install
npx expo start -c
```

### Build falha no Android Studio
**Causa**: Não fez prebuild  
**Solução**: `npx expo prebuild --platform android`

---

## 📱 Para Publicar na Play Store

### 1. Criar Keystore
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore lacnutry.keystore \
  -alias lacnutry \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### 2. Gerar App Bundle (AAB)
```bash
cd android
./gradlew bundleRelease
cd ..
```

### 3. Pegar o AAB
```
android/app/build/outputs/bundle/release/app-release.aab
```

### 4. Submeter na Play Store
1. Acesse https://play.google.com/console
2. Crie um app
3. Upload do AAB
4. Preencha informações
5. Submeta para revisão

---

## 📚 Documentação Completa

- `SOLUCAO_ERRO_BUILD.md` - Soluções detalhadas
- `ANDROID_BUILD_INSTRUCTIONS.md` - Instruções completas
- `CHECKLIST_BUILD.md` - Checklist passo a passo
- `COMANDOS_RAPIDOS.md` - Comandos úteis
- `BUILD_GUIDE.md` - Guia geral

---

## 🎯 Recomendação

**Para você agora**:

1. ✅ **Teste no Expo Go** (mais rápido)
   ```bash
   bun run start
   ```

2. ⏳ **Depois hospede o backend** (Railway)

3. 🏗️ **Por último faça o build**
   ```bash
   npx expo prebuild --platform android
   npx expo run:android --variant release
   ```

---

## 🆘 Precisa de Ajuda?

Me envie:
1. Screenshot do erro
2. Comando que executou
3. Conteúdo do .env (sem chaves)
4. Backend está online? (sim/não)

---

## ⚡ TL;DR (Muito Longo; Não Li)

```bash
# Para testar AGORA:
bun run start
# Use Expo Go

# Para gerar APK:
# 1. Hospede backend online
# 2. Atualize .env
# 3. Execute:
npx expo prebuild --platform android
npx expo run:android --variant release
```

**Pronto!** 🎉

---

**Última atualização**: Guia criado para resolver problemas de build Android
