@echo off
cd /d "%~dp0"
where code >nul 2>nul
if errorlevel 1 (
  echo Visual Studio Code no aparece instalado o no esta en PATH.
  echo Puedes abrir VS Code y elegir Archivo - Abrir carpeta.
  pause
  exit /b 1
)
code .
