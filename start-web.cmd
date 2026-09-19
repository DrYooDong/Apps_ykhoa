@echo off
title CliniPortal MedLens Web App
echo ========================================================
echo   CliniPortal MedLens - He sinh thai Y khoa Lam sang
echo   Chay truc tiep qua Vite (Khong can node_modules)
echo ========================================================
echo.
cd /d "%~dp0"
echo Dang khoi dong may chu Web tai http://127.0.0.1:3000 ...
npx -y vite@6.3.0 --host 127.0.0.1 --port 3000 --open
pause
