# Frontend Development with Vite
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (this layer will be cached if package.json doesn't change)
RUN npm ci --only=production=false

# Copy source code (put this last as it changes frequently)
COPY src ./src/
COPY *.html ./
COPY *.ts ./
COPY *.js ./
COPY *.json ./
COPY vite.config.* ./
COPY tsconfig.* ./

# Copy other necessary files
COPY assets ./assets/
COPY auth ./auth/
COPY extraGame ./extraGame/
COPY friends ./friends/
COPY game ./game/
COPY home ./home/
COPY profile ./profile/
COPY tournaments ./tournaments/

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
