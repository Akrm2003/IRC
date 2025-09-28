// Tournaments page entry point
import { requireAuth, logout } from '../../router/authRouter';
import { getMyTournaments, createTournament } from '../../services/tournamentService';

// Global styles
import '../../styles/tournaments.css';

console.log('Tournaments page loaded');

// Initialize the tournaments page
async function initTournaments() {
  try {
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
      window.location.href = '/auth/login.html';
      return;
    }
    
    setupEventListeners();
    await loadTournaments();
    
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';
  } catch (error) {
    console.error('Error initializing tournaments:', error);
    showNotification('Failed to load tournaments', 'error');
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';
  }
}

// Set up event listeners for the tournaments page
function setupEventListeners() {
  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await logout();
        window.location.href = '/auth/login.html';
      } catch (error) {
        console.error('Logout failed:', error);
      }
    });
  }

  // Create tournament button
  const createTournamentBtn = document.getElementById('createTournamentBtn');
  const createFirstTournamentBtn = document.getElementById('createFirstTournamentBtn');
  const closeCreateFormBtn = document.getElementById('closeCreateForm');
  
  const showCreateForm = () => {
    const createForm = document.getElementById('createTournamentForm');
    const tournamentsList = document.getElementById('tournamentsList');
    if (createForm) createForm.classList.remove('hidden');
    if (tournamentsList) tournamentsList.classList.add('hidden');
  };
  
  if (createTournamentBtn) createTournamentBtn.addEventListener('click', showCreateForm);
  if (createFirstTournamentBtn) createFirstTournamentBtn.addEventListener('click', showCreateForm);
  
  // Close form button
  if (closeCreateFormBtn) {
    closeCreateFormBtn.addEventListener('click', () => {
      const createForm = document.getElementById('createTournamentForm');
      const tournamentsList = document.getElementById('tournamentsList');
      if (createForm) createForm.classList.add('hidden');
      if (tournamentsList) tournamentsList.classList.remove('hidden');
    });
  }
  
  // Form submission
  const form = document.getElementById('newTournamentForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      
      try {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.innerHTML = 'Creating...';
        
        const tournamentName = formData.get('tournamentName') as string;
        console.log('Form data:', { tournamentName });
        
        if (!tournamentName || tournamentName.trim().length === 0) {
          showNotification('Please enter a tournament name', 'error');
          return;
        }
        
        // For the simple form, we need at least one other player
        showNotification('Please use the "Create Tournament" button to add other players', 'error');
        return;
      } catch (error) {
        console.error('Error creating tournament:', error);
        showNotification('Failed to create tournament', 'error');
      } finally {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.innerHTML = 'Create Tournament';
      }
    });
  }
}

// Load tournaments from the API
async function loadTournaments() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  try {
    console.log('Fetching tournaments from API...');
    const tournaments = await getMyTournaments();
    console.log('Tournaments data received:', tournaments);
    
    if (!Array.isArray(tournaments)) {
      throw new Error('Invalid tournaments data received from server');
    }
    
    displayTournaments(tournaments);
  } catch (error) {
    console.error('Error loading tournaments:', error);
    showNotification(
      error instanceof Error ? error.message : 'Failed to load tournaments', 
      'error'
    );
    
    // Show empty state with retry button
    const container = document.getElementById('tournamentsList');
    if (container) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-red-500 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-white">Failed to load tournaments</h3>
          <p class="mt-2 text-sm text-slate-400">${error instanceof Error ? error.message : 'An unknown error occurred'}</p>
          <div class="mt-6">
            <button id="retryLoadBtn" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Retry
            </button>
          </div>
        </div>
      `;
      
      // Add event listener for retry button
      const retryBtn = document.getElementById('retryLoadBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', loadTournaments);
      }
    }
  } finally {
    // Always hide loading overlay when done
    if (loadingOverlay) loadingOverlay.style.display = 'none';
  }
}

// Display tournaments in the UI
function displayTournaments(tournaments: any[]) {
  const container = document.getElementById('tournamentsList');
  if (!container) return;
  
  if (!tournaments || tournaments.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-500">
        <svg class="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-white">No tournaments yet</h3>
        <p class="mt-1 text-slate-400">Create your first tournament to get started!</p>
        <div class="mt-6">
          <button id="createFirstTournamentBtn" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Tournament
          </button>
        </div>
      </div>
    `;
    
    // Re-attach event listener to the new button
    const createFirstBtn = document.getElementById('createFirstTournamentBtn');
    if (createFirstBtn) {
      createFirstBtn.addEventListener('click', () => {
        const createForm = document.getElementById('createTournamentForm');
        const tournamentsList = document.getElementById('tournamentsList');
        if (createForm) createForm.classList.remove('hidden');
        if (tournamentsList) tournamentsList.classList.add('hidden');
      });
    }
    
    return;
  }
  
  // Sort tournaments by creation date (newest first)
  tournaments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  container.innerHTML = `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${tournaments.map(tournament => {
        const playerCount = tournament.players?.length || 0;
        const matchCount = tournament.matches?.length || 0;
        const maxPlayers = 8; // Default max players
        
        return `
        <div class="tournament-card p-4 hover:shadow-lg transition-shadow duration-300 bg-slate-800/50 rounded-lg">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-white">${tournament.name || 'Unnamed Tournament'}</h3>
              <p class="text-sm text-slate-400 mt-1">
                ${tournament.createdAt ? new Date(tournament.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'No date'}
              </p>
            </div>
            <span class="px-2 py-1 text-xs font-medium rounded-full ${
              tournament.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
              tournament.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-blue-500/20 text-blue-400'
            }">
              ${tournament.status ? tournament.status.toLowerCase().replace('_', ' ') : 'unknown'}
            </span>
          </div>
          
          <div class="mt-4 pt-4 border-t border-slate-700">
            <div class="flex justify-between text-sm text-slate-400 mb-1">
              <span>Players</span>
              <span>${playerCount} / ${maxPlayers}</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full ${playerCount >= maxPlayers ? 'bg-green-500' : 'bg-indigo-500'}" 
                style="width: ${Math.min(100, (playerCount / maxPlayers) * 100)}%">
              </div>
            </div>
            <div class="mt-2 text-xs text-slate-500">
              ${matchCount} match${matchCount !== 1 ? 'es' : ''}
            </div>
          </div>
          
          <div class="mt-4 pt-2 border-t border-slate-700">
            <a 
              href="/tournament/${tournament.id}" 
              class="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium"
            >
              View Details
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      `;
      }).join('')}
    </div>
  `;
}

// Show a notification to the user
function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    'bg-blue-500'
  } text-white`;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize the page when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTournaments);
} else {
  initTournaments();
}

// Export for module system
export {};
