# ft_transcendence

This is the main repository for the ft_transcendence project.

## Development Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Docker and Docker Compose (for containerized development)

### Environment Setup

1. Copy the example environment file and update it with your settings:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="file:./mydb.sqlite3"
   
   # JWT
   JWT_SECRET="your-jwt-secret"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GOOGLE_REDIRECT_URI="https://localhost:8443/auth/callback"
   ```

### SSL Certificate Setup

For local development, you'll need to generate self-signed SSL certificates. The project includes a script to generate these certificates automatically.

1. Make the script executable:
   ```bash
   chmod +x ssl/generate-dev-certs.sh
   ```

2. Run the certificate generation script:
   ```bash
   ./ssl/generate-dev-certs.sh
   ```

   This will:
   - Create a local Certificate Authority (CA)
   - Generate a root certificate
   - Create and sign server certificates for local development
   - Trust the root certificate on your system

3. **Important**: The certificates are generated for `localhost` and `127.0.0.1`. If you need to access the site via your local network IP, you'll need to modify the `ssl/openssl.cnf` file and regenerate the certificates.

### Running the Application

1. Start the development environment:
   ```bash
   docker-compose up --build
   ```

2. Access the application at:
   - Frontend: https://localhost:5173
   - Backend API: https://localhost:3000

### Troubleshooting

1. **SSL Certificate Warnings**:
   - Make sure you've trusted the generated root certificate
   - On macOS, double-click the `ssl/certs/rootCA.pem` file and add it to your keychain
   - Restart your browser after trusting the certificate

2. **Port Conflicts**:
   - If ports 3000 (backend) or 5173 (frontend) are in use, update the ports in `docker-compose.yml`

3. **Environment Variables**:
   - Ensure all required environment variables are set in your `.env` file
   - Never commit your `.env` file to version control

## Development Workflow

- Run `npm run dev` in the frontend directory to start the Vite dev server
- The backend will automatically reload when you make changes to the source code
- Check the browser's developer console for any errors

## Local Development Only

This project is configured for local development only. For local network access:

1. Run `make show-ip` to see your local IP and access URLs
2. Access the app from other devices on the same network using the provided URLs
3. Remember to accept the self-signed certificate warning in your browser

## Team Collaboration

- Branch naming: `feature/your-feature-name` or `bugfix/issue-description`
- Create pull requests for code review
- Update the documentation when adding new features or changing configurations
