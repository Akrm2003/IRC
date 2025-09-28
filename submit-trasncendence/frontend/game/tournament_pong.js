// Tournament Pong Game - Integrated with ft_transcendence Tournament System
// Based on the PvP Pong game but with tournament-specific features
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Get tournament context from URL parameters
function getTournamentContext() {
    var urlParams = new URLSearchParams(window.location.search);
    var mode = urlParams.get('mode');
    var matchId = urlParams.get('matchId');
    var tournamentId = urlParams.get('tournamentId');
    var player1 = urlParams.get('player1');
    var player2 = urlParams.get('player2');
    if (mode === 'tournament' && matchId && tournamentId && player1 && player2) {
        return {
            mode: mode,
            matchId: matchId,
            tournamentId: tournamentId,
            player1: decodeURIComponent(player1),
            player2: decodeURIComponent(player2)
        };
    }
    return null;
}
// Tournament context
var tournamentContext = getTournamentContext();
if (!tournamentContext) {
    alert('Invalid tournament context. Redirecting to tournaments...');
    window.location.href = '/tournaments';
}
// Update match title and score display
var matchTitle = document.getElementById('matchTitle');
if (matchTitle && tournamentContext) {
    matchTitle.textContent = "".concat(tournamentContext.player1, " VS ").concat(tournamentContext.player2);
}
// Update score display function
function updateScoreDisplay() {
    var scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = "".concat(gameState.player1Name, ": ").concat(gameState.player1Score, " | ").concat(gameState.player2Name, ": ").concat(gameState.player2Score);
    }
}
// Return to tournament function
function returnToTournament() {
    if (tournamentContext) {
        console.log('Returning to tournament:', tournamentContext.tournamentId);
        // Use the correct path that matches the tournament page routing
        window.location.href = "/tournaments/tournaments.html?id=".concat(tournamentContext.tournamentId);
    }
    else {
        console.log('No tournament context, returning to tournaments list');
        window.location.href = '/tournaments/tournaments.html';
    }
}
// Game Canvas and Context
var canvas = document.getElementById('pong-canvas');
var ctx = canvas.getContext('2d');
var gameState = {
    player1Name: (tournamentContext === null || tournamentContext === void 0 ? void 0 : tournamentContext.player1) || 'Player 1',
    player2Name: (tournamentContext === null || tournamentContext === void 0 ? void 0 : tournamentContext.player2) || 'Player 2',
    player1Score: 0,
    player2Score: 0,
    gameStarted: true, // Auto-start for tournament
    gameActive: true,
    paused: false,
    gameEnded: false
};
// Game Objects (same as normal PvP game)
var paddle1 = { x: 20, y: 150, width: 10, height: 60, speed: 5 };
var paddle2 = { x: 770, y: 150, width: 10, height: 60, speed: 5 };
var ball = { x: 400, y: 200, dx: 3, dy: 2, radius: 8 };
// Ball acceleration (same as normal PvP game)
var BALL_ACCELERATION = 1.1; // Ball accelerates by 10% per paddle hit
// Input handling
var keys = {};
// Tournament-specific match result submission
function submitTournamentMatchResult(winner, scoreP1, scoreP2) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tournamentContext)
                        return [2 /*return*/];
                    console.log('=== TOURNAMENT MATCH RESULT ===');
                    console.log('Tournament ID:', tournamentContext.tournamentId);
                    console.log('Match ID:', tournamentContext.matchId);
                    console.log('Winner:', winner);
                    console.log('Score P1:', scoreP1);
                    console.log('Score P2:', scoreP2);
                    console.log('===============================');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch("/api/tournaments/".concat(tournamentContext.tournamentId, "/matches/").concat(tournamentContext.matchId, "/result"), {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                scoreP1: parseInt(scoreP1.toString()),
                                scoreP2: parseInt(scoreP2.toString())
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    console.error('Failed to submit tournament result:', errorData);
                    alert('Failed to submit match result. Please try again.');
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    result = _a.sent();
                    console.log('Tournament match result submitted successfully:', result);
                    // Also submit to regular match system for stats
                    return [4 /*yield*/, submitRegularMatchResult(tournamentContext.player2, winner, scoreP1, scoreP2)];
                case 6:
                    // Also submit to regular match system for stats
                    _a.sent();
                    // Show success and return to tournament
                    showMatchCompleteModal(winner, scoreP1, scoreP2);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error submitting tournament match result:', error_1);
                    alert('Failed to submit match result. Please try again.');
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Submit to regular match system for user stats
function submitRegularMatchResult(player2Name, winnerName, scoreP1, scoreP2) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('/api/users/matches', {
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
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        console.log('Regular match result also recorded for stats');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log('Note: Could not record regular match for stats:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Show match complete modal
function showMatchCompleteModal(winner, scoreP1, scoreP2) {
    var modal = document.createElement('div');
    modal.style.cssText = "\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.8);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 10000;\n    ";
    modal.innerHTML = "\n        <div style=\"\n            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);\n            border: 3px solid #ffd700;\n            border-radius: 20px;\n            padding: 40px;\n            text-align: center;\n            color: white;\n            font-family: 'Courier New', monospace;\n            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);\n        \">\n            <div style=\"font-size: 60px; margin-bottom: 20px;\">\uD83C\uDFC6</div>\n            <h2 style=\"color: #ffd700; font-size: 28px; margin-bottom: 10px;\">MATCH COMPLETE!</h2>\n            <div style=\"font-size: 24px; margin-bottom: 20px; color: #ffd700;\">".concat(winner, " WINS!</div>\n            <div style=\"font-size: 18px; margin-bottom: 30px;\">\n                Final Score: ").concat(gameState.player1Name, " ").concat(scoreP1, " - ").concat(scoreP2, " ").concat(gameState.player2Name, "\n            </div>\n            <button onclick=\"returnToTournament()\" style=\"\n                background: linear-gradient(135deg, #ffd700, #ffed4e);\n                color: black;\n                border: none;\n                padding: 15px 30px;\n                border-radius: 25px;\n                font-size: 16px;\n                font-weight: bold;\n                cursor: pointer;\n                transition: all 0.3s ease;\n            \">\n                \uD83C\uDFC6 Return to Tournament\n            </button>\n        </div>\n    ");
    document.body.appendChild(modal);
    // Auto-return after 10 seconds
    setTimeout(function () {
        returnToTournament();
    }, 10000);
}
// Game Logic (identical to PvP version)
function update() {
    if (!gameState.gameActive || gameState.paused || gameState.gameEnded)
        return;
    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Wall collisions
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy;
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
    // Advanced paddle collision (same as normal PvP game)
    if (ball.x - ball.radius <= paddle1.x + paddle1.width &&
        ball.x + ball.radius >= paddle1.x &&
        ball.y + ball.radius >= paddle1.y &&
        ball.y - ball.radius <= paddle1.y + paddle1.height &&
        ball.dx < 0) {
        var paddleCenter = paddle1.y + paddle1.height / 2;
        var hitPos = (ball.y - paddleCenter) / (paddle1.height / 2);
        var maxBounce = 4;
        ball.dx = -ball.dx;
        ball.dy = hitPos * maxBounce;
        // Accelerate by BALL_ACCELERATION
        var speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * BALL_ACCELERATION;
        var angle = Math.atan2(ball.dy, ball.dx);
        ball.dx = (ball.dx >= 0 ? 1 : -1) * Math.abs(speed * Math.cos(angle));
        ball.dy = speed * Math.sin(angle);
    }
    if (ball.x + ball.radius >= paddle2.x &&
        ball.x - ball.radius <= paddle2.x + paddle2.width &&
        ball.y + ball.radius >= paddle2.y &&
        ball.y - ball.radius <= paddle2.y + paddle2.height &&
        ball.dx > 0) {
        var paddleCenter = paddle2.y + paddle2.height / 2;
        var hitPos = (ball.y - paddleCenter) / (paddle2.height / 2);
        var maxBounce = 4;
        ball.dx = -ball.dx;
        ball.dy = hitPos * maxBounce;
        // Accelerate by BALL_ACCELERATION
        var speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * BALL_ACCELERATION;
        var angle = Math.atan2(ball.dy, ball.dx);
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
function resetBall() {
    ball.x = 400;
    ball.y = 200;
    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
}
function draw() {
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
document.addEventListener('keydown', function (e) {
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
document.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});
// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
// Start the game
console.log('Tournament Pong Game Started');
console.log('Tournament Context:', tournamentContext);
updateScoreDisplay(); // Initialize score display
gameLoop();
