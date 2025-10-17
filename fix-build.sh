#!/bin/bash

echo "🔧 Iniciando correção de dependências para build AAB..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar se comando foi bem sucedido
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 concluído com sucesso${NC}"
    else
        echo -e "${RED}✗ Erro em: $1${NC}"
        exit 1
    fi
}

# 1. Limpar cache
echo -e "${YELLOW}1. Limpando cache e dependências antigas...${NC}"
rm -rf node_modules
rm -rf android/app/build
rm -rf android/.gradle
rm -rf bun.lock
check_result "Limpeza de cache"
echo ""

# 2. Reinstalar dependências
echo -e "${YELLOW}2. Reinstalando dependências...${NC}"
bun install
check_result "Instalação de dependências"
echo ""

# 3. Gerar arquivos nativos
echo -e "${YELLOW}3. Gerando arquivos nativos do Android...${NC}"
npx expo prebuild --clean --platform android
check_result "Prebuild do Expo"
echo ""

# 4. Limpar build do Gradle
echo -e "${YELLOW}4. Limpando build do Gradle...${NC}"
cd android
./gradlew clean
check_result "Limpeza do Gradle"
cd ..
echo ""

echo -e "${GREEN}✅ Correção concluída!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Abra o Android Studio"
echo "2. File → Open → Selecione a pasta 'android'"
echo "3. File → Invalidate Caches / Restart"
echo "4. Aguarde o Gradle sincronizar"
echo "5. Build → Generate Signed Bundle / APK"
echo ""
echo "Ou execute via comando:"
echo "cd android && ./gradlew bundleRelease"
