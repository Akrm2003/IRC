// Tournament Pong Game - Integrated with ft_transcendence Tournament System
// Based on the PvP Pong game but with tournament-specific features

interface TournamentContext {
    mode: string;
    matchId: string;
    tournamentId: string;
    player1: string;
    player2: string;
}

// Get tournament context from URL parameters
function getTournamentContext(): TournamentContext | null {
    const urlParams = new URLSearchParams(window.location.search);
    
    const mode = urlParams.get('mode');
    const matchId = urlParams.get('matchId');
    const tournamentId = urlParams.get('tournamentId');
    const player1 = urlParams.get('player1');
    const player2 = urlParams.get('player2');
    
    if (mode === 'tournament' && matchId && tournamentId && player1 && player2) {
        return {
            mode,
            matchId,
            tournamentId,
            player1: decodeURIComponent(player1),
            player2: decodeURIComponent(player2)
        };
    }
    
    return null;
}

// Tournament context
const tournamentContext = getTournamentContext();

if (!tournamentContext) {
    alert('Invalid tournament context. Redirecting to tournaments...');
    window.location.href = '/tournaments';
}

// Update match title and score display
const matchTitle = document.getElementById('matchTitle');
if (matchTitle && tournamentContext) {
    matchTitle.textContent = `${tournamentContext.player1} VS ${tournamentContext.player2}`;
}

// Update score display function
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `${gameState.player1Name}: ${gameState.player1Score} | ${gameState.player2Name}: ${gameState.player2Score}`;
    }
}

// Return to tournament function
function returnToTournament() {
    if (tournamentContext) {
        console.log('Returning to tournament:', tournamentContext.tournamentId);
        // Use the correct path that matches the tournament page routing
        window.location.href = `/tournaments/tournaments.html?id=${tournamentContext.tournamentId}`;
    } else {
        console.log('No tournament context, returning to tournaments list');
        window.location.href = '/tournaments/tournaments.html';
    }
}

// Game Canvas and Context
const canvas = document.getElementById('pong-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Game State
interface GameState {
    player1Name: string;
    player2Name: string;
    player1Score: number;
    player2Score: number;
    gameStarted: boolean;
    gameActive: boolean;
    paused: boolean;
    gameEnded: boolean;
}

const gameState: GameState = {
    player1Name: tournamentContext?.player1 || 'Player 1',
    player2Name: tournamentContext?.player2 || 'Player 2',
    player1Score: 0,
    player2Score: 0,
    gameStarted: true, // Auto-start for tournament
    gameActive: true,
    paused: false,
    gameEnded: false
};

// Game Objects (same as normal PvP game)
const paddle1 = { x: 20, y: 150, width: 10, height: 60, speed: 5 };
const paddle2 = { x: 770, y: 150, width: 10, height: 60, speed: 5 };
const ball = { x: 400, y: 200, dx: 3, dy: 2, radius: 8 };

// Ball acceleration (same as normal PvP game)
const BALL_ACCELERATION = 1.1; // Ball accelerates by 10% per paddle hit

// Input handling
const keys: { [key: string]: boolean } = {};

// Tournament-specific match result submission
async function submitTournamentMatchResult(winner: string, scoreP1: number, scoreP2: number): Promise<void> {
    if (!tournamentContext) return;
    
    console.log('=== TOURNAMENT MATCH RESULT ===');
    console.log('Tournament ID:', tournamentContext.tournamentId);
    console.log('Match ID:', tournamentContext.matchId);
    console.log('Winner:', winner);
    console.log('Score P1:', scoreP1);
    console.log('Score P2:', scoreP2);
    console.log('===============================');

    try {
        // Submit to tournament system
        const response = await fetch(`/api/tournaments/${tournamentContext.tournamentId}/matches/${tournamentContext.matchId}/result`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scoreP1: parseInt(scoreP1.toString()),
                scoreP2: parseInt(scoreP2.toString())
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to submit tournament result:', errorData);
            alert('Failed to submit match result. Please try again.');
            return;
        }

        const result = await response.json();
        console.log('Tournament match result submitted successfully:', result);
        
        // Also submit to regular match system for stats
        await submitRegularMatchResult(tournamentContext.player2, winner, scoreP1, scoreP2);
        
        // Show success and return to tournament
        showMatchCompleteModal(winner, scoreP1, scoreP2);
        
    } catch (error) {
        console.error('Error submitting tournament match result:', error);
        alert('Failed to submit match result. Please try again.');
    }
}

// Submit to regular match system for user stats
async function submitRegularMatchResult(player2Name: string, winnerName: string, scoreP1: number, scoreP2: number): Promise<void> {
    try {
        const response = await fetch('/api/users/matches', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player2_name: player2Name.trim(),
                winner_name: winnerName.trim(),
                score_p1: parseInt(scoreP1.toString()),
                score_p2: parseInt(scoreP2.toString())
            })
        });

        if (response.ok) {
            console.log('Regular match result also recorded for stats');
        }
    } catch (error) {
        console.log('Note: Could not record regular match for stats:', error);
    }
}

// Show match complete modal
function showMatchCompleteModal(winner: string, scoreP1: number, scoreP2: number) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 3px solid #ffd700;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            color: white;
            font-family: 'Courier New', monospace;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">🏆</div>
            <h2 style="color: #ffd700; font-size: 28px; margin-bottom: 10px;">MATCH COMPLETE!</h2>
            <div style="font-size: 24px; margin-bottom: 20px; color: #ffd700;">${winner} WINS!</div>
            <div style="font-size: 18px; margin-bottom: 30px;">
                Final Score: ${gameState.player1Name} ${scoreP1} - ${scoreP2} ${gameState.player2Name}
            </div>
            <button onclick="returnToTournament()" style="
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: black;
                border: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                🏆 Return to Tournament
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-return after 10 seconds
    setTimeout(() => {
        returnToTournament();
    }, 10000);
}

