import { Server } from "socket.io";
import fp from 'fastify-plugin';

export const onlineUsers = new Map();


async function socketIOplugin(fastify, options) {
    const io = new Server(fastify.server, {
        cors: { 
            origin: [
                "http://localhost:5173",
                "https://localhost:5173",
                "https://localhost:8443",
                /^https?:\/\/10\.42\.247\.98:5173$/,
                /^https?:\/\/10\.42\.247\.98:8443$/
            ], 
            credentials: true 
        }
    });
    // Decorate fastify instance with io
    fastify.decorate('io', io);

    io.use(async (socket , next ) => {
        try {
            const token = socket.handshake.headers.cookie
            ?.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
            if(!token)
                return next(new Error('No token'));
            const payload = fastify.jwt.verify(token);
            if(payload.type !== 'access')
                return next(new Error ('Invalid token '));
            socket.request.user = payload;
            next();
        } catch (err){
            next(new Error('Authentication error'));
        }
    })
    
    io.on('connection',  (socket) => {
        console.log('User Connected:', socket.id);
        const userId = socket.request.user.id; 
        if(!userId)
            return socket.disconnect(true);
        const existingSocketId = onlineUsers.get(userId);
        if(existingSocketId && existingSocketId !== socket.id)
        {
            console.log(`User ${userId} already connected on socket ${existingSocketId}, replacing session...`);
            const existingSocket = io.sockets.sockets.get(existingSocketId);
            if(existingSocket) {
                existingSocket.emit('session_replaced' , {message : 'Logged in from another device'});
                existingSocket.disconnect(true); //its gonna be disconnected but it will stay maybe in ur onlineusers map so make sure u delete it .(todo)
            }
            onlineUsers.delete(userId);
        }
        onlineUsers.set(userId , socket.id);

        socket.emit('connected' , {userId , socketId : socket.id})

        socket.on('private_message', async ( msg) => {
            try {
             
                const {to , content} = msg;
                // const toId = parseInt(to , 10);

                if(!to || !content){
                    socket.emit('message_error', {
                        error : 'Missing required fields : to , content'
                    });
                    return;
                }
                if(to === userId) {
                    socket.emit('message_error' , {
                        error : 'Cannot send message to yourself'
                    });
                    return;
                }
                const CheckFriendship = await fastify.prisma.friend.findFirst({
                    where : { 
                        status : 'ACCEPTED',
                    OR : [
                        {senderId : userId , receiverId : to},
                        {receiverId : userId , senderId : to}
                    ],
                },
            });
                if(!CheckFriendship)
                {
                    console.log("users are not friends" , userId , to);
                    socket.emit('message_error', { error: "You can't send a message to non-friend user" });
                    return;
                }
    
                const SavedMessage = await fastify.prisma.message.create({
                        data : {
                            senderId : userId,
                            receiverId : to,
                            content,
                            status : 'SENT'
                        }
                    })
    
                const receiverSocketId = onlineUsers.get(to); //we will check if the user is connected ? 
                console.log("this is the receiver :" , receiverSocketId);
                let finalStatus = 'SENT'
    
                if(receiverSocketId){
                    try {
                        await fastify.prisma.message.update({
                            where : {id : SavedMessage.id },
                            data : { status : 'DELIVERED'}
                        });
                        finalStatus = 'DELIVERED';
    
                        io.to(receiverSocketId).emit('private_message' , {
                            messageId : SavedMessage.id,
                            from : userId ,
                            content : content,
                            status : 'DELIVERED',
                        });
                        console.log(`Message ${SavedMessage.id} delivered to the user ${to}`)
                    } catch(err){
                        console.log("Failed to Update the Message Status");
    
                        io.to(receiverSocketId).emit('private_message' , {
                            messageId : SavedMessage.id,
                            from : userId ,
                            content : content,
                            status : 'SENT',
                        });
                    }
                }
                socket.emit('message_sent' , {
                    messageId: SavedMessage.id,
                    from : userId ,
                    content : content,
                    status : finalStatus,
                });
            } catch(err){
                console.error('Failed to handle private message' , err);
                socket.emit('message_error' , {
                    error : 'Failed to send message',
                    details : err.message
                });
            }
        });

        //hanlde message read receipts
        socket.on('message_read', async (data) => {
            try {
                const {messageId} = data;
                if(!messageId) {
                    return;
                }
                const updatedMessage = await fastify.prisma.message.updateMany({
                    where : {
                        id : messageId,
                        receiverId : userId
                    },
                    data : { status : 'READ'}
                });
                const senderSocketId = onlineUsers.get(updatedMessage.senderId);
                if(senderSocketId)
                {
                    io.to(senderSocketId).emit('message_read' , {
                        messageId,
                        readBy : userId,
                        readAt : new Date()
                    })
                }
            } catch(err) {
                console.error('Failed to handle message read :' , err);
            }
         
        });
        socket.on('typing_start' , (data) => {
            const { to } = data;
            const receiverSocketId = onlineUsers.get(to);
            if(receiverSocketId)
            {
                io.to(receiverSocketId).emit('user_typing' , {
                    from : userId,
                    isTyping : true
                })
            }
        });
        socket.on('typing_stop' , (data) => {
            const { to } = data;
            const receiverSocketId = onlineUsers.get(to);
            if(receiverSocketId)
            {
                io.to(receiverSocketId).emit('user_typing' , {
                    from : userId,
                    isTyping : false
                })
            }
        })
        
        socket.on('disconnect', (reason) => {
            console.log('User disconnected', socket.id , 'Reason :' , reason);
            onlineUsers.forEach((socketId , userId) => {
                if(socketId == socket.id){
                    onlineUsers.delete(userId);
                }
            })
        });
        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });
    });
    
    // Add hook to ensure proper initialization order
    fastify.addHook('onReady', async () => {
        console.log('Socket.IO initialized and ready');
    });
    
    //  hook for  shutdown
    fastify.addHook('onClose', async () => {
        console.log('Closing Socket.IO server ....');
        io.close();
        onlineUsers.clear();
    });
}

// Export as fastify plugin to ensure proper encapsulation
export default fp(socketIOplugin, {
    name: 'socketio-plugin'
});