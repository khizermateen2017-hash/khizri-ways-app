@echo off
cd /d "%~dp0"
echo ========================================================
echo Auto-Syncing Khizri Ways App to GitHub...
echo ========================================================
git add .
git commit -m "Auto-update: %date% %time%"
git push origin main
echo.
echo Sync Complete!
echo ========================================================
timeout /t 3