// Game Logic (identical to PvP version)
function update(): void {
    if (!gameState.gameActive || gameState.paused || gameState.gameEnded) return;

    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collisions
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }

    // Paddle controls
    if (keys['w'] && paddle1.y > 0) paddle1.y -= paddle1.speed;
    if (keys['s'] && paddle1.y < canvas.height - paddle1.height) paddle1.y += paddle1.speed;
    if (keys['ArrowUp'] && paddle2.y > 0) paddle2.y -= paddle2.speed;
    if (keys['ArrowDown'] && paddle2.y < canvas.height - paddle2.height) paddle2.y += paddle2.speed;

    // Advanced paddle collision (same as normal PvP game)
    if (ball.x - ball.radius <= paddle1.x + paddle1.width && 
        ball.x + ball.radius >= paddle1.x &&
        ball.y + ball.radius >= paddle1.y && 
        ball.y - ball.radius <= paddle1.y + paddle1.height && 
        ball.dx < 0) {

        const paddleCenter = paddle1.y + paddle1.height / 2;
        const hitPos = (ball.y - paddleCenter) / (paddle1.height / 2);
        const maxBounce = 4;
        ball.dx = -ball.dx;
        ball.dy = hitPos * maxBounce;
        // Accelerate by BALL_ACCELERATION
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * BALL_ACCELERATION;
        const angle = Math.atan2(ball.dy, ball.dx);
        ball.dx = (ball.dx >= 0 ? 1 : -1) * Math.abs(speed * Math.cos(angle));
        ball.dy = speed * Math.sin(angle);
    }

    if (ball.x + ball.radius >= paddle2.x && 
        ball.x - ball.radius <= paddle2.x + paddle2.width &&
        ball.y + ball.radius >= paddle2.y && 
        ball.y - ball.radius <= paddle2.y + paddle2.height && 
        ball.dx > 0) {

        const paddleCenter = paddle2.y + paddle2.height / 2;
        const hitPos = (ball.y - paddleCenter) / (paddle2.height / 2);
        const maxBounce = 4;
        ball.dx = -ball.dx;
        ball.dy = hitPos * maxBounce;
        // Accelerate by BALL_ACCELERATION
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * BALL_ACCELERATION;
        const angle = Math.atan2(ball.dy, ball.dx);
        ball.dx = (ball.dx >= 0 ? 1 : -1) * Math.abs(speed * Math.cos(angle));
        ball.dy = speed * Math.sin(angle);
    }

    // Scoring (same logic as normal PvP game)
    if (ball.x <= 0) {
        gameState.player2Score++;
        updateScoreDisplay();
        if (gameState.player2Score >= 5) {
            gameState.gameEnded = true;
            submitTournamentMatchResult(gameState.player2Name, gameState.player1Score, gameState.player2Score);
        }
        resetBall();
        return;
    }
    if (ball.x >= canvas.width) {
        gameState.player1Score++;
        updateScoreDisplay();
        if (gameState.player1Score >= 5) {
            gameState.gameEnded = true;
            submitTournamentMatchResult(gameState.player1Name, gameState.player1Score, gameState.player2Score);
        }
        resetBall();
        return;
    }
}

function resetBall(): void {
    ball.x = 400;
    ball.y = 200;
    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
}

function draw(): void {
    // Clear canvas (using same background as normal PvP game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw center line (same style as normal game)
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles (same purple color as normal game)
    ctx.fillStyle = '#cc66ff';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Draw ball (same pink color as normal game)
    ctx.fillStyle = '#ff66cc';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores (same style as normal game)
    ctx.fillStyle = '#cc66ff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.player1Score.toString(), canvas.width / 4, 60);
    ctx.fillText(gameState.player2Score.toString(), 3 * canvas.width / 4, 60);

    // Draw player names (same style as normal game)
    ctx.fillStyle = '#ff66cc';
    ctx.font = '16px Arial';
    ctx.fillText(gameState.player1Name, canvas.width / 4, 90);
    ctx.fillText(gameState.player2Name, 3 * canvas.width / 4, 90);

    // Draw controls (same style as normal game)
    ctx.fillStyle = '#b399d9';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('W/S: Left Paddle', 10, canvas.height - 40);
    ctx.textAlign = 'right';
    ctx.fillText('↑/↓: Right Paddle', canvas.width - 10, canvas.height - 40);
    
    // Draw pause overlay (same style as normal game)
    if (gameState.paused) {
        ctx.fillStyle = 'rgba(13, 0, 26, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#cc66ff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#b399d9';
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACE to resume', canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Event listeners
document.addEventListener('keydown', (e: KeyboardEvent) => {
    keys[e.key] = true;
    
    if (e.key === ' ') {
        e.preventDefault();
        if (gameState.gameActive && !gameState.gameEnded) {
            gameState.paused = !gameState.paused;
        }
    }
    
    if (e.key === 'Escape') {
        if (confirm('Are you sure you want to return to the tournament? This match will be forfeited.')) {
            returnToTournament();
        }
    }
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop(): void {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
console.log('Tournament Pong Game Started');
console.log('Tournament Context:', tournamentContext);
updateScoreDisplay(); // Initialize score display
gameLoop();
