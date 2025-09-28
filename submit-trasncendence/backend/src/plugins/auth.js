import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';

export default fp(async function (fastify, options) {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Register JWT plugin
    await fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET
    });

    // Main authentication decorator
    fastify.decorate("authenticated", async function (request, reply) {
        try {
            const token = request.cookies.token;
            console.log('🔑 [AUTH] Checking token for:', request.url);
            console.log('🍪 [AUTH] access Token received:', token ? 'YES' : 'NO');
            console.log('🍪 [AUTH] All cookies:', request.cookies);
            
            if (!token) {
                console.log('❌ [AUTH] No token found');
                return reply.status(401).send({ error: "No authentication token provided" });
            }

            try {
                const payload = fastify.jwt.verify(token);
                console.log('✅ [AUTH] Token verified for user:', payload.username);
                
                // Validate token type
                if (payload.type !== 'access') {
                    console.log('❌ [AUTH] Invalid token type:', payload.type);
                    return reply.status(403).send({ error: "Invalid token type" });
                }
                
                // Set user data on request
                request.user = payload;
                
            } catch (jwtError) {
                console.error('❌ [AUTH] JWT verification failed:', jwtError.message);
                return reply.status(401).send({ error: "Invalid or expired token" });
            }
            
        } catch (error) {
            console.error('❌ [AUTH] Authentication error:', error);
            return reply.status(500).send({ error: "Authentication error" });
        }
    });

    // Temporary token authentication decorator (for 2FA)
    fastify.decorate("authenticated_tmp", async function (request, reply) {
        try {
            // Log all cookies for debugging
            console.log('🍪 [TMP-AUTH] All cookies:', request.cookies);
            console.log('🔍 [TMP-AUTH] Headers:', request.headers);
            
            const token = request.cookies.tmp_token;
            console.log('🔑 [TMP-AUTH] Checking tmp_token for:', request.url);
            console.log('🍪 [TMP-AUTH] Token received:', token ? 'YES' : 'NO');
            console.log('🔍 [TMP-AUTH] Raw token value:', token);
            
            if (!token) {
                console.log('❌ [TMP-AUTH] No tmp_token found');
                return reply.status(401).send({ 
                    error: "No temporary token provided",
                    cookies: request.cookies, // Add cookies to error response for debugging
                    headers: request.headers.cookie
                });
            }

            try {
                const payload = fastify.jwt.verify(token);
                console.log('✅ [TMP-AUTH] Token verified for user:', payload.username);
                console.log('📦 [TMP-AUTH] Token payload:', payload);
                
                // Validate token type
                if (payload.type !== 'tmp') {
                    console.log('❌ [TMP-AUTH] Invalid token type:', payload.type);
                    return reply.status(403).send({ error: "Invalid token type" });
                }
                
                // Set user data on request
                request.user = payload;
                
            } catch (jwtError) {
                console.error('❌ [TMP-AUTH] JWT verification failed:', jwtError.message);
                return reply.status(401).send({ error: "Invalid or expired temporary token" });
            }
            
        } catch (error) {
            console.error('❌ [TMP-AUTH] Temporary authentication error:', error);
            return reply.status(500).send({ error: "Temporary authentication error" });
        }
    });

    // Refresh token authentication decorator
    fastify.decorate("refresh_token", async function (request, reply) {
        try {
            const token = request.cookies.refresh_token;
            console.log('🔑 [REFRESH] Checking refresh_token for:', request.url);
            console.log('🍪 [REFRESH] Token received:', token ? 'YES' : 'NO');
            
            if (!token) {
                console.log('❌ [REFRESH] No refresh_token found');
                console.warn(`[refresh-token-failed] No refresh token provided – ip: ${request.ip}`);
                return reply.status(401).send({ error: "No refresh token provided" });
            }

            try {
                const payload = fastify.jwt.verify(token);
                console.log('✅ [REFRESH] Token verified for user:', payload.username);
                
                // Validate token type
                if (payload.type !== 'refresh') {
                    console.log('❌ [REFRESH] Invalid token type:', payload.type);
                    console.warn(`[refresh-token-failed] Invalid token type from ip: ${request.ip}`);
                    return reply.status(403).send({ error: "Invalid token type" });
                }
                
                // Set user data on request
                request.user = payload;
                
            } catch (jwtError) {
                console.error('❌ [REFRESH] JWT verification failed:', jwtError.message);
                console.error(`[refresh-token-error] JWT verification failed from ip: ${request.ip}`, jwtError);
                return reply.status(401).send({ error: "Invalid or expired refresh token" });
            }
            
        } catch (error) {
            console.error('❌ [REFRESH] Refresh authentication error:', error);
            return reply.status(500).send({ error: "Refresh authentication error" });
        }
    });

    // Add a utility decorator to check if user is authenticated (non-blocking)
    fastify.decorate("checkAuth", async function (request, reply) {
        try {
            const token = request.cookies.token;
            if (!token) {
                return { authenticated: false };
            }

            const payload = fastify.jwt.verify(token);
            if (payload.type !== 'access') {
                return { authenticated: false };
            }

            return { 
                authenticated: true, 
                user: payload 
            };
        } catch (error) {
            return { authenticated: false };
        }
    });

});