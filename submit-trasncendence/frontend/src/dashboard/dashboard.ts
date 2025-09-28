import { requireAuth, logout } from '../router/authRouter';
import { matchService, PongMatch, RPSMatch } from '../services/matchService';

// DOM elements
let loadingState: HTMLElement;
let errorState: HTMLElement;
let mainContent: HTMLElement;
let emptyState: HTMLElement;
let retryBtn: HTMLElement;

// Stats elements
let totalMatchesEl: HTMLElement;
let totalWinsEl: HTMLElement;
let totalLossesEl: HTMLElement;
let winRateEl: HTMLElement;

// Match containers
let pongMatchesEl: HTMLElement;
let rpsMatchesEl: HTMLElement;
let pongMatchCountEl: HTMLElement;
let rpsMatchCountEl: HTMLElement;

// Initialize DOM elements
function initializeElements() {
    loadingState = document.getElementById('loadingState') as HTMLElement;
    errorState = document.getElementById('errorState') as HTMLElement;
    mainContent = document.getElementById('mainContent') as HTMLElement;
    emptyState = document.getElementById('emptyState') as HTMLElement;
    retryBtn = document.getElementById('retryBtn') as HTMLElement;

    totalMatchesEl = document.getElementById('totalMatches') as HTMLElement;
    totalWinsEl = document.getElementById('totalWins') as HTMLElement;
    totalLossesEl = document.getElementById('totalLosses') as HTMLElement;
    winRateEl = document.getElementById('winRate') as HTMLElement;

    pongMatchesEl = document.getElementById('pongMatches') as HTMLElement;
    rpsMatchesEl = document.getElementById('rpsMatches') as HTMLElement;
    pongMatchCountEl = document.getElementById('pongMatchCount') as HTMLElement;
    rpsMatchCountEl = document.getElementById('rpsMatchCount') as HTMLElement;
}

// Show loading state
function showLoading() {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.add('hidden');
    emptyState.classList.add('hidden');
}

// Show error state
function showError() {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    mainContent.classList.add('hidden');
    emptyState.classList.add('hidden');
}

// Show main content
function showMainContent() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.remove('hidden');
    emptyState.classList.add('hidden');
}

// Show empty state
function showEmptyState() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.add('hidden');
    emptyState.classList.remove('hidden');
}

// Render Pong match card
function renderPongMatch(match: PongMatch): string {
    const result = matchService.getPongMatchResult(match);
    const resultBadge = matchService.getResultBadgeClass(result);
    const formattedDate = matchService.formatDate(match.played_at);
    
    return `
        <div class="match-card p-4">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        P
                    </div>
                    <div>
                        <div class="font-semibold text-white">vs ${match.player2Name}</div>
                        <div class="text-sm text-slate-400">${formattedDate}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="pong-badge">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        Pong
                    </span>
                    <span class="${resultBadge}">${result.toUpperCase()}</span>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-white">
                    ${match.score_p1} - ${match.score_p2}
                </div>
                <div class="text-sm text-slate-400">
                    ${result === 'win' ? 'Victory' : result === 'loss' ? 'Defeat' : 'Draw'}
                </div>
            </div>
        </div>
    `;
}

// Render RPS match card
function renderRPSMatch(match: RPSMatch): string {
    const resultBadge = matchService.getResultBadgeClass(match.result);
    const formattedDate = matchService.formatDate(match.created_at);
    
    return `
        <div class="match-card p-4">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        RPS
                    </div>
                    <div>
                        <div class="font-semibold text-white">vs ${match.opponent}</div>
                        <div class="text-sm text-slate-400">${formattedDate}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="rps-badge">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        RPS
                    </span>
                    <span class="${resultBadge}">${match.result.toUpperCase()}</span>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-white">
                    ${match.score_p1} - ${match.score_p2}
                </div>
                <div class="text-sm text-slate-400">
                    ${match.result === 'win' ? 'Victory' : match.result === 'loss' ? 'Defeat' : 'Draw'}
                </div>
            </div>
        </div>
    `;
}

// Load and display match data
async function loadMatchData() {
    try {
        showLoading();

        // Fetch all match data
        const [pongMatches, rpsData, combinedStats] = await Promise.all([
            matchService.getPongMatches(),
            matchService.getRPSMatches(),
            matchService.getCombinedStats()
        ]);

        console.log('📊 Match data loaded:', {
            pongMatches: pongMatches.length,
            rpsMatches: rpsData.matches.length,
            combinedStats
        });

        // Check if user has any matches
        if (combinedStats.totalMatches === 0) {
            showEmptyState();
            return;
        }

        // Update overall stats
        totalMatchesEl.textContent = combinedStats.totalMatches.toString();
        totalWinsEl.textContent = combinedStats.totalWins.toString();
        totalLossesEl.textContent = combinedStats.totalLosses.toString();
        winRateEl.textContent = `${Math.round(combinedStats.overallWinRate)}%`;

        // Update match counts
        pongMatchCountEl.textContent = pongMatches.length.toString();
        rpsMatchCountEl.textContent = rpsData.matches.length.toString();

        // Render Pong matches
        if (pongMatches.length > 0) {
            pongMatchesEl.innerHTML = pongMatches
                .sort((a, b) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
                .map(match => renderPongMatch(match))
                .join('');
        } else {
            pongMatchesEl.innerHTML = `
                <div class="text-center py-12 text-slate-400">
                    <div class="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-300 mb-2">No Pong Matches</h3>
                    <p class="text-slate-500">Start playing Pong games to see your match history here.</p>
                </div>
            `;
        }

        // Render RPS matches
        if (rpsData.matches.length > 0) {
            rpsMatchesEl.innerHTML = rpsData.matches
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map(match => renderRPSMatch(match))
                .join('');
        } else {
            rpsMatchesEl.innerHTML = `
                <div class="text-center py-12 text-slate-400">
                    <div class="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-300 mb-2">No RPS Matches</h3>
                    <p class="text-slate-500">Start playing Rock Paper Scissors to see your match history here.</p>
                </div>
            `;
        }

        showMainContent();

    } catch (error) {
        console.error('❌ Error loading match data:', error);
        showError();
    }
}

// Setup navigation
function setupNavigation() {
    const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;

    logoutBtn?.addEventListener('click', async () => {
        try {
            await logout();
            window.location.href = '/auth/login.html';
        } catch (error) {
            console.error('Logout error:', error);
            showErrorNotification('Failed to logout. Please try again.');
        }
    });
}

// Show error notification
function showErrorNotification(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all z-50';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    retryBtn?.addEventListener('click', () => {
        loadMatchData();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check authentication first
        if (!await requireAuth()) {
            console.log('❌ Authentication check failed');
            window.location.href = '/auth/login.html';
            return;
        }

        console.log('🔒 Authentication verified, loading match records page...');

        // Initialize DOM elements
        initializeElements();

        // Setup navigation and event listeners
        setupNavigation();
        setupEventListeners();

        // Load match data
        await loadMatchData();

    } catch (error) {
        console.error('❌ Initialization error:', error);
        showError();
    }
});
