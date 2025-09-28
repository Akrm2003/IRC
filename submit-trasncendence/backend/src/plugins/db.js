import fp from 'fastify-plugin'
import { PrismaClient } from '../../generated/prisma/index.js';


async function dbConnector(fastify , options){

    const prisma = new PrismaClient()
    //connect the prisma client to the db
    await prisma.$connect();

    //this hook run whenever fastify 
    fastify.addHook('onClose' , async (Fastifyinstance , done) => {
        await Fastifyinstance.prisma.$disconnect();
        done();
    })
    fastify.decorate('prisma',prisma);

}

export default fp(dbConnector);