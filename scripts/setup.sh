#!/bin/bash

# AI Video Studio - Development Helper Script

echo "🎬 AI Video Studio - Development Helper"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js v14 or higher"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed"
    echo "   Please install MySQL 5.7 or higher"
    exit 1
fi

echo "✅ MySQL detected"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found"
    echo "   Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "   Please edit .env with your database credentials"
    echo ""
    read -p "Press Enter to continue..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

# Setup database
echo ""
read -p "Do you want to setup/reset the database? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Setting up database..."
    npm run install-db
    echo "✅ Database setup complete"
fi

echo ""
echo "🚀 Setup complete!"
echo ""
echo "To start the server:"
echo "  npm start        - Production mode"
echo "  npm run dev      - Development mode (with auto-reload)"
echo ""
echo "Visit http://localhost:3000 when the server is running"
echo ""
