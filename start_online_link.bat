@echo off
chcp 65001 >nul
title Khizri Ways - Online Public Launcher
color 0B
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
    echo [1/2] Local server is already running on port 5000.
)

echo [2/2] Starting Cloudflare Tunnel for secure online HTTPS link...
echo.
echo ========================================================
echo  LOOK BELOW FOR YOUR PUBLIC LINK (*.trycloudflare.com)
echo  Local PC:      http://localhost:5000
echo  Admin Panel:   http://localhost:5000/admin
echo ========================================================
echo.

if exist "cloudflared.exe" (
    cloudflared.exe tunnel --url http://localhost:5000
) else (
    echo [ERROR] cloudflared.exe not found in project directory!
    pause
)
