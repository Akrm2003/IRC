import fp from 'fastify-plugin'
import fastifyJwt from 'fastify-jwt';
import { Type } from '@sinclair/typebox'
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import { generateSecret } from 'speakeasy'
import QRCode from 'qrcode'
import fastifyCookie from '@fastify/cookie';
import path from 'path';
import { error } from 'console';

//401 Unauthorized
//403 Forbidden
//404 Not Found

const userSchema = {
    body: Type.Object({
        email: Type.String({ format: 'email' }),
        username: Type.String({
            maxLength: 10,
            minLength: 3,
        }),
        password: Type.String({
            minLength: 8,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).*$' //example password for testing : Abcdef1!
        }),
        confirmPassword: Type.String({
            minLength: 8
        })
    })
};

const loginSchema = {
    body: Type.Object({
        email: Type.String({ format: 'email' }),
        password: Type.String({
            minLength: 1  // Just ensure it's not empty
        })
    })
};

const verifySchema = {
    body: Type.Object({
        code: Type.String({
            minLength: 6,
            maxLength: 6,
            pattern: '^[0-9]{6}$'  // Exactly 6 digits
        })
    })
}

export default async function authRoutes(fastify, options) {
    
    // Register route
    fastify.post('/register', { schema: userSchema }, async (request, reply) => {
        const { username, email, password, confirmPassword } = request.body;
        
        if (!username || !password || !email || !confirmPassword) {
            return reply.status(400).send({ error: "All fields are required" });
        }

        if (confirmPassword !== password) {
            return reply.status(400).send({ error: "Passwords do not match" });
        }

        try {
            const isUserExist = await fastify.prisma.user.findFirst({
                where: {
                    OR: [
                        { username: username },
                        { email: email }
                    ]
                }
            });

            if (isUserExist) {
                if (isUserExist.username === username)
                    return reply.status(400).send({ error: "This username already exists" });
                else if (isUserExist.email === email)
                    return reply.status(400).send({ error: "This email already exists" });
            }

            const HashedPassword = await bcrypt.hash(password, 10)
            const newUser = await fastify.prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: HashedPassword
                }
            });
            
            return reply.status(201).send({ success: true, id: newUser.id });
        } catch (err) {
            request.log.error(err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    // Login route
    fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
        const { password, email } = request.body;
        
        if (!password || !email) {
            return reply.status(400).send({ error: "Email and password are required" });
        }

        try {
            console.log('🔍 [LOGIN] Attempting login for email:', email);
            const user = await fastify.prisma.user.findFirst({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    username: true,
                    password: true,
                    totp_secret: true  // Include to check if 2FA is set up
                }
            });
            console.log('👤 [LOGIN] User found:', user ? 'YES' : 'NO');

            if (!user || !user.password) {
                return reply.status(401).send({ error: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return reply.status(401).send({ error: "Invalid credentials" });
            }

            // Generate temporary token for 2FA flow
            const tmp_token = await reply.jwtSign(
                { type: 'tmp', id: user.id, username: user.username, email: email },
                { expiresIn: '5m' }
            );

            reply.setCookie("tmp_token", tmp_token, {
                httpOnly: false,
                secure: true,  // Always use secure cookies for HTTPS
                path: '/',
                sameSite: 'Lax',
                maxAge: 300,
            });

            // Check if user already has 2FA set up
            if (user.totp_secret) {
                // User already has 2FA - go to code verification
                return reply.send({
                    message: "Login successful, enter 2FA code",
                    requires2FA: true,
                    hasSetup: true,
                    success: true
                });
            } else {
                // User doesn't have 2FA - must set it up (QR code)
                return reply.send({
                    message: "Login successful, 2FA setup required",
                    requires2FA: true,
                    hasSetup: false,
                    success: true
                });
            }
        } catch (err) {
            console.error('❌ [LOGIN] Login error:', err);
            console.error('❌ [LOGIN] Error stack:', err.stack);
            request.log.error('Login error:', err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    // 2FA Setup route
    fastify.post('/2fa/verify', {
        schema: {
            security: [
                { CookieAuthTmp: [] }
            ]
        },
        preValidation: [fastify.authenticated_tmp]
    }, async (request, reply) => {
        const userId = request.user.id;
        
        try {
            const isUserExist = await fastify.prisma.user.findUnique({
                where: {
                    id: userId,
                }
            })
            
            console.log('User found for 2FA setup:', isUserExist?.username);
            
            if (!isUserExist) {
                return reply.status(404).send({ error: "User doesn't exist" });
            }

            const secret = speakeasy.generateSecret({
                name: `ft_transcendence (${isUserExist.username})`,
                length: 32,
                issuer: 'ft_transcendence'
            });

            console.log('🔑 Generated 2FA Secret:', {
                ascii: secret.ascii,
                base32: secret.base32,
                hex: secret.hex,
                otpauth_url: secret.otpauth_url
            });

            const saveSecret = await fastify.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    totp_secret: secret.base32
                }
            });

            console.log('💾 Saved 2FA Secret to DB:', {
                userId,
                username: isUserExist.username,
                storedSecret: secret.base32
            });
            
            const qrCodeImage = await QRCode.toDataURL(secret.otpauth_url)
            
            return reply.send({
                secret: secret.base32,
                qrCodeUrl: secret.otpauth_url,
                qrCodeImage: qrCodeImage,
            });

        } catch (err) {
            console.log("2FA setup failed:", err.message);
            request.log.error(err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    // 2FA Login verification
    fastify.post('/2fa/login', {
        preValidation: [fastify.authenticated_tmp],
        schema: {
            ...verifySchema,
            security: [
                { CookieAuthTmp: [] }
            ]
        }
    }, async (request, reply) => {
        const userId = request.user.id;
        const { code } = request.body;

        try {
            // Log the received data
            console.log('🔐 2FA Login attempt:', {
                userId,
                tmpToken: request.cookies.tmp_token ? 'Present' : 'Missing',
                code: code ? 'Present' : 'Missing'
            });

            const checkUser = await fastify.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    totp_secret: true
                }
            });
            
            if (!checkUser || !checkUser.totp_secret) {
                console.error('❌ User not found or TOTP not setup');
                return reply.status(403).send({ error: "Invalid authentication state" });
            }

            // Verify TOTP code with a larger window and better logging
            const verified = speakeasy.totp.verify({
                secret: checkUser.totp_secret,
                encoding: 'base32',
                token: code,
                window: 2,  // Increased from 1 to 2 for better tolerance
                step: 30,   // Explicitly set step to 30 seconds (standard TOTP)
                time: Math.floor(Date.now() / 1000)  // Current time in seconds
            });
            
            // Debug information
            console.log('TOTP Verification Debug:', {
                secret: checkUser.totp_secret,
                code,
                time: Math.floor(Date.now() / 1000),
                verified
            });
            
            if (!verified) {
                // Try with a different time offset as fallback
                const verifiedWithOffset = speakeasy.totp.verify({
                    secret: checkUser.totp_secret,
                    encoding: 'base32',
                    token: code,
                    window: 2,
                    step: 30,
                    time: Math.floor(Date.now() / 1000) - 30  // Try with 30s offset
                });
                
                if (!verifiedWithOffset) {
                    console.error('❌ Invalid TOTP code - all verification attempts failed');
                    return reply.status(401).send({ 
                        error: "Invalid verification code",
                        hint: "Please make sure your device's time is synchronized with the internet time"
                    });
                }
                console.log('✅ TOTP verified with time offset');
            }
            console.log('✅ TOTP verified for user:', checkUser.username);

            // Generate new tokens
            const token = await reply.jwtSign(
                { 
                    type: 'access', 
                    id: checkUser.id, 
                    username: checkUser.username, 
                    email: checkUser.email 
                },
                { expiresIn: '1h' }
            );
            
            const refresh_token = await reply.jwtSign(
                { 
                    type: 'refresh', 
                    id: checkUser.id, 
                    username: checkUser.username, 
                    email: checkUser.email 
                },
                { expiresIn: '7d' }
            );

            // Set cookies with proper configuration
            reply
                .setCookie('token', token, {
                    httpOnly: true,
                    secure: true,  // Always use secure cookies for HTTPS
                    path: '/',
                    sameSite: 'Lax',
                    maxAge: 3600
                })
                .setCookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: true,  // Always use secure cookies for HTTPS
                    path: '/',
                    sameSite: 'Lax',
                    maxAge: 604800 // 7 days
                })
                // .clearCookie('tmp_token', {
                //     path: '/',
                //     sameSite: 'Lax'
                // });

            console.log('✅ Auth cookies set for user:', checkUser.username);

            return reply.send({
                success: true,
                message: "2FA verification successful"
            });

        } catch (err) {
            console.error('🚨 2FA verification error:', err);
            return reply.status(500).send({ error: "Authentication failed" });
        }
    });

    // Session verification route - THIS IS CRITICAL
    fastify.get('/verify-session', {
        schema: {
            security: [
                { CookieAuth: [] }
            ]
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        try {
            console.log('Session verification for user:', request.user.username);
            
            // Verify user still exists in database
            const user = await fastify.prisma.user.findUnique({
                where: {
                    id: request.user.id
                },
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            });

            if (!user) {
                return reply.status(401).send({ error: "User not found" });
            }

            return reply.send({
                authenticated: true,
                userId: user.id,
                username: user.username,
                email: user.email
            });
        } catch (err) {
            request.log.error('Session verification error:', err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    // Logout route
    fastify.post('/logout', {
        schema: {
            security: [
                { CookieAuth: [] }
            ]
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        try {
            console.log('Logout requested for user:', request.user.username);

            // Clear authentication cookies
            reply.clearCookie('token', {
                path: '/',
                sameSite: 'Lax'
            });
            
            reply.clearCookie('refresh_token', {
                path: '/',
                sameSite: 'Lax'
            });

            // Also clear any tmp_token if it exists
            reply.clearCookie('tmp_token', {
                path: '/',
                sameSite: 'Lax'
            });

            console.log('Logout successful for user:', request.user.username);

            return reply.send({ 
                message: "Logout successful",
                success: true 
            });
        } catch (err) {
            request.log.error('Logout error:', err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    // Refresh token route
    fastify.post('/refresh', {
        schema: {
            security: [{ CookieRefresh: [] }]
        },
        preValidation: [fastify.refresh_token]
    }, async (request, reply) => {
        const UserId = request.user.id;
        
        try {
            const checkUser = await fastify.prisma.user.findUnique({
                where: {
                    id: UserId
                }
            })
            
            if (!checkUser) {
                console.warn(`[REFRESH] User not found: ${UserId}`);
                return reply.status(404).send({ error: "User doesn't exist" });
            }

            const token = await reply.jwtSign(
                { type: 'access', id: checkUser.id, username: checkUser.username, email: checkUser.email },
                { expiresIn: '1h' }
            )
            
            const refresh = await reply.jwtSign(
                { type: 'refresh', id: checkUser.id, username: checkUser.username, email: checkUser.email },
                { expiresIn: '7d' }
            )

            console.log(`[REFRESH] New tokens generated for user ${checkUser.username} (${checkUser.id})`);

            reply.setCookie("token", token, {
                httpOnly: true,
                secure: true,  // Always use secure cookies for HTTPS
                path: '/',
                sameSite: 'Lax',
                maxAge: 3600
            }).setCookie("refresh_token", refresh, {
                httpOnly: true,
                secure: true,  // Always use secure cookies for HTTPS
                path: '/',
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60
            })
            
            return reply.send({ 
                message: "Tokens refreshed",
                success: true 
            });
        } catch (err) {
            request.log.error('Refresh error:', err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });
}