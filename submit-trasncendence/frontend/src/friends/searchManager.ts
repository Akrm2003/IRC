import { userService, SearchResult, SearchUser, UserProfileResponse } from '../services/userService';
import { getDefaultAvatar } from './friendRenderer';

export function setupSearchEventListeners() {
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const searchModal = document.getElementById('searchModal') as HTMLElement;
    const searchForm = document.getElementById('searchForm') as HTMLFormElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchResults = document.getElementById('searchResults') as HTMLElement;
    const cancelSearchBtn = document.getElementById('cancelSearchBtn') as HTMLButtonElement;
    const profileModal = document.getElementById('profileModal') as HTMLElement;
    const closeProfileBtn = document.getElementById('closeProfileBtn') as HTMLButtonElement;

    // Search button (now labeled "Add Friend")
    searchBtn?.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchInput.focus();
    });

    // Cancel search button
    cancelSearchBtn?.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchForm.reset();
        searchResults.innerHTML = '';
    });

    // Search form submission
    searchForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await performSearch();
    });

    // Real-time search as user types (debounced)
    let searchTimeout: number;
    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const query = searchInput.value.trim();
        
        if (query.length >= 2) {
            searchTimeout = setTimeout(() => {
                performSearch();
            }, 300);
        } else {
            searchResults.innerHTML = '';
        }
    });

    // Close profile modal
    closeProfileBtn?.addEventListener('click', () => {
        profileModal.classList.add('hidden');
    });

    // Close modals when clicking outside
    [searchModal, profileModal].forEach(modal => {
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                if (modal === searchModal) {
                    searchForm.reset();
                    searchResults.innerHTML = '';
                }
            }
        });
    });
}

// Search functionality
async function performSearch() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchResults = document.getElementById('searchResults') as HTMLElement;
    const query = searchInput.value.trim();
    
    if (!query || query.length < 2) {
        searchResults.innerHTML = '<div class="text-center py-4 text-slate-400">Enter at least 2 characters to search</div>';
        return;
    }

    try {
        console.log('Starting search for query:', query);
        searchResults.innerHTML = '<div class="text-center py-4 text-slate-400">Searching...</div>';
        
        const result = await userService.searchUsers(query, 10);
        console.log('Search completed, rendering results:', result);
        
        if (!result) {
            throw new Error('No result returned from search');
        }
        
        // Ensure we have a query to display
        const searchResult = {
            ...result,
            query: result.query || query
        };
        
        renderSearchResults(searchResult);
        
    } catch (error) {
        console.error('Search error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        searchResults.innerHTML = `
            <div class="text-center py-4 text-red-400">
                <p>Search failed: ${errorMessage}</p>
                <p class="text-sm mt-2">Please try again or check the console for details</p>
            </div>`;
    }
}

function renderSearchResults(result: SearchResult) {
    const searchResults = document.getElementById('searchResults') as HTMLElement;
    
    console.log('Rendering search results:', result);
    
    if (!result || !result.users || result.users.length === 0) {
        const queryDisplay = result?.query ? `"${result.query}"` : 'your search';
        searchResults.innerHTML = `
            <div class="text-center py-8 text-slate-400">
                <p>No users found for ${queryDisplay}</p>
                <p class="text-sm mt-2">Try searching for a different username</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = result.users.map(user => `
        <div class="search-result-card p-4 border border-slate-600 rounded-lg mb-3 hover:bg-slate-700 transition-colors">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onclick="viewUserProfile(${user.id})">
                    <img 
                        src="${user.avatar_url || getDefaultAvatar(user.username)}" 
                        alt="Avatar"
                        class="w-10 h-10 rounded-full object-cover border border-slate-600"
                        onerror="this.src='${getDefaultAvatar(user.username)}'"
                    />
                    <div class="min-w-0 flex-1">
                        <h4 class="font-medium text-white truncate">${user.display_name || user.username}</h4>
                        <p class="text-sm text-slate-400 truncate">@${user.username}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    ${getFriendActionButton(user)}
                </div>
            </div>
        </div>
    `).join('');
}

function getFriendActionButton(user: SearchUser): string {
    switch (user.friendStatus) {
        case 'friends':
            return '<span class="px-3 py-1 bg-green-600 rounded text-sm">Friends</span>';
        case 'request_sent':
            return '<span class="px-3 py-1 bg-yellow-600 rounded text-sm">Request Sent</span>';
        case 'request_received':
            return `<button class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm" onclick="acceptFriendRequest(${user.id})">Accept Request</button>`;
        default:
            return `<button class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm" onclick="sendFriendRequestToUser(${user.id})">Add Friend</button>`;
    }
}

// Global functions for onclick handlers
export function setupGlobalSearchFunctions(loadFriendsDataCallback: () => Promise<void>) {
    (window as any).viewUserProfile = function(userId: number) {
        // Navigate to the view-profile page with the user's ID
        window.location.href = `/profile/view-profile.html?userId=${userId}`;
    };

    (window as any).sendFriendRequestToUser = async function(userId: number) {
        try {
            await userService.sendFriendRequest(userId);
            showSuccess('Friend request sent successfully');
            
            // Refresh search results
            await performSearch();
            
        } catch (error: any) {
            console.error('Error sending friend request:', error);
            showError(error.message || 'Failed to send friend request');
        }
    };

    (window as any).acceptFriendRequest = async function(userId: number) {
        try {
            await userService.respondToFriendRequest(userId, 'ACCEPTED');
            showSuccess('Friend request accepted');
            
            // Refresh search results and friends list
            await performSearch();
            await loadFriendsDataCallback();
            
        } catch (error: any) {
            console.error('Error accepting friend request:', error);
            showError(error.message || 'Failed to accept friend request');
        }
    };
}

function renderUserProfile(profileData: UserProfileResponse) {
    const profileContent = document.getElementById('profileContent') as HTMLElement;
    const { profile, friendStatus, stats } = profileData;
    
    profileContent.innerHTML = `
        <div class="text-center mb-6">
            <img 
                src="${profile.avatar_url || getDefaultAvatar(profile.username)}" 
                alt="Avatar"
                class="w-24 h-24 rounded-full object-cover border-4 border-slate-600 mx-auto mb-4"
                onerror="this.src='${getDefaultAvatar(profile.username)}'"
            />
            <h2 class="text-2xl font-bold text-white">${profile.display_name || profile.username}</h2>
            <p class="text-slate-400">@${profile.username}</p>
            <p class="text-sm text-slate-500 mt-2">Member since ${new Date(profile.created_at).toLocaleDateString()}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-700 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-blue-400">${stats.totalMatches}</div>
                <div class="text-sm text-slate-400">Total Matches</div>
            </div>
            <div class="bg-slate-700 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-green-400">${stats.totalWins}</div>
                <div class="text-sm text-slate-400">Wins</div>
            </div>
        </div>
    `;
}

function showSuccess(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showError(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
