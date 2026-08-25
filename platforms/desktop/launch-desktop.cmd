@echo off
title CliniPortal Desktop Launcher
color 0A
echo ========================================================
echo               CLINIPORTAL DESKTOP APP                   
echo ========================================================
echo.
echo Dang khoi dong ung dung CliniPortal Desktop...
cd /d "%~dp0..\.."
npx --yes electron platforms/desktop/main-electron.js
if %errorlevel% neq 0 (
    echo.
    echo [Loi] Khong the khoi dong Electron. Dang thu voi cache cuc bo...
    pause
)
