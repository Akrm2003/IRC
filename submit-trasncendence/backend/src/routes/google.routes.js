import { URLSearchParams } from 'url';
import { profile } from 'console';
import path from 'path';

export default async function google_routes(fastify, options) {
    fastify.get('/auth/google' , async (request , reply) => {
        console.log('🔍 Google OAuth initiated');
        console.log('🔧 Google OAuth Config Check:', {
            client_id: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING',
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'MISSING',
            client_secret: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING'
        });
        console.log('🔗 Full redirect URI being used:', process.env.GOOGLE_REDIRECT_URI);
        
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
            console.error('❌ Missing Google OAuth environment variables');
            return reply.status(500).send({ error: 'Google OAuth not configured' });
        }
        
        const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=email profile` ;

        console.log('🔗 Redirecting to Google OAuth:', redirectUrl);

        return reply.redirect(redirectUrl);
    });
    //URL-encoded form data
    fastify.get('/auth/callback' , async (request , reply)=> {
        console.log('🔄 Google OAuth callback received');
        console.log('Query params:', request.query);
        
        const code = request.query.code;
        if(!code){
            console.error('❌ Authorization code missing from callback');
            return reply.status(400).send({ error: "Authorization code missing" });
        }
        
        console.log('✅ Authorization code received:', code.substring(0, 20) + '...');
        try {
            const tokenRes = await fetch('https://oauth2.googleapis.com/token' , {
                method : 'POST',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                body : new URLSearchParams({
                    code,
                    client_id : process.env.GOOGLE_CLIENT_ID,
                    client_secret : process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri : process.env.GOOGLE_REDIRECT_URI,
                    grant_type : 'authorization_code',
                }),
            });
            const tokenData = await tokenRes.json();
            console.log('🎫 Token response:', tokenData);
            
            if (!tokenData.access_token) {
                console.error('❌ No access token received');
                return reply.status(400).send({ error: 'Failed to get access token' });
            }
    
            const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo' , {
                headers : {Authorization  : `Bearer ${tokenData.access_token}` },
            });
    
            const profile = await userRes.json();
            console.log('👤 User profile:', profile);
    
            const existingUser = await fastify.prisma.user.findFirst({
                where : {
                    OR : [
                        {google_id : profile.id},
                        {email : profile.email}
                    ]
                }
            });
            
            console.log('🔍 Existing user check:', existingUser ? 'Found' : 'Not found');
            
            let newUser = null;
            if(!existingUser){
                console.log('➕ Creating new user');
                 newUser = await fastify.prisma.user.create({
                    data : {
                        username : profile.name,
                        google_id : profile.id,
                        email : profile.email,
                        avatar_url : profile.picture
                    }
                });
                console.log('✅ New user created:', newUser.id);
            }else if(existingUser){
                console.log('🔄 Updating existing user');
                await fastify.prisma.user.update({
                    where : {id : existingUser.id},
                    data : {
                        username : profile.name,
                        google_id : profile.id,
                        email : profile.email,
                        avatar_url : profile.picture
                    }
                });
            }
            const userId = existingUser ? existingUser.id : newUser.id;
            console.log('👤 Final user ID:', userId);
    
            const token = await reply.jwtSign(
                {type : 'access' , id : userId  ,username : profile.name  , email : profile.email},
                {expiresIn : '1h'}
            );
            const refresh_token = await reply.jwtSign(
                {type : 'refresh' , id : userId, username : profile.name , email : profile.email},
                {expiresIn : '7d'}
            );
            console.log('🍪 Setting authentication cookies');
            reply.setCookie("token" , token , {
                httpOnly : true,   // Security: prevent XSS attacks
                secure : true,     // HTTPS required for secure cookies
                secret : false ,
                path : '/',
                sameSite : 'Lax',
                maxAge : 3600,
            }).setCookie("refresh_token" , refresh_token , {
                httpOnly : true ,
                secure : true,     // HTTPS required for secure cookies
                secret : false , 
                path : '/',
                sameSite : 'Lax',
                maxAge : 7 * 24 * 60 * 60 
            });
            
            console.log('🏠 Redirecting to home page');
            console.log('🍪 Cookies set:', { 
                token: typeof token === 'string' ? token.substring(0, 20) + '...' : 'Token set', 
                refresh_token: typeof refresh_token === 'string' ? refresh_token.substring(0, 20) + '...' : 'Refresh token set' 
            });
            const frontendUrl = process.env.FRONTEND_HTTPS_URL || 'https://localhost:8443';
            return reply.redirect(`${frontendUrl}/home/home.html`);
    
        } catch(err){
            console.error('❌ Google OAuth error:', err);
            return reply.status(500).send({error : "INTERNAL SERVER ERROR !"});
        }
       
    })
}



