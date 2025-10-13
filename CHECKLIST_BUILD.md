# ✅ Checklist para Build Android - LacNutry

## 🎯 Escolha seu Objetivo

### Opção A: Apenas Testar o App
- [ ] Baixar "Expo Go" na Play Store
- [ ] Executar `bun run start`
- [ ] Escanear QR code
- [ ] ✅ Pronto!

### Opção B: Gerar APK para Distribuição
Continue com o checklist abaixo ⬇️

---

## 📋 Checklist Completo para Build

### Fase 1: Preparação do Backend ⚙️

- [ ] **Backend está hospedado online?**
  - ❌ Não → Hospede no Railway, Render ou Fly.io
  - ✅ Sim → Anote a URL (ex: https://seu-app.railway.app)

- [ ] **Arquivo .env está atualizado?**
  ```env
  EXPO_PUBLIC_RORK_API_BASE_URL=https://seu-backend-online.com
  GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
  EXPO_PUBLIC_SUPABASE_URL=https://ggkjubgpftgaxlxivqgh.supabase.co
  EXPO_PUBLIC_SUPABASE_KEY=sua_chave_aqui
  ```

- [ ] **Backend está acessível?**
  - Teste no navegador: `https://seu-backend.com/api`
  - Deve retornar: `{"status":"ok","message":"API is running"}`

### Fase 2: Preparação do Projeto 🛠️

- [ ] **Limpar cache e dependências**
  ```bash
  rm -rf node_modules
  rm -rf .expo
  bun install
  ```

- [ ] **Testar no Expo Go primeiro**
  ```bash
  bun run start
  ```
  - [ ] App abre sem erros?
  - [ ] Funcionalidades principais funcionam?
  - [ ] Backend conecta corretamente?

### Fase 3: Prebuild (OBRIGATÓRIO) 🏗️

- [ ] **Fazer prebuild**
  ```bash
  npx expo prebuild --platform android
  ```
  - [ ] Pasta `android` foi criada?
  - [ ] Sem erros no terminal?

### Fase 4: Build de Teste 🧪

- [ ] **Build de desenvolvimento**
  ```bash
  npx expo run:android
  ```
  - [ ] App instalou no emulador/celular?
  - [ ] App abre sem crashes?
  - [ ] Funcionalidades funcionam?

### Fase 5: Build de Produção 🚀

- [ ] **Criar keystore (primeira vez apenas)**
  ```bash
  keytool -genkeypair -v -storetype PKCS12 \
    -keystore lacnutry.keystore \
    -alias lacnutry \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000
  ```
  - [ ] Keystore criado?
  - [ ] Senha anotada em local seguro?

- [ ] **Build APK de produção**
  ```bash
  npx expo run:android --variant release
  ```
  - [ ] Build completou sem erros?
  - [ ] APK gerado em `android/app/build/outputs/apk/release/`?

- [ ] **Testar APK**
  - [ ] Instalar APK no celular
  - [ ] App abre corretamente?
  - [ ] Todas as funcionalidades funcionam?
  - [ ] Backend conecta?

### Fase 6: Preparar para Play Store 📱

- [ ] **Gerar App Bundle (AAB)**
  ```bash
  cd android
  ./gradlew bundleRelease
  ```
  - [ ] AAB gerado em `android/app/build/outputs/bundle/release/`?

- [ ] **Configurar app.json**
  - [ ] Nome do app correto?
  - [ ] Versão atualizada?
  - [ ] Ícones configurados?
  - [ ] Permissões necessárias listadas?

- [ ] **Documentos necessários**
  - [ ] Screenshots do app (mínimo 2)
  - [ ] Ícone de alta resolução (512x512)
  - [ ] Descrição do app
  - [ ] Política de privacidade

---

## 🚨 Troubleshooting

### Se algo der errado, verifique:

#### ❌ Erro de Network/Conexão
- [ ] Backend está online?
- [ ] URL no .env está correta?
- [ ] Testou a URL no navegador?

#### ❌ Erro de API Key
- [ ] GEMINI_API_KEY está no .env?
- [ ] Chave está correta?
- [ ] Reiniciou o servidor após alterar .env?

#### ❌ Erro no Build
- [ ] Fez o prebuild?
- [ ] Limpou o cache?
- [ ] Dependências instaladas?

#### ❌ App Crasha ao Abrir
- [ ] Testou no Expo Go primeiro?
- [ ] Backend está acessível?
- [ ] Logs do erro (use `adb logcat`)?

---

## 📊 Status do Projeto

### Ambiente de Desenvolvimento
- [x] Expo configurado
- [x] Backend local funcionando
- [x] Expo Go testado
- [ ] Backend em produção
- [ ] Build de produção testado

### Preparação para Produção
- [ ] Backend hospedado
- [ ] .env de produção configurado
- [ ] Prebuild realizado
- [ ] APK de teste gerado
- [ ] APK de produção gerado
- [ ] AAB para Play Store gerado

### Publicação
- [ ] Conta Google Play Developer criada
- [ ] Screenshots preparados
- [ ] Descrição escrita
- [ ] Política de privacidade criada
- [ ] App submetido para revisão

---

## 🎯 Próximos Passos Recomendados

1. **Agora**: 
   - [ ] Testar com Expo Go
   - [ ] Verificar se tudo funciona

2. **Esta Semana**:
   - [ ] Hospedar backend no Railway
   - [ ] Atualizar .env
   - [ ] Testar com backend online

3. **Próxima Semana**:
   - [ ] Fazer prebuild
   - [ ] Gerar APK de teste
   - [ ] Testar APK em dispositivos reais

4. **Quando Estiver Pronto**:
   - [ ] Gerar AAB de produção
   - [ ] Criar conta Play Store
   - [ ] Submeter para revisão

---

## 📞 Precisa de Ajuda?

Se marcar ❌ em qualquer item acima, consulte:
- `SOLUCAO_ERRO_BUILD.md` - Soluções detalhadas
- `ANDROID_BUILD_INSTRUCTIONS.md` - Instruções passo a passo
- `BUILD_GUIDE.md` - Guia geral de build

---

**Dica**: Imprima este checklist e vá marcando conforme avança! ✅
