import { requireAuth } from '../router/authRouter';

type Move = 'rock' | 'paper' | 'scissors' | null;

interface User {
  username: string;
  userId: number;
}

interface GameState {
  round: number;
  scoreP1: number;
  scoreP2: number;
  p1Move: Move;
  p2Move: Move;
  gameActive: boolean;
  waitingForMoves: boolean;
  player2Name: string;
}

class RPSGame {
  currentUser: User | null = null;
  gameState: GameState;
  keyPressed: { [key: string]: boolean } = {};

  constructor() {
    this.gameState = {
      round: 0,
      scoreP1: 0,
      scoreP2: 0,
      p1Move: null,
      p2Move: null,
      gameActive: false,
      waitingForMoves: false,
      player2Name: ''
    };

    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      console.log('🔐 Checking authentication for Rock Paper Scissors...');
      const isAuthenticated = await requireAuth();
      
      if (isAuthenticated) {
        const response = await fetch('/api/auth/verify-session', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          const userData = await response.json();
          this.currentUser = {
            username: userData.username,
            userId: userData.userId
          };
          console.log('✅ User authenticated:', this.currentUser.username);
        }
      }
    } catch (error) {
      console.error('❌ Authentication failed:', error);
    }

    this.setupUI();
    this.updateDisplay();
    this.fetchStats();
  }

  setupUI() {
    // Update user name
    const userNameEl = document.getElementById('user-name');
    const p1NameEl = document.getElementById('p1-name');
    if (userNameEl && p1NameEl) {
      const username = this.currentUser?.username || 'Guest';
      userNameEl.textContent = username;
      p1NameEl.textContent = username;
    }

    // Start game button
    const startBtn = document.getElementById('start-game');
    const player2Input = document.getElementById('player2-name') as HTMLInputElement;
    
    startBtn?.addEventListener('click', () => {
      const p2Name = player2Input?.value.trim();
      if (p2Name && p2Name.length > 0) {
        this.startGame(p2Name);
      } else {
        alert('Please enter Player 2 name!');
      }
    });

    // Allow Enter key to start game
    player2Input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        startBtn?.click();
      }
    });

    // New game and reset buttons
    const newGameBtn = document.getElementById('btn-new-game');
    const resetStatsBtn = document.getElementById('btn-reset-stats');

    newGameBtn?.addEventListener('click', () => this.newGame());
    resetStatsBtn?.addEventListener('click', () => this.resetStats());

    // Keyboard controls
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  startGame(player2Name: string) {
    this.gameState.player2Name = player2Name;
    this.gameState.gameActive = true;
    this.gameState.round = 1;
    this.gameState.scoreP1 = 0;
    this.gameState.scoreP2 = 0;
    
    // Update player 2 name display
    const p2NameEl = document.getElementById('p2-name');
    if (p2NameEl) p2NameEl.textContent = player2Name;

    // Hide input, show game
    const player2Input = document.getElementById('player2-name') as HTMLInputElement;
    const startBtn = document.getElementById('start-game');
    if (player2Input) player2Input.style.display = 'none';
    if (startBtn) startBtn.style.display = 'none';

    this.updateDisplay();
    this.startRound();
  }

  startRound() {
    this.gameState.p1Move = null;
    this.gameState.p2Move = null;
    this.gameState.waitingForMoves = false;
    
    // Clear previous moves
    const p1MoveEl = document.getElementById('p1-move');
    const p2MoveEl = document.getElementById('p2-move');
    if (p1MoveEl) p1MoveEl.textContent = '—';
    if (p2MoveEl) p2MoveEl.textContent = '—';

    // Start countdown
    this.countdown();
  }

  countdown() {
    const countdownEl = document.getElementById('countdown');
    const resultEl = document.getElementById('result');
    
    if (countdownEl) countdownEl.textContent = '3';
    if (resultEl) resultEl.textContent = 'Get ready...';

    setTimeout(() => {
      if (countdownEl) countdownEl.textContent = '2';
    }, 1000);

    setTimeout(() => {
      if (countdownEl) countdownEl.textContent = '1';
    }, 2000);

    setTimeout(() => {
      if (countdownEl) countdownEl.textContent = 'GO!';
      if (resultEl) resultEl.textContent = 'Make your moves NOW! (Press SPACE to skip if stuck)';
      this.gameState.waitingForMoves = true;
      
      // Extended timeout - 60 seconds
      setTimeout(() => {
        if (this.gameState.waitingForMoves) {
          console.log('⏰ Round timed out - auto-resolving');
          this.resolveRound();
        }
      }, 60000);
    }, 3000);
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.gameState.waitingForMoves) return;
    
    const key = e.key.toLowerCase();
    
    // Prevent multiple presses
    if (this.keyPressed[key]) return;
    this.keyPressed[key] = true;

    // Player 1 controls (W, A, S)
    if (key === 'w' && !this.gameState.p1Move) {
      this.gameState.p1Move = 'paper';
      this.updateMoveDisplay('p1-move', 'paper');
    } else if (key === 'a' && !this.gameState.p1Move) {
      this.gameState.p1Move = 'rock';
      this.updateMoveDisplay('p1-move', 'rock');
    } else if (key === 's' && !this.gameState.p1Move) {
      this.gameState.p1Move = 'scissors';
      this.updateMoveDisplay('p1-move', 'scissors');
    }

    // Player 2 controls (Arrow keys)
    if (key === 'arrowup' && !this.gameState.p2Move) {
      this.gameState.p2Move = 'paper';
      this.updateMoveDisplay('p2-move', 'paper');
    } else if (key === 'arrowleft' && !this.gameState.p2Move) {
      this.gameState.p2Move = 'rock';
      this.updateMoveDisplay('p2-move', 'rock');
    } else if (key === 'arrowdown' && !this.gameState.p2Move) {
      this.gameState.p2Move = 'scissors';
      this.updateMoveDisplay('p2-move', 'scissors');
    }

    // Manual skip with SPACE key
    if (key === ' ' || key === 'space') {
      console.log('⏭️ Round manually skipped');
      this.gameState.waitingForMoves = false;
      this.resolveRound();
      return;
    }

    // Check if both players made moves
    if (this.gameState.p1Move && this.gameState.p2Move) {
      this.gameState.waitingForMoves = false;
      setTimeout(() => this.resolveRound(), 500);
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    this.keyPressed[key] = false;
  }

  updateMoveDisplay(elementId: string, move: Move) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = this.getMoveEmoji(move);
    }
  }

  resolveRound() {
    this.gameState.waitingForMoves = false;
    
    // If no moves made, show as draw
    if (!this.gameState.p1Move && !this.gameState.p2Move) {
      this.gameState.p1Move = 'rock'; // Default
      this.gameState.p2Move = 'rock'; // Default
    } else if (!this.gameState.p1Move) {
      this.gameState.p1Move = 'rock'; // Default if player 1 didn't move
    } else if (!this.gameState.p2Move) {
      this.gameState.p2Move = 'rock'; // Default if player 2 didn't move
    }

    // Update display with final moves
    this.updateMoveDisplay('p1-move', this.gameState.p1Move);
    this.updateMoveDisplay('p2-move', this.gameState.p2Move);

    const winner = this.determineWinner(this.gameState.p1Move, this.gameState.p2Move);
    
    // Update scores
    if (winner === 1) this.gameState.scoreP1++;
    else if (winner === 2) this.gameState.scoreP2++;

    // Update result display
    const resultEl = document.getElementById('result');
    const countdownEl = document.getElementById('countdown');
    
    if (resultEl && countdownEl) {
      if (winner === 0) {
        resultEl.textContent = "It's a Draw!";
        countdownEl.textContent = '🤝';
      } else {
        const winnerName = winner === 1 ? 
          (this.currentUser?.username || 'Player 1') : 
          this.gameState.player2Name;
        resultEl.textContent = `${winnerName} Wins!`;
        countdownEl.textContent = winner === 1 ? '🏆' : '🎉';
      }
    }

    this.updateDisplay();

    // Submit match result if authenticated
    if (this.currentUser) {
      this.submitMatchResult(winner);
    }

    // Next round after delay
    setTimeout(() => {
      this.gameState.round++;
      this.startRound();
    }, 3000);
  }

  determineWinner(move1: Move, move2: Move): number {
    if (!move1 || !move2) return 0;
    if (move1 === move2) return 0;
    
    if (
      (move1 === 'rock' && move2 === 'scissors') ||
      (move1 === 'paper' && move2 === 'rock') ||
      (move1 === 'scissors' && move2 === 'paper')
    ) {
      return 1;
    }
    return 2;
  }

  getMoveEmoji(move: Move): string {
    if (!move) return '—';
    switch (move) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '—';
    }
  }

  updateDisplay() {
    // Update scores
    const scoreP1El = document.getElementById('score-p1');
    const scoreP2El = document.getElementById('score-p2');
    const roundEl = document.getElementById('round-number');
    
    if (scoreP1El) scoreP1El.textContent = this.gameState.scoreP1.toString();
    if (scoreP2El) scoreP2El.textContent = this.gameState.scoreP2.toString();
    if (roundEl) roundEl.textContent = this.gameState.round.toString();
  }

  newGame() {
    this.gameState = {
      round: 0,
      scoreP1: 0,
      scoreP2: 0,
      p1Move: null,
      p2Move: null,
      gameActive: false,
      waitingForMoves: false,
      player2Name: ''
    };

    // Show input again
    const player2Input = document.getElementById('player2-name') as HTMLInputElement;
    const startBtn = document.getElementById('start-game');
    if (player2Input) {
      player2Input.style.display = 'inline-block';
      player2Input.value = '';
    }
    if (startBtn) startBtn.style.display = 'inline-block';

    // Reset displays
    const p1NameEl = document.getElementById('p1-name');
    const p2NameEl = document.getElementById('p2-name');
    const p1MoveEl = document.getElementById('p1-move');
    const p2MoveEl = document.getElementById('p2-move');
    const countdownEl = document.getElementById('countdown');
    const resultEl = document.getElementById('result');

    if (p1NameEl) p1NameEl.textContent = this.currentUser?.username || 'Guest';
    if (p2NameEl) p2NameEl.textContent = '-';
    if (p1MoveEl) p1MoveEl.textContent = '—';
    if (p2MoveEl) p2MoveEl.textContent = '—';
    if (countdownEl) countdownEl.textContent = 'Enter Player 2 name to start!';
    if (resultEl) resultEl.textContent = '';

    this.updateDisplay();
  }

  async submitMatchResult(winner: number) {
    if (!this.currentUser) return;

    try {
      const result = winner === 1 ? 'win' : winner === 2 ? 'lose' : 'draw';
      
      const response = await fetch('/api/rps/matches', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opponent_name: this.gameState.player2Name,
          your_move: this.gameState.p1Move,
          opponent_move: this.gameState.p2Move,
          result: result,
          mode: 'pass'
        })
      });

      if (response.ok) {
        console.log('✅ Match recorded successfully');
        this.fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('❌ Error submitting match:', error);
    }
  }

  async fetchStats() {
    if (!this.currentUser) return;

    try {
      const response = await fetch('/api/rps/history', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        const statsEl = document.getElementById('stats-display');
        if (statsEl && data.stats) {
          statsEl.innerHTML = `
            <div class="text-sm font-bold" style="color: #cc66ff; margin-bottom: 0.5rem;">Your RPS Stats</div>
            <div class="text-xs" style="color: #b399d9;">
              Matches: ${data.stats.total_matches} | 
              Wins: ${data.stats.wins} | 
              Losses: ${data.stats.losses} | 
              Win Rate: ${data.stats.win_rate}%
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
    }
  }

  resetStats() {
    if (confirm('Are you sure you want to reset your statistics? This cannot be undone.')) {
      console.log('Reset stats requested - would need backend endpoint');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RPSGame();
});

export {};
