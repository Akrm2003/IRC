import { getTournament } from '../services/tournamentService';
import { Tournament, TournamentMatch } from './types';
import { loadTournaments } from './TournamentList';

export function initializeTournamentDetail() {
  console.log('Initializing tournament detail view...');
  
  // Show tournament detail and hide tournament list + management bar
  const tournamentsList = document.getElementById('tournamentsList');
  const tournamentDetail = document.getElementById('tournamentDetail');
  const managementBar = document.querySelector('.tournament-card'); // The management bar
  
  if (tournamentsList && tournamentDetail) {
    console.log('Switching to tournament detail view');
    tournamentsList.classList.add('hidden');
    tournamentDetail.classList.remove('hidden');
    
    // Hide the tournament management bar when viewing brackets
    if (managementBar) {
      managementBar.classList.add('hidden');
    }
  } else {
    console.error('Tournament containers not found:', {
      tournamentsList: !!tournamentsList,
      tournamentDetail: !!tournamentDetail
    });
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const tournamentId = urlParams.get('id');
  const fromMatch = urlParams.get('from') === 'match';
  
  if (!tournamentId) {
    console.error('No tournament ID provided');
    showError('Tournament not found');
    return;
  }

  if (fromMatch) {
    console.log('🔄 Returning from match, refreshing tournament data...');
    // Clean up the URL by removing the 'from' parameter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('from');
    window.history.replaceState({}, '', newUrl.toString());
  }

  loadTournamentDetails(tournamentId, fromMatch);
  setupEventListeners(tournamentId);
}

function setupEventListeners(tournamentId: string) {
  // Back to list button
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.id === 'backToList') {
      console.log('Back to list button clicked');
      // Hide tournament detail and show list + management bar
      const tournamentsList = document.getElementById('tournamentsList');
      const tournamentDetail = document.getElementById('tournamentDetail');
      const managementBar = document.querySelector('.tournament-card'); // The management bar
      
      if (tournamentsList && tournamentDetail) {
        tournamentDetail.classList.add('hidden');
        tournamentsList.classList.remove('hidden');
        
        // Show the tournament management bar again
        if (managementBar) {
          managementBar.classList.remove('hidden');
        }
        
        // Update URL
        window.history.pushState({}, '', window.location.pathname);
        
        // Refresh tournament list
        console.log('Refreshing tournament list after returning from detail');
        loadTournaments(true); // Force refresh
      }
    }
  });
}

async function loadTournamentDetails(tournamentId: string, fromMatch: boolean = false) {
  const container = document.getElementById('tournamentDetail');
  if (!container) {
    console.error('Tournament detail container not found');
    return;
  }

  try {
    container.innerHTML = `
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div class="ml-4 text-slate-400">
          ${fromMatch ? 'Refreshing tournament...' : 'Loading tournament...'}
        </div>
      </div>
    `;

    console.log('Loading tournament details, fromMatch:', fromMatch);
    const tournament = await getTournament(tournamentId);
    console.log('Tournament details loaded:', tournament.name, 'Status:', tournament.status);
    displayTournamentDetails(tournament);
  } catch (error) {
    console.error('Failed to load tournament:', error);
    showError('Failed to load tournament details. Please try refreshing the page.');
  }
}

