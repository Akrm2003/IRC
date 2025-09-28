import fp from 'fastify-plugin'
import { Type } from '@sinclair/typebox'
import {onlineUsers} from '../plugins/socketio.js'
import { OnlineStatus } from '../../generated/prisma/index.js'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default avatar function
function getDefaultAvatar(username) {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=1e293b&textColor=ffffff`;
}

const MatchSchema = {
    body : {
        type : 'object',
        required : ['player2_name', 'winner_name', 'score_p1', 'score_p2'],
        properties : {
            player2_name : {type : 'string', minLength: 1, maxLength: 50},
            winner_name : {type : 'string', minLength: 1, maxLength: 50},
            score_p1:   { type: 'integer' },
            score_p2:   { type: 'integer' }
        }
    }
}

const friendRequestSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', pattern: '^\\d+$' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                requestId: { type: 'number' }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        409: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
}
const updateProfile = {
    body : {
        type : 'object',
        properties : {
            display_name : {type : 'string'},
            avatar_url : {type : 'string' , format : 'uri'}
        }
    }
}
const FriendRequesResponse = {
    body : {
        type : 'object',
        required : ['status'],
        properties : {
            status : {
                type : 'string',
                enum: ['ACCEPTED', 'DECLINED']
            }
          
        }
    }
}
export default async function userRoutes(fastify , options) {
    
    fastify.post('/update-profile' , 
        {preValidation : [fastify.authenticated] , schema : {
            security : [
                {CookieAuth : []}
            ]
        }} ,
         async (request , reply) => {
        const {display_name , avatar_url} = request.body;
        const {id} = request.user;
        try {
            // If no avatar_url provided, don't update it (keep existing or default)
        const updateData = {};
        if (display_name !== undefined) updateData.display_name = display_name;
        if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

        if (Object.keys(updateData).length === 0) {
            return reply.status(400).send({error: "No fields to update"});
        }

            const upload = await fastify.prisma.user.update({
                where : {id : id},
                data : updateData
            })
            // const upload = await fastify.db.run('UPDATE users SET display_name = ?, avatar_url = ?  WHERE id = ? ',
            //      [display_name , avatar_url , id]);
            console.log(upload);
            return reply.send({'message' : "fields updated successfully" , avatar_url: upload.avatar_url});
        } catch(err){
            if(err.code == 'P2025'){
                return reply.status(404).send({ message: "User not found" });
            }
            request.log.error(err);
            return reply.status(500).send({error : "internal server error"});
        }
    });
    fastify.get('/profile', { 
        schema: {
            security: [{ CookieAuth: [] }]
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        const userId = request.user.id;
        
        try {
            // 1. First, get the user profile
            const userProfile = await fastify.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    display_name: true,
                    avatar_url: true,
                    created_at: true,
                    updated_at: true
                }
            });

            if (!userProfile) {
                request.log.warn(`User not found with id: ${userId}`);
                return reply.status(404).send({ message: "User not found" });
            }

            // Set default avatar if none exists
            if (!userProfile.avatar_url) {
                userProfile.avatar_url = getDefaultAvatar(userProfile.username);
            }

            // 2. Get user stats with error handling
            let stats = {
                totalMatches: 0,
                totalWins: 0,
                winRate: 0,
                averageScore: 0
            };

            try {
                console.log('Fetching PONG matches for user ID:', userId, 'Type:', typeof userId);
                const matches = await fastify.prisma.match.findMany({
                    where: {
                        player1Id: userId,
                        gameType: 'pong'  // CRITICAL: Only fetch Pong matches, not RPS
                    },
                    select: {
                        id: true,
                        player1Id: true,
                        player2Name: true,
                        winnerId: true,
                        winnerName: true,
                        score_p1: true,
                        score_p2: true,
                        gameType: true,
                        played_at: true
                    },
                    orderBy: {
                        played_at: 'desc'
                    },
                    take: 50
                });

                console.log('Found matches for user', userId, ':', JSON.stringify(matches, null, 2));

                // If no matches found, try to see if there are any matches at all
                if (matches.length === 0) {
                    try {
                        const allMatches = await fastify.prisma.match.findMany({
                            take: 5 // Just get a few matches to check the structure
                        });
                        console.log('Sample of all matches in database:', JSON.stringify(allMatches, null, 2));
                        console.log('Table schema:', await fastify.prisma.$queryRaw`PRAGMA table_info(match);`);
                    } catch (schemaError) {
                        console.error('Error fetching schema or matches:', schemaError);
                    }
                }

                console.log('All user matches:', JSON.stringify(matches, null, 2));
                console.log('Current user:', {
                    id: userId,
                    username: userProfile.username,
                    display_name: userProfile.display_name
                });

                // Log each match's winner info
                matches.forEach((match, index) => {
                    console.log(`\nMatch ${index + 1}:`);
                    console.log(`- Player 1 ID: ${match.player1Id}`);
                    console.log(`- Player 2 Name: ${match.player2Name}`);
                    console.log(`- Winner ID: ${match.winnerId}`);
                    console.log(`- Winner Name: ${match.winnerName}`);
                    console.log(`- Scores: ${match.score_p1} - ${match.score_p2}`);
                    console.log(`- Is winner (ID match): ${match.winnerId === userId}`);
                    console.log(`- Is winner (name match): ${match.winnerName === userProfile.username || match.winnerName === userProfile.display_name}`);
                });

                const wins = matches.filter(match => {
                    // Check if the user is the winner by:
                    // 1. winnerId matches user ID (proper way)
                    // 2. winnerName is the string version of user ID (current bug)
                    // 3. winnerName matches username or display_name
                    return (
                        match.winnerId === userId ||
                        match.winnerName === String(userId) ||
                        match.winnerName === userProfile.username ||
                        match.winnerName === userProfile.display_name
                    );
                });

                console.log('User wins:', wins.length, 'out of', matches.length, 'matches');
                console.log('Win details:', {
                    userId,
                    username: userProfile.username,
                    displayName: userProfile.display_name,
                    matches: matches.map(m => ({
                        winnerId: m.winnerId,
                        winnerName: m.winnerName,
                        isWin: (
                            m.winnerId === userId ||
                            m.winnerName === String(userId) ||
                            m.winnerName === userProfile.username ||
                            m.winnerName === userProfile.display_name
                        )
                    }))
                });

                const totalMatches = matches.length;
                const totalWins = wins.length;
                const winRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

                // Calculate average score
                const totalScore = matches.reduce((sum, match) => {
                    return sum + (match.score_p1 || 0);
                }, 0);

                stats = {
                    totalMatches,
                    totalWins,
                    winRate: totalMatches > 0 ? winRate.toFixed(2) : '0.00',
                    averageScore: totalMatches > 0 ? (totalScore / totalMatches).toFixed(2) : '0.00'
                };
            } catch (statsError) {
                console.error('Detailed stats error:', {
                    message: statsError.message,
                    stack: statsError.stack,
                    code: statsError.code,
                    meta: statsError.meta
                });
                request.log.error('Error fetching user stats:', statsError);
                // Continue with default stats if there's an error
            }

            return reply.send({
                profile: [userProfile],
                stats
            });

        } catch (error) {
            request.log.error('Error in /profile route:', error);
            return reply.status(500).send({ 
                message: "Error retrieving the User Data",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    });
    fastify.post('/friends/:id', { 
        preValidation: [fastify.authenticated],
        schema: {
            ...friendRequestSchema,
            security: [{ CookieAuth: [] }]
        }
    }, async (request, reply) => {
        const friend_id = parseInt(request.params.id);
        if (isNaN(friend_id)) {
            return reply.status(400).send({ error: "Invalid friend ID" });
        }
        
        const user = request.user;
        
        if (user.id === friend_id) {
            return reply.status(400).send({ error: "You can't send a friend request to yourself" });
        }

        try {
            // Check if a friend request already exists
            const existing = await fastify.prisma.friend.findFirst({
                where: {
                    OR: [
                        { senderId: user.id, receiverId: friend_id },
                        { senderId: friend_id, receiverId: user.id }
                    ],
                    status: 'PENDING'
                }
            });

            if (existing) {
                return reply.status(409).send({ error: "A pending friend request already exists" });
            }

            // Create new friend request
            const friendRequest = await fastify.prisma.friend.create({
                data: {
                    receiverId: friend_id,
                    senderId: user.id,
                    status: 'PENDING'
                }
            });

            return reply.send({ 
                message: "Friend request sent successfully",
                requestId: friendRequest.id
            });

        } catch (error) {
            request.log.error('Error sending friend request:', error);
            return reply.status(500).send({ 
                error: "Failed to send friend request",
                ...(process.env.NODE_ENV === 'development' && { details: error.message })
            });
        }
    });
    fastify.patch('/friends/:id/accept' , {schema : {
        ...FriendRequesResponse ,
        security : [
            {CookieAuth :[]}
        ]
    } ,
        preValidation : [fastify.authenticated]} 
        , async (request , reply) => {
        console.log(request.body);
        const friend_id = parseInt(request.params.id) ; ///// The ID of the user who sent the friend request (the sender)
        const {status} = request.body;
        console.log("this is the status of this accpet friend request : " , status);

        const user_id = request.user.id;
        // if(!["accepted" , "declined"].includes(status)){
        //     return reply.status(400).send({ error: "Invalid status value" });
        // }todo soon
        try {
            const StatusResponse = await fastify.prisma.friend.updateMany({
                where : {senderId : friend_id , receiverId : user_id},
                data : {status : status}
            });
            // const StatusResponse = await fastify.db.run('UPDATE friends SET status = ? where friend_id = ? AND user_id = ?',
            //     [status , friend_id , user_id]
            // );
            console.log("this is the status " , status)
            console.log("this is thE ID of the sender " , friend_id);
            console.log("this is the status response " , StatusResponse);
            if(StatusResponse.count > 0)
                return reply.status(200).send({"Message" : "Friend request response sent successfully"});
            else{
                return reply.status(404).send({ "Message": 'Friend request not found or not authorized' });
            }
        } catch(err){
            request.log.error(err);
            return reply.send(500).send({error : "Internal Server Error"});
        }
    });

    fastify.delete('/friend/:id' , {schema : {
        security : [
            {CookieAuth : []}
        ]
    } ,
        preValidation : [fastify.authenticated]} ,
        async (request , reply) => {
        const friend_id = parseInt(request.params.id);
        const user_id = request.user.id;
        try {
            const result = await fastify.prisma.friend.deleteMany({
                where :{
                    OR : [ 
                        {senderId : friend_id , receiverId : user_id},
                        {senderId : user_id , receiverId : friend_id}

                    ]
                } 
               
            })
            // const result = await fastify.db.run('DELETE FROM friends WHERE friend_id= ? AND user_id = ?' , [friend_id , user_id]);
            console.log(result);
            if(result.count > 0)
                return reply.status(200).send({"Message" : "Friend Deleted Successfully !"});
            else {
                return reply.status(404).send({ "Message": "Friend not found or not authorized." });
            }
        } catch(err){
            request.log.error(err);
            return reply.status(500).send({error : "Internal Server Error "});
        }
    });

    fastify.post('/matches' , {preValidation : [fastify.authenticated] , 
        schema :{
            ...MatchSchema,
            security : [
                {CookieAuth : []}
            ]
        } } ,
         async (request , reply) => {
        const {player2_name , winner_name , score_p1 , score_p2 } = request.body;
        const senderID = request.user.id;
    
        if(![score_p1 , score_p2].every(Number.isInteger)){
            return reply.status(400).send({error : "All fields must be valid numbers"});
        }
        try {
            if(senderID !== senderID)
                    return reply.status(403).send({error: "Not authorized to report this match" });
            // Get current user info to validate winner
            const currentUser = await fastify.prisma.user.findUnique({
                where: { id: senderID },
                select: { username: true }
            });
            
            // Winner must be either: user ID (string), username, or player2_name
            const validWinners = [
                senderID.toString(),           // User ID as string (legacy)
                currentUser?.username,         // Username
                player2_name                   // Guest player name
            ].filter(Boolean); // Remove any null/undefined values
            
            if (!validWinners.includes(winner_name)) {
                return reply.status(400).send({
                    error: "Winner must be one of the players",
                    validWinners: validWinners,
                    received: winner_name
                });
            }
            const recordGame = await fastify.prisma.match.create({
                data : {
                    player1Id : senderID,
                    player2Name : player2_name,
                    score_p1,
                    score_p2 ,
                    winnerName : winner_name,
                    gameType: 'pong'  // CRITICAL: Set game type for Pong matches
                }
            })
            // const recordGame = await fastify.db.run('INSERT INTO matches (player1_id , player2_id , winner_id , score_p1 , score_p2 )' ,
            //     [player1_id , player2_id , winner_id , score_p1 , score_p2]
            // );
            console.log(recordGame);
            if(recordGame)
                return reply.status(200).send({"Message" : "Game Recorded successfully"});
        } catch(err){
            request.log.error(err);
            if(err.code === 'P2002')
                return reply.status(409).send({error : "Match already exists"});
            return reply.status(500).send({error : "Internal Server Error"});
        }
    });

    fastify.get('/matches/:id' ,{schema : {
        security : [
            {CookieAuth : []}
        ]
    } ,
        preValidation : [fastify.authenticated]} ,
        async(request , reply)=> {
        const user_id = parseInt(request.params.id);
        if(user_id !== Number(request.user.id))
            return reply.status(403).send({error : "User not Found !"});
        try {
            // This endpoint should only return PONG matches for the dashboard
            const pongMatches = await fastify.prisma.match.findMany({
                where : {
                    AND: [
                        {player1Id : Number(user_id)}, // Only matches where this user was player1
                        {gameType: 'pong'}  // Only return Pong matches
                    ]
                },
                orderBy: {
                    played_at: 'desc'
                },
                take: 50
            });
            reply.send(pongMatches)
        } catch(err){
            request.log.error(err);
            return reply.status(500).send({error : "User not Found !"});
        }
    });

    // Get public match history for any user (for viewing other users' profiles)
    fastify.get('/profile/:id/matches', {
        schema: {
            security: [{ CookieAuth: [] }],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                },
                required: ['id']
            }
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        const userId = parseInt(request.params.id);
        
        if (isNaN(userId)) {
            return reply.status(400).send({ error: "Invalid user ID" });
        }

        try {
            // Get public match history for the specified user (both as player1 and player2)
            const userProfile = await fastify.prisma.user.findUnique({
                where: { id: userId }
            });

            if (!userProfile) {
                return reply.status(404).send({ error: "User not found" });
            }

            const matches = await fastify.prisma.match.findMany({
                where: {
                    player1Id: userId  // Only matches where this user was player1
                },
                orderBy: {
                    played_at: 'desc'
                },
                take: 20 // Limit to last 20 matches
            });

            console.log(`📊 Found ${matches.length} matches for user ${userId}`);
            reply.send(matches);
        } catch (error) {
            console.error('❌ Error fetching user matches:', error);
            request.log.error('Error fetching user matches:', error);
            return reply.status(500).send({ error: "Failed to fetch matches" });
        }
    });

    fastify.get('/friends', { 
        schema: {
            security: [{ CookieAuth: [] }]
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        const userId = request.user.id;
        
        try {
            // Update online status first
            await fastify.prisma.friend.updateMany({
                where: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId }
                    ],
                    status: "ACCEPTED",
                },
                data: {
                    onlineStatus: 'OFFLINE'
                }
            });
         
            // Update online users
            const onlineUserIds = Array.from(onlineUsers.keys());
            await fastify.prisma.friend.updateMany({
                where: {
                    OR: [
                        { senderId: userId, receiverId: { in: onlineUserIds } },
                        { receiverId: userId, senderId: { in: onlineUserIds } }
                    ],
                    status: "ACCEPTED"
                },
                data: {
                    onlineStatus: 'ONLINE',
                },
            });

            // Get all friends with their details
            const friends = await fastify.prisma.friend.findMany({
                where: {
                    OR: [
                        { receiverId: userId },
                        { senderId: userId }
                    ]
                },
                include: {
                    sender: {
                        select: {
                            id: true,
                            username: true,
                            display_name: true,
                            avatar_url: true
                        }
                    },
                    receiver: {
                        select: {
                            id: true,
                            username: true,
                            display_name: true,
                            avatar_url: true
                        }
                    }
                }
            });

            // Format the response
            const formattedFriends = friends.map(friend => ({
                id: friend.id,
                status: friend.status,
                onlineStatus: friend.onlineStatus,
                createdAt: friend.created_at,
                updatedAt: friend.updated_at,
                friend: friend.senderId === userId ? friend.receiver : friend.sender,
                senderId: friend.senderId,
                receiverId: friend.receiverId
            }));

            return reply.send({ friends: formattedFriends });
            
        } catch (err) {
            request.log.error('Error fetching friends:', err);
            return reply.status(500).send({ error: "COULDN'T FETCH FRIENDS" });
        }
    })

    // File upload route for avatar
    fastify.post('/upload-avatar', {
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        try {
            const data = await request.file();
            
            if (!data) {
                return reply.status(400).send({error: "No file uploaded"});
            }

            // Validate file type
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(data.mimetype)) {
                return reply.status(400).send({
                    error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed"
                });
            }

            // Get file buffer and validate size
            const buffer = await data.toBuffer();
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (buffer.length > maxSize) {
                return reply.status(400).send({error: "File too large. Maximum size is 5MB"});
            }

            // Create uploads directory if it doesn't exist
            const uploadsDir = path.join(__dirname, '..', 'uploads', 'avatars');
            
            try {
                await fs.access(uploadsDir);
            } catch {
                await fs.mkdir(uploadsDir, { recursive: true });
            }

            // Generate unique filename
            const fileExtension = data.mimetype.split('/')[1];
            const uniqueId = crypto.randomUUID();
            const fileName = `avatar_${request.user.id}_${uniqueId}.${fileExtension}`;
            const filePath = path.join(uploadsDir, fileName);
            
            // Save file to disk
            await fs.writeFile(filePath, buffer);

            // Generate URL for the uploaded file (relative path for database)
            const avatarUrl = `/uploads/avatars/${fileName}`;

            // Delete old avatar file if exists
            try {
                const currentUser = await fastify.prisma.user.findUnique({
                    where: { id: request.user.id },
                    select: { avatar_url: true }
                });
                
                if (currentUser?.avatar_url && currentUser.avatar_url.startsWith('/uploads/')) {
                    const oldFilePath = path.join(__dirname, '..', currentUser.avatar_url);
                    await fs.unlink(oldFilePath);
                    console.log('Deleted old avatar file:', currentUser.avatar_url);
                }
            } catch (err) {
                console.log('Could not delete old avatar file:', err.message);
            }

            // Update user's avatar in database
            await fastify.prisma.user.update({
                where: { id: request.user.id },
                data: { avatar_url: avatarUrl }
            });

            console.log('Avatar uploaded successfully:', {
                userId: request.user.id,
                filename: fileName,
                size: buffer.length,
                mimetype: data.mimetype
            });

            return reply.send({
                message: "Avatar uploaded successfully",
                avatar_url: avatarUrl
            });

        } catch (err) {
            request.log.error(err);
            return reply.status(500).send({error: "Internal server error"});
        }
    });

    // Search users by username
    fastify.get('/search', {
        schema: {
            security: [{ CookieAuth: [] }],
            querystring: {
                type: 'object',
                properties: {
                    q: { type: 'string', minLength: 1 },
                    limit: { type: 'integer', minimum: 1, maximum: 20, default: 10 }
                },
                required: ['q']
            }
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        const { q: query, limit = 10 } = request.query;
        const currentUserId = request.user.id;

        try {
            // Search users by username or display_name (case-insensitive)
            const users = await fastify.prisma.user.findMany({
                where: {
                    AND: [
                        {
                            id: {
                                not: currentUserId // Exclude current user from results
                            }
                        },
                        {
                            OR: [
                                {
                                    username: {
                                        contains: query
                                    }
                                },
                                {
                                    display_name: {
                                        contains: query
                                    }
                                }
                            ]
                        }
                    ]
                },
                select: {
                    id: true,
                    username: true,
                    display_name: true,
                    avatar_url: true,
                    created_at: true
                },
                take: limit,
                orderBy: [
                    {
                        username: 'asc'
                    }
                ]
            });

            // For each user, check if they're already friends or have pending requests
            const usersWithFriendStatus = await Promise.all(
                users.map(async (user) => {
                    const friendRelation = await fastify.prisma.friend.findFirst({
                        where: {
                            OR: [
                                { senderId: currentUserId, receiverId: user.id },
                                { senderId: user.id, receiverId: currentUserId }
                            ]
                        },
                        select: {
                            status: true,
                            senderId: true,
                            receiverId: true
                        }
                    });

                    let friendStatus = 'none';
                    if (friendRelation) {
                        if (friendRelation.status === 'ACCEPTED') {
                            friendStatus = 'friends';
                        } else if (friendRelation.status === 'PENDING') {
                            if (friendRelation.senderId === currentUserId) {
                                friendStatus = 'request_sent';
                            } else {
                                friendStatus = 'request_received';
                            }
                        }
                    }

                    // Set default avatar if none exists
                    const avatar_url = user.avatar_url || getDefaultAvatar(user.username);

                    return {
                        ...user,
                        avatar_url,
                        friendStatus
                    };
                })
            );

            return reply.send({
                users: usersWithFriendStatus,
                total: usersWithFriendStatus.length,
                query
            });

        } catch (error) {
            request.log.error('Error searching users:', error);
            return reply.status(500).send({ error: "Failed to search users" });
        }
    });

    // Get user profile by ID (for viewing other users' profiles)
    fastify.get('/profile/:id', {
        schema: {
            security: [{ CookieAuth: [] }],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                },
                required: ['id']
            }
        },
        preValidation: [fastify.authenticated]
    }, async (request, reply) => {
        const userId = parseInt(request.params.id);
        const currentUserId = request.user.id;

        if (isNaN(userId)) {
            return reply.status(400).send({ error: "Invalid user ID" });
        }

        try {
            const userProfile = await fastify.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    display_name: true,
                    avatar_url: true,
                    created_at: true
                }
            });

            if (!userProfile) {
                return reply.status(404).send({ error: "User not found" });
            }

            // Set default avatar if none exists
            if (!userProfile.avatar_url) {
                userProfile.avatar_url = getDefaultAvatar(userProfile.username);
            }

            // Check friend status
            let friendStatus = 'none';
            if (userId !== currentUserId) {
                const friendRelation = await fastify.prisma.friend.findFirst({
                    where: {
                        OR: [
                            { senderId: currentUserId, receiverId: userId },
                            { senderId: userId, receiverId: currentUserId }
                        ]
                    },
                    select: {
                        status: true,
                        senderId: true,
                        receiverId: true
                    }
                });

                if (friendRelation) {
                    if (friendRelation.status === 'ACCEPTED') {
                        friendStatus = 'friends';
                    } else if (friendRelation.status === 'PENDING') {
                        if (friendRelation.senderId === currentUserId) {
                            friendStatus = 'request_sent';
                        } else {
                            friendStatus = 'request_received';
                        }
                    }
                }
            } else {
                friendStatus = 'self';
            }

            // Get user stats
            const matches = await fastify.prisma.match.findMany({
                where: {
                    OR: [
                        { player1Id: userId },
                        { player2Name: userProfile.username }
                    ]
                }
            });

            console.log('Found matches for user', userId, ':', JSON.stringify(matches, null, 2));

            // If no matches found, try to see if there are any matches at all
            if (matches.length === 0) {
                const allMatches = await fastify.prisma.match.findMany({
                    take: 5 // Just get a few matches to check the structure
                });
                console.log('Sample of all matches in database:', JSON.stringify(allMatches, null, 2));
            }

            console.log('All user matches:', JSON.stringify(matches, null, 2));
            console.log('Current user:', {
                id: userId,
                username: userProfile.username,
                display_name: userProfile.display_name
            });

            // Log each match's winner info
            matches.forEach((match, index) => {
                console.log(`\nMatch ${index + 1}:`);
                console.log(`- Player 1 ID: ${match.player1Id}`);
                console.log(`- Player 2 Name: ${match.player2Name}`);
                console.log(`- Winner ID: ${match.winnerId}`);
                console.log(`- Winner Name: ${match.winnerName}`);
                console.log(`- Scores: ${match.score_p1} - ${match.score_p2}`);
                console.log(`- Is winner (ID match): ${match.winnerId === userId}`);
                console.log(`- Is winner (name match): ${match.winnerName === userProfile.username || match.winnerName === userProfile.display_name}`);
            });

            const wins = matches.filter(match => {
                // Check if the user is the winner by:
                // 1. winnerId matches user ID (proper way)
                // 2. winnerName is the string version of user ID (current bug)
                // 3. winnerName matches username or display_name
                return (
                    match.winnerId === userId ||
                    match.winnerName === String(userId) ||
                    match.winnerName === userProfile.username ||
                    match.winnerName === userProfile.display_name
                );
            });

            console.log('User wins:', wins.length, 'out of', matches.length, 'matches');
            console.log('Win details:', {
                userId,
                username: userProfile.username,
                displayName: userProfile.display_name,
                matches: matches.map(m => ({
                    winnerId: m.winnerId,
                    winnerName: m.winnerName,
                    isWin: (
                        m.winnerId === userId ||
                        m.winnerName === String(userId) ||
                        m.winnerName === userProfile.username ||
                        m.winnerName === userProfile.display_name
                    )
                }))
            });

            const totalMatches = matches.length;
            const totalWins = wins.length;
            const winRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

            // Calculate average score
            const avgScore = matches.reduce((sum, match) => {
                const score = match.player1Id === userId ? match.score_p1 : match.score_p2;
                return sum + score;
            }, 0) / (totalMatches || 1);

            return reply.send({
                profile: userProfile,
                friendStatus,
                stats: {
                    totalMatches,
                    totalWins,
                    winRate: winRate.toFixed(2),
                    averageScore: avgScore.toFixed(2)
                }
            });

        } catch (error) {
            request.log.error('Error fetching user profile:', error);
            return reply.status(500).send({ error: "Failed to fetch user profile" });
        }
    });
}
