import { getMyTournaments, deleteTournament } from '../services/tournamentService';
import { Tournament } from './types';

export function initializeTournamentList() {
  console.log('Initializing tournament list...');
  loadTournaments();
}

export async function loadTournaments(forceRefresh: boolean = false) {
  const container = document.getElementById('tournamentsList');
  if (!container) {
    console.error('Tournament list container not found');
    return;
  }

  try {
    // Show loading state
    container.innerHTML = `
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div class="ml-4 text-slate-400">
          ${forceRefresh ? 'Refreshing tournaments...' : 'Loading tournaments...'}
        </div>
      </div>
    `;

    console.log('Loading tournaments, forceRefresh:', forceRefresh);
    const tournaments = await getMyTournaments();
    console.log('Tournaments loaded successfully:', tournaments.length);
    displayTournaments(tournaments);
  } catch (error) {
    console.error('Failed to load tournaments:', error);
    showError('Failed to load tournaments. Please try refreshing the page.');
  }
}

function displayTournaments(tournaments: Tournament[]) {
  const container = document.getElementById('tournamentsList');
  if (!container) return;

  if (tournaments.length === 0) {
    container.innerHTML = `
      <div class="tournament-card p-12 text-center">
        <div class="mb-6">
          <div class="text-6xl mb-4"></div>
          <h3 class="text-xl font-bold text-white mb-2">No Tournaments Yet</h3>
          <p class="text-slate-400">Create your first tournament to get started!</p>
        </div>
        <button id="createFirstTournamentBtn" class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Create Your First Tournament
        </button>
      </div>
    `;
    
    // Add event listener for the create button
    setTimeout(() => {
      const createBtn = document.getElementById('createFirstTournamentBtn');
      if (createBtn) {
        createBtn.addEventListener('click', () => {
          const createTournamentBtn = document.getElementById('createTournamentBtn');
          if (createTournamentBtn) {
            createTournamentBtn.click();
          }
        });
      }
    }, 100);
    
    return;
  }

  container.innerHTML = tournaments.map(tournament => `
    <div class="tournament-card p-6 cursor-pointer" data-tournament-id="${tournament.id}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-white">${tournament.name}</h3>
            <span class="status-badge px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(tournament.status)}">
              ${getStatusText(tournament.status)}
            </span>
          </div>
          
          ${tournament.status === 'COMPLETED' && tournament.winnerName ? `
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-medium text-purple-300">Champion: ${tournament.winnerName}</span>
            </div>
          ` : ''}
          
          <div class="flex items-center gap-4 text-sm text-slate-400">
            <div class="flex items-center gap-1">
              <span>👥</span>
              <span>${tournament.players?.length || 0} players</span>
            </div>
            <div class="flex items-center gap-1">
              <span>📅</span>
              <span>${new Date(tournament.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-2 ml-4">
          <button 
            class="delete-btn p-2 rounded-lg text-white hover:bg-red-600 transition-all duration-300"
            data-tournament-id="${tournament.id}"
            title="Delete Tournament"
            onclick="event.stopPropagation()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="border-t border-slate-600/50 pt-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-300">
            ${tournament.status === 'UPCOMING' ? 'Ready to start' : 
              tournament.status === 'IN_PROGRESS' ? 'In progress' : 
              'Tournament completed'}
          </div>
          <div class="flex items-center gap-2 text-blue-400 font-medium">
            <span>View Bracket</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Add event listeners
  setTimeout(() => {
    // Tournament click handlers
    const tournamentCards = container.querySelectorAll('[data-tournament-id]');
    tournamentCards.forEach(card => {
      if (!card.classList.contains('delete-btn')) {
        card.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('.delete-btn')) {
            const tournamentId = card.getAttribute('data-tournament-id');
            if (tournamentId) {
              showTournamentDetail(tournamentId);
            }
          }
        });
      }
    });

    // Delete button handlers
    const deleteButtons = container.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation();
        const tournamentId = button.getAttribute('data-tournament-id');
        if (tournamentId) {
          await handleDeleteTournament(tournamentId);
        }
      });
    });

    // Create tournament button handlers
    const createBtn = document.getElementById('createTournamentBtn');
    const createFirstBtn = document.getElementById('createFirstTournamentBtn');
    
    if (createBtn && !createBtn.hasAttribute('data-listener-added')) {
      createBtn.setAttribute('data-listener-added', 'true');
      createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Create tournament button clicked!');
        const event = new CustomEvent('showCreateTournamentForm');
        document.dispatchEvent(event);
      });
    }
    
    if (createFirstBtn && !createFirstBtn.hasAttribute('data-listener-added')) {
      createFirstBtn.setAttribute('data-listener-added', 'true');
      createFirstBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Create first tournament button clicked!');
        const event = new CustomEvent('showCreateTournamentForm');
        document.dispatchEvent(event);
      });
    }
  }, 100);
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

function showTournamentDetail(tournamentId: string) {
  // Hide tournament list
  const tournamentsList = document.getElementById('tournamentsList');
  const tournamentDetail = document.getElementById('tournamentDetail');
  
  if (tournamentsList && tournamentDetail) {
    tournamentsList.classList.add('hidden');
    tournamentDetail.classList.remove('hidden');
    
    // Load tournament detail (this will be handled by TournamentDetail.ts)
    const event = new CustomEvent('showTournamentDetail', { 
      detail: { tournamentId } 
    });
    document.dispatchEvent(event);
  }
}

async function handleDeleteTournament(tournamentId: string) {
  // Show custom confirmation modal
  const confirmed = await showDeleteConfirmationModal(tournamentId);
  
  if (!confirmed) {
    return;
  }

  try {
    // Show loading state
    const deleteBtn = document.querySelector(`[data-tournament-id="${tournamentId}"].delete-btn`) as HTMLElement;
    if (deleteBtn) {
      deleteBtn.innerHTML = `
        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
      deleteBtn.setAttribute('disabled', 'true');
    }

    await deleteTournament(tournamentId);
    
    // Show success message
    showSuccessMessage('Tournament deleted successfully!');
    
    // Reload tournaments
    await loadTournaments();
    
  } catch (error) {
    console.error('Failed to delete tournament:', error);
    showErrorMessage('Failed to delete tournament. Please try again.');
    
    // Reset delete button
    const deleteBtn = document.querySelector(`[data-tournament-id="${tournamentId}"].delete-btn`) as HTMLElement;
    if (deleteBtn) {
      deleteBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      `;
      deleteBtn.removeAttribute('disabled');
    }
  }
}

function showDeleteConfirmationModal(tournamentId: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Get tournament name for better UX
    const tournamentCard = document.querySelector(`[data-tournament-id="${tournamentId}"]`);
    const tournamentName = tournamentCard?.querySelector('h3')?.textContent || 'this tournament';

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"></div>
      
      <!-- Modal content -->
      <div class="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 max-w-md w-full transform transition-all duration-300 scale-95 opacity-0">
        <!-- Header -->
        <div class="p-6 border-b border-slate-700/50">
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">Delete Tournament</h3>
              <p class="text-sm text-slate-400">This action cannot be undone</p>
            </div>
          </div>
        </div>
        
        <!-- Body -->
        <div class="p-6">
          <p class="text-slate-300 mb-2">
            Are you sure you want to delete <span class="font-semibold text-white">"${tournamentName}"</span>?
          </p>
          <p class="text-sm text-slate-400">
            All tournament data, matches, and results will be permanently removed.
          </p>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-slate-700/50 flex gap-3 justify-end">
          <button 
            id="cancelDelete" 
            class="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-all duration-300 font-medium"
          >
            Cancel
          </button>
          <button 
            id="confirmDelete" 
            class="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Delete Tournament
            </span>
          </button>
        </div>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
      const content = modal.querySelector('.relative');
      if (content) {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
      }
    }, 10);

    // Handle clicks
    const handleCancel = () => {
      animateOut(() => {
        document.body.removeChild(modal);
        resolve(false);
      });
    };

    const handleConfirm = () => {
      animateOut(() => {
        document.body.removeChild(modal);
        resolve(true);
      });
    };

    const animateOut = (callback: () => void) => {
      const content = modal.querySelector('.relative');
      if (content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(callback, 300);
    };

    // Event listeners
    modal.querySelector('#cancelDelete')?.addEventListener('click', handleCancel);
    modal.querySelector('#confirmDelete')?.addEventListener('click', handleConfirm);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === modal.querySelector('.fixed')) {
        handleCancel();
      }
    });

    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleEscape);
        handleCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
  });
}

function showSuccessMessage(message: string) {
  const container = document.getElementById('tournamentsList');
  if (!container) return;

  const successDiv = document.createElement('div');
  successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  successDiv.textContent = message;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 3000);
}

function showErrorMessage(message: string) {
  const container = document.getElementById('tournamentsList');
  if (!container) return;

  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  errorDiv.textContent = message;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 300);
  }, 3000);
}

function showError(message: string) {
  const container = document.getElementById('tournamentsList');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-red-50 border-l-4 border-red-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">${message}</p>
        </div>
      </div>
    </div>
  `;
}
