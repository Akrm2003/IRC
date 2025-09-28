import fp from 'fastify-plugin';

const createTournamentSchema = {
    body: {
        type: 'object',
        required: ['name', 'players'],
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            players: {
                type: 'array',
                items: { type: 'string', minLength: 1, maxLength: 50 },
                minItems: 1, // At least 2 total players (user + 1 guest minimum)
                maxItems: 7 // User + 7 guests = 8 total players max
            }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                tournament: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        status: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        createdById: { type: 'number' },
                        winnerName: { type: ['string', 'null'] },
                        players: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    playerName: { type: 'string' },
                                    isUser: { type: 'boolean' },
                                    seed: { type: 'number' }
                                }
                            }
                        },
                        matches: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    tournamentId: { type: 'number' },
                                    matchId: { type: 'number' },
                                    roundNumber: { type: 'number' },
                                    matchNumber: { type: 'number' },
                                    player1Name: { type: 'string' },
                                    player2Name: { type: ['string', 'null'] },
                                    winnerName: { type: ['string', 'null'] },
                                    isBye: { type: 'boolean' },
                                    match: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number' },
                                            score_p1: { type: 'number' },
                                            score_p2: { type: 'number' },
                                            winnerName: { type: ['string', 'null'] },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

const getTournamentSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', pattern: '^\\d+$' }
        },
        required: ['id']
    }
};

