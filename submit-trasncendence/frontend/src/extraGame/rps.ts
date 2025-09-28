import { requireAuth } from '../router/authRouter';

type Move = 'rock' | 'paper' | 'scissors' | null;
type GameMode = 'idle' | 'solo' | 'pvp' | 'pass' | 'match';

interface User {
  username: string;
  userId: number;
}

interface GameState {
  mode: GameMode;
  round: number;
  scoreP1: number;
  scoreP2: number;
  p1Move: Move;
  p2Move: Move;
  currentPlayer: 1 | 2;
  gameActive: boolean;
  waitingForMoves: boolean;
  player2Name: string;
}

class RPSGame {
  currentUser: User | null = null;
  gameState: GameState;

  constructor() {
    this.gameState = {
      mode: 'idle',
      round: 0,
      scoreP1: 0,
      scoreP2: 0,
      p1Move: null,
      p2Move: null,
      currentPlayer: 1,
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
    if (userNameEl) {
      userNameEl.textContent = this.currentUser?.username || 'Guest';
    }

    // Game mode buttons
    const soloBtn = document.getElementById('btn-solo');
    const pvpBtn = document.getElementById('btn-pvp');
    const newGameBtn = document.getElementById('btn-new-game');
    const resetStatsBtn = document.getElementById('btn-reset-stats');

    soloBtn?.addEventListener('click', () => this.startGame('solo'));
    pvpBtn?.addEventListener('click', () => this.startGame('pvp'));
    newGameBtn?.addEventListener('click', () => this.newGame());
    resetStatsBtn?.addEventListener('click', () => this.resetStats());

    // Move buttons
    const moveButtons = document.querySelectorAll('.move-btn');
    moveButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const move = (e.target as HTMLElement).closest('.move-btn')?.getAttribute('data-move') as Move;
        if (move) this.makeMove(move);
      });
    });
  }

  startGame(mode: GameMode) {
    this.gameState.mode = mode;
    this.gameState.gameActive = true;
    this.gameState.currentPlayer = 1;
    this.gameState.round = 1;
    
    this.updateDisplay();
    this.enableMoveButtons();
    
    const modeLabel = document.getElementById('mode-label');
    if (modeLabel) {
      modeLabel.textContent = mode === 'solo' ? 'Playing vs AI' : 'Local Player vs Player';
    }

    const result = document.getElementById('result');
    if (result) {
      result.textContent = mode === 'solo' ? 'Make your move!' : 'Player 1 - Make your move!';
    }
  }

  makeMove(move: Move) {
    if (!this.gameState.gameActive) return;

    if (this.gameState.mode === 'solo') {
      // Solo mode: player vs AI
      this.gameState.p1Move = move;
      this.gameState.p2Move = this.getRandomMove();
      this.resolveRound();
    } else if (this.gameState.mode === 'pvp') {
      // PvP mode: local multiplayer
      if (this.gameState.currentPlayer === 1) {
        this.gameState.p1Move = move;
        this.gameState.currentPlayer = 2;
        this.updateDisplay();
        const result = document.getElementById('result');
        if (result) result.textContent = 'Player 2 - Make your move!';
      } else {
        this.gameState.p2Move = move;
        this.resolveRound();
      }
    }
  }

  resolveRound() {
    const { p1Move, p2Move } = this.gameState;
    const winner = this.determineWinner(p1Move, p2Move);
    
    // Update moves display
    const p1MoveEl = document.getElementById('p1-move');
    const p2MoveEl = document.getElementById('p2-move');
    if (p1MoveEl) p1MoveEl.textContent = this.getMoveEmoji(p1Move);
    if (p2MoveEl) p2MoveEl.textContent = this.getMoveEmoji(p2Move);

    // Update scores
    if (winner === 1) this.gameState.scoreP1++;
    else if (winner === 2) this.gameState.scoreP2++;

    // Update result display
    const result = document.getElementById('result');
    if (result) {
      if (winner === 0) {
        result.textContent = "It's a Draw!";
      } else if (this.gameState.mode === 'solo') {
        result.textContent = winner === 1 ? 'You Win!' : 'AI Wins!';
      } else {
        result.textContent = `Player ${winner} Wins!`;
      }
    }

    this.updateDisplay();
    this.disableMoveButtons();

    // Submit match result if authenticated and not solo
    if (this.currentUser && this.gameState.mode === 'pvp') {
      this.submitMatchResult(winner);
    }

    // Reset for next round after delay
    setTimeout(() => {
      this.nextRound();
    }, 2000);
  }

  nextRound() {
    this.gameState.round++;
    this.gameState.p1Move = null;
    this.gameState.p2Move = null;
    this.gameState.currentPlayer = 1;
    
    // Clear moves display
    const p1MoveEl = document.getElementById('p1-move');
    const p2MoveEl = document.getElementById('p2-move');
    if (p1MoveEl) p1MoveEl.textContent = '—';
    if (p2MoveEl) p2MoveEl.textContent = '—';

    this.updateDisplay();
    this.enableMoveButtons();

    const result = document.getElementById('result');
    if (result) {
      result.textContent = this.gameState.mode === 'solo' ? 'Make your move!' : 'Player 1 - Make your move!';
    }
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

  getRandomMove(): Move {
    const moves: Move[] = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
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

  enableMoveButtons() {
    const moveButtons = document.querySelectorAll('.move-btn');
    moveButtons.forEach(btn => {
      (btn as HTMLButtonElement).disabled = false;
    });
  }

  disableMoveButtons() {
    const moveButtons = document.querySelectorAll('.move-btn');
    moveButtons.forEach(btn => {
      (btn as HTMLButtonElement).disabled = true;
    });
  }

  newGame() {
    this.gameState = {
      mode: 'idle',
      round: 0,
      scoreP1: 0,
      scoreP2: 0,
      p1Move: null,
      p2Move: null,
      currentPlayer: 1,
      gameActive: false,
      waitingForMoves: false,
      player2Name: ''
    };

    this.updateDisplay();
    this.disableMoveButtons();

    // Clear displays
    const p1MoveEl = document.getElementById('p1-move');
    const p2MoveEl = document.getElementById('p2-move');
    const result = document.getElementById('result');
    const modeLabel = document.getElementById('mode-label');

    if (p1MoveEl) p1MoveEl.textContent = '—';
    if (p2MoveEl) p2MoveEl.textContent = '—';
    if (result) result.textContent = 'Choose your game mode to start!';
    if (modeLabel) modeLabel.textContent = 'Local Multiplayer Game';
  }

  async submitMatchResult(winner: number) {
    if (!this.currentUser) return;

    try {
      const opponentName = 'Player 2';
      const result = winner === 1 ? 'win' : winner === 2 ? 'lose' : 'draw';
      
      const response = await fetch('/api/rps/matches', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opponent_name: opponentName,
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
      // This would need a backend endpoint to reset stats
      console.log('Reset stats requested');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RPSGame();
});

export {};
