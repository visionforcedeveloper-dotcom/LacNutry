@echo off
echo Iniciando correcao de dependencias para build AAB...
echo.

echo 1. Limpando cache e dependencias antigas...
rmdir /s /q node_modules 2>nul
rmdir /s /q android\app\build 2>nul
rmdir /s /q android\.gradle 2>nul
del /q bun.lock 2>nul
echo Cache limpo com sucesso!
echo.

echo 2. Reinstalando dependencias...
call bun install
if errorlevel 1 (
    echo Erro ao instalar dependencias!
    pause
    exit /b 1
)
echo Dependencias instaladas com sucesso!
echo.

echo 3. Gerando arquivos nativos do Android...
call npx expo prebuild --clean --platform android
if errorlevel 1 (
    echo Erro ao gerar arquivos nativos!
    pause
    exit /b 1
)
echo Arquivos nativos gerados com sucesso!
echo.

echo 4. Limpando build do Gradle...
cd android
call gradlew clean
if errorlevel 1 (
    echo Erro ao limpar Gradle!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Build do Gradle limpo com sucesso!
echo.

echo ========================================
echo Correcao concluida com sucesso!
echo ========================================
echo.
echo Proximos passos:
echo 1. Abra o Android Studio
echo 2. File - Open - Selecione a pasta 'android'
echo 3. File - Invalidate Caches / Restart
echo 4. Aguarde o Gradle sincronizar
echo 5. Build - Generate Signed Bundle / APK
echo.
echo Ou execute via comando:
echo cd android
echo gradlew bundleRelease
echo.
pause
