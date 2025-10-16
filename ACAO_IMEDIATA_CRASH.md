# ⚠️ AÇÃO IMEDIATA - Resolver Crash do App Android

## O que está causando o crash?

Seu app está tentando conectar ao backend em `http://localhost:8081`, que não existe no dispositivo Android em produção. Isso causa um erro e fecha o app.

## Solução Rápida (Escolha UMA)

### Opção A: Sem Backend (Mais Rápido) ⚡

Se suas funcionalidades principais **não precisam** de backend:

1. Abra o arquivo `app.json` (você precisa editar manualmente via editor de texto)

2. Adicione esta seção dentro de `"expo"`:

```json
"extra": {
  "supabaseUrl": "https://ggkjubgpftgaxlxivqgh.supabase.co",
  "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdna2p1YmdwZnRnYXhseGl2cWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDg1ODksImV4cCI6MjA3MzY4NDU4OX0.jsHsjybJ4qshC0ajkCIlNoO3eIgMprCk81oLxmDOuwg",
  "geminiApiKey": "AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g",
  "rorkApiBaseUrl": "",
  "eas": {
    "projectId": "mb93f6awmfx8vk4xp5w7c"
  }
}
```

Note que `rorkApiBaseUrl` está vazio - isso fará o app funcionar offline.

3. Gere um novo build:
```bash
eas build --platform android --profile preview
```

---

### Opção B: Com Backend (Correto) ✅

Se você precisa das funcionalidades de IA e backend:

#### Passo 1: Criar conta no Vercel (Grátis)

1. Vá em https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New" → "Project"
4. **IMPORTANTE**: Configure para fazer deploy da pasta `backend`

#### Passo 2: Configurar Variáveis de Ambiente no Vercel

No painel do Vercel, vá em:
- Settings → Environment Variables

Adicione:
```
GEMINI_API_KEY=AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g
```

#### Passo 3: Fazer Deploy

O Vercel fará deploy automaticamente e te dará uma URL tipo:
```
https://lac-nutry.vercel.app
```

#### Passo 4: Adicionar URL no app.json

```json
"extra": {
  "supabaseUrl": "https://ggkjubgpftgaxlxivqgh.supabase.co",
  "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdna2p1YmdwZnRnYXhseGl2cWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDg1ODksImV4cCI6MjA3MzY4NDU4OX0.jsHsjybJ4qshC0ajkCIlNoO3eIgMprCk81oLxmDOuwg",
  "geminiApiKey": "AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g",
  "rorkApiBaseUrl": "https://lac-nutry.vercel.app",
  "eas": {
    "projectId": "mb93f6awmfx8vk4xp5w7c"
  }
}
```

#### Passo 5: Gerar novo build

```bash
eas build --platform android --profile preview
```

---

## Como Editar app.json

1. Feche este projeto
2. Abra o arquivo `app.json` com Notepad ou VS Code
3. Procure por `"experiments"` no final
4. Logo após o bloco experiments, adicione a seção `"extra"`
5. O arquivo deve ficar assim:

```json
{
  "expo": {
    "name": "LacNutry",
    "slug": "lac-nutry",
    ... outras configs ...,
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "supabaseUrl": "https://ggkjubgpftgaxlxivqgh.supabase.co",
      "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "geminiApiKey": "AIzaSyBE2Z09hHIuXv1fXFkyN1Prr-dAOskt68g",
      "rorkApiBaseUrl": "SUA_URL_AQUI_OU_VAZIO",
      "eas": {
        "projectId": "mb93f6awmfx8vk4xp5w7c"
      }
    }
  }
}
```

## Testar Localmente Antes de Upload

1. Conecte seu celular via USB
2. Habilite "Depuração USB" no Android
3. Execute:
```bash
adb logcat -c && adb logcat | grep -E "(Supabase|Auth|TRPC|ErrorBoundary)"
```

4. Abra o app

5. Você deve ver logs como:
```
[Supabase] URL: https://ggkjubgpftgaxlxivqgh.supabase.co
[Auth] Initializing authentication...
[TRPC] Using base URL from app.json: https://...
```

6. **Se NÃO ver erros**, o app está funcionando! ✅

## Fazer Upload para Play Store

Depois de testar:

1. Gere build de produção:
```bash
eas build --platform android --profile production
```

2. Baixe o AAB gerado

3. Faça upload na Play Store Console

4. Aguarde o novo build ser processado (pode levar algumas horas)

5. Teste novamente com testers

## Resumo das Correções que Fiz

✅ Adicionei Error Boundary para capturar erros
✅ Melhorei logs para debug
✅ Configurei React Query para modo offline
✅ Preparei código para ler configuração do app.json
⚠️ **VOCÊ PRECISA**: Editar app.json e fazer novo build

## Precisa de Ajuda?

Se tiver dúvidas:
1. Verifique os logs com `adb logcat`
2. Leia o arquivo SOLUCAO_CRASH_ANDROID.md para mais detalhes
3. Certifique-se de que editou o app.json corretamente
