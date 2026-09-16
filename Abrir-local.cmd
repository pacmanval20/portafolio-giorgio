@echo off
cd /d "%~dp0"
echo.
echo PORTAFOLIO DE GIORGIO - VISTA LOCAL
echo.
echo Abre Brave y escribe: http://127.0.0.1:4173
echo Deja esta ventana abierta mientras editas. Pulsa Ctrl+C para cerrar.
echo.
npm run dev
if errorlevel 1 (
  echo.
  echo No se pudo iniciar. Comprueba que Node.js esta instalado.
  pause
)
