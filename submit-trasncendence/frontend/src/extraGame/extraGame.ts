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
}

interface RoundsHistoryItem {
  id?: number;
  round: number;
  yourMove: Move;
  opponentMove: Move;
  opponent?: string;
  result: string;
  mode?: GameMode;
  timestamp?: string;
}

class RPSGame {
  currentUser: User | null = null;
  gameState: GameState;
  userId: string;
  userName: string;
  mode: GameMode;
  round: number;
  scoreYou: number;
  scoreOp: number;
  yourMove: Move;
  opponentMove: Move;
  ws: WebSocket | null = null;
  roomId: string | null = null;

  constructor() {
    this.userId = this._makeId();
    this.userName = 'Guest';
    this.mode = 'idle';
    this.round = 0;
    this.scoreYou = 0;
    this.scoreOp = 0;
    this.yourMove = null;
    this.opponentMove = null;
    this.gameState = {
      mode: 'idle',
      round: 0,
      scoreP1: 0,
      scoreP2: 0,
      p1Move: null,
      p2Move: null,
      currentPlayer: 1,
      gameActive: false
    };

    this._initializeAuth();
  }

  async _initializeAuth() {
    try {
      console.log('🔐 Checking authentication for Rock Paper Scissors...');
      const isAuthenticated = await requireAuth();
      
      if (isAuthenticated) {
        // Get user info from API
        const response = await fetch('/api/auth/verify-session', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          this.currentUser = {
            username: userData.username,
            userId: userData.userId
          };
          this.userId = userData.userId.toString();
          this.userName = userData.username;
          console.log('✅ User authenticated:', this.userName);
        }
      }
    } catch (error) {
      console.error('❌ Authentication failed:', error);
      this.userName = 'Guest';
    }

    this._bindUi();
    this._renderUser();
    this._renderHistory();
    this._updateMoveButtons(); // disable initially
    
    // Fetch backend stats if authenticated
    if (this.currentUser) {
      this._fetchBackendHistory();
    }
  }

  _makeId() {
    return 'u_' + Math.random().toString(36).slice(2, 9);
  }

