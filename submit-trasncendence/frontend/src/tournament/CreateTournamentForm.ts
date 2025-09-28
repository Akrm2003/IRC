// CreateTournamentForm.ts
import { createTournament } from '../services/tournamentService';
import { CreateTournamentData, Friend } from './types';

export class CreateTournamentForm {
    private form!: HTMLFormElement;
    private nameInput!: HTMLInputElement;
    private sizeSelect!: HTMLSelectElement;
    private playersSection!: HTMLElement;
    private playerInputsContainer!: HTMLElement;
    private submitButton!: HTMLButtonElement;
    private clearButton!: HTMLButtonElement;
    private errorDiv!: HTMLElement;

    private name: string = '';
    private tournamentSize: number = 0;
    private playerNames: string[] = [];
    private isSubmitting: boolean = false;

    constructor(
        private container: HTMLElement,
        private onTournamentCreated: () => void,
        private friends: Friend[],
        private currentUser: { username: string }
    ) {
        this.initializeForm();
        this.bindEvents();
    }

    private initializeForm(): void {
        this.container.innerHTML = `
            <!-- Backdrop overlay -->
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"></div>
            
            <!-- Modal container -->
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-slideUp">
                <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <!-- Glassmorphism card -->
                    <div class="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
                        <!-- Decorative gradient overlay -->
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl"></div>
                        
                        <!-- Close button -->
                        <button id="close-form-btn" class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-200 group">
                            <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        
                        <!-- Header -->
                        <div class="relative px-8 pt-8 pb-6 border-b border-slate-700/30">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        Create Tournament
                                    </h3>
                                    <p class="text-slate-400 text-sm">Set up a new tournament and invite players to compete</p>
                                </div>
                            </div>
                        </div>

                        <!-- Form content -->
                        <div class="relative px-8 py-6">
                            <form id="tournament-form" class="space-y-6">
                                <!-- Error message -->
                                <div id="error" class="hidden">
                                    <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-shake">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <p id="error-message" class="text-red-300 text-sm font-medium"></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tournament name -->
                                <div class="space-y-2">
                                    <label for="tournament-name" class="block text-sm font-semibold text-slate-300 flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                        </svg>
                                        <span>Tournament Name</span>
                                    </label>
                                    <div class="relative group">
                                        <input
                                            type="text"
                                            id="tournament-name"
                                            class="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 group-hover:border-slate-500/70"
                                            placeholder="Enter an epic tournament name..."
                                            autocomplete="off"
                                            spellcheck="false"
                                            required
                                        />
                                        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                                    </div>
                                </div>

                                <!-- Tournament size -->
                                <div class="space-y-2">
                                    <label class="block text-sm font-semibold text-slate-300 flex items-center space-x-2">
                                        <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                        <span>Tournament Size</span>
                                    </label>
                                    <div class="relative group">
                                        <select 
                                            id="tournament-size" 
                                            class="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 appearance-none cursor-pointer group-hover:border-slate-500/70"
                                        >
                                            <option value="" class="bg-slate-800">Select number of players</option>
                                            <option value="4" class="bg-slate-800">🏆 4 Players Tournament</option>
                                            <option value="8" class="bg-slate-800">🎯 8 Players Tournament</option>
                                        </select>
                                        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg class="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                                    </div>
                                </div>

                                <!-- Players section -->
                                <div id="players-section" class="hidden space-y-4 animate-slideDown">
                                    <div class="flex items-center space-x-2 mb-4">
                                        <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                        </svg>
                                        <h4 class="text-lg font-semibold text-white">Tournament Players</h4>
                                    </div>
                                    <div class="space-y-3" id="player-inputs">
                                        <!-- Player input fields will be generated here -->
                                    </div>
                                </div>

                                <!-- Action buttons -->
                                <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700/30">
                                    <button
                                        type="button"
                                        id="clear-btn"
                                        class="flex-1 sm:flex-none px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl text-slate-300 hover:text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2 group"
                                    >
                                        <svg class="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        <span>Clear</span>
                                    </button>
                                    <button
                                        type="submit"
                                        id="submit-btn"
                                        class="flex-1 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                        </svg>
                                        <span>Create Tournament</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                @keyframes slideDown {
                    from { 
                        opacity: 0; 
                        transform: translateY(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                /* Fix autofill white background */
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
                    -webkit-text-fill-color: white !important;
                    background-color: transparent !important;
                    background-image: none !important;
                }

                /* Additional autofill fixes for different browsers */
                input[autocomplete]::-webkit-contacts-auto-fill-button {
                    visibility: hidden;
                    display: none !important;
                    pointer-events: none;
                    height: 0;
                    width: 0;
                    margin: 0;
                }

                /* Ensure consistent input styling */
                #tournament-form input[type="text"] {
                    background-color: transparent !important;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }

                /* Tournament name input specific styling */
                #tournament-name {
                    background: rgba(51, 65, 85, 0.3) !important;
                }

                #tournament-name:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 30px rgba(51, 65, 85, 0.3) inset !important;
                }
            </style>
        `;

        // Initialize references to DOM elements
        this.form = this.container.querySelector('#tournament-form') as HTMLFormElement;
        this.nameInput = this.container.querySelector('#tournament-name') as HTMLInputElement;
        this.sizeSelect = this.container.querySelector('#tournament-size') as HTMLSelectElement;
        this.playersSection = this.container.querySelector('#players-section') as HTMLElement;
        this.playerInputsContainer = this.container.querySelector('#player-inputs') as HTMLElement;
        this.submitButton = this.container.querySelector('#submit-btn') as HTMLButtonElement;
        this.clearButton = this.container.querySelector('#clear-btn') as HTMLButtonElement;
        this.errorDiv = this.container.querySelector('#error') as HTMLElement;
    }

