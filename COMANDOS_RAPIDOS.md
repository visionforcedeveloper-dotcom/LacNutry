# ⚡ Comandos Rápidos - LacNutry Build

## 🚀 Início Rápido (Testar Agora)

```bash
# Iniciar servidor
bun run start

# Escanear QR code com Expo Go
# Pronto! 🎉
```

---

## 🏗️ Build Completo (Passo a Passo)

### 1. Limpar Tudo
```bash
rm -rf node_modules
rm -rf .expo
rm -rf android
bun install
```

### 2. Testar Primeiro
```bash
bun run start
# Teste no Expo Go antes de fazer build!
```

### 3. Fazer Prebuild
```bash
npx expo prebuild --platform android
```

### 4. Build de Teste
```bash
npx expo run:android
```

### 5. Build de Produção
```bash
npx expo run:android --variant release
```

---

## 🔧 Comandos de Manutenção

### Limpar Cache
```bash
# Limpar cache do Metro
npx expo start -c

# Limpar cache do Gradle
cd android && ./gradlew clean && cd ..

# Limpar tudo
rm -rf node_modules .expo android ios
bun install
```

### Reinstalar Dependências
```bash
rm -rf node_modules
bun install
```

### Refazer Prebuild
```bash
npx expo prebuild --clean --platform android
```

---

## 📱 Comandos de Build

### APK de Desenvolvimento
```bash
npx expo run:android
```

### APK de Produção
```bash
npx expo run:android --variant release
```

### App Bundle (AAB) para Play Store
```bash
cd android
./gradlew bundleRelease
cd ..
```

### Build com Logs Detalhados
```bash
npx expo run:android --verbose
```

---

## 🔑 Criar Keystore (Primeira Vez)

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore lacnutry.keystore \
  -alias lacnutry \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**IMPORTANTE**: Guarde a senha em local seguro!

---

## 🐛 Debug e Troubleshooting

### Ver Logs do Android
```bash
# Logs em tempo real
adb logcat

# Filtrar apenas erros
adb logcat *:E

# Logs do React Native
adb logcat | grep ReactNative
```

### Verificar Dispositivos Conectados
```bash
adb devices
```

### Instalar APK Manualmente
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Desinstalar App
```bash
adb uninstall app.rork.lactose-free-chef
```

### Limpar Dados do App
```bash
adb shell pm clear app.rork.lactose-free-chef
```

---

## 🌐 Backend

### Testar Backend Local
```bash
curl http://localhost:8081/api
# Deve retornar: {"status":"ok","message":"API is running"}
```

### Testar Backend Online
```bash
curl https://seu-backend.railway.app/api
```

---

## 📊 Verificar Configuração

### Ver Configuração do Expo
```bash
npx expo config
```

### Ver Variáveis de Ambiente
```bash
cat .env
```

### Verificar Versão do Expo
```bash
npx expo --version
```

### Verificar Versão do Node/Bun
```bash
node --version
bun --version
```

---

## 🎯 Fluxo Completo (Copy & Paste)

### Para Desenvolvimento
```bash
# 1. Limpar
rm -rf node_modules .expo
bun install

# 2. Iniciar
bun run start

# 3. Testar no Expo Go
```

### Para Build de Produção
```bash
# 1. Limpar
rm -rf node_modules .expo android
bun install

# 2. Prebuild
npx expo prebuild --platform android

# 3. Build
npx expo run:android --variant release

# 4. APK estará em:
# android/app/build/outputs/apk/release/app-release.apk
```

### Para Play Store
```bash
# 1. Limpar
rm -rf node_modules .expo android
bun install

# 2. Prebuild
npx expo prebuild --platform android

# 3. Gerar AAB
cd android
./gradlew bundleRelease
cd ..

# 4. AAB estará em:
# android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🆘 Comandos de Emergência

### App não abre?
```bash
# Limpar tudo e recomeçar
rm -rf node_modules .expo android ios
bun install
npx expo start -c
```

### Build falhou?
```bash
# Limpar cache do Gradle
cd android
./gradlew clean
cd ..

# Refazer prebuild
npx expo prebuild --clean --platform android
```

### Erro de dependências?
```bash
# Reinstalar tudo
rm -rf node_modules bun.lock
bun install
```

---

## 📝 Atalhos Úteis

```bash
# Alias úteis (adicione ao seu .bashrc ou .zshrc)
alias expo-start="bun run start"
alias expo-clean="rm -rf node_modules .expo && bun install"
alias expo-build="npx expo run:android"
alias expo-release="npx expo run:android --variant release"
alias expo-prebuild="npx expo prebuild --platform android"
```

---

## 🎨 Comandos do Projeto

```bash
# Iniciar servidor
bun run start

# Iniciar web
bun run start-web

# Lint
bun run lint
```

---

## 📦 Localização dos Arquivos Gerados

### APK de Desenvolvimento
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### APK de Produção
```
android/app/build/outputs/apk/release/app-release.apk
```

### App Bundle (AAB)
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Keystore
```
./lacnutry.keystore
```

---

## 🔗 Links Rápidos

- Expo Docs: https://docs.expo.dev
- Railway: https://railway.app
- Play Console: https://play.google.com/console

---

**Dica**: Salve este arquivo nos favoritos para acesso rápido! ⭐
