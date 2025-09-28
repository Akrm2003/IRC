// Pong Game Integration Service for Tournament System
// This service handles the integration between tournaments and the Pong game

export interface PongGameConfig {
  matchId: string;
  tournamentId: string;
  player1: string;
  player2: string;
  mode: 'tournament';
}

export interface PongGameResult {
  winner: string;
  loser: string;
  scoreWinner: number;
  scoreLoser: number;
  matchId: string;
  tournamentId: string;
}

/**
 * Launch Pong game with tournament context
 * This function will be called when players click "PLAY MATCH"
 */
export function launchPongGame(config: PongGameConfig): Promise<PongGameResult> {
  return new Promise((resolve, reject) => {
    console.log('Launching Pong game with config:', config);
    
    // TODO: Replace this with actual Pong game integration
    // When the Pong game is ready, this should:
    // 1. Navigate to the Pong game page with tournament parameters
    // 2. The Pong game will handle the match and return results
    // 3. Results will be automatically submitted to the tournament system
    
    // Launch tournament-specific Pong game:
    const gameUrl = `/game/tournament_pong.html?mode=tournament&matchId=${config.matchId}&player1=${encodeURIComponent(config.player1)}&player2=${encodeURIComponent(config.player2)}&tournamentId=${config.tournamentId}`;
    
    // Launch the actual Pong game
    window.location.href = gameUrl;
    
    // For testing, also show simulation modal as backup
    // showPongSimulationModal(config, resolve, reject);
  });
}

/**
 * Handle Pong game completion callback
 * This function should be called by the Pong game when a match finishes
 */
export function handlePongGameComplete(result: PongGameResult): void {
  console.log('Pong game completed with result:', result);
  
  // Dispatch custom event to notify tournament system
  const event = new CustomEvent('pongMatchComplete', {
    detail: result
  });
  document.dispatchEvent(event);
}

/**
 * Temporary simulation modal (remove when Pong game is integrated)
 */
function showPongSimulationModal(
  config: PongGameConfig, 
  resolve: (result: PongGameResult) => void, 
  reject: (error: Error) => void
) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
    
    <!-- Modal content -->
    <div class="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-yellow-400/30 max-w-md w-full p-8">
      <div class="text-center">
        <div class="text-6xl mb-4">🏓</div>
        <h2 class="text-2xl font-bold text-yellow-400 mb-4">PONG MATCH</h2>
        
        <div class="bg-black/50 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between text-lg font-bold text-white">
            <span>${config.player1}</span>
            <span class="text-yellow-400">VS</span>
            <span>${config.player2}</span>
          </div>
        </div>
        
        <p class="text-slate-300 mb-6">
          Ready to play? The Pong game will launch and track the match results automatically.
        </p>
        
        <!-- Temporary simulation buttons (remove when Pong is integrated) -->
        <div class="space-y-3 mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <p class="text-sm text-orange-400 font-medium">⚠️ SIMULATION MODE</p>
          <p class="text-xs text-slate-400">Pong game not yet integrated. Use buttons below to simulate match results.</p>
          <div class="flex gap-2">
            <button class="simulate-btn flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300" data-winner="${config.player1}">
              ${config.player1} Wins
            </button>
            <button class="simulate-btn flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300" data-winner="${config.player2}">
              ${config.player2} Wins
            </button>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button id="cancelMatch" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300">
            Cancel
          </button>
          <button id="startPongGame" class="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black py-3 px-4 rounded-lg font-bold transition-all duration-300">
            🚀 Launch Pong
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners for simulation buttons
  const simulateButtons = modal.querySelectorAll('.simulate-btn');
  simulateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const winner = btn.getAttribute('data-winner') || '';
      const loser = winner === config.player1 ? config.player2 : config.player1;
      const scoreWinner = 11;
      const scoreLoser = Math.floor(Math.random() * 10);
      
      const result: PongGameResult = {
        winner,
        loser,
        scoreWinner,
        scoreLoser,
        matchId: config.matchId,
        tournamentId: config.tournamentId
      };
      
      document.body.removeChild(modal);
      resolve(result);
    });
  });

  // Cancel button
  modal.querySelector('#cancelMatch')?.addEventListener('click', () => {
    document.body.removeChild(modal);
    reject(new Error('Match cancelled by user'));
  });

  // Start Pong game button (for future integration)
  modal.querySelector('#startPongGame')?.addEventListener('click', () => {
    // TODO: Replace with actual Pong game launch
    alert('🚀 Pong game integration coming soon!\n\nFor now, use the simulation buttons above to test the tournament flow.\n\nWhen the Pong game is ready, this button will launch the actual game.');
  });
}

/**
 * Utility function to convert PongGameResult to tournament match result format
 */
export function convertPongResultToMatchResult(result: PongGameResult): {
  score1: number;
  score2: number;
  winner: string;
} {
  // Determine which player is player1 and player2 based on the original match setup
  // This assumes the result contains the winner and loser names
  const isPlayer1Winner = result.winner; // We'll use winner name directly
  
  return {
    score1: result.winner === result.winner ? result.scoreWinner : result.scoreLoser,
    score2: result.winner === result.winner ? result.scoreLoser : result.scoreWinner,
    winner: result.winner
  };
}
