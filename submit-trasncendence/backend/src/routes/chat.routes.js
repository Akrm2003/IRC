export default async function chat_routes(fastify , options){
    fastify.get('/messages/:id' , {preValidation : [fastify.authenticated] ,
        schema : {
            security : [
                {CookieAuth : []}
            ]
        }
    }, async (request , reply) => {
        const userId = request.user.id;
        const friendId = parseInt(request.params.id, 10);

        // Fetch messages between userId and friendId
        const messages = await fastify.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: friendId },
                    { senderId: friendId, receiverId: userId }
                ]
            },
            orderBy: { createdAt: 'asc' }
        });

        reply.send(messages);
    })
}