# 🚀 Guia Rápido: Gerar AAB no Android Studio

## ⚡ Solução Rápida (3 Passos)

### 1️⃣ Execute o Script de Correção

**Linux/Mac:**
```bash
chmod +x fix-build.sh
./fix-build.sh
```

**Windows:**
```bash
fix-build.bat
```

### 2️⃣ Abra no Android Studio

1. Abra o Android Studio
2. **File → Open**
3. Navegue até a pasta `android` do seu projeto
4. Clique em **OK**
5. Aguarde o Gradle sincronizar (barra inferior)

### 3️⃣ Gere o AAB

**Opção A - Via Android Studio (Recomendado):**

1. **Build → Generate Signed Bundle / APK**
2. Selecione **Android App Bundle**
3. Clique em **Next**
4. Configure sua keystore (ou crie uma nova)
5. Clique em **Next**
6. Selecione **release**
7. ✅ Clique em **Finish**

**Opção B - Via Terminal:**
```bash
cd android
./gradlew bundleRelease
```

📦 **Arquivo gerado em:**
`android/app/build/outputs/bundle/release/app-release.aab`

---

## 🔧 Se Encontrar Erros

### Erro: "Duplicate class"
**Solução:** Adicione no `android/app/build.gradle`:
```gradle
android {
    // ... outras configs
    
    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
    }
}
```

### Erro: "Out of Memory"
**Solução:** Adicione no `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

### Erro: "Unsupported class file major version"
**Solução:** Use Java 17
```bash
java -version
```

No Android Studio:
- **File → Project Structure → SDK Location**
- Selecione JDK 17

### Gradle não sincroniza
**Solução:**
1. **File → Invalidate Caches / Restart**
2. Aguarde reiniciar
3. **File → Sync Project with Gradle Files**

---

## 📋 Checklist Rápido

- [ ] ✅ Executou o script de correção
- [ ] ✅ Abriu a pasta `android` no Android Studio
- [ ] ✅ Gradle sincronizou sem erros
- [ ] ✅ Invalidou caches (se necessário)
- [ ] ✅ Gerou o AAB
- [ ] ✅ Verificou se o arquivo .aab foi criado

---

## 🆘 Último Recurso

Se NADA funcionar:

```bash
# Deletar TUDO
rm -rf node_modules
rm -rf android
rm -rf ios
rm -rf bun.lock

# Reinstalar
bun install

# Regenerar arquivos nativos
npx expo prebuild --clean

# Tentar build novamente
cd android
./gradlew clean
./gradlew bundleRelease
```

---

## 📱 Testando o AAB

Depois de gerar o AAB:

1. Acesse o [Google Play Console](https://play.google.com/console)
2. Vá em **Teste interno** ou **Teste fechado**
3. Faça upload do arquivo `.aab`
4. Aguarde o processamento (pode levar alguns minutos)
5. Teste no dispositivo através do link de teste

---

## 🎯 Erros Comuns e Soluções Rápidas

| Erro | Solução |
|------|---------|
| `Task failed with an exception` | Execute `./gradlew clean` |
| `Could not resolve all dependencies` | Execute `bun install` novamente |
| `Execution failed for task ':app:bundleRelease'` | Verifique se a keystore está configurada |
| `No toolchains found` | Instale o JDK 17 |
| `Gradle sync failed` | Invalide caches no Android Studio |

---

## 💡 Dicas Importantes

✅ **Sempre use `npx expo prebuild --clean` após:**
- Instalar novas bibliotecas
- Mudar configurações no app.json
- Adicionar novos plugins

✅ **Mantenha atualizado:**
- Android Studio
- Java JDK 17
- Expo CLI

✅ **Backup da Keystore:**
- Guarde sua keystore (`.jks`) em local seguro
- Sem ela, você não pode atualizar o app na Play Store

---

## 🎉 Sucesso!

Se tudo funcionou, você agora tem o arquivo `.aab` pronto para upload na Google Play Store!

**Próximos passos:**
1. Faça upload na Play Console
2. Configure a página do app
3. Publique em teste fechado
4. Convide testadores
5. Após testes, publique em produção

Boa sorte! 🚀
