"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get current user info for proper match submission
function getCurrentUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/users/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = yield response.json();
                console.log('Profile API response:', data);
                // The profile endpoint returns {profile: [userProfile], stats}
                if (data.profile && data.profile.length > 0) {
                    return data.profile[0]; // Return the first (and only) user profile
                }
            }
        }
        catch (error) {
            console.error('Failed to get current user:', error);
        }
        return null;
    });
}
const canvas = document.getElementById('pong-canvas');
const ctx = canvas.getContext('2d');
const gameState = {
    player1Name: 'Player 1',
    player2Name: '',
    player1Score: 0,
    player2Score: 0,
    gameStarted: false,
    gameActive: false,
    paused: false,
    winningScore: 5
};
let debugMode = false;
const ball = {
    x: 400,
    y: 200,
    dx: 3,
    dy: 2,
    radius: 8
};
const paddle1 = { x: 20, y: 150, width: 10, height: 60, speed: 5 };
const paddle2 = { x: 770, y: 150, width: 10, height: 60, speed: 5 };
const keys = {};
const BALL_ACCELERATION = 1.1; // Ball accelerates by 10% per paddle hit
function updateScore() {
    const scoreElement = document.getElementById('score-display');
    if (gameState.gameStarted) {
        scoreElement.textContent = `${gameState.player1Name}: ${gameState.player1Score} | ${gameState.player2Name}: ${gameState.player2Score}`;
    }
    else {
        scoreElement.textContent = 'Enter Player 2 name to start';
    }
}
function resetBall() {
    ball.x = 400;
    ball.y = 200;
    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
}
// Backend integration function
function submitMatchResult(player2Name, winnerName, scoreP1, scoreP2) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('=== MATCH RESULT TO SUBMIT ===');
        console.log('Player 2 Name:', player2Name);
        console.log('Winner Name:', winnerName);
        console.log('Score P1 (logged-in user):', scoreP1);
        console.log('Score P2 (guest):', scoreP2);
        console.log('API Endpoint: POST /api/users/matches');
        // Get current user to determine correct winner format
        const currentUser = yield getCurrentUser();
        let finalWinnerName = winnerName.trim();
        // Use actual usernames for winner_name, not user IDs
        if (winnerName === gameState.player1Name) {
            // If player1 (logged-in user) wins, use their username
            if (currentUser && currentUser.username) {
                finalWinnerName = currentUser.username;
            }
            else {
                // Fallback: use display name from game state
                finalWinnerName = gameState.player1Name;
            }
        }
        else {
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
        console.log('Current User ID:', currentUser === null || currentUser === void 0 ? void 0 : currentUser.id);
        console.log('Final Winner Name:', finalWinnerName);
        console.log('Request Body:', JSON.stringify(requestBody, null, 2));
        console.log('================================');
        // Backend integration enabled
        try {
            const response = yield fetch('/api/users/matches', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorData = yield response.json();
                console.error('Failed to submit match result:', errorData);
                return;
            }
            const result = yield response.json();
            console.log('Match recorded successfully:', result);
        }
        catch (error) {
            console.error('Error submitting match result:', error);
        }
    });
}
function drawDebugPath() {
    if (!debugMode)
        return;
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
function drawPauseOverlay() {
    if (!gameState.paused)
        return;
    ctx.fillStyle = 'rgba(13, 0, 26, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cc66ff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
}
function drawNameInput() {
    if (gameState.gameStarted)
        return;
    ctx.fillStyle = 'rgba(13, 0, 26, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cc66ff';
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Enter player 2 name!', canvas.width / 2, canvas.height / 2 - 80);
    ctx.font = '20px Arial';
    const blink = Math.floor(Date.now() / 500) % 2 === 0;
    // Player 1 (fixed)
    ctx.fillStyle = '#999';
    ctx.fillText('Player 1: Player_1', canvas.width / 2, canvas.height / 2 - 20);
    // Player 2 (editable)
    let p2Display = gameState.player2Name;
    if (blink)
        p2Display += '|';
    const p2Text = 'Player 2: ' + p2Display;
    ctx.fillStyle = '#cc66ff';
    ctx.fillText(p2Text, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillStyle = '#b399d9';
    ctx.font = '16px Arial';
    ctx.fillText('Type name and press ENTER to start', canvas.width / 2, canvas.height / 2 + 60);
}
function drawWinner() {
    if (gameState.player1Score < gameState.winningScore && gameState.player2Score < gameState.winningScore)
        return;
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
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Minimum width check and pause logic
    if (window.innerWidth < 820) {
        if (!gameState.paused)
            gameState.paused = true;
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
    }
    else if (gameState.paused && gameState.gameStarted && window.innerWidth >= 820) {
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
    drawNameInput();
    drawWinner();
}
function update() {
    if (gameState.paused || !gameState.gameActive)
        return;
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Wall collisions
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
    // Scoring
    if (ball.x <= 0) {
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
    if (keys['w'] && paddle1.y > 0)
        paddle1.y -= paddle1.speed;
    if (keys['s'] && paddle1.y < canvas.height - paddle1.height)
        paddle1.y += paddle1.speed;
    if (keys['ArrowUp'] && paddle2.y > 0)
        paddle2.y -= paddle2.speed;
    if (keys['ArrowDown'] && paddle2.y < canvas.height - paddle2.height)
        paddle2.y += paddle2.speed;
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
function resetGame() {
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    gameState.paused = false;
    gameState.gameActive = false;
    gameState.gameStarted = false;
    gameState.player1Name = 'Player_1';
    gameState.player2Name = '';
    updateScore();
    resetBall();
}
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (["ArrowUp", "ArrowDown", "w", "s", " ", "Escape"].indexOf(e.key) !== -1) {
        e.preventDefault();
    }
    // Name input handling
    if (!gameState.gameStarted) {
        let errorMsg = '';
        if (e.key === 'Enter') {
            const name2 = gameState.player2Name.trim();
            if (!name2) {
                errorMsg = 'Player 2 name cannot be empty!';
            }
            else {
                gameState.player2Name = name2;
                gameState.gameStarted = true;
                gameState.gameActive = true;
                updateScore();
                // Log game start
                console.log(`Game started: ${gameState.player1Name} vs ${gameState.player2Name}`);
            }
        }
        else if (e.key === 'Backspace') {
            gameState.player2Name = gameState.player2Name.slice(0, -1);
        }
        else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
            if (gameState.player2Name.length < 12) {
                gameState.player2Name += e.key;
            }
        }
        // Show error if any
        if (errorMsg) {
            ctx.save();
            ctx.fillStyle = '#ff3333';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(errorMsg, canvas.width / 2, canvas.height / 2 + 100);
            ctx.restore();
        }
        return;
    }
    switch (e.key) {
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
            window.DEBUG_MODE = debugMode;
            console.log('Debug mode:', debugMode ? 'ON' : 'OFF');
            break;
    }
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
updateScore();
gameLoop();
