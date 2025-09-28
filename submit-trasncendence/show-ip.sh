#!/bin/bash

# ft_transcendence Network Configuration Script
# This script helps you access your local development server from other devices

echo "🌐 ft_transcendence Network Configuration"
echo "======================================="

# Detect OS and get local IP
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    # Linux
    LOCAL_IP=$(ip route get 1 | awk '{print $7}' | head -1)
fi

if [ -z "$LOCAL_IP" ]; then
    echo "❌ Could not detect your local IP address"
    echo "   Please make sure you're connected to a network"
    exit 1
fi

# Check if services are running
check_service() {
    if pgrep -f "$1" > /dev/null; then
        echo "   ✅ $1 is running"
        return 0
    else
        echo "   ❌ $1 is NOT running"
        return 1
    fi
}

echo "\n🔍 Checking running services:"
check_service "node" || echo "   💡 Run 'make fast' to start the development servers"
check_service "docker" || echo "   💡 Docker is not running. Start it to use containerized services"

echo "\n🌐 Network Information:"
echo "   Your Local IP: $LOCAL_IP"

echo "\n🔗 Access URLs for other devices:"
echo "   🔒 HTTPS (recommended): https://$LOCAL_IP:8443"
echo "   🌐 HTTP (redirects):    http://$LOCAL_IP:8080"
echo "   ⚡ Vite Dev Server:     http://$LOCAL_IP:5173"

echo "\n📱 How to access from other devices:"
echo "   1. Make sure your device is on the same network"
echo "   2. On the other device's browser, visit: https://$LOCAL_IP:8443"
echo "   3. Accept the security warning (self-signed certificate)"
echo "   4. Log in and start playing! 🎮"

echo "\n💡 Tip: If you can't connect:"
echo "   - Check your firewall settings"
echo "   - Make sure the ports (8443, 8080, 5173) are open"
echo "   - Try disabling VPN if you're using one"

echo "\n🛠️  Development Commands:"
echo "   make fast    - Start development servers"
echo "   make all     - Start with Docker"
echo "   make stop    - Stop all services"
