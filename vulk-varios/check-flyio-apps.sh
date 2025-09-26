#!/bin/bash

# Script to check Fly.io apps without web dashboard access
# This uses the Fly.io CLI to list your apps

echo "🔍 Checking Fly.io apps..."

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ Fly.io CLI not found. Installing..."

    # Install flyctl
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        curl -L https://fly.io/install.sh | sh
    else
        # Linux
        curl -L https://fly.io/install.sh | sh
    fi

    # Add to PATH
    export PATH="$HOME/.fly/bin:$PATH"
fi

# Check if logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "🔐 Not logged in to Fly.io. Please run:"
    echo "   flyctl auth login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Logged in to Fly.io"
echo ""

# List all apps
echo "📱 Your Fly.io Apps:"
echo "===================="
flyctl apps list

echo ""
echo "🌐 App URLs:"
echo "============"

# Get app names and their URLs
flyctl apps list --json | jq -r '.[].Name' | while read app_name; do
    if [ ! -z "$app_name" ]; then
        echo "App: $app_name"

        # Get app info
        app_info=$(flyctl apps show "$app_name" --json 2>/dev/null)
        if [ $? -eq 0 ]; then
            # Get hostname
            hostname=$(echo "$app_info" | jq -r '.Hostname // "N/A"')
            if [ "$hostname" != "N/A" ] && [ "$hostname" != "null" ]; then
                echo "  URL: https://$hostname"
            else
                echo "  URL: https://$app_name.fly.dev"
            fi

            # Get status
            status=$(echo "$app_info" | jq -r '.Status // "unknown"')
            echo "  Status: $status"

            # Get region
            region=$(echo "$app_info" | jq -r '.Region // "unknown"')
            echo "  Region: $region"

            echo ""
        else
            echo "  ❌ Could not get app details"
            echo ""
        fi
    fi
done

echo "💡 To get more details about a specific app, run:"
echo "   flyctl apps show <app-name>"
echo ""
echo "💡 To see app logs, run:"
echo "   flyctl logs <app-name>"
echo ""
echo "💡 To restart an app, run:"
echo "   flyctl apps restart <app-name>"
