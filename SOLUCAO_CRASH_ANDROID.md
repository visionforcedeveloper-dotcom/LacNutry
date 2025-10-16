# Solução para Crash do App no Android (Teste Fechado Play Store)

## Problema Identificado

O app fecha automaticamente ao ser iniciado em builds de produção no Android. Os principais problemas são:

### 1. **Variáveis de Ambiente Não Disponíveis em Produção**
- As variáveis do arquivo `.env` não são automaticamente incluídas no build do APK/AAB
- O app tenta conectar ao backend usando `http://localhost:8081` que não funciona em produção
- Falta de tratamento de erros adequado causa crash silencioso

### 2. **Falta de Error Boundary**
- Sem um Error Boundary, qualquer erro não tratado fecha o app imediatamente
- Usuários não veem mensagens de erro explicativas

### 3. **Problemas de Configuração do Backend**
- A variável `EXPO_PUBLIC_RORK_API_BASE_URL` precisa apontar para um servidor público
- O backend Hono não está acessível em produção

## Correções Implementadas

✅ **1. Error Boundary Adicionado**
- Agora o app captura erros e mostra uma tela amigável
- Console logs detalhados para debug

✅ **2. Melhor Tratamento de Erros**
- Logs adicionados em AuthContext, OnboardingContext e Supabase
- Fallbacks para cenários de erro

✅ **3. Configuração Melhorada do React Query**
- Modo offline-first para não falhar quando API não responde
- Retry limitado para evitar loops infinitos

## ⚠️ AÇÃO OBRIGATÓRIA: Configurar Backend

O app precisa de um backend acessível publicamente. Você tem 2 opções:

### **Opção 1: Deploy do Backend (RECOMENDADO)**

Você precisa fazer deploy do seu backend Hono em um serviço como:
- **Vercel** (recomendado - grátis)
- **Railway**
- **Render**
- **Fly.io**

#### Passos para Deploy no Vercel:

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Na pasta do projeto, execute:
```bash
vercel
```

3. Configure o projeto quando solicitado

4. Após o deploy, você receberá uma URL como: `https://seu-app.vercel.app`

5. **IMPORTANTE**: Adicione essa URL no `app.json` na seção `extra`:

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": "https://ggkjubgpftgaxlxivqgh.supabase.co",
      "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "geminiApiKey": "AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g",
      "rorkApiBaseUrl": "https://seu-app.vercel.app",
      "eas": {
        "projectId": "mb93f6awmfx8vk4xp5w7c"
      }
    }
  }
}
```

6. Atualize o arquivo `lib/trpc.ts`:

```typescript
const getBaseUrl = () => {
  // Primeiro tenta pegar do app.json (build de produção)
  if (Constants.expoConfig?.extra?.rorkApiBaseUrl) {
    const url = Constants.expoConfig.extra.rorkApiBaseUrl;
    console.log('[TRPC] Using base URL from app.json:', url);
    return url;
  }

  // Depois tenta variável de ambiente (desenvolvimento)
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    const url = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
    console.log('[TRPC] Using base URL from env:', url);
    return url;
  }

  // Fallback para localhost apenas em desenvolvimento
  if (__DEV__) {
    console.warn(
      "[TRPC] EXPO_PUBLIC_RORK_API_BASE_URL not set, using localhost."
    );
    return "http://localhost:8081";
  }

  console.error("[TRPC] No base url found for production build!");
  return "http://localhost:8081";
};
```

### **Opção 2: Remover Funcionalidades de Backend (Temporário)**

Se você não pode fazer deploy agora, pode desabilitar temporariamente as features que usam backend:

1. Comente as importações de tRPC no `app/_layout.tsx`
2. Desabilite as telas que fazem requisições ao backend
3. Use apenas funcionalidades offline

## Como Testar a Correção

### 1. **Build Local para Teste**

```bash
# Gerar novo build
eas build --platform android --profile preview

# Ou se estiver usando Android Studio
cd android && ./gradlew assembleRelease
```

### 2. **Verificar Logs**

Após instalar o novo build, conecte o dispositivo via USB e execute:

```bash
adb logcat | grep -E "(Supabase|Auth|Onboarding|TRPC|ErrorBoundary)"
```

Você deverá ver logs como:
```
[Supabase] URL: https://ggkjubgpftgaxlxivqgh.supabase.co
[Supabase] Key present: true
[Auth] Initializing authentication...
[Auth] Session loaded: false
[Onboarding] Loading onboarding status...
[Onboarding] Completed: false
[TRPC] Using base URL: https://seu-app.vercel.app
```

### 3. **Testar Fluxo Completo**

1. ✅ App abre sem fechar
2. ✅ Tela de boas-vindas aparece
3. ✅ Quiz funciona
4. ✅ Navegação entre telas funciona
5. ✅ Se houver erro, mostra mensagem em vez de fechar

## Checklist Antes do Novo Upload

- [ ] Backend em produção com URL pública
- [ ] URL do backend adicionada no `app.json` em `extra.rorkApiBaseUrl`
- [ ] Arquivo `lib/trpc.ts` atualizado para ler do `app.json`
- [ ] Novo build gerado com as configurações corretas
- [ ] Testado em dispositivo físico com `adb logcat`
- [ ] Verificado que o app não fecha mais ao iniciar
- [ ] Testado fluxo completo de onboarding

## Comandos Úteis

### Ver logs em tempo real:
```bash
adb logcat -c && adb logcat | grep -E "(Supabase|Auth|Onboarding|TRPC|ErrorBoundary)"
```

### Limpar cache do app:
```bash
adb shell pm clear app.rork.lactose-free-chef
```

### Reinstalar APK:
```bash
adb install -r caminho/para/app.apk
```

## Suporte Adicional

Se o problema persistir após implementar as correções:

1. Capture os logs completos: `adb logcat > logs.txt`
2. Tire screenshots do erro (se aparecer na tela)
3. Verifique se todas as permissões foram concedidas no Android

## Resumo das Alterações Feitas

1. ✅ Error Boundary implementado
2. ✅ Logs detalhados adicionados
3. ✅ React Query configurado para modo offline-first
4. ✅ Tratamento de erros melhorado em todos os contexts
5. ⚠️ **PENDENTE**: Configurar URL do backend em produção
