interface Ball {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
}

interface Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

interface KeyState {
    [key: string]: boolean;
}

interface GameState {
    player1Score: number;
    player2Score: number;
    paused: boolean;
    gameActive: boolean;
    player1Name: string;
    player2Name: string;
    gameStarted: boolean;
    winningScore: number;
}

// Get current user info for proper match submission
async function getCurrentUser() {
    try {
        const response = await fetch('/api/users/profile', {
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Profile API response:', data);
            
            // The profile endpoint returns {profile: [userProfile], stats}
            if (data.profile && data.profile.length > 0) {
                return data.profile[0]; // Return the first (and only) user profile
            }
        }
    } catch (error) {
        console.error('Failed to get current user:', error);
    }
    return null;
}

const canvas = document.getElementById('pong-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!

const gameState: GameState = {
    player1Score: 0,
    player2Score: 0,
    paused: false,
    gameActive: true, // Start game immediately
    player1Name: 'Player',
    player2Name: 'AI',
    gameStarted: true, // Game is started
    winningScore: 5
};

let debugMode = false;

const ball: Ball = {
    x: 400,
    y: 200,
    dx: 3,
    dy: 2,
    radius: 8
};

const paddle1: Paddle = { x: 20, y: 150, width: 10, height: 60, speed: 5 };
const paddle2: Paddle = { x: 770, y: 150, width: 10, height: 60, speed: 5 };

const keys: KeyState = {};

const BALL_ACCELERATION = 1.1; // Ball accelerates by 10% per paddle hit

function updateScore(): void {
    const scoreElement = document.getElementById('score-display')!;
    scoreElement.textContent = `${gameState.player1Name}: ${gameState.player1Score} | ${gameState.player2Name}: ${gameState.player2Score}`;
}

function resetBall(): void {
    ball.x = 400;
    ball.y = 200;
    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
}

function drawDebugPath(): void {
    if (!debugMode) return;
    
    ctx.strokeStyle = 'rgba(255, 102, 204, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    let simX = ball.x;
    let simY = ball.y;
    let simDx = ball.dx;
    let simDy = ball.dy;
    
    ctx.moveTo(simX, simY);
    
    for (let i = 0; i < 200; i++) {
        simX += simDx;
        simY += simDy;
        
        // Wall bounces
        if (simY <= 8 || simY >= canvas.height - 8) {
            simDy = -simDy;
        }
        
        // Paddle 1 collision
        if (simX - 8 <= paddle1.x + paddle1.width && 
            simX + 8 >= paddle1.x &&
            simY + 8 >= paddle1.y && 
            simY - 8 <= paddle1.y + paddle1.height && 
            simDx < 0) {
            
            const paddleCenter = paddle1.y + paddle1.height / 2;
            const hitPos = (simY - paddleCenter) / (paddle1.height / 2);
            const maxBounce = 4;
            simDx = -simDx;
            simDy = hitPos * maxBounce;
        }
        
        // Paddle 2 collision
        if (simX + 8 >= paddle2.x && 
            simX - 8 <= paddle2.x + paddle2.width &&
            simY + 8 >= paddle2.y && 
            simY - 8 <= paddle2.y + paddle2.height && 
            simDx > 0) {
            
            const paddleCenter = paddle2.y + paddle2.height / 2;
            const hitPos = (simY - paddleCenter) / (paddle2.height / 2);
            const maxBounce = 4;
            simDx = -simDx;
            simDy = hitPos * maxBounce;
        }
        
        if (simX <= 8 || simX >= canvas.width - 8) {
            break;
        }
        
        ctx.lineTo(simX, simY);
    }
    ctx.stroke();
}

function drawPauseOverlay(): void {
    if (!gameState.paused) return;
    
    ctx.fillStyle = 'rgba(13, 0, 26, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#cc66ff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
}

function drawWinner(): void {
    if (gameState.player1Score < gameState.winningScore && gameState.player2Score < gameState.winningScore) return;
    
    const winner = gameState.player1Score >= gameState.winningScore ? gameState.player1Name : gameState.player2Name;
    
    ctx.fillStyle = 'rgba(13, 0, 26, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#cc66ff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
    
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ff66cc';
    ctx.fillText('Press ESC to play again', canvas.width / 2, canvas.height / 2 + 50);
}

function draw(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Minimum width check and pause logic
    if (window.innerWidth < 820) {
        if (!gameState.paused) gameState.paused = true;
        ctx.fillStyle = '#1a0033';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff66cc';
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Screen too small for Pong!', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#b399d9';
        ctx.fillText('Please widen your window to play.', canvas.width / 2, canvas.height / 2 + 40);
        return;
    } else if (gameState.paused && gameState.gameStarted && window.innerWidth >= 820) {
        // Only unpause if previously paused due to width, not if user manually paused
        // Don't auto-unpause here - let user control pause with spacebar
    }
    // Center line
    ctx.strokeStyle = '#663399';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    // Paddles
    ctx.fillStyle = '#cc66ff';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    // Ball
    ctx.fillStyle = '#ff66cc';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    
    drawDebugPath();
    drawPauseOverlay();
    drawWinner();
}

function update(): void {
    if (gameState.paused || !gameState.gameActive) return;
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collisions
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
    
    // Scoring - Fixed logic
    if (ball.x <= 0) {
        // Ball went off left side - AI (player2) gets point
        gameState.player2Score++;
        updateScore();
        if (gameState.player2Score >= gameState.winningScore) {
            gameState.gameActive = false;
            // Log game end
            console.log(`Game ended: ${gameState.player1Name} ${gameState.player1Score} - ${gameState.player2Score} ${gameState.player2Name}. Winner: ${gameState.player2Name}`);
            // Submit match result to backend
            submitMatchResult(gameState.player2Name, gameState.player2Name, gameState.player1Score, gameState.player2Score);
        }
        resetBall();
        return;
    }
    if (ball.x >= canvas.width) {
        // Ball went off right side - Player (player1) gets point
        gameState.player1Score++;
        updateScore();
        if (gameState.player1Score >= gameState.winningScore) {
            gameState.gameActive = false;
            // Log game end
            console.log(`Game ended: ${gameState.player1Name} ${gameState.player1Score} - ${gameState.player2Score} ${gameState.player2Name}. Winner: ${gameState.player1Name}`);
            // Submit match result to backend
            submitMatchResult(gameState.player2Name, gameState.player1Name, gameState.player1Score, gameState.player2Score);
        }
        resetBall();
        return;
    }
    
    // Paddle controls
    if (keys['w'] && paddle1.y > 0) paddle1.y -= paddle1.speed;
    if (keys['s'] && paddle1.y < canvas.height - paddle1.height) paddle1.y += paddle1.speed;
    if (keys['ArrowUp'] && paddle2.y > 0) paddle2.y -= paddle2.speed;
    if (keys['ArrowDown'] && paddle2.y < canvas.height - paddle2.height) paddle2.y += paddle2.speed;
    
    // Simple and direct paddle collision: reverse X, set Y, accelerate by 10% per hit
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
}

// Backend integration function
async function submitMatchResult(player2Name: string, winnerName: string, scoreP1: number, scoreP2: number): Promise<void> {
    console.log('=== MATCH RESULT TO SUBMIT ===');
    console.log('Player 2 Name:', player2Name);
    console.log('Winner Name:', winnerName);
    console.log('Score P1 (logged-in user):', scoreP1);
    console.log('Score P2 (guest):', scoreP2);
    console.log('API Endpoint: POST /api/users/matches');
    
    // Get current user to determine correct winner format
    const currentUser = await getCurrentUser();
    let finalWinnerName = winnerName.trim();
    
    // Use actual usernames for winner_name, not user IDs
    if (winnerName === gameState.player1Name) {
        // If player1 (logged-in user) wins, use their username
        if (currentUser && currentUser.username) {
            finalWinnerName = currentUser.username;
        } else {
            // Fallback: use display name from game state
            finalWinnerName = gameState.player1Name;
        }
    } else {
        // If player2 wins, use player2_name
        finalWinnerName = player2Name.trim();
    }
    
    // Ensure scores are integers and winner name is correct format
    const requestBody = {
        player2_name: player2Name.trim(),
        winner_name: finalWinnerName,
        score_p1: parseInt(scoreP1.toString()),
        score_p2: parseInt(scoreP2.toString())
    };
    
    console.log('Current User ID:', currentUser?.id);
    console.log('Final Winner Name:', finalWinnerName);
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));
    console.log('================================');

    // Backend integration enabled
    try {
        const response = await fetch('/api/users/matches', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to submit match result:', errorData);
            return;
        }

        const result = await response.json();
        console.log('Match recorded successfully:', result);
    } catch (error) {
        console.error('Error submitting match result:', error);
    }
}