export default async function tournamentRoutes(fastify, options) {
    // Create a new tournament
    fastify.post('/', 
        { 
            preValidation: [fastify.authenticated],
            schema: {
                body: createTournamentSchema.body,
                security: [{ CookieAuth: [] }]
                // Temporarily remove response schema to debug serialization issue
            }
        },
        async (request, reply) => {
            console.log('Received tournament creation request:', {
                body: request.body,
                user: request.user
            });
            
            const { name, players } = request.body;
            const userId = request.user.id;
            const username = request.user.username;
            
            // Validate request body
            if (!name || !Array.isArray(players) || players.length < 1) {
                console.error('Invalid request body:', { name, players });
                return reply.status(400).send({ 
                    error: 'Invalid request body. Need tournament name and at least 1 other player.',
                    details: {
                        name: name ? 'valid' : 'missing',
                        players: Array.isArray(players) ? `${players.length} players (need at least 1)` : 'missing or invalid'
                    }
                });
            }

            try {
                // Create tournament with the logged-in user + guest players
                // The user is always the first player, others are guests
                const allPlayers = [username, ...players]; // User first, then guests

                // Create tournament with players
                const tournament = await fastify.prisma.tournament.create({
                    data: {
                        name,
                        createdBy: { connect: { id: userId } },
                        players: {
                            create: allPlayers.map((playerName, index) => ({
                                playerName,
                                isUser: index === 0, // Only first player (the user) is a registered user
                                seed: index + 1
                            }))
                        },
                        status: 'UPCOMING'
                    },
                    include: {
                        players: true
                    }
                });

                // Generate matches (you'll need to implement this function)
                await generateTournamentBracket(fastify, tournament);

                // Fetch the complete tournament with all relations after bracket generation
                const completeTournament = await fastify.prisma.tournament.findUnique({
                    where: { id: tournament.id },
                    include: {
                        players: true,
                        matches: {
                            include: {
                                match: true
                            },
                            orderBy: [
                                { roundNumber: 'asc' },
                                { matchNumber: 'asc' }
                            ]
                        }
                    }
                });

                console.log('Complete tournament data being returned:', JSON.stringify(completeTournament, null, 2));

                return reply.status(201).send({
                    message: 'Tournament created successfully',
                    tournament: completeTournament
                });
            } catch (error) {
                request.log.error(error);
                return reply.status(500).send({ error: 'Failed to create tournament' });
            }
        }
    );

    // Get tournament details
    fastify.get('/tournaments/:id',
        {
            preValidation: [fastify.authenticated],
            schema: {
                ...getTournamentSchema,
                security: [{ CookieAuth: [] }]
            }
        },
        async (request, reply) => {
            const { id } = request.params;
            
            try {
                const tournament = await fastify.prisma.tournament.findUnique({
                    where: { id: parseInt(id) },
                    include: {
                        players: true,
                        matches: {
                            include: {
                                match: true
                            },
                            orderBy: [
                                { roundNumber: 'asc' },
                                { matchNumber: 'asc' }
                            ]
                        }
                    }
                });

                if (!tournament) {
                    return reply.status(404).send({ error: 'Tournament not found' });
                }

                return reply.send(tournament);
            } catch (error) {
                request.log.error(error);
                return reply.status(500).send({ error: 'Failed to fetch tournament' });
            }
        }
    );

    // Submit match result
    fastify.post('/:tournamentId/matches/:matchId/result',
        {
            preValidation: [fastify.authenticated],
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        tournamentId: { type: 'string', pattern: '^\\d+$' },
                        matchId: { type: 'string', pattern: '^\\d+$' }
                    },
                    required: ['tournamentId', 'matchId']
                },
                body: {
                    type: 'object',
                    required: ['scoreP1', 'scoreP2'],
                    properties: {
                        scoreP1: { type: 'integer', minimum: 0 },
                        scoreP2: { type: 'integer', minimum: 0 }
                    }
                },
                security: [{ CookieAuth: [] }]
            }
        },
        async (request, reply) => {
            const { tournamentId, matchId } = request.params;
            const { scoreP1, scoreP2 } = request.body;
            const userId = request.user.id;

            try {
                // Verify tournament exists and user is the creator
                const tournament = await fastify.prisma.tournament.findUnique({
                    where: { id: parseInt(tournamentId) },
                    include: {
                        players: true,
                        matches: {
                            include: {
                                match: true
                            },
                            orderBy: [
                                { roundNumber: 'asc' },
                                { matchNumber: 'asc' }
                            ]
                        }
                    }
                });

                if (!tournament) {
                    return reply.status(404).send({ error: 'Tournament not found' });
                }

                if (tournament.createdById !== userId) {
                    return reply.status(403).send({ error: 'Only tournament creator can submit match results' });
                }

                // Find the tournament match
                const tournamentMatch = tournament.matches.find(tm => tm.matchId === parseInt(matchId));
                if (!tournamentMatch) {
                    return reply.status(404).send({ error: 'Match not found in tournament' });
                }

                // Determine winner
                const winnerName = scoreP1 > scoreP2 ? tournamentMatch.player1Name : tournamentMatch.player2Name;

                // Update the match with results
                await fastify.prisma.match.update({
                    where: { id: parseInt(matchId) },
                    data: {
                        score_p1: scoreP1,
                        score_p2: scoreP2,
                        winnerName: winnerName
                    }
                });

                // Update tournament match
                await fastify.prisma.tournamentMatch.update({
                    where: { id: tournamentMatch.id },
                    data: {
                        winnerName: winnerName
                    }
                });

                // Progress the tournament bracket
                await progressTournamentBracket(fastify, tournament, tournamentMatch, winnerName);

                // Return updated tournament
                const updatedTournament = await fastify.prisma.tournament.findUnique({
                    where: { id: parseInt(tournamentId) },
                    include: {
                        players: true,
                        matches: {
                            include: {
                                match: true
                            },
                            orderBy: [
                                { roundNumber: 'asc' },
                                { matchNumber: 'asc' }
                            ]
                        }
                    }
                });

                return reply.send({
                    message: 'Match result submitted successfully',
                    tournament: updatedTournament
                });

            } catch (error) {
                request.log.error(error);
                return reply.status(500).send({ error: 'Failed to submit match result' });
            }
        }
    );

    // Delete tournament (put before GET to avoid conflicts)
    fastify.delete('/:tournamentId',
        {
            preValidation: [fastify.authenticated],
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        tournamentId: { type: 'string', pattern: '^\\d+$' }
                    },
                    required: ['tournamentId']
                },
                security: [{ CookieAuth: [] }]
            }
        },
        async (request, reply) => {
            const { tournamentId } = request.params;
            const userId = request.user.id;

            try {
                // Verify tournament exists and user is the creator
                const tournament = await fastify.prisma.tournament.findUnique({
                    where: { id: parseInt(tournamentId) },
                    include: {
                        matches: {
                            include: {
                                match: true
                            }
                        }
                    }
                });

                if (!tournament) {
                    return reply.status(404).send({ error: 'Tournament not found' });
                }

                if (tournament.createdById !== userId) {
                    return reply.status(403).send({ error: 'Only tournament creator can delete tournaments' });
                }

                // Delete all related data in the correct order
                // First delete tournament matches
                await fastify.prisma.tournamentMatch.deleteMany({
                    where: { tournamentId: parseInt(tournamentId) }
                });

                // Delete all matches associated with this tournament
                const matchIds = tournament.matches.map(tm => tm.matchId);
                if (matchIds.length > 0) {
                    await fastify.prisma.match.deleteMany({
                        where: { id: { in: matchIds } }
                    });
                }

                // Delete tournament players
                await fastify.prisma.tournamentPlayer.deleteMany({
                    where: { tournamentId: parseInt(tournamentId) }
                });

                // Finally delete the tournament
                await fastify.prisma.tournament.delete({
                    where: { id: parseInt(tournamentId) }
                });

                return reply.send({
                    message: 'Tournament deleted successfully'
                });

            } catch (error) {
                request.log.error(error);
                return reply.status(500).send({ error: 'Failed to delete tournament' });
            }
        }
    );

    // Get tournament by ID
    fastify.get('/:tournamentId',
        {
            preValidation: [fastify.authenticated],
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        tournamentId: { type: 'string', pattern: '^\\d+$' }
                    },
                    required: ['tournamentId']
                },
                security: [{ CookieAuth: [] }]
            }
        },
        async (request, reply) => {
            const { tournamentId } = request.params;
            const userId = request.user.id;

            try {
                console.log('Getting tournament with ID:', tournamentId, 'for user:', userId);
                
                const tournament = await fastify.prisma.tournament.findUnique({
                    where: { id: parseInt(tournamentId) },
                    include: {
                        players: true,
                        matches: {
                            include: {
                                match: true
                            },
                            orderBy: [
                                { roundNumber: 'asc' },
                                { matchNumber: 'asc' }
                            ]
                        }
                    }
                });

                console.log('Tournament found:', !!tournament);
                
                if (!tournament) {
                    return reply.status(404).send({ error: 'Tournament not found' });
                }

                console.log('Tournament creator ID:', tournament.createdById, 'Request user ID:', userId);
                
                // Only allow tournament creator to view details for now
                if (tournament.createdById !== userId) {
                    return reply.status(403).send({ error: 'Access denied' });
                }

                console.log('Returning tournament with', tournament.matches?.length || 0, 'matches');
                return reply.send(tournament);

            } catch (error) {
                console.error('Error getting tournament:', error);
                request.log.error(error);
                return reply.status(500).send({ error: 'Failed to get tournament', details: error.message });
            }
        }
    );

    // List user's tournaments
    fastify.get('/my-tournaments',
        {
            preValidation: [fastify.authenticated],
            schema: {
                security: [{ CookieAuth: [] }],
                response: {
                    200: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                status: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                                players: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number' },
                                            playerName: { type: 'string' },
                                            isUser: { type: 'boolean' },
                                            seed: { type: ['number', 'null'] }
                                        }
                                    }
                                },
                                _count: {
                                    type: 'object',
                                    properties: {
                                        players: { type: 'number' },
                                        matches: { type: 'number' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        async (request, reply) => {
            try {
                // Log the user ID for debugging
                request.log.info(`Fetching tournaments for user ID: ${request.user.id}`);
                
                // First, verify the user exists
                const user = await fastify.prisma.user.findUnique({
                    where: { id: request.user.id }
                });

                if (!user) {
                    request.log.error(`User not found with ID: ${request.user.id}`);
                    return reply.status(404).send({ error: 'User not found' });
                }

                // Get the basic tournament data with error handling
                const tournaments = await fastify.prisma.tournament.findMany({
                    where: {
                        createdById: request.user.id
                    },
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                        players: {
                            select: {
                                id: true,
                                playerName: true,
                                isUser: true,
                                seed: true
                            },
                            orderBy: {
                                id: 'asc'
                            }
                        },
                        _count: {
                            select: { 
                                players: true, 
                                matches: true 
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });

                request.log.info(`Found ${tournaments.length} tournaments for user ${request.user.id}`);
                return reply.send(tournaments);
                
            } catch (error) {
                request.log.error('Error in /my-tournaments endpoint:');
                request.log.error(error);
                
                // Provide more detailed error information
                const errorMessage = error.message || 'Unknown error occurred';
                const errorStack = error.stack || 'No stack trace available';
                
                return reply.status(500).send({ 
                    error: 'Failed to fetch tournaments',
                    details: errorMessage,
                    stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
                });
            }
        }
    );
}

// Helper function to generate tournament bracket for local multiplayer
async function generateTournamentBracket(fastify, tournament) {
    const players = tournament.players;
    const numPlayers = players.length;
    
    console.log(`Generating bracket for ${numPlayers} players:`, players.map(p => p.playerName));
    
    if (numPlayers < 2) {
        console.log('Tournament needs at least 2 players');
        return;
    }
    
    // For local multiplayer, we create a simple elimination bracket
    // All matches use the tournament creator as player1 in the Match model
    // but the actual players are tracked by name in TournamentMatch
    
    const numRounds = Math.ceil(Math.log2(numPlayers));
    let matchNumber = 1;

    // First round matches
    const firstRoundMatches = Math.floor(numPlayers / 2);
    
    for (let i = 0; i < firstRoundMatches; i++) {
        const player1Name = players[i].playerName;
        const player2Name = players[numPlayers - 1 - i]?.playerName;
        
        // Create match - always use tournament creator as the Match.player1 
        // since only they are logged in (for stats tracking)
        const match = await fastify.prisma.match.create({
            data: {
                player1: { connect: { id: tournament.createdById } },
                player2Name: player2Name || 'BYE',
                score_p1: 0,
                score_p2: 0,
                winnerName: player2Name ? 'TBD' : player1Name // TBD for real matches, auto-win for byes
            }
        });

        await fastify.prisma.tournamentMatch.create({
            data: {
                tournament: { connect: { id: tournament.id } },
                match: { connect: { id: match.id } },
                roundNumber: 1,
                matchNumber: matchNumber++,
                player1Name: player1Name,
                player2Name: player2Name || 'BYE',
                winnerName: player2Name ? 'TBD' : player1Name,
                isBye: !player2Name
            }
        });
    }

    // Handle odd number of players (one gets a bye to next round)
    if (numPlayers % 2 === 1) {
        const byePlayer = players[Math.floor(numPlayers / 2)].playerName;
        console.log(`${byePlayer} gets a bye to round 2`);
    }

    // Create subsequent rounds (empty, to be filled as matches are completed)
    for (let round = 2; round <= numRounds; round++) {
        const matchesInRound = Math.ceil(numPlayers / Math.pow(2, round));
        
        for (let i = 0; i < matchesInRound; i++) {
            // Create placeholder match
            const match = await fastify.prisma.match.create({
                data: {
                    player1: { connect: { id: tournament.createdById } },
                    player2Name: 'TBD',
                    score_p1: 0,
                    score_p2: 0,
                    winnerName: 'TBD'
                }
            });

            await fastify.prisma.tournamentMatch.create({
                data: {
                    tournament: { connect: { id: tournament.id } },
                    match: { connect: { id: match.id } },
                    roundNumber: round,
                    matchNumber: matchNumber++,
                    player1Name: `Winner of Round ${round-1} Match ${i*2 + 1}`,
                    player2Name: `Winner of Round ${round-1} Match ${i*2 + 2}`,
                    winnerName: 'TBD',
                    isBye: false
                }
            });
        }
    }
    
    console.log(`Tournament bracket created with ${matchNumber - 1} total matches`);
}

// Helper function to progress tournament bracket when a match is completed
async function progressTournamentBracket(fastify, tournament, completedMatch, winnerName) {
    console.log(`Progressing bracket: ${winnerName} won match ${completedMatch.matchNumber} in round ${completedMatch.roundNumber}`);
    
    const currentRound = completedMatch.roundNumber;
    const nextRound = currentRound + 1;
    
    // Check if there are matches in the next round
    const nextRoundMatches = tournament.matches.filter(tm => tm.roundNumber === nextRound);
    
    if (nextRoundMatches.length === 0) {
        // This was the final match - tournament is complete!
        console.log(`Tournament complete! Winner: ${winnerName}`);
        
        await fastify.prisma.tournament.update({
            where: { id: tournament.id },
            data: {
                status: 'COMPLETED',
                winnerName: winnerName
            }
        });
        
        return;
    }
    
    // Find which next round match this winner should advance to
    // In a standard bracket, match 1&2 winners go to match 1 of next round,
    // match 3&4 winners go to match 2 of next round, etc.
    const nextMatchIndex = Math.floor((completedMatch.matchNumber - 1) / 2);
    const nextMatch = nextRoundMatches[nextMatchIndex];
    
    if (!nextMatch) {
        console.error(`Could not find next match for winner ${winnerName}`);
        return;
    }
    
    // Determine if winner goes to player1 or player2 slot in next match
    const isPlayer1Slot = (completedMatch.matchNumber - 1) % 2 === 0;
    
    // Update the next round match with the winner
    const updateData = isPlayer1Slot 
        ? { player1Name: winnerName }
        : { player2Name: winnerName };
    
    await fastify.prisma.tournamentMatch.update({
        where: { id: nextMatch.id },
        data: updateData
    });
    
    // Also update the corresponding Match record
    const matchUpdateData = isPlayer1Slot 
        ? { /* player1 is always the tournament creator, so we don't change it */ }
        : { player2Name: winnerName };
    
    if (!isPlayer1Slot) {
        await fastify.prisma.match.update({
            where: { id: nextMatch.matchId },
            data: matchUpdateData
        });
    }
    
    console.log(`Advanced ${winnerName} to round ${nextRound}, match ${nextMatch.matchNumber}`);
    
    // Check if we can start the next round (both players are set)
    const updatedNextMatch = await fastify.prisma.tournamentMatch.findUnique({
        where: { id: nextMatch.id }
    });
    
    if (updatedNextMatch.player1Name !== 'TBD' && 
        updatedNextMatch.player2Name !== 'TBD' && 
        updatedNextMatch.player2Name !== 'BYE') {
        console.log(`Round ${nextRound}, match ${nextMatch.matchNumber} is ready to play!`);
        
        // Update tournament status to IN_PROGRESS if it's not already
        if (tournament.status === 'UPCOMING') {
            await fastify.prisma.tournament.update({
                where: { id: tournament.id },
                data: { status: 'IN_PROGRESS' }
            });
        }
    }
}
