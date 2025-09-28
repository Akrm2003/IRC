# ft_transcendence - Makefile for Docker Compose
# Usage: make [command]

.PHONY: help build up down restart logs clean dev prod status frontend backend nginx all re fast ssl-check ssl-dev ssl-prod ssl-renew

# Default target - show help
help:
	@echo "🎮 ft_transcendence - Development Commands"
	@echo "========================================"
	@echo ""
	@echo "Main Commands:"
	@echo "  make all      - Build and start the entire project (auto-generates SSL)"
	@echo "  make re       - Complete rebuild from scratch (clean + build + start)"
	@echo "  make fast     - Start in FAST development mode (no Docker, direct npm)"
	@echo "  make dev      - Start in development mode with logs"
	@echo "  make prod     - Start in production mode (detached)"
	@echo "  make restart  - Restart all services"
	@echo "  make down     - Stop all services"
	@echo "  make clean    - Stop and remove all containers, volumes, and images"
	@echo "  make clean-db - Remove only database volume (reset database)"
	@echo "  make show-ip  - Show network info for accessing from other devices"
	@echo ""
	@echo "Individual Services:"
	@echo "  make backend  - View backend logs"
	@echo "  make frontend - View frontend build logs"
	@echo "  make nginx    - View nginx logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make build    - Build all services"
	@echo "  make logs     - View all logs"
	@echo "  make status   - Show container status"
	@echo ""
	@echo "SSL Management:"
	@echo "  make ssl-dev  - Manually generate development SSL certificates"
	@echo "  make ssl-prod - Setup production SSL (requires DOMAIN and EMAIL)"
	@echo ""
	@echo "🌐 Access: http://localhost:8080 → https://localhost:8443"

# Build all services
build:
	@echo "🔨 Building all services..."
	docker compose build

# Start all services (detached mode)
up:
	@echo "🚀 Starting ft_transcendence..."
	docker compose up -d
	@echo "✅ Services started! Access at: http://localhost:8080"
# Stop all running services
down:
	@echo "🛑 Stopping all services..."
	docker compose down

# Build and start everything (main command)
all: ssl-check build up
	@echo "✅ Services started!"
	@echo "🌐 HTTP: http://localhost:8080 (redirects to HTTPS)"
	@echo "🔒 HTTPS: https://localhost:8443 (main application)"
	@echo "⚡ Vite Dev: http://localhost:5173 (development)"
	@echo "🎯 ft_transcendence is ready with SSL!"

# Development mode with logs
dev: ssl-check build
	@echo "🔧 Starting in development mode..."
	docker compose up
# Production mode (detached)
prod: all

# Restart services
restart: down up

# Rebuild everything (common alias for all)
re: clean ssl-check build up
	@echo "🔄 Complete rebuild finished!"
	@echo "🌐 HTTP: http://localhost:8080 (redirects to HTTPS)"
	@echo "🔒 HTTPS: https://localhost:8443 (main application)"
	@echo "⚡ Vite Dev: http://localhost:5173 (development)"
	@echo "🎯 ft_transcendence is ready with SSL!"

# Show logs from all services
logs:
	docker compose logs -f

# Individual service logs
backend:
	docker compose logs -f backend

frontend:
	docker compose logs -f frontend

nginx:
	docker compose logs -f nginx

# Show container status
status:
	@echo "📊 Container Status:"
	docker compose ps

# Show network information for accessing from other devices
show-ip:
	@chmod +x show-ip.sh
	@./show-ip.sh

# SSL certificate management
ssl-check:
	@echo "🔍 Checking SSL certificates..."
	@mkdir -p ssl/private ssl/certs
	@if [ ! -f ssl/certs/localhost.crt ] || [ ! -f ssl/private/localhost.key ]; then \
		echo "🔐 SSL certificates not found, generating them..."; \
		./ssl/generate-dev-certs.sh; \
	else \
		echo "✅ SSL certificates already exist"; \
	fi

ssl-dev:
	@echo "🔐 Generating development SSL certificates..."
	./ssl/generate-dev-certs.sh

ssl-prod:
	@echo "🔒 Setting up production SSL with Let's Encrypt..."
	@echo "Usage: make ssl-prod DOMAIN=your-domain.com EMAIL=admin@your-domain.com"
	@if [ -z "$(DOMAIN)" ] || [ -z "$(EMAIL)" ]; then \
		echo "❌ Error: DOMAIN and EMAIL are required"; \
		echo "Example: make ssl-prod DOMAIN=transcendence.example.com EMAIL=admin@example.com"; \
		exit 1; \
	fi
	./ssl/setup-letsencrypt.sh $(DOMAIN) $(EMAIL)

ssl-renew:

# Clean up everything (containers, images, volumes)
clean:
	@echo "🧹 Cleaning up everything..."
	docker compose down -v --rmi all --remove-orphans
	docker system prune -f
clean-db:
	@echo "🗑️ Resetting database..."
	docker compose down
	docker volume rm ft_transcendence_sqlite_data 2>/dev/null || true
	@echo "✅ Database reset complete"
