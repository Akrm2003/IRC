FROM node:22-alpine

# Install build dependencies (cache this layer)
# RUN apk add --no-cache python3 py3-pip py3-setuptools py3-wheel make g++

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies with pre-built binaries (this layer will be cached if package.json doesn't change)
RUN npm install --prefer-offline --no-audit --progress=false
RUN npm install @fastify/multipart @fastify/static --prefer-offline --no-audit

# Copy only necessary files for Prisma generation
COPY backend/prisma ./backend/prisma/

# Generate Prisma client (cache this step)
RUN npx prisma generate --schema=backend/prisma/schema.prisma

# Skip SQLite rebuild - use pre-built binaries instead
# RUN npm rebuild sqlite3 --build-from-source

# Copy source code (this changes frequently, so put it last)
COPY backend/src ./backend/src/
COPY backend/app.js ./backend/
COPY .env* ./

# Create uploads directory
RUN mkdir -p backend/uploads/avatars

# Copy frontend build (only if needed for production)
# COPY frontend/dist/ /usr/share/nginx/html/

EXPOSE 3000

# Start server
CMD ["node", "backend/app.js"]