    private bindEvents(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.nameInput.addEventListener('input', (e) => this.handleNameInput(e));
        this.sizeSelect.addEventListener('change', (e) => this.handleSizeChange(e));
        this.clearButton.addEventListener('click', () => this.handleClear());
        
        // Close button functionality
        const closeButton = this.container.querySelector('#close-form-btn') as HTMLButtonElement;
        if (closeButton) {
            closeButton.addEventListener('click', () => this.handleClose());
        }
        
        // Close on backdrop click
        const backdrop = this.container.querySelector('.fixed.inset-0.bg-black\\/60') as HTMLElement;
        if (backdrop) {
            backdrop.addEventListener('click', () => this.handleClose());
        }
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleClose();
            }
        });
    }

    private handleClose(): void {
        this.container.classList.add('hidden');
        this.container.innerHTML = '';
    }

    private handleSizeChange(e: Event): void {
        const target = e.target as HTMLSelectElement;
        this.tournamentSize = parseInt(target.value) || 0;
        
        if (this.tournamentSize > 0) {
            this.generatePlayerInputs();
            this.playersSection.classList.remove('hidden');
        } else {
            this.playersSection.classList.add('hidden');
        }
        
        this.updateSubmitButton();
    }
    
    private generatePlayerInputs(): void {
        this.playerInputsContainer.innerHTML = '';
        
        for (let i = 0; i < this.tournamentSize; i++) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'group';
            
            const isCurrentUser = i === 0;
            
            playerDiv.innerHTML = `
                <div class="relative">
                    <div class="flex items-center space-x-3 p-4 bg-slate-700/20 hover:bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 rounded-xl transition-all duration-200 ${isCurrentUser ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30' : ''}">
                        <!-- Player avatar/number -->
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 ${isCurrentUser ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-slate-600 to-slate-700'} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                ${isCurrentUser ? '👑' : (i + 1)}
                            </div>
                        </div>
                        
                        <!-- Player info -->
                        <div class="flex-1 space-y-1">
                            <div class="flex items-center space-x-2">
                                <span class="text-xs font-medium ${isCurrentUser ? 'text-green-300' : 'text-slate-400'} uppercase tracking-wide">
                                    ${isCurrentUser ? 'Tournament Host' : `Player ${i + 1}`}
                                </span>
                                ${isCurrentUser ? '<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>' : ''}
                            </div>
                            <input
                                type="text"
                                id="player-${i}"
                                class="w-full px-0 py-1 bg-transparent border-0 text-white placeholder-slate-400 focus:outline-none focus:ring-0 text-lg font-medium ${isCurrentUser ? 'text-green-100' : ''}"
                                placeholder="${isCurrentUser ? this.currentUser.username : 'Enter player name...'}"
                                value="${isCurrentUser ? this.currentUser.username : ''}"
                                ${isCurrentUser ? 'readonly' : ''}
                                autocomplete="off"
                                spellcheck="false"
                                required
                            />
                        </div>
                        
                        <!-- Status indicator -->
                        <div class="flex-shrink-0">
                            ${isCurrentUser ? 
                                '<div class="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>' :
                                '<div class="w-6 h-6 bg-slate-600/50 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>'
                            }
                        </div>
                    </div>
                    
                    <!-- Hover effect overlay -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </div>
            `;
            
            this.playerInputsContainer.appendChild(playerDiv);
            
            if (!isCurrentUser) {
                const input = playerDiv.querySelector('input') as HTMLInputElement;
                input.addEventListener('input', () => this.updateSubmitButton());
                
                // Add focus effects
                input.addEventListener('focus', () => {
                    const container = playerDiv.querySelector('.relative > div') as HTMLElement;
                    container.classList.add('ring-2', 'ring-purple-500/50', 'border-purple-500/50');
                });
                
                input.addEventListener('blur', () => {
                    const container = playerDiv.querySelector('.relative > div') as HTMLElement;
                    container.classList.remove('ring-2', 'ring-purple-500/50', 'border-purple-500/50');
                });
            }
        }
    }


    private handleNameInput(e: Event): void {
        this.name = (e.target as HTMLInputElement).value;
        this.clearError();
        this.updateSubmitButton();
    }


    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.name.trim()) {
            this.showError('Tournament name is required');
            return;
        }

        if (this.tournamentSize === 0) {
            this.showError('Please select tournament size');
            return;
        }

        // Collect all player names (excluding the current user at index 0)
        const allPlayers: string[] = [];
        for (let i = 1; i < this.tournamentSize; i++) {
            const input = this.playerInputsContainer.querySelector(`#player-${i}`) as HTMLInputElement;
            if (!input || input.value.trim().length === 0) {
                this.showError(`Please enter name for Player ${i + 1}`);
                return;
            }
            allPlayers.push(input.value.trim());
        }

        try {
            this.setIsSubmitting(true);
            this.clearError();

            const tournamentData: CreateTournamentData = {
                name: this.name.trim(),
                players: allPlayers,
            };

            await createTournament(tournamentData);
            this.onTournamentCreated();
            this.handleClear();
        } catch (err) {
            console.error('Tournament creation error:', err);
            
            // Handle specific backend serialization errors
            if (err instanceof Error && err.message.includes('missing id field')) {
                this.showError('Tournament creation failed due to a server issue. Please try again.');
            } else {
                this.showError(err instanceof Error ? err.message : 'Failed to create tournament');
            }
        } finally {
            this.setIsSubmitting(false);
        }
    }

    private handleClear(): void {
        this.name = '';
        this.tournamentSize = 0;
        this.playerNames = [];
        
        this.nameInput.value = '';
        this.sizeSelect.value = '';
        this.playersSection.classList.add('hidden');
        this.playerInputsContainer.innerHTML = '';
        
        this.updateSubmitButton();
        this.clearError();
    }

    private showError(message: string): void {
        this.errorDiv.classList.remove('hidden');
        const errorMessage = this.errorDiv.querySelector('#error-message') as HTMLElement;
        errorMessage.textContent = message;
    }

    private clearError(): void {
        this.errorDiv.classList.add('hidden');
    }


    private updateSubmitButton(): void {
        const hasName = this.name.trim().length > 0;
        const hasSize = this.tournamentSize > 0;
        
        let allPlayersFilled = true;
        if (hasSize) {
            // Check if all player inputs are filled (except player 1 which is auto-filled)
            for (let i = 1; i < this.tournamentSize; i++) {
                const input = this.playerInputsContainer.querySelector(`#player-${i}`) as HTMLInputElement;
                if (!input || input.value.trim().length === 0) {
                    allPlayersFilled = false;
                    break;
                }
            }
        }
        
        this.submitButton.disabled = !hasName || !hasSize || !allPlayersFilled;
    }

    private setIsSubmitting(submitting: boolean): void {
        this.isSubmitting = submitting;
        this.nameInput.disabled = submitting;
        this.sizeSelect.disabled = submitting;
        this.clearButton.disabled = submitting;
        this.submitButton.disabled = submitting;
        
        // Disable all player inputs
        for (let i = 1; i < this.tournamentSize; i++) {
            const input = this.playerInputsContainer.querySelector(`#player-${i}`) as HTMLInputElement;
            if (input) {
                input.disabled = submitting;
            }
        }
        
        if (submitting) {
            const originalText = this.submitButton.innerHTML;
            this.submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
            `;
            this.submitButton.setAttribute('data-original-text', originalText);
        } else {
            const originalText = this.submitButton.getAttribute('data-original-text') || 'Create Tournament';
            this.submitButton.innerHTML = originalText;
            this.updateSubmitButton();
        }
    }
}