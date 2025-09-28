#!/bin/bash

# Generate self-signed SSL certificates for development
# This script creates certificates for localhost development

set -e

CERT_DIR="$(dirname "$0")"
DOMAIN="localhost"
DAYS=365

echo "🔐 Generating self-signed SSL certificates for development..."
echo "📁 Certificate directory: $CERT_DIR"
echo "🌐 Domain: $DOMAIN"
echo "📅 Valid for: $DAYS days"

# Generate private key
echo "🔑 Generating private key..."
openssl genrsa -out "$CERT_DIR/private/localhost.key" 2048

# Generate certificate signing request
echo "📝 Generating certificate signing request..."
openssl req -new -key "$CERT_DIR/private/localhost.key" -out "$CERT_DIR/localhost.csr" -subj "/C=US/ST=CA/L=San Francisco/O=ft_transcendence/OU=Development/CN=$DOMAIN"

# Generate self-signed certificate with proper extensions
echo "📜 Generating self-signed certificate..."
openssl x509 -req -in "$CERT_DIR/localhost.csr" -signkey "$CERT_DIR/private/localhost.key" -out "$CERT_DIR/certs/localhost.crt" -days $DAYS -extensions v3_req -extfile <(
cat <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = CA
L = San Francisco
O = ft_transcendence
OU = Development
CN = localhost

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
DNS.3 = 127.0.0.1
IP.1 = 127.0.0.1
IP.2 = ::1
IP.3 = 10.42.247.98
EOF
)

# Clean up CSR file
rm "$CERT_DIR/localhost.csr"

# Set appropriate permissions
chmod 600 "$CERT_DIR/private/localhost.key"
chmod 644 "$CERT_DIR/certs/localhost.crt"

echo "✅ SSL certificates generated successfully!"
echo "🔑 Private key: $CERT_DIR/private/localhost.key"
echo "📜 Certificate: $CERT_DIR/certs/localhost.crt"
echo ""
echo "🚀 You can now start the HTTPS server!"
echo "🌐 Access your app at: https://localhost:8443"
echo ""
echo "⚠️  Note: Browsers will show a security warning for self-signed certificates."
echo "   Click 'Advanced' → 'Proceed to localhost (unsafe)' to continue."
