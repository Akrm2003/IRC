// Rock Paper Scissors game routes
import { Type } from '@sinclair/typebox';

// Schema for RPS match result
const RPSMatchSchema = {
    body: Type.Object({
        opponent_name: Type.String({ minLength: 1, maxLength: 50 }),
        your_move: Type.Union([Type.Literal('rock'), Type.Literal('paper'), Type.Literal('scissors')]),
        opponent_move: Type.Union([Type.Literal('rock'), Type.Literal('paper'), Type.Literal('scissors')]),
        result: Type.Union([Type.Literal('win'), Type.Literal('lose'), Type.Literal('draw')]),
        mode: Type.Union([Type.Literal('solo'), Type.Literal('pass'), Type.Literal('match')])
    }),
    response: {
        200: Type.Object({
            message: Type.String(),
            match_id: Type.Optional(Type.Number())
        }),
        400: Type.Object({
            error: Type.String()
        }),
        500: Type.Object({
            error: Type.String()
        })
    }
};

async function rpsRoutes(fastify, options) {
    // Record Rock Paper Scissors match result
    fastify.post('/matches', {
        preValidation: [fastify.authenticated],
        schema: {
            ...RPSMatchSchema,
            security: [
                { CookieAuth: [] }
            ]
        }
    }, async (request, reply) => {
        const { opponent_name, your_move, opponent_move, result, mode } = request.body;
        const userId = request.user.id;

        try {
            console.log('🎮 RPS Match submission received:', {
                userId,
                opponent_name,
                your_move,
                opponent_move,
                result,
                mode
            });

            // Get current user info
            const currentUser = await fastify.prisma.user.findUnique({
                where: { id: userId },
                select: { username: true }
            });

            if (!currentUser) {
                console.error('❌ User not found:', userId);
                return reply.status(404).send({ error: "User not found" });
            }

            console.log('✅ Current user found:', currentUser.username);

            // Determine winner name based on result
            let winnerName;
            if (result === 'win') {
                winnerName = currentUser.username;
            } else if (result === 'lose') {
                winnerName = opponent_name;
            } else {
                // For draws, we'll record the user as winner for stats purposes
                winnerName = currentUser.username;
            }

            // Convert RPS result to scores (1 point for winner, 0 for loser, 0.5 each for draw)
            let scoreP1, scoreP2;
            if (result === 'win') {
                scoreP1 = 1;
                scoreP2 = 0;
            } else if (result === 'lose') {
                scoreP1 = 0;
                scoreP2 = 1;
            } else {
                // Draw
                scoreP1 = 0;
                scoreP2 = 0;
            }

            // Only record matches against other players (not solo CPU games)
            let matchRecord = null;
            if (mode !== 'solo') {
                matchRecord = await fastify.prisma.match.create({
                    data: {
                        player1Id: userId,
                        player2Name: opponent_name,
                        score_p1: scoreP1,
                        score_p2: scoreP2,
                        winnerName: winnerName,
                        gameType: 'rock_paper_scissors' // Add game type field
                    }
                });

                console.log('🎮 Rock Paper Scissors match recorded:', {
                    matchId: matchRecord.id,
                    player1: currentUser.username,
                    player2: opponent_name,
                    yourMove: your_move,
                    opponentMove: opponent_move,
                    result: result,
                    winner: winnerName,
                    mode: mode
                });
            }

            return reply.status(200).send({
                message: mode === 'solo' ? 'Solo game completed' : 'Match recorded successfully',
                match_id: matchRecord?.id
            });

        } catch (error) {
            console.error('❌ Error recording RPS match:', error);
            
            if (error.code === 'P2002') {
                return reply.status(409).send({ error: "Match already exists" });
            }
            
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    });

    // Get Rock Paper Scissors match history for user
    fastify.get('/history', {
        preValidation: [fastify.authenticated],
        schema: {
            response: {
                200: Type.Object({
                    matches: Type.Array(Type.Object({
                        id: Type.Number(),
                        opponent: Type.String(),
                        result: Type.String(),
                        score_p1: Type.Number(),
                        score_p2: Type.Number(),
                        created_at: Type.String(),
                        game_type: Type.Optional(Type.String())
                    })),
                    stats: Type.Object({
                        total_matches: Type.Number(),
                        wins: Type.Number(),
                        losses: Type.Number(),
                        draws: Type.Number(),
                        win_rate: Type.Number()
                    })
                })
            }
        }
    }, async (request, reply) => {
        const userId = request.user.id;

        try {
            // Get user's RPS matches
            const matches = await fastify.prisma.match.findMany({
                where: {
                    player1Id: userId,
                    gameType: 'rock_paper_scissors'
                },
                orderBy: {
                    played_at: 'desc'
                },
                take: 50 // Limit to last 50 matches
            });

            // Calculate stats
            const totalMatches = matches.length;
            const wins = matches.filter(m => m.score_p1 > m.score_p2).length;
            const losses = matches.filter(m => m.score_p1 < m.score_p2).length;
            const draws = matches.filter(m => m.score_p1 === m.score_p2).length;
            const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

            const formattedMatches = matches.map(match => ({
                id: match.id,
                opponent: match.player2Name,
                result: match.score_p1 > match.score_p2 ? 'win' : 
                       match.score_p1 < match.score_p2 ? 'lose' : 'draw',
                score_p1: match.score_p1,
                score_p2: match.score_p2,
                created_at: match.played_at.toISOString(),
                game_type: match.gameType
            }));

            return reply.status(200).send({
                matches: formattedMatches,
                stats: {
                    total_matches: totalMatches,
                    wins,
                    losses,
                    draws,
                    win_rate: Math.round(winRate * 100) / 100
                }
            });

        } catch (error) {
            console.error('❌ Error fetching RPS history:', error);
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    });
}

export default rpsRoutes;
