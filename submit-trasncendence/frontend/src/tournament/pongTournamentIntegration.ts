// Integration between Tournament System and Pong Game
// This file handles the connection between tournaments and Pong matches

import { launchPongGame, handlePongGameComplete, PongGameConfig, PongGameResult } from '../services/pongIntegration';
import { submitPongMatchResult } from '../services/tournamentService';

/**
 * Initialize Pong tournament integration
 * Call this when the tournament page loads
 */
export function initializePongTournamentIntegration() {
  console.log('Initializing Pong tournament integration...');
  
  // Listen for Pong match completion events
  document.addEventListener('pongMatchComplete', handlePongMatchCompleteEvent as EventListener);
  
  // Listen for play match button clicks
  document.addEventListener('click', handlePlayMatchClick);
}

/**
 * Handle play match button clicks
 */
async function handlePlayMatchClick(event: Event) {
  const target = event.target as HTMLElement;
  
  if (target.classList.contains('play-match-btn')) {
    event.preventDefault();
    
    const matchId = target.getAttribute('data-match-id');
    const player1 = target.getAttribute('data-player1');
    const player2 = target.getAttribute('data-player2');
    const tournamentId = target.getAttribute('data-tournament-id');
    
    if (matchId && player1 && player2 && tournamentId) {
      await startTournamentMatch(matchId, player1, player2, tournamentId);
    }
  }
}

/**
 * Start a tournament match with Pong game
 */
async function startTournamentMatch(
  matchId: string, 
  player1: string, 
  player2: string, 
  tournamentId: string
) {
  console.log('Starting tournament match:', { matchId, player1, player2, tournamentId });
  
  try {
    // Show loading state on the button
    const button = document.querySelector(`[data-match-id="${matchId}"]`) as HTMLElement;
    if (button) {
      const originalContent = button.innerHTML;
      button.innerHTML = `
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Starting Match...
      `;
      button.setAttribute('disabled', 'true');
      
      // Restore button after a delay if needed
      setTimeout(() => {
        if (button.hasAttribute('disabled')) {
          button.innerHTML = originalContent;
          button.removeAttribute('disabled');
        }
      }, 10000);
    }
    
    // Configure Pong game
    const gameConfig: PongGameConfig = {
      matchId,
      tournamentId,
      player1,
      player2,
      mode: 'tournament'
    };
    
    // Launch Pong game
    const result = await launchPongGame(gameConfig);
    
    // Handle the result
    await processPongMatchResult(result);
    
  } catch (error) {
    console.error('Failed to start tournament match:', error);
    showErrorMessage('Failed to start match. Please try again.');
  }
}

/**
 * Process Pong match result and update tournament
 */
async function processPongMatchResult(result: PongGameResult) {
  console.log('Processing Pong match result:', result);
  
  try {
    // Submit result to tournament system
    await submitPongMatchResult(
      result.tournamentId,
      result.matchId,
      result.winner,
      result.scoreWinner,
      result.scoreLoser
    );
    
    // Show success message
    showSuccessMessage(`🏆 ${result.winner} wins! Advancing to next round...`);
    
    // Reload tournament bracket to show updates
    const event = new CustomEvent('reloadTournament', {
      detail: { tournamentId: result.tournamentId }
    });
    document.dispatchEvent(event);
    
  } catch (error) {
    console.error('Failed to process match result:', error);
    showErrorMessage('Failed to update tournament. Please try again.');
  }
}

/**
 * Handle Pong match complete events
 */
function handlePongMatchCompleteEvent(event: CustomEvent<PongGameResult>) {
  console.log('Received Pong match complete event:', event.detail);
  processPongMatchResult(event.detail);
}

/**
 * Show success message
 */
function showSuccessMessage(message: string) {
  const successDiv = document.createElement('div');
  successDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  successDiv.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-2xl">🎉</span>
      <div>
        <div class="font-bold">Match Complete!</div>
        <div class="text-sm opacity-90">${message}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 300);
  }, 4000);
}

/**
 * Show error message
 */
function showErrorMessage(message: string) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  errorDiv.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-2xl">❌</span>
      <div>
        <div class="font-bold">Error</div>
        <div class="text-sm opacity-90">${message}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 300);
  }, 5000);
}

/**
 * Utility function for Pong game developers
 * Call this function from the Pong game when a tournament match finishes
 */
export function reportPongMatchResult(result: PongGameResult) {
  console.log('Pong game reporting match result:', result);
  handlePongGameComplete(result);
}

/**
 * Get tournament match context for Pong game
 * This can be called by the Pong game to get match details from URL parameters
 */
export function getTournamentMatchContext(): PongGameConfig | null {
  const urlParams = new URLSearchParams(window.location.search);
  
  const mode = urlParams.get('mode');
  const matchId = urlParams.get('matchId');
  const tournamentId = urlParams.get('tournamentId');
  const player1 = urlParams.get('player1');
  const player2 = urlParams.get('player2');
  
  if (mode === 'tournament' && matchId && tournamentId && player1 && player2) {
    return {
      mode: 'tournament',
      matchId,
      tournamentId,
      player1: decodeURIComponent(player1),
      player2: decodeURIComponent(player2)
    };
  }
  
  return null;
}
