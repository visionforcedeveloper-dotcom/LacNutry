# Correção de Dependências para Gerar AAB no Android Studio

## Problema
Ao tentar gerar o arquivo AAB no Android Studio, aparecem erros de dependências JavaScript/Node.

## Solução Passo a Passo

### 1. Limpar Cache e Dependências
```bash
# No diretório do projeto, execute:
rm -rf node_modules
rm -rf android/app/build
rm -rf android/.gradle
rm bun.lock

# Reinstalar dependências
bun install
```

### 2. Corrigir Versões no package.json

Abra o `package.json` e modifique manualmente estas linhas:

**ANTES:**
```json
"expo": "^53.0.4",
"expo-web-browser": "^14.2.0",
"react-native-web": "^0.20.0",
"react-native-safe-area-context": "5.3.0",
"react-native-svg": "15.11.2",
"react-native-webview": "13.13.5"
```

**DEPOIS:**
```json
"expo": "^53.0.0",
"expo-web-browser": "~14.2.0",
"react-native-web": "~0.20.0",
"react-native-safe-area-context": "~5.3.0",
"react-native-svg": "~15.11.2",
"react-native-webview": "~13.13.5"
```

Salve o arquivo e execute:
```bash
bun install
```

### 3. Sincronizar Gradle com Expo
```bash
# Gerar arquivos nativos atualizados
npx expo prebuild --clean
```

### 4. No Android Studio

#### 4.1. Abrir o Projeto
1. Abra o Android Studio
2. File → Open → Selecione a pasta `android` do seu projeto
3. Aguarde o Gradle sincronizar

#### 4.2. Limpar Build
1. Build → Clean Project
2. Aguarde finalizar

#### 4.3. Invalidate Caches
1. File → Invalidate Caches / Restart
2. Selecione "Invalidate and Restart"
3. Aguarde o Android Studio reiniciar

#### 4.4. Sincronizar Gradle Novamente
1. File → Sync Project with Gradle Files
2. Aguarde finalizar sem erros

### 5. Gerar o AAB

#### Via Android Studio:
1. Build → Generate Signed Bundle / APK
2. Selecione "Android App Bundle"
3. Clique em "Next"
4. Configure ou crie sua keystore:
   - Key store path: caminho do seu arquivo .jks
   - Key store password: sua senha
   - Key alias: seu alias
   - Key password: senha da chave
5. Clique em "Next"
6. Selecione "release"
7. Clique em "Finish"

#### Via Linha de Comando (Alternativa):
```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

O arquivo AAB será gerado em:
`android/app/build/outputs/bundle/release/app-release.aab`

### 6. Se Ainda Houver Erros

#### Erro: "Duplicate class"
Adicione no arquivo `android/app/build.gradle`, dentro de `android`:
```gradle
packagingOptions {
    pickFirst 'lib/x86/libc++_shared.so'
    pickFirst 'lib/x86_64/libc++_shared.so'
    pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    pickFirst 'lib/arm64-v8a/libc++_shared.so'
}
```

#### Erro: "java.lang.OutOfMemoryError"
Adicione no arquivo `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfOfMemoryError
```

#### Erro: Versão do Java
Certifique-se de estar usando Java 17:
```bash
java -version
```

Se necessário, no Android Studio:
1. File → Project Structure
2. SDK Location → JDK location
3. Selecione ou baixe o JDK 17

### 7. Verificar android/build.gradle

Certifique-se de que o arquivo `android/build.gradle` tem:
```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 24
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "26.1.10909125"
        kotlinVersion = "1.9.22"
    }
    
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.4")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

### 8. Verificar android/gradle/wrapper/gradle-wrapper.properties

Deve ter:
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-bin.zip
```

## Comandos Úteis para Debug

```bash
# Ver log detalhado do build
cd android
./gradlew bundleRelease --stacktrace --info

# Verificar dependências
./gradlew app:dependencies

# Limpar completamente
./gradlew clean
rm -rf .gradle
rm -rf app/build
```

## Checklist Final

- [ ] Limpou node_modules e reinstalou
- [ ] Corrigiu versões no package.json
- [ ] Executou `npx expo prebuild --clean`
- [ ] Abriu pasta android no Android Studio
- [ ] Limpou o projeto (Clean Project)
- [ ] Invalidou caches
- [ ] Sincronizou Gradle sem erros
- [ ] Gerou o AAB com sucesso

## Notas Importantes

1. **Não edite arquivos dentro de `android/app/src/` manualmente** - eles são gerados pelo Expo
2. **Use sempre `npx expo prebuild` após mudanças em plugins do app.json**
3. **Mantenha o Android Studio atualizado**
4. **Use sempre a versão do Node/Bun recomendada pelo Expo SDK 53**

## Se Nada Funcionar

Como último recurso:
```bash
# Deletar tudo e recomeçar
rm -rf node_modules android ios bun.lock
bun install
npx expo prebuild --clean
```

Então tente gerar o AAB novamente no Android Studio.
