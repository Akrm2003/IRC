import { requireAuth, logout } from '../router/authRouter';
import { getMyTournaments, createTournament } from '../services/tournamentService';
import { initializeTournamentList } from './TournamentList';
import { initializeTournamentDetail } from './TournamentDetail';
import { CreateTournamentForm } from './CreateTournamentForm';
import { initializePongTournamentIntegration } from './pongTournamentIntegration';

// Global state
let currentUser: { username: string } | null = null;
let createFormInstance: CreateTournamentForm | null = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Tournament page loaded');
  
  try {
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
      window.location.href = '/auth/login.html';
      return;
    }

    // Get current user info from the API
    try {
      const response = await fetch('/api/auth/verify-session', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log('User data from API:', userData);
        currentUser = {
          username: userData.username
        };
        console.log('currentUser set to:', currentUser);
      }
    } catch (error) {
      console.error('Failed to get user data:', error);
    }

    // Determine which view to initialize based on URL
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const tournamentId = urlParams.get('id');
    const fromMatch = urlParams.get('from') === 'match'; // Check if returning from match
    
    if (tournamentId) {
      // Tournament detail view
      console.log('Loading tournament detail for ID:', tournamentId);
      if (fromMatch) {
        console.log('Returning from match, will refresh tournament data');
      }
      initializeTournamentDetail();
    } else {
      // Tournament list view
      console.log('Loading tournament list view');
      initializeTournamentList();
      setupTournamentListEventListeners();
    }
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Initialize Pong tournament integration
    initializePongTournamentIntegration();
    
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to load tournaments', 'error');
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';
  }
});

function setupGlobalEventListeners() {
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
}

// Create tournament form function
function showCreateForm() {
  console.log('showCreateForm called!');
  console.log('currentUser:', currentUser);
  
  const createForm = document.getElementById('createTournamentForm');
  console.log('createForm element:', createForm);
  
  if (createForm && currentUser) {
    console.log('Showing create form...');
    createForm.classList.remove('hidden');
    
    // Initialize the create form with proper vanilla TS implementation
    if (!createFormInstance) {
      console.log('Creating new CreateTournamentForm instance...');
      createFormInstance = new CreateTournamentForm(
        createForm,
        handleTournamentCreated,
        [], // friends array - can be extended later
        currentUser
      );
      console.log('CreateTournamentForm instance created!');
    } else {
      console.log('Using existing CreateTournamentForm instance');
    }
  } else {
    console.log('Cannot show form - createForm:', !!createForm, 'currentUser:', !!currentUser);
  }
}

function setupTournamentListEventListeners() {

  // Add event listeners to create tournament buttons
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    console.log('Click detected on:', target.id, target.className);
    
    if (target.id === 'createTournamentBtn' || target.id === 'createFirstTournamentBtn') {
      console.log('Create tournament button clicked!');
      showCreateForm();
    }
    
    if (target.id === 'closeCreateForm') {
      console.log('Close form button clicked!');
      hideCreateForm();
    }
  });
  
  // Also add direct event listeners as backup
  const createBtn = document.getElementById('createTournamentBtn');
  const createFirstBtn = document.getElementById('createFirstTournamentBtn');
  
  if (createBtn) {
    console.log('Found createTournamentBtn, adding direct listener');
    createBtn.addEventListener('click', (e) => {
      console.log('Direct listener: Create tournament clicked!');
      e.preventDefault();
      showCreateForm();
    });
  } else {
    console.log('createTournamentBtn not found!');
  }
  
  if (createFirstBtn) {
    console.log('Found createFirstTournamentBtn, adding direct listener');
    createFirstBtn.addEventListener('click', (e) => {
      console.log('Direct listener: Create first tournament clicked!');
      e.preventDefault();
      showCreateForm();
    });
  } else {
    console.log('createFirstTournamentBtn not found!');
  }
  
  // Simple form submission for the basic form
  const form = document.getElementById('newTournamentForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form as HTMLFormElement);
    
    try {
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating...';
      }
      
      await createTournament({
        name: formData.get('tournamentName') as string || 'New Tournament',
        players: []
      });
      
      showNotification('Tournament created successfully!', 'success');
      initializeTournamentList(); // Refresh the list
      (form as HTMLFormElement).reset();
      hideCreateForm();
    } catch (error) {
      console.error('Error creating tournament:', error);
      showNotification('Failed to create tournament', 'error');
    } finally {
      const submitBtn = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Create Tournament';
      }
    }
  });
  
  // Simplified UI - no filters or search needed for local tournaments
  
  // Listen for tournament detail navigation
  document.addEventListener('showTournamentDetail', (e: any) => {
    const { tournamentId } = e.detail;
    console.log('Navigating to tournament detail:', tournamentId);
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?id=${tournamentId}`;
    window.history.pushState({ tournamentId }, '', newUrl);
    
    // Initialize tournament detail view
    initializeTournamentDetail();
  });

  // Listen for create tournament form event
  document.addEventListener('showCreateTournamentForm', () => {
    console.log('Show create tournament form event received!');
    showCreateForm();
  });
}

function handleTournamentCreated() {
  hideCreateForm();
  initializeTournamentList();
  showNotification('Tournament created successfully!', 'success');
}

function hideCreateForm() {
  const createForm = document.getElementById('createTournamentForm');
  if (createForm) {
    createForm.classList.add('hidden');
    createForm.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-white">Create New Tournament</h2>
        <button id="closeCreateForm" class="text-slate-400 hover:text-white">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form id="newTournamentForm" class="space-y-4">
        <div>
          <label for="tournamentName" class="block text-sm font-medium text-slate-300 mb-1">Tournament Name</label>
          <input 
            type="text" 
            id="tournamentName" 
            name="tournamentName" 
            required
            class="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Weekend Showdown"
          >
        </div>
        
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Tournament
          </button>
        </div>
      </form>
    `;
  }
  createFormInstance = null;
}

function filterTournaments(filter: string, searchTerm: string = '') {
  const tournamentCards = document.querySelectorAll('.tournament-card');
  
  tournamentCards.forEach(card => {
    const status = card.querySelector('.status-badge')?.textContent?.toLowerCase().trim();
    const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
    const show = 
      (filter === 'all' || 
       (filter === 'upcoming' && status === 'upcoming') ||
       (filter === 'in-progress' && status === 'in progress') ||
       (filter === 'completed' && status === 'completed') ||
       (filter === 'my-tournaments') ||
       (filter === 'search' && name.includes(searchTerm)));
    
    (card as HTMLElement).style.display = show ? 'block' : 'none';
  });
}

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
