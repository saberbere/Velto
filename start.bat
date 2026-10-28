@echo off
setlocal
cd /d "%~dp0"
title Velto - lancement local

echo.
echo ========================================
echo          VELTO - DEMARRAGE
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo ERREUR : Node.js n'est pas installe ou n'est pas dans le PATH.
    echo Installe Node.js LTS depuis https://nodejs.org/
    echo Puis ferme et rouvre le terminal.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo ERREUR : npm est introuvable. Reinstalle Node.js LTS.
    echo.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ERREUR : package.json est introuvable.
    echo Place start.bat dans C:\Users\saber\Velto, a cote de package.json.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
    echo Les dependances sont absentes ou incompletes.
    echo Installation/reparation avec npm install...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERREUR : npm install a echoue.
        echo Verifie ta connexion Internet et copie le message d'erreur.
        pause
        exit /b 1
    )
)

if not exist "node_modules\vite\bin\vite.js" (
    echo ERREUR : Vite est toujours introuvable apres installation.
    echo Copie le message complet affiche ci-dessus et envoie-le-moi.
    pause
    exit /b 1
)

echo Lancement de Velto...
echo Ouvre http://localhost:5173/ dans Chrome lorsque Vite est pret.
echo Garde cette fenetre ouverte pendant l'utilisation.
echo Pour arreter Velto, appuie sur Ctrl+C.
echo.
call npm run dev
echo.
echo Velto est arrete.
pause