// --- AI Opponent Logic (42 ft_transcendence compliant) ---
// Difficulty: 0 = perfect, >0 = random offset in pixels (easy/medium/hard)
const AI_DIFFICULTY = 0; // set to 0 for perfect, e.g. 20 for easy
let aiTargetY = paddle2.y + paddle2.height / 2;


function predictBallYAtPaddle42(): number {
    // Only predict if ball is moving toward AI
    if (ball.dx <= 0) return canvas.height / 2;
    
    // Simulate ball path with proper physics until it reaches paddle2.x
    let simX = ball.x;
    let simY = ball.y;
    let simDx = ball.dx;
    let simDy = ball.dy;
    let steps = 0;
    
    while (steps++ < 2000) {
        // Calculate next position
        let nextX = simX + simDx;
        let nextY = simY + simDy;
        
        // Handle wall bounces first
        if (nextY <= ball.radius) {
            nextY = ball.radius;
            simDy = -simDy;
        } else if (nextY >= canvas.height - ball.radius) {
            nextY = canvas.height - ball.radius;
            simDy = -simDy;
        }
        
        // Update position after wall bounce
        simX = nextX;
        simY = nextY;
        
        // Check paddle1 collision (left paddle) - only if moving left
        if (simDx < 0 && 
            simX - ball.radius <= paddle1.x + paddle1.width && 
            simX + ball.radius >= paddle1.x &&
            simY + ball.radius >= paddle1.y && 
            simY - ball.radius <= paddle1.y + paddle1.height) {
            
            // Bounce off paddle1 with proper physics
            let paddleCenter = paddle1.y + paddle1.height / 2;
            let hitPos = (simY - paddleCenter) / (paddle1.height / 2);
            hitPos = Math.max(-1, Math.min(1, hitPos)); // Clamp hit position
            let maxBounce = 4;
            simDx = -simDx;
            simDy = hitPos * maxBounce;
            
            // Apply acceleration like in real game
            let speed = Math.sqrt(simDx * simDx + simDy * simDy) * BALL_ACCELERATION;
            let angle = Math.atan2(simDy, simDx);
            simDx = (simDx >= 0 ? 1 : -1) * Math.abs(speed * Math.cos(angle));
            simDy = speed * Math.sin(angle);
            
            // Move ball away from paddle to avoid multiple collisions
            simX = paddle1.x + paddle1.width + ball.radius + 1;
        }
        
        // Check if ball crosses AI paddle X position (moving right)
        if (simDx > 0 && simX >= paddle2.x) {
            // Add difficulty offset (random error)
            let predictedY = simY;
            if (AI_DIFFICULTY > 0) {
                predictedY += (Math.random() - 0.5) * 2 * AI_DIFFICULTY;
            }
            return Math.max(paddle2.height / 2, Math.min(canvas.height - paddle2.height / 2, predictedY));
        }
        
        // Safety: if ball goes off screen, stop
        if (simX < -100 || simX > canvas.width + 100) {
            break;
        }
    }
    
    // Fallback: return center if prediction fails
    return canvas.height / 2;
}

