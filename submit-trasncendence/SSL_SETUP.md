# 🔒 SSL/HTTPS Setup Guide for ft_transcendence

This guide covers setting up SSL/HTTPS certificates for both development and production environments.

## 🎯 Overview

The ft_transcendence application supports both HTTP and HTTPS with automatic SSL certificate management:

- **Development**: Self-signed certificates for localhost
- **Production**: Let's Encrypt certificates with automatic renewal

## 🔧 Development Setup (Self-Signed Certificates)

### Quick Start

```bash
# Generate development SSL certificates
make ssl-dev

# Start the application with HTTPS
make all
```

### Access Points

- **HTTPS (Main)**: https://localhost:8443
- **HTTP (Redirects)**: http://localhost:8080 → https://localhost:8443
- **Vite Dev**: http://localhost:5173 (development only)

### Browser Security Warning

Since we use self-signed certificates for development, browsers will show a security warning:

1. Click **"Advanced"**
2. Click **"Proceed to localhost (unsafe)"**
3. The certificate will be remembered for future visits

## 🚀 Production Setup (Let's Encrypt)

### Prerequisites

1. **Domain Name**: Point your domain to your server's IP
2. **DNS Configuration**: Ensure A/AAAA records are properly set
3. **Firewall**: Open ports 80 and 443
4. **Email**: Valid email for Let's Encrypt notifications

### Setup Process

```bash
# Setup Let's Encrypt certificates
make ssl-prod DOMAIN=your-domain.com EMAIL=admin@your-domain.com

# Deploy to production
make prod-deploy
```

### Automatic Certificate Renewal

```bash
# Setup automatic renewal (run once on production server)
./ssl/setup-auto-renewal.sh

# Manual renewal (if needed)
make ssl-renew
```

## 📁 File Structure

```
ssl/
├── certs/                          # Certificate files
│   └── localhost.crt               # Development certificate
├── private/                        # Private keys
│   └── localhost.key               # Development private key
├── letsencrypt/                    # Let's Encrypt certificates (production)
├── www/                            # Let's Encrypt challenge directory
├── generate-dev-certs.sh           # Development certificate generator
├── setup-letsencrypt.sh            # Production SSL setup
├── renew-certs.sh                  # Certificate renewal script
└── setup-auto-renewal.sh           # Automatic renewal setup
```

## 🔐 SSL Configuration Details

### Security Features

- **TLS 1.2/1.3**: Modern encryption protocols
- **HSTS**: HTTP Strict Transport Security
- **Security Headers**: XSS protection, content type sniffing prevention
- **OCSP Stapling**: Certificate validation optimization (production)

### Nginx Configuration

- **HTTP → HTTPS Redirect**: All HTTP traffic redirected to HTTPS
- **WebSocket Support**: Vite HMR works over HTTPS
- **Proxy Headers**: Proper forwarding for OAuth and API calls

## 🌐 Google OAuth Configuration

### Development

Update your Google Cloud Console OAuth settings:

```
Authorized redirect URIs:
- https://localhost:8443/auth/callback
```

### Production

```
Authorized redirect URIs:
- https://your-domain.com/auth/callback
```

## 🛠️ Troubleshooting

### Common Issues

1. **Certificate Not Found**
   ```bash
   # Regenerate development certificates
   make ssl-dev
   ```

2. **Permission Denied**
   ```bash
   # Fix certificate permissions
   chmod 600 ssl/private/*.key
   chmod 644 ssl/certs/*.crt
   ```

3. **Let's Encrypt Rate Limits**
   - Let's Encrypt has rate limits (5 certificates per domain per week)
   - Use staging environment for testing: `--staging` flag

4. **DNS Not Propagated**
   ```bash
   # Check DNS propagation
   dig your-domain.com
   nslookup your-domain.com
   ```

### Certificate Validation

```bash
# Check certificate details
openssl x509 -in ssl/certs/localhost.crt -text -noout

# Test SSL connection
openssl s_client -connect localhost:8443 -servername localhost
```

## 📋 Commands Reference

### Development
```bash
make ssl-dev          # Generate development certificates
make all              # Start with HTTPS
```

### Production
```bash
make ssl-prod DOMAIN=example.com EMAIL=admin@example.com  # Setup Let's Encrypt
make prod-deploy      # Deploy with production SSL
make ssl-renew        # Renew certificates manually
```

### Monitoring
```bash
make status           # Check container status
make logs             # View all logs
make nginx            # View nginx logs only
```

## 🔄 Certificate Lifecycle

### Development Certificates
- **Validity**: 365 days
- **Renewal**: Manual regeneration with `make ssl-dev`
- **Scope**: localhost, 127.0.0.1, ::1

### Production Certificates
- **Validity**: 90 days (Let's Encrypt)
- **Renewal**: Automatic (twice daily check)
- **Monitoring**: Email notifications from Let's Encrypt

## 🚨 Security Best Practices

1. **Keep Private Keys Secure**: Never commit private keys to version control
2. **Regular Updates**: Keep nginx and SSL libraries updated
3. **Monitor Expiration**: Set up alerts for certificate expiration
4. **Use Strong Ciphers**: Modern TLS configuration included
5. **HSTS Headers**: Prevent downgrade attacks

## 📞 Support

For issues with SSL setup:

1. Check the logs: `make nginx`
2. Verify DNS configuration
3. Ensure firewall allows ports 80/443
4. Check Let's Encrypt rate limits
5. Validate certificate chain

---

🎮 **ft_transcendence** - Secure, scalable, and production-ready!
