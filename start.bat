@echo off
title Khizri Ways - Islamic App Launcher
color 0A
cls
echo ========================================================
echo    KHIZRI WAYS - ISLAMIC APP ^& ADMIN BACKEND
echo    طرق خضری | روحانی علاج اور اسلامی رہنمائی
echo ========================================================
echo.

cd /d "%~dp0"

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing required dependencies...
    call npm install
    echo.
)

echo [INFO] Starting Khizri Ways server...
echo.
echo ========================================================
echo   Android Mobile App:  http://localhost:5000
echo   Admin Dashboard:     http://localhost:5000/admin
echo ========================================================
echo.
echo Launching your browser in 2 seconds...

REM Open browser after short delay in background
start "" cmd /c "timeout /t 2 >nul & start http://localhost:5000"

REM Start server
node server/server.js

pause
