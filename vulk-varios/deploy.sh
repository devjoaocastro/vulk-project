#!/bin/bash

# VULK Deploy Script for Fly.io
echo "🚀 Starting VULK deployment to Fly.io..."

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl not found. Installing..."
    curl -L https://fly.io/install.sh | sh
    export PATH="$HOME/.fly/bin:$PATH"
fi

# Login to Fly.io (if not already logged in)
echo "🔐 Checking Fly.io authentication..."
if ! flyctl auth whoami &> /dev/null; then
    echo "Please login to Fly.io:"
    flyctl auth login
fi

# Build and deploy
echo "🏗️  Building and deploying to Fly.io..."
flyctl deploy --remote-only

echo "✅ Deployment complete!"
echo "🌐 Your app is now live at: https://vulk-app.fly.dev"



