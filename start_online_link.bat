@echo off
chcp 65001 >nul
title Khizri Ways - Online Public & Local Launcher
color 0A
cls
echo ========================================================
echo    KHIZRI WAYS - ONLINE PUBLIC & LOCAL LAUNCHER
echo    طرق خضری - روحانی علاج اور اسلامی رہنمائی
echo ========================================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    pause
    exit /b
)

netstat -ano | findstr :5000 >nul 2>nul
if %errorlevel% neq 0 (
    echo [1/2] Starting local Khizri Ways server on port 5000...
    start "Khizri Ways Server" /min cmd /c "node server/server.js"
    timeout /t 2 >nul
) else (
    echo [1/2] Local server is active on port 5000.
)

echo [2/2] Starting Secure Online Public Link...
echo.
echo ========================================================
echo  📱 Instant Local Links:
echo  - Local PC Browser:   http://localhost:5000
echo  - Mobile (Same Wi-Fi):http://192.168.100.4:5000
echo  - Admin Panel:        http://localhost:5000/admin
echo ========================================================
echo.
echo Opening Public Online Tunnel (Localtunnel)...
echo (Note: If it asks for Endpoint IP / Password, enter: 117.134.204.34)
echo.
npx -y localtunnel --port 5000
pause
