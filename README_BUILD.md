# 🚀 LacNutry - Guia de Build para Android

## ⚠️ LEIA ISTO PRIMEIRO

Você está tentando gerar um APK através do Android Studio e está tendo **erros de JavaScript**.

**Este projeto usa Expo**, que tem um processo de build diferente do React Native puro.

## 🎯 Solução Rápida (Escolha UMA)

### 1️⃣ Testar Agora (2 minutos) ⭐ RECOMENDADO
```bash
bun run start
# Baixe "Expo Go" na Play Store e escaneie o QR code
```

### 2️⃣ Gerar APK (30 minutos)
```bash
# 1. Hospede o backend online (Railway/Render)
# 2. Atualize .env com URL do backend
# 3. Execute:
npx expo prebuild --platform android
npx expo run:android --variant release
```

### 3️⃣ Usar Android Studio (1 hora)
```bash
# 1. Faça tudo do item 2
# 2. Depois abra pasta 'android' no Android Studio
```

## 📚 Documentação Completa

Criei **9 documentos** para te ajudar:

### 🌟 Comece Aqui
- **[DOCUMENTACAO_BUILD_INDEX.md](DOCUMENTACAO_BUILD_INDEX.md)** - Índice de toda documentação
- **[RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)** - Resumo do problema e soluções

### 📖 Guias Principais
- **[LEIA-ME-BUILD.md](LEIA-ME-BUILD.md)** - Guia completo em português
- **[GUIA_VISUAL_BUILD.md](GUIA_VISUAL_BUILD.md)** - Guia com diagramas visuais

### 🔧 Instruções Técnicas
- **[ANDROID_BUILD_INSTRUCTIONS.md](ANDROID_BUILD_INSTRUCTIONS.md)** - Instruções detalhadas
- **[BUILD_GUIDE.md](BUILD_GUIDE.md)** - Guia geral de build

### ✅ Ferramentas Práticas
- **[CHECKLIST_BUILD.md](CHECKLIST_BUILD.md)** - Checklist passo a passo
- **[COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md)** - Comandos úteis

### 🆘 Resolução de Problemas
- **[SOLUCAO_ERRO_BUILD.md](SOLUCAO_ERRO_BUILD.md)** - Soluções para erros comuns

## 🎓 Por Onde Começar?

### Se você é INICIANTE:
```
1. Leia: RESUMO_EXECUTIVO.md (3 min)
2. Leia: LEIA-ME-BUILD.md (10 min)
3. Siga: CHECKLIST_BUILD.md
```

### Se você é VISUAL:
```
1. Leia: GUIA_VISUAL_BUILD.md (8 min)
2. Siga: CHECKLIST_BUILD.md
```

### Se você tem PRESSA:
```
1. Execute: bun run start
2. Use: Expo Go no celular
3. Pronto! 🎉
```

### Se você quer APK:
```
1. Leia: LEIA-ME-BUILD.md → Seção "Build"
2. Siga: CHECKLIST_BUILD.md
3. Consulte: COMANDOS_RAPIDOS.md
```

## 🚨 Erros Comuns

| Erro | Solução Rápida | Documento |
|------|----------------|-----------|
| Network request failed | Hospede backend online | SOLUCAO_ERRO_BUILD.md |
| API key not valid | Verifique .env | SOLUCAO_ERRO_BUILD.md |
| Unable to resolve module | Limpe cache | COMANDOS_RAPIDOS.md |
| Build falha | Faça prebuild | LEIA-ME-BUILD.md |

## 📞 Precisa de Ajuda?

1. **Primeiro**: Consulte [SOLUCAO_ERRO_BUILD.md](SOLUCAO_ERRO_BUILD.md)
2. **Depois**: Veja [GUIA_VISUAL_BUILD.md](GUIA_VISUAL_BUILD.md) → Fluxograma de Erros
3. **Por último**: Me envie:
   - Screenshot do erro
   - Comando executado
   - Backend está online? (sim/não)

## 🎯 Recomendação

**Para você AGORA**:
1. Teste com Expo Go (mais rápido)
2. Depois hospede o backend
3. Por último faça o build

**Não tente usar Android Studio diretamente sem fazer prebuild!**

## 📱 Links Úteis

- **Railway** (hospedar backend): https://railway.app
- **Render** (alternativa): https://render.com
- **Expo Docs**: https://docs.expo.dev
- **Play Console**: https://play.google.com/console

## 🔗 Navegação Rápida

- [📚 Índice Completo](DOCUMENTACAO_BUILD_INDEX.md)
- [📋 Resumo Executivo](RESUMO_EXECUTIVO.md)
- [📖 Guia Principal](LEIA-ME-BUILD.md)
- [🎨 Guia Visual](GUIA_VISUAL_BUILD.md)
- [✅ Checklist](CHECKLIST_BUILD.md)
- [⚡ Comandos](COMANDOS_RAPIDOS.md)
- [🆘 Erros](SOLUCAO_ERRO_BUILD.md)

---

## 🎉 Início Rápido (TL;DR)

```bash
# Para testar AGORA (mais fácil):
bun run start
# Baixe Expo Go e escaneie QR code

# Para gerar APK (requer backend online):
npx expo prebuild --platform android
npx expo run:android --variant release
```

**Dúvidas?** Leia [LEIA-ME-BUILD.md](LEIA-ME-BUILD.md) ou [GUIA_VISUAL_BUILD.md](GUIA_VISUAL_BUILD.md)

---

**Versão**: 1.0  
**Data**: 2025-10-13  
**Status**: ✅ Documentação completa criada