function aiUpdate42() {
    if (!gameState.gameActive || gameState.paused) return;
    
    // Only predict if ball is coming toward AI and far enough away
    if (ball.dx > 0 && ball.x < paddle2.x - 100) {
        aiTargetY = predictBallYAtPaddle42();
    } else if (ball.dx <= 0) {
        // Ball going away: move toward center gradually
        aiTargetY = canvas.height / 2;
    }
    // If ball is too close, don't update target (keep current target)
    
    // Clamp target to valid paddle positions
    const minY = paddle2.height / 2;
    const maxY = canvas.height - paddle2.height / 2;
    aiTargetY = Math.max(minY, Math.min(maxY, aiTargetY));
    
    // Clear AI key states (but preserve user keys like space)
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    
    // Move paddle toward target with larger dead zone for stability
    let paddleCenter = paddle2.y + paddle2.height / 2;
    const deadZone = 15; // Larger dead zone for more stability
    
    if (aiTargetY < paddleCenter - deadZone) {
        keys['ArrowUp'] = true;
    } else if (aiTargetY > paddleCenter + deadZone) {
        keys['ArrowDown'] = true;
    }
    // Otherwise, stay still (within dead zone)
}
// Use new AI update
setInterval(aiUpdate42, 1000);

function resetGame(): void {
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    gameState.paused = false;
    gameState.gameActive = true;
    gameState.gameStarted = true;
    gameState.player1Name = 'Player';
    gameState.player2Name = 'AI';
    updateScore();
    resetBall();
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
    keys[e.key] = true;
    if (["ArrowUp", "ArrowDown", "w", "s", " ", "Escape"].indexOf(e.key) !== -1) {
        e.preventDefault();
    }
    switch(e.key) {
        case ' ':
            if (gameState.gameActive) {
                gameState.paused = !gameState.paused;
            }
            break;
        case 'Escape':
            resetGame();
            break;
        case 'd':
        case 'D':
            debugMode = !debugMode;
            (window as any).DEBUG_MODE = debugMode;
            console.log('Debug mode:', debugMode ? 'ON' : 'OFF');
            break;
    }
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
    keys[e.key] = false;
});

function gameLoop(): void {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

updateScore();
gameLoop();
