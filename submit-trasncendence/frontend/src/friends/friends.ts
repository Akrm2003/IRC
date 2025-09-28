import { requireAuth, logout } from '../router/authRouter';
import { userService } from '../services/userService';
import { organizeAndRenderFriends, loadSavedNotifications } from './friendRenderer';
import { setupChatEventListeners, openChatModal, handleInviteClick, initializeChatManager } from './chatManager';
import { setupSearchEventListeners, setupGlobalSearchFunctions } from './searchManager';
import { setupFriendActionHandlers } from './friendActions';

// Function to get current user ID from backend
async function getCurrentUserId(): Promise<number> {
    try {
        const response = await fetch('/api/users/profile', {
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            return data.profile[0].id;
        }
        throw new Error('Failed to get user profile');
    } catch (error) {
        console.error('Error getting current user ID:', error);
        throw error;
    }
}

// Keep track of current user ID
let currentUserId: number;

/**
 * Load friends data with optional force refresh
 * @param forceRefresh If true, bypass cache and force a fresh fetch
 */
async function loadFriendsData(forceRefresh: boolean = false) {
    try {
        console.log(`🔄 Loading friends data${forceRefresh ? ' (force refresh)' : ''}...`);
        const friends = await userService.getFriends(forceRefresh);
        console.log('📥 Friends data received:', { count: friends.length });

        if (!Array.isArray(friends)) {
            throw new Error('Invalid friends data received');
        }

        organizeAndRenderFriends(friends, currentUserId);
        setupFriendCardListeners();
        
    } catch (error) {
        console.error('🚨 Error loading friends:', error);
        const friendsList = document.getElementById('friendsList') as HTMLElement;
        friendsList.innerHTML = `
            <div class="error-state text-center py-8">
                <div class="text-red-500 mb-2">⚠️</div>
                <p class="text-red-500">Failed to load friends</p>
                <button class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm refresh-btn">
                    Try Again
                </button>
            </div>
        `;
        
        document.querySelector('.refresh-btn')?.addEventListener('click', () => {
            loadFriendsData(true); // Force refresh on retry
        });
    }
}

function setupFriendCardListeners() {
    const friendCards = document.querySelectorAll('.friend-card');
    
    friendCards.forEach(card => {
        const messageBtn = card.querySelector('.message-btn');
        const inviteBtn = card.querySelector('.invite-btn');
        const friendId = card.getAttribute('data-friend-id');

        if (!friendId) return;

        messageBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔥 Message button clicked for friend:', friendId);
            const friendName = card.querySelector('h3')?.textContent || 'Friend';
            console.log('📝 Opening chat with:', friendName);
            openChatModal(parseInt(friendId), friendName);
        });
        inviteBtn?.addEventListener('click', () => {
            const friendName = card.querySelector('h3')?.textContent || 'Friend';
            handleInviteClick(parseInt(friendId), friendName);
        });
    });
}

function setupEventListeners() {
    setupSearchEventListeners();
    setupChatEventListeners();
    setupFriendActionHandlers(loadFriendsData);
    setupGlobalSearchFunctions(loadFriendsData);
}

function setupNavigation() {
    const homeBtn = document.getElementById('homeBtn') as HTMLButtonElement;
    const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;
    const profileBtn = document.getElementById('profileBtn') as HTMLButtonElement;

    homeBtn?.addEventListener('click', () => {
        window.location.href = '/home/home.html';
    });

    profileBtn?.addEventListener('click', () => {
        window.location.href = '/profile/profile.html';
    });

    logoutBtn?.addEventListener('click', async () => {
        try {
            window.location.href = '/auth/login.html';
        } catch (error) {
            console.error('Logout error:', error);
            showError('Failed to logout. Please try again.');
        }
    });
}

// Setup notification permission request (user-triggered only)
function setupNotificationPermission() {
    // Only show notification prompt if permission is not already granted or denied
    if ('Notification' in window && Notification.permission === 'default') {
        // Create a subtle notification prompt that appears on first user interaction
        let hasPrompted = false;
        
        const promptForNotifications = () => {
            if (!hasPrompted) {
                hasPrompted = true;
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        console.log('✅ Notification permission granted');
                    }
                });
                // Remove the event listener after first use
                document.removeEventListener('click', promptForNotifications);
            }
        };
        
        // Request permission on first user click anywhere on the page
        document.addEventListener('click', promptForNotifications, { once: true });
    }
}

function showError(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add refresh button click handler
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshFriendsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            refreshBtn.classList.add('animate-spin');
            try {
                await loadFriendsData(true); // Force refresh
            } finally {
                setTimeout(() => {
                    refreshBtn.classList.remove('animate-spin');
                }, 500);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check authentication first
        if (!await requireAuth()) {
            window.location.href = '/auth/login.html';
            return;
        }

        // Get current user ID
        currentUserId = await getCurrentUserId();
        console.log('Current user ID:', currentUserId);

        // Load friends data
        await loadFriendsData();

        // Setup event listeners including refresh button
        setupEventListeners();
        setupNavigation();
        setupRefreshButton();
        setupSearchEventListeners();
        setupGlobalSearchFunctions(loadFriendsData);

        // Load saved notifications from localStorage
        loadSavedNotifications();

        // Initialize chat manager
        initializeChatManager(currentUserId);

        // Setup notification permission request (user-triggered only)
        setupNotificationPermission();

    } catch (error) {
        console.error('❌ Initialization error:', error);
        showError('Failed to initialize page. Please try again later.');
    }
});