function displayTournamentDetails(tournament: Tournament) {
  const container = document.getElementById('tournamentDetail');
  if (!container) {
    console.error('Tournament detail container not found for display');
    return;
  }

  console.log('Displaying tournament details for:', tournament.name);
  console.log('Tournament matches:', tournament.matches.length);
  console.log('Tournament status:', tournament.status);

  const matchesByRound: Record<number, TournamentMatch[]> = {};
  tournament.matches.forEach(match => {
    if (!matchesByRound[match.roundNumber]) {
      matchesByRound[match.roundNumber] = [];
    }
    matchesByRound[match.roundNumber].push(match);
  });

  const maxRounds = Math.max(...Object.keys(matchesByRound).map(Number));

  container.innerHTML = `
    <!-- Tournament Header -->
    <div class="tournament-card p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <button
            id="backToList"
            class="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Tournaments
          </button>
          
          <div class="h-8 w-px bg-slate-600"></div>
          
          <div>
            <h1 class="text-2xl font-bold text-white">
              ${tournament.name}
            </h1>
            <p class="text-slate-400 text-sm">
              Created ${new Date(tournament.createdAt).toLocaleDateString()} • ${tournament.players?.length || 0} players
            </p>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="status-badge px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(tournament.status)}">
            ${getStatusText(tournament.status)}
          </span>
        </div>
      </div>

      ${tournament.status === 'COMPLETED' && tournament.winnerName ? `
        <div class="champion-crown p-8 text-center">
          <h2 class="text-2xl font-bold text-purple-300 mb-2">TOURNAMENT CHAMPION</h2>
          <p class="text-3xl font-black text-purple-400 mb-2">${tournament.winnerName}</p>
          <div class="flex justify-center items-center gap-2 text-purple-300">
            <span class="text-sm font-medium">VICTORY ACHIEVED</span>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Tournament Bracket -->
    <div class="bracket-container">
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-bold text-purple-400 tracking-wider">CHAMPIONSHIP BRACKET</h2>
        </div>
        <div class="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>
      
      <div class="overflow-x-auto pb-8">
        <div class="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 min-w-max justify-start lg:justify-center items-start" style="min-width: 600px;">
          ${Object.entries(matchesByRound).map(([round, matches], roundIndex) => `
            <div class="flex flex-col items-center min-w-[240px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[340px] xl:min-w-[360px]">
              <!-- Round Header -->
              <div class="mb-6 sm:mb-8 lg:mb-12 text-center">
                <div class="round-header inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                  <span class="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></span>
                  <span class="font-bold text-purple-300 text-sm sm:text-base lg:text-lg tracking-wider whitespace-nowrap">
                    ${round === '1' ? 'ROUND 1' : 
                      round === String(maxRounds) ? 'FINAL' : 
                      round === String(maxRounds - 1) ? 'SEMI' : 
                      `R${round}`}
                  </span>
                </div>
              </div>
              
              <!-- Matches -->
              <div class="space-y-6 sm:space-y-8 lg:space-y-12 flex-1">
                ${matches.map((match, matchIndex) => `
                  <div class="bracket-match p-3 sm:p-4 lg:p-6 ${match.match.winnerName && match.match.winnerName !== 'TBD' ? 'winner-glow' : ''}">
                    <!-- Match Header -->
                    <div class="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                      <span class="text-xs sm:text-sm font-bold text-purple-400 uppercase tracking-widest">
                        M${match.matchNumber}
                      </span>
                      ${match.match.winnerName && match.match.winnerName !== 'TBD' ? `
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40">
                          COMPLETE
                        </span>
                      ` : match.player1Name !== 'TBD' && match.player2Name !== 'TBD' && match.player2Name !== 'BYE' ? `
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
                          READY
                        </span>
                      ` : `
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-500/20 text-slate-400 border border-slate-500/40">
                          WAITING
                        </span>
                      `}
                    </div>
                    
                    <!-- Players -->
                    <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-6 lg:mb-8">
                      <!-- Player 1 -->
                      <div class="player-slot ${
                        match.match.winnerName === match.player1Name ? 'winner' : ''
                      } flex items-center justify-between p-3 sm:p-4 lg:p-5 rounded-lg">
                        <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                          <span class="w-2 h-2 sm:w-3 sm:h-3 ${match.match.winnerName === match.player1Name ? 'bg-purple-400' : 'bg-slate-400'} rounded-full flex-shrink-0"></span>
                          <span class="font-bold text-sm sm:text-base lg:text-lg ${
                            match.match.winnerName === match.player1Name ? 'text-purple-400' : 'text-white'
                          } truncate">
                            ${match.player1Name === 'TBD' ? 'TBD' : match.player1Name}
                          </span>
                        </div>
                        <span class="text-xl sm:text-2xl lg:text-3xl font-black ${
                          match.match.winnerName === match.player1Name ? 'text-purple-400' : 'text-white'
                        } min-w-[30px] sm:min-w-[35px] lg:min-w-[40px] text-center flex-shrink-0">
                          ${match.match.score_p1 || 0}
                        </span>
                      </div>
                      
                      <!-- VS Divider -->
                      <div class="text-center py-1 sm:py-2">
                        <div class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-600/20 to-purple-400/20 border-2 border-purple-400/30 rounded-full">
                          <span class="text-xs sm:text-sm font-black text-purple-400 tracking-wider">VS</span>
                        </div>
                      </div>
                      
                      <!-- Player 2 -->
                      <div class="player-slot ${
                        match.player2Name && match.match.winnerName === match.player2Name ? 'winner' : ''
                      } flex items-center justify-between p-3 sm:p-4 lg:p-5 rounded-lg">
                        <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                          <span class="w-2 h-2 sm:w-3 sm:h-3 ${match.player2Name && match.match.winnerName === match.player2Name ? 'bg-purple-400' : 'bg-slate-400'} rounded-full flex-shrink-0"></span>
                          <span class="font-bold text-sm sm:text-base lg:text-lg ${
                            match.player2Name && match.match.winnerName === match.player2Name ? 'text-purple-400' : 'text-white'
                          } truncate">
                            ${match.player2Name === 'TBD' ? 'TBD' : 
                              match.player2Name === 'BYE' ? 'BYE' : 
                              match.player2Name || 'TBD'}
                          </span>
                        </div>
                        <span class="text-xl sm:text-2xl lg:text-3xl font-black ${
                          match.player2Name && match.match.winnerName === match.player2Name ? 'text-purple-400' : 'text-white'
                        } min-w-[30px] sm:min-w-[35px] lg:min-w-[40px] text-center flex-shrink-0">
                          ${match.match.score_p2 || 0}
                        </span>
                      </div>
                    </div>

                    <!-- Action Button -->
                    ${match.match.winnerName === 'TBD' && match.player1Name !== 'TBD' && match.player2Name !== 'TBD' && match.player2Name !== 'BYE' ? `
                      <button
                        class="play-match-btn w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-black py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 border-2 border-purple-400/50 text-sm sm:text-base"
                        data-match-id="${match.matchId}"
                        data-player1="${match.player1Name}"
                        data-player2="${match.player2Name}"
                        data-tournament-id="${tournament.id}"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        PLAY MATCH
                      </button>
                    ` : match.match.winnerName && match.match.winnerName !== 'TBD' ? `
                      <div class="text-center py-3">
                        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-400/40 rounded-lg">
                          <span class="text-sm font-bold text-purple-400 tracking-wider">
                            WINNER: ${match.match.winnerName}
                          </span>
                        </div>
                      </div>
                    ` : `
                      <div class="text-center py-3">
                        <span class="text-sm text-slate-400 font-medium">
                          ${match.player1Name === 'TBD' || match.player2Name === 'TBD' ? 
                            'WAITING FOR PREVIOUS MATCHES' : 
                            'READY TO BATTLE'}
                        </span>
                      </div>
                    `}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'IN_PROGRESS':
      return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    default:
      return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'Completed';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'UPCOMING':
      return 'Upcoming';
    default:
      return status.replace('_', ' ');
  }
}

function showError(message: string) {
  const container = document.getElementById('tournamentDetail');
  if (!container) return;

  container.innerHTML = `
    <div class="tournament-card p-8 text-center">
      <div class="text-6xl mb-4">❌</div>
      <h3 class="text-xl font-bold text-white mb-2">Error</h3>
      <p class="text-slate-400 mb-6">${message}</p>
      <button 
        onclick="window.location.href='/tournaments'" 
        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
      >
        ← Back to Tournaments
      </button>
    </div>
  `;
}
