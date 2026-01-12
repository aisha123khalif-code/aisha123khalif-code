@echo off
REM AI Video Studio - Development Helper Script for Windows

echo 🎬 AI Video Studio - Development Helper
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo    Please install Node.js v14 or higher
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set NODE_VERSION=%%v
echo ✅ Node.js %NODE_VERSION% detected

REM Check if MySQL is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MySQL is not installed
    echo    Please install MySQL 5.7 or higher
    pause
    exit /b 1
)

echo ✅ MySQL detected

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found
    echo    Creating from .env.example...
    copy .env.example .env
    echo ✅ .env file created
    echo    Please edit .env with your database credentials
    echo.
    pause
)

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    echo ✅ Dependencies installed
)

REM Setup database
echo.
set /p SETUP_DB="Do you want to setup/reset the database? (y/n) "
if /i "%SETUP_DB%"=="y" (
    echo 🗄️  Setting up database...
    call npm run install-db
    echo ✅ Database setup complete
)

echo.
echo 🚀 Setup complete!
echo.
echo To start the server:
echo   npm start        - Production mode
echo   npm run dev      - Development mode (with auto-reload)
echo.
echo Visit http://localhost:3000 when the server is running
echo.
pause
