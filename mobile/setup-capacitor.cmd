@echo off
title CliniPortal Mobile App Setup (Capacitor)
color 0A
echo ========================================================
echo               CLINIPORTAL MOBILE APP SETUP              
echo ========================================================
echo.
echo Dang khoi tao du an Mobile Android / iOS voi Capacitor...
cd /d "%~dp0.."

echo 1. Dong bo tai nguyen Web sang Mobile App Container...
npx --yes @capacitor/cli sync android

echo.
echo 2. Tao thu muc ma nguoi Mobile Android...
npx --yes @capacitor/cli add android

echo.
echo ========================================================
echo HOAN THANH KHOT TAO DU AN MOBILE ANDROID!
echo Thu muc ma nguon Android da duoc tao tai: ./android
echo.
echo De bien dich file .apk:
echo - Mo Android Studio -> Open project -> Chon thu muc ./android
echo - Hoac chay lenh: cd android && gradle assembleDebug
echo ========================================================
pause
