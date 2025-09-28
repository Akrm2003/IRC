import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dbConnector from './src/plugins/db.js';
import authRoutes from './src/routes/auth.routes.js';
import authplugin from './src/plugins/auth.js';
import userRoutes from './src/routes/users.routes.js';
import tournamentRoutes from './src/routes/tournament.routes.js';
import rpsRoutes from './src/routes/rps.routes.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { type } from 'os';
import google_routes from './src/routes/google.routes.js';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastifyCookie from '@fastify/cookie';
import socketIOplugin from './src/plugins/socketio.js';
import chatRoutes from './src/routes/chat.routes.js';
import fs from 'fs';

console.log('\x1b[38;5;208m%s\x1b[0m', 'Server starting...');

// HTTPS configuration
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'private', 'localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'certs', 'localhost.crt'))
};

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname'
            }
        }
    },
    https: httpsOptions
});

// 1. Register CORS first
await fastify.register(cors, {
    origin: [
        'http://localhost:5173', // Vite dev server HTTP
        'https://localhost:5173', // Vite dev server HTTPS
        'http://localhost:8080', // NGINX HTTP
        'https://localhost:8443', // NGINX HTTPS
        'http://localhost:3000', // Backend HTTP
        'https://localhost:3000', // Backend HTTPS
        /^https?:\/\/10\.42\.247\.98:5173$/, // External IP Vite
        /^https?:\/\/10\.42\.247\.98:8443$/, // External IP Nginx
        /^https?:\/\/10\.42\.247\.98:3000$/, // External IP Backend
        /^https?:\/\/\d+\.\d+\.\d+\.\d+:(5173|8443|3000)$/, // Allow any IP for development
    ],
    credentials: true, // Important for cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// 2. Register Cookie plugin BEFORE auth plugin
await fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || process.env.JWT_SECRET, // Fallback to JWT_SECRET if COOKIE_SECRET not set
    parseOptions: {
        httpOnly: false, // Allow client-side access for tmp_token checking
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
});

// 3. Register database connector
await fastify.register(dbConnector);

// 4. Register auth plugin AFTER cookie plugin
await fastify.register(authplugin);

// 5. Register multipart
await fastify.register(fastifyMultipart, {
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }
});

// 6. Register static file serving
await fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'src', 'uploads'),
    prefix: '/uploads/',
});

// 7. Register Swagger with corrected security schemes
await fastify.register(swagger, {
    openapi: {
        info: {
            title: 'Your API',
            description: 'API documentation',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                CookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token'
                },
                CookieAuthTmp: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'tmp_token'  // Fixed: was 'tmpToken'
                },
                CookieRefresh: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'refresh_token'  // Fixed: was 'refresh'
                }
            }
        },
        security: [
            {
                CookieAuth: []
            }
        ]
    }
});

await fastify.register(swaggerUi, {
    routePrefix: '/docs'
});

// Register routes AFTER all plugins
await fastify.register(authRoutes, { prefix: '/api/auth' }); // Remove /api prefix here
await fastify.register(google_routes);
await fastify.register(userRoutes, { prefix: '/api/users' }); // Updated prefix
await fastify.register(socketIOplugin);
await fastify.register(chatRoutes, { prefix: '/api/chat' }); // Updated chat routes prefix
await fastify.register(tournamentRoutes, { prefix: '/api/tournaments' });
await fastify.register(rpsRoutes, { prefix: '/api/rps' }); // Rock Paper Scissors routes

// Add debug route for testing
fastify.get('/test', async (request, reply) => {
    console.log('Headers received:', request.headers);
    console.log('Cookies received:', request.cookies);
    return { message: 'Nginx is working!', cookies: request.cookies };
});

// Add a debug route to test cookie functionality
fastify.get('/debug/cookies', async (request, reply) => {
    console.log('🍪 All cookies:', request.cookies);
    console.log('🍪 Token:', request.cookies.token);
    console.log('🍪 Tmp Token:', request.cookies.tmp_token);
    console.log('🍪 Refresh Token:', request.cookies.refresh_token);
    
    return {
        cookies: request.cookies,
        headers: request.headers.cookie
    };
});

// RUN the server 
fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1);
    }
    console.log(`🚀 Server listening on ${address}`);
    console.log(`📖 API documentation available at ${address}/docs`);
});