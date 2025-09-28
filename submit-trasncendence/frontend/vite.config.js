import { defineConfig } from 'vite'

export default defineConfig({
  // Development server configuration
  server: {
    port: 5173,
    open: '/',  // Open the main entry point (index.html)
    host: true,
    https: {
      key: './ssl/private/localhost.key',
      cert: './ssl/certs/localhost.crt'
    },
    proxy: {
      '/api': {
        target: 'https://backend:3000', // Docker backend service (HTTPS)
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
        withCredentials: true,
        cookieDomainRewrite: false,  // Don't rewrite cookie domains
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Firefox-friendly CORS headers
            res.setHeader('Access-Control-Allow-Origin', 'https://localhost:5173');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, Accept, X-Requested-With, Cache-Control, Pragma');
            res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
            res.setHeader('Vary', 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers');
            
            // Allow cookies for any domain
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
              proxyRes.headers['set-cookie'] = cookies.map(cookie =>
                cookie.replace(/SameSite=[^;]+;/, 'SameSite=Lax;')
                      .replace(/Secure;/, '') // Remove Secure flag for localhost
              );
            }
          });
        },
        headers: {
          'Origin': 'https://localhost:5173'  // Use HTTPS origin
        }
      },
      '/auth/google': {
        target: 'https://backend:3000', // Use HTTPS consistently
        changeOrigin: true,
        secure: false,
        withCredentials: true,
        cookieDomainRewrite: false,
        headers: {
          'Origin': 'https://localhost:5173'  // Use HTTPS origin
        }
      },
      '/auth/callback': {
        target: 'https://backend:3000', // Use HTTPS consistently
        changeOrigin: true,
        secure: false,
        withCredentials: true,
        cookieDomainRewrite: false,
        headers: {
          'Origin': 'http://localhost:5173'  // Use HTTPS origin
        }
      },
      '/socket.io': {
        target: 'https://backend:3000', // Proxy Socket.IO connections
        changeOrigin: true,
        secure: false,
        withCredentials: true,
        ws: true, // Enable WebSocket proxying
        headers: {
          'Origin': 'http://localhost:5173'
        }
      },
      '/uploads': {
        target: 'https://backend:3000', // Proxy uploaded files (avatars, etc.)
        changeOrigin: true,
        secure: false,
        withCredentials: true,
        headers: {
          'Origin': 'http://localhost:5173'
        }
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Entry points for different pages
      input: {
        main: 'index.html',           // Main entry point (auth router)
        login: 'auth/login.html',
        register: 'auth/register.html',
        home: 'home/home.html',
        profile: 'profile/profile.html',
        friends: 'friends/friends.html',

        tournaments: 'tournaments/tournaments.html'  // Add tournaments page
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    // Enable sourcemaps for better debugging
    sourcemap: true
  },
  
  // Handle TypeScript
  esbuild: {
    target: 'es2020'
  },
  
  // Base path for assets
  base: './'
})
