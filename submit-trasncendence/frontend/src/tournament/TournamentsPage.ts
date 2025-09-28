// TournamentsPage.ts - Vanilla TypeScript implementation
import { requireAuth } from '../router/authRouter';
import { getMyTournaments } from '../services/tournamentService';
import { CreateTournamentForm } from './CreateTournamentForm';
import { initializeTournamentList } from './TournamentList';
import { Friend } from './types';

interface TournamentsPageState {
  showCreateForm: boolean;
  friends: Friend[];
  loadingFriends: boolean;
  currentUser: { username: string } | null;
}

export class TournamentsPage {
  private state: TournamentsPageState;
  private container: HTMLElement;
  private createFormInstance: CreateTournamentForm | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.state = {
      showCreateForm: false,
      friends: [],
      loadingFriends: false,
      currentUser: null
    };
    
    this.initialize();
  }

  private async initialize() {
    try {
      const isAuthenticated = await requireAuth();
      if (!isAuthenticated) {
        window.location.href = '/auth/login.html';
        return;
      }

      // Get current user info from localStorage or API
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.state.currentUser = JSON.parse(userStr);
      }

      await this.loadFriends();
      this.render();
      this.setupEventListeners();
      
      // Initialize tournament list
      initializeTournamentList();
    } catch (error) {
      console.error('Failed to initialize tournaments page:', error);
      this.showError('Failed to load tournaments page');
    }
  }

  private async loadFriends() {
    try {
      this.state.loadingFriends = true;
      // For now, use empty friends array - can be extended later
      this.state.friends = [];
    } catch (error) {
      console.error('Failed to load friends:', error);
      this.state.friends = [];
    } finally {
      this.state.loadingFriends = false;
    }
  }

  private render() {
    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Tournaments</h1>
          <button
            id="createTournamentBtn"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Tournament
          </button>
        </div>

        <div class="space-y-8">
          <div id="createTournamentContainer" class="${this.state.showCreateForm ? '' : 'hidden'}">
            <!-- Create tournament form will be rendered here -->
          </div>
          
          <div class="bg-slate-800/50 shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 border-b border-slate-700 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-white">My Tournaments</h3>
              <p class="mt-1 text-sm text-slate-400">
                View and manage your tournaments
              </p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div id="tournamentsList">
                <!-- Tournament list will be rendered here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners() {
    const createBtn = this.container.querySelector('#createTournamentBtn') as HTMLButtonElement;
    if (createBtn) {
      createBtn.addEventListener('click', () => this.showCreateForm());
    }
  }

  private showCreateForm() {
    this.state.showCreateForm = true;
    const container = this.container.querySelector('#createTournamentContainer') as HTMLElement;
    
    if (container && this.state.currentUser) {
      container.classList.remove('hidden');
      
      this.createFormInstance = new CreateTournamentForm(
        container,
        () => this.handleTournamentCreated(),
        this.state.friends,
        this.state.currentUser
      );
    }
  }

  private hideCreateForm() {
    this.state.showCreateForm = false;
    const container = this.container.querySelector('#createTournamentContainer') as HTMLElement;
    
    if (container) {
      container.classList.add('hidden');
      container.innerHTML = '';
    }
    
    this.createFormInstance = null;
  }

  private handleTournamentCreated() {
    this.hideCreateForm();
    // Refresh tournament list
    initializeTournamentList();
  }

  private showError(message: string) {
    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    `;
  }
}

// Initialize tournaments page when DOM is loaded
export function initializeTournamentsPage() {
  const container = document.getElementById('tournamentsPageContainer');
  if (container) {
    new TournamentsPage(container);
  }
}
