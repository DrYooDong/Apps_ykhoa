@echo off
title CliniPortal Mobile App Setup (Capacitor)
color 0A
echo ========================================================
echo               CLINIPORTAL MOBILE APP SETUP              
echo ========================================================
echo.
echo Dang khoi tao du an Mobile Android / iOS voi Capacitor...
cd /d "%~dp0..\.."

echo 1. Cai dat thu vien Capacitor Android (Install dependencies)...
call npm install @capacitor/core @capacitor/android @capacitor/cli

echo.
echo 2. Dong bo tai nguyen Web sang thu muc ./www...
call node platforms/mobile/build-www.js

echo.
echo 3. Tao thu muc ma nguon Mobile Android (Add Android platform)...
npx --yes @capacitor/cli add android

echo.
echo 4. Dong bo tai nguyen Web sang Mobile App Container (Sync Web Assets)...
npx --yes @capacitor/cli sync android

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