  _bindUi() {
    const elSolo = document.getElementById('btn-solo');
    const elCreate = document.getElementById('btn-create');
    const elJoin = document.getElementById('btn-join');
    const elClear = document.getElementById('btn-clear-history');
    const elExport = document.getElementById('btn-export');

    elSolo?.addEventListener('click', () => this.startSolo());
    elCreate?.addEventListener('click', () => this.createMatch());
    elJoin?.addEventListener('click', () => {
      const id = prompt('Enter match/room id to join (from host):');
      if (id) this.joinMatch(id.trim());
    });

    elClear?.addEventListener('click', () => {
      localStorage.removeItem(this._historyKey());
      this._renderHistory();
    });
    elExport?.addEventListener('click', () => {
      this._exportHistory();
    });

    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mv = (btn as HTMLElement).dataset.move as Move;
        this.onPlayerMove(mv);
      });
    });
  }

  _renderUser() {
    (document.getElementById('user-name')!).textContent = this.userName;
  }

  _setMode(mode: 'idle' | 'solo' | 'match' | 'pass') {
    this.mode = mode;
    (document.getElementById('mode-label')!).textContent = mode === 'idle' ? 'Idle' : mode;
    (document.getElementById('match-controls')!).textContent =
      mode === 'match' ? `Room: ${this.roomId || '...'}` : '';
    this._updateMoveButtons(); // enable/disable move buttons
  }

  _updateMoveButtons() {
    const disabled = this.mode === 'idle';
    document.querySelectorAll<HTMLButtonElement>('.move-btn').forEach(btn => {
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.5' : '1';
      btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
    });
  }

  startSolo() {
    this._resetRound();
    this._setMode('solo');
    this._logResult('mode', 'solo');
  }

  createMatch() {
    const wsUrl = (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/rps-ws';
    try {
      this._connectWs(wsUrl);
      this._setMode('match');
    } catch (e) {
      alert('Could not open WS to server. Falling back to PASS-AND-PLAY.');
      this._setMode('pass');
    }
  }

  joinMatch(roomId: string) {
    const wsUrl = (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/rps-ws';
    try {
      this._connectWs(wsUrl, roomId);
      this._setMode('match');
    } catch (e) {
      alert('Could not open WS to server. Falling back to PASS-AND-PLAY.');
      this._setMode('pass');
    }
  }

  _connectWs(wsUrl: string, joinRoomId?: string) {
    this.ws = new WebSocket(wsUrl);
    this.ws.onopen = () => {
      this.ws!.send(JSON.stringify({ type: 'register', userId: this.userId, name: this.userName }));
      if (joinRoomId) {
        this.ws!.send(JSON.stringify({ type: 'join', roomId: joinRoomId, name: this.userName }));
        this.roomId = joinRoomId;
        (document.getElementById('match-controls')!).textContent = `Room: ${this.roomId}`;
      } else {
        this.ws!.send(JSON.stringify({ type: 'create', name: this.userName }));
      }
    };

    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      this._handleWsMessage(msg);
    };

    this.ws.onclose = () => { console.log('WS closed'); };
    this.ws.onerror = (e) => { console.warn('WS error', e); };
  }

  _handleWsMessage(msg: any) {
    switch (msg.type) {
      case 'room-created':
      case 'created':
        this.roomId = msg.roomId;
        (document.getElementById('match-controls')!).textContent = `Room: ${this.roomId}`;
        alert(`Share this room id with your opponent: ${this.roomId}`);
        break;
      case 'joined':
        this.roomId = msg.roomId;
        (document.getElementById('match-controls')!).textContent = `Room: ${this.roomId} • Opponent: ${msg.name || 'Opponent'}`;
        break;
      case 'opponent-joined':
        this.roomId = msg.roomId;
        (document.getElementById('match-controls')!).textContent = `Room: ${this.roomId} • Opponent: ${msg.name || 'Opponent'}`;
        break;
      case 'move':
        if (msg.userId !== this.userId) {
          this.opponentMove = msg.move;
          if (this.yourMove) this._resolveRound();
        }
        break;
      case 'error':
        console.warn('Server error:', msg.message);
        break;
    }
  }

  onPlayerMove(move: Move) {
    if (!move) return;

    if (this.mode === 'idle') {
      alert('Please choose Solo or Match to start playing!');
      return;
    }

    this.yourMove = move;
    (document.getElementById('you-move')!).textContent = this._moveEmoji(move);
    (document.getElementById('result')!).textContent = '';

    if (this.mode === 'solo') {
      const cpu = this._randomMove();
      this.opponentMove = cpu;
      (document.getElementById('op-move')!).textContent = this._moveEmoji(cpu);
      this._resolveRound();
    } else if (this.mode === 'match' && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'move', roomId: this.roomId, userId: this.userId, move }));
      (document.getElementById('result')!).textContent = 'Waiting for opponent...';
      if (this.opponentMove) this._resolveRound();
    } else if (this.mode === 'pass') {
      if (!this.opponentMove) {
        (document.getElementById('result')!).textContent = 'Pass the device to opponent and press their move';
      } else {
        this._resolveRound();
      }
    }
  }

  _resolveRound() {
    const you = this.yourMove;
    const op = this.opponentMove;
    if (!you || !op) return;

    (document.getElementById('you-move')!).textContent = this._moveEmoji(you);
    (document.getElementById('op-move')!).textContent = this._moveEmoji(op);

    const res = this._decide(you, op);
    if (res === 'win') this.scoreYou++;
    else if (res === 'lose') this.scoreOp++;

    (document.getElementById('score-you')!).textContent = String(this.scoreYou);
    (document.getElementById('score-op')!).textContent = String(this.scoreOp);
    (document.getElementById('result')!).textContent =
      res === 'win' ? 'You Win!' : res === 'lose' ? 'You Lose' : 'Draw';

    const hist: RoundsHistoryItem = {
      id: Date.now(),
      round: this.round,
      timestamp: new Date().toISOString(),
      mode: this.mode === 'solo' ? 'solo' : this.mode === 'pass' ? 'pass' : 'match',
      opponent: this.mode === 'solo' ? 'CPU' : (this.mode === 'pass' ? 'Local' : undefined),
      yourMove: you,
      opponentMove: op,
      result: res,
    };
    this._pushHistory(hist);
    this._renderHistory();

    // Submit match result to backend if authenticated and playing against someone
    if (this.currentUser && this.mode !== 'solo') {
      this._submitMatchResult(hist);
    }

    this.yourMove = null;
    this.opponentMove = null;
    this.round++;
    (document.getElementById('round-number')!).textContent = String(this.round);

    setTimeout(() => {
      (document.getElementById('you-move')!).textContent = '—';
      (document.getElementById('op-move')!).textContent = '—';
    }, 1200);
  }

  _decide(a: Move, b: Move): 'win' | 'lose' | 'draw' {
    if (!a || !b) return 'draw';
    if (a === b) return 'draw';
    if (a === 'rock') return b === 'scissors' ? 'win' : 'lose';
    if (a === 'paper') return b === 'rock' ? 'win' : 'lose';
    if (a === 'scissors') return b === 'paper' ? 'win' : 'lose';
    return 'draw';
  }

  _randomMove(): Move {
    const arr: Move[] = ['rock', 'paper', 'scissors'];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Submit match result to backend (similar to pong games)
  async _submitMatchResult(historyItem: RoundsHistoryItem): Promise<void> {
    if (!this.currentUser) return;

    try {
      const opponentName = historyItem.opponent || 'Unknown';
      const winnerName = historyItem.result === 'win' ? this.userName : 
                        historyItem.result === 'lose' ? opponentName : 'Draw';
      
      // For Rock Paper Scissors, we'll use a simple scoring system
      const scoreP1 = historyItem.result === 'win' ? 1 : 0;
      const scoreP2 = historyItem.result === 'lose' ? 1 : 0;

      console.log('=== ROCK PAPER SCISSORS MATCH RESULT ===');
      console.log('Player 2 Name:', opponentName);
      console.log('Winner Name:', winnerName);
      console.log('Score P1 (you):', scoreP1);
      console.log('Score P2 (opponent):', scoreP2);
      console.log('Your Move:', historyItem.yourMove);
      console.log('Opponent Move:', historyItem.opponentMove);
      console.log('Result:', historyItem.result);

      const response = await fetch('/api/rps/matches', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          opponent_name: opponentName,
          your_move: historyItem.yourMove,
          opponent_move: historyItem.opponentMove,
          result: historyItem.result,
          mode: historyItem.mode
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Rock Paper Scissors match recorded successfully:', result);
      } else {
        const errorData = await response.json();
        console.error('❌ Failed to record Rock Paper Scissors match:', errorData);
      }
    } catch (error) {
      console.error('❌ Error submitting Rock Paper Scissors match result:', error);
    }
  }

  _moveEmoji(m: Move) {
    if (!m) return '—';
    if (m === 'rock') return '✊';
    if (m === 'paper') return '✋';
    return '✌️';
  }

  _historyKey() {
    return `rps_history_${this.userId}`;
  }

  _pushHistory(item: RoundsHistoryItem) {
    const key = this._historyKey();
    const cur = JSON.parse(localStorage.getItem(key) || '[]');
    cur.unshift(item);
    const next = cur.slice(0, 200);
    localStorage.setItem(key, JSON.stringify(next));
  }

  _renderHistory() {
    const key = this._historyKey();
    const cur: RoundsHistoryItem[] = JSON.parse(localStorage.getItem(key) || '[]');
    const el = document.getElementById('history-list')!;
    el.innerHTML = cur.map(h => {
      const timestamp = h.timestamp ? new Date(h.timestamp).toLocaleString() : 'Unknown';
      return `<div class="p-2 rounded hover:bg-slate-100">[${timestamp}] <strong>${h.mode || 'Unknown'}</strong> • You ${this._moveEmoji(h.yourMove)} vs ${this._moveEmoji(h.opponentMove)} • <em>${h.result}</em></div>`;
    }).join('');
  }

  // Fetch match history from backend
  async _fetchBackendHistory() {
    if (!this.currentUser) return;

    try {
      const response = await fetch('/api/rps/history', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ RPS match history from backend:', data);
        
        // Display backend stats
        const statsEl = document.getElementById('match-controls');
        if (statsEl && data.stats) {
          statsEl.innerHTML = `
            <div class="text-center p-3 bg-white/10 rounded-lg">
              <div class="text-sm font-bold text-blue-300 mb-2">Your RPS Stats</div>
              <div class="text-xs text-slate-300">
                Matches: ${data.stats.total_matches} | 
                Wins: ${data.stats.wins} | 
                Losses: ${data.stats.losses} | 
                Draws: ${data.stats.draws} | 
                Win Rate: ${data.stats.win_rate}%
              </div>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('❌ Error fetching RPS history:', error);
    }
  }

  _exportHistory() {
    const key = this._historyKey();
    const cur = localStorage.getItem(key) || '[]';
    const blob = new Blob([cur], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `rps_history_${this.userId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  _logResult(k: string, v: any) { console.log(k, v); }

  _resetRound() {
    this.round = 0;
    this.scoreYou = 0;
    this.scoreOp = 0;
    (document.getElementById('round-number')!).textContent = String(this.round);
    (document.getElementById('score-you')!).textContent = String(this.scoreYou);
    (document.getElementById('score-op')!).textContent = String(this.scoreOp);
    (document.getElementById('result')!).textContent = 'Waiting';
  }
}

// bootstrap
document.addEventListener('DOMContentLoaded', () => {
  (window as any).rpsApp = new RPSGame();
});
