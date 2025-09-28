import { Friend } from '../services/userService';

// Track unread messages per friend
export const unreadMessages: Map<number, {count: number, lastMessage: string}> = new Map();

export function getDefaultAvatar(username: string): string {
    // Generate a consistent color based on username (same as view-profile)
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue},50%,50%&color=fff&size=256`;
}

// Enhanced avatar loading function (same logic as view-profile)
export function loadFriendAvatar(imgElement: HTMLImageElement, avatarUrl: string | null, username: string): void {
    const defaultAvatar = getDefaultAvatar(username);
    
    // Always set alt text
    imgElement.alt = `${username}'s avatar`;
    
    // Check if user has a custom avatar
    if (!avatarUrl || avatarUrl.trim() === '') {
        console.log(`📷 No custom avatar for ${username}, using default`);
        imgElement.src = defaultAvatar;
        return;
    }

    let processedUrl = avatarUrl.trim();
    
    // Process the URL (same logic as view-profile)
    processedUrl = processAvatarUrl(processedUrl);
    
    // Only add cache-busting for local uploads, not external services
    let finalUrl = processedUrl;
    const isLocalUpload = processedUrl.startsWith('/uploads/') || processedUrl.startsWith('uploads/');
    
    if (isLocalUpload) {
        const separator = processedUrl.includes('?') ? '&' : '?';
        finalUrl = `${processedUrl}${separator}t=${Date.now()}`;
    }
    
    // For both local uploads and Google services, try direct loading
    if (isLocalUpload || processedUrl.includes('googleusercontent.com') || processedUrl.includes('googleapis.com')) {
        const serviceType = isLocalUpload ? 'Local upload' : 'Google service';
        
        // For local uploads, try different URL approaches
        if (isLocalUpload) {
            // Try the relative path first
            imgElement.src = finalUrl;
            
            // Set up error handler that tries alternative URLs
            const handleImageError = () => {
                // Try direct backend URL with HTTPS (backend runs on HTTPS)
                const backendUrl = `https://localhost:3000${finalUrl.split('?')[0]}`;
                
                imgElement.removeEventListener('error', handleImageError);
                imgElement.removeEventListener('load', handleImageLoad);
                
                // Set up new handlers for backend attempt
                const handleBackendError = () => {
                    imgElement.src = defaultAvatar;
                };
                
                const handleBackendLoad = () => {
                    console.log(`✅ Friend avatar loaded via backend for ${username}`);
                };
                
                imgElement.addEventListener('error', handleBackendError, { once: true });
                imgElement.addEventListener('load', handleBackendLoad, { once: true });
                imgElement.src = backendUrl;
            };
            
            // Set up success handler
            const handleImageLoad = () => {
                console.log(`✅ Friend avatar loaded via proxy for ${username}`);
                imgElement.removeEventListener('load', handleImageLoad);
                imgElement.removeEventListener('error', handleImageError);
            };
            
            imgElement.addEventListener('error', handleImageError, { once: true });
            imgElement.addEventListener('load', handleImageLoad, { once: true });
            
        } else {
            // Google service handling
            imgElement.src = finalUrl;
            
            const handleImageError = () => {
                imgElement.src = defaultAvatar;
            };
            
            imgElement.addEventListener('error', handleImageError, { once: true });
        }
    } else {
        // For other external services, set directly with fallback
        imgElement.src = finalUrl;
        imgElement.addEventListener('error', () => {
            imgElement.src = defaultAvatar;
        }, { once: true });
    }
}

// Helper function to process avatar URLs (same as view-profile)
function processAvatarUrl(avatarUrl: string): string {
    // Handle local uploads - backend serves uploads at /uploads/ prefix
    if (avatarUrl.startsWith('/uploads/') || 
        (avatarUrl.startsWith('uploads/') && !avatarUrl.startsWith('http'))) {
        // For development, the frontend dev server proxies /uploads/ to backend
        // So we should use relative paths, not absolute URLs
        const cleanPath = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
        return cleanPath; // Return relative path for dev server proxy
    }
    
    // Handle localhost:3000 URLs (backend server) - convert to relative path for proxy
    if (avatarUrl.includes('localhost:3000')) {
        // Extract the path part and make it relative for proxy
        const url = new URL(avatarUrl);
        const relativePath = url.pathname + url.search;
        return relativePath;
    }
    
    // Return as-is for external URLs
    return avatarUrl;
}

// Load saved notifications on page load
export function loadSavedNotifications() {
    const saved = localStorage.getItem('unreadMessages');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            parsed.forEach(([friendId, data]: [number, {count: number, lastMessage: string}]) => {
                unreadMessages.set(friendId, data);
            });
        } catch (e) {
            console.error('Error loading saved notifications:', e);
        }
    }
}

// Save notifications to localStorage
export function saveNotifications() {
    const toSave = Array.from(unreadMessages.entries());
    localStorage.setItem('unreadMessages', JSON.stringify(toSave));
}

// Show enhanced notification for friend
export function showFriendNotification(friendId: number, messageContent: string) {
    const card = document.querySelector(`.friend-card[data-friend-id="${friendId}"]`) as HTMLElement;
    
    if (!card) return;
    
    // Update unread count
    const currentCount = unreadMessages.get(friendId)?.count || 0;
    const newCount = currentCount + 1;
    unreadMessages.set(friendId, {
        count: newCount,
        lastMessage: messageContent
    });
    
    // Add notification class for animation
    card.classList.add('notification', 'has-unread');
    
    // Update message button with unread styling and badge
    const messageBtn = card.querySelector('.message-btn') as HTMLElement;
    if (messageBtn) {
        messageBtn.classList.add('has-unread');
        
        // Update or create unread badge
        let badge = messageBtn.querySelector('.unread-badge') as HTMLElement;
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'unread-badge';
            messageBtn.appendChild(badge);
        }
        badge.textContent = newCount > 9 ? '9+' : newCount.toString();
        badge.style.display = 'inline-flex';
        
        // Ensure the message button has the has-unread class
        messageBtn.classList.add('has-unread');
        
        // Add a small animation
        badge.classList.add('animate-ping-once');
        setTimeout(() => badge?.classList.remove('animate-ping-once'), 1000);
    }
    
    // Remove pulse animation after it completes
    setTimeout(() => {
        card.classList.remove('notification');
    }, 1000);
    
    // Also show browser notification if tab is not focused
    if (document.hidden) {
        showBrowserNotification(friendId, messageContent);
    }
    
    // Save to localStorage
    saveNotifications();
}

function showBrowserNotification(friendId: number, message: string) {
    const friendName = document.querySelector(`.friend-card[data-friend-id="${friendId}"] h3`)?.textContent || 'Friend';
    
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`New message from ${friendName}`, {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// Clear notifications when opening chat
export function clearFriendNotifications(friendId: number) {
    const card = document.querySelector(`.friend-card[data-friend-id="${friendId}"]`) as HTMLElement;
    
    // Clear from our tracking
    unreadMessages.delete(friendId);
    saveNotifications();
    
    if (card) {
        // Remove unread styles
        card.classList.remove('has-unread');
        
        // Remove unread badge from message button
        const messageBtn = card.querySelector('.message-btn');
        if (messageBtn) {
            messageBtn.classList.remove('has-unread');
            const badge = messageBtn.querySelector('.unread-badge');
            if (badge) {
                messageBtn.removeChild(badge);
            }
        }
    }
    unreadMessages.delete(friendId);
    saveNotifications();
}

export function organizeAndRenderFriends(friends: Friend[], currentUserId: number) {
    console.log('🔄 Starting to organize friends...');
    console.log('📊 Total friends count:', friends.length);

    const friendsList = document.getElementById('friendsList') as HTMLElement;
    const friendRequestsList = document.getElementById('friendRequestsList') as HTMLElement;

    if (!friends || friends.length === 0) {
        console.log('ℹ️ No friends found');
        friendsList.innerHTML = `
            <div class="col-span-full text-center py-8 text-slate-400">
                <p class="text-lg">No friends yet</p>
                <p class="mt-2">Use "Add Friend" to connect with others</p>
            </div>
        `;
        return;
    }

    // Separate friends into categories with detailed logging
    const acceptedFriends = friends.filter(f => f.status === 'ACCEPTED');
    const pendingReceived = friends.filter(f => 
        f.status === 'PENDING' && f.receiverId === currentUserId
    );
    const pendingSent = friends.filter(f => 
        f.status === 'PENDING' && f.senderId === currentUserId
    );

    console.log('📊 Friends breakdown:', {
        total: friends.length,
        accepted: {
            count: acceptedFriends.length,
            details: acceptedFriends.map(f => ({
                id: f.id,
                friendInfo: f.friend,
                onlineStatus: f.onlineStatus
            }))
        },
        pendingReceived: {
            count: pendingReceived.length,
            details: pendingReceived.map(f => ({
                id: f.id,
                senderId: f.senderId
            }))
        },
        pendingSent: {
            count: pendingSent.length,
            details: pendingSent.map(f => ({
                id: f.id,
                receiverId: f.receiverId
            }))
        }
    });

    // Render each section
    renderAcceptedFriends(acceptedFriends);
    renderPendingRequests(pendingReceived);
    renderSentRequests(pendingSent);

    console.log('✅ Friends rendering completed');
}

function renderAcceptedFriends(friends: Friend[]) {
    const friendsList = document.getElementById('friendsList') as HTMLElement;
    
    friendsList.innerHTML = friends.map(friend => {
        const friendData = friend.friend;
        const hasUnread = unreadMessages.has(friendData.id);
        const unreadData = hasUnread ? unreadMessages.get(friendData.id) : null;
        
        // Get unread count for this friend
        const unreadCount = unreadData?.count || 0;
        
        return `
            <div class="friend-card ${hasUnread ? 'has-unread' : ''}" data-friend-id="${friendData.id}">
                <div class="p-4 flex items-center justify-between gap-3 relative">
                    <!-- Friend Info -->
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <div class="relative flex-shrink-0">
                            <img 
                                id="friend-avatar-${friendData.id}"
                                src="${getDefaultAvatar(friendData.username)}" 
                                alt="${friendData.username}'s avatar"
                                class="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                            />
                            <span class="status-indicator ${
                                friend.onlineStatus === 'ONLINE' ? 'status-online' : 
                                friend.onlineStatus === 'INGAME' ? 'status-ingame' : 
                                'status-offline'
                            }"></span>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-semibold text-base truncate">${friendData.display_name || friendData.username}</h3>
                            <p class="text-xs text-slate-400">
                                ${friend.onlineStatus === 'ONLINE' ? '🟢 Online' : 
                                  friend.onlineStatus === 'INGAME' ? '🎮 In Game' : 
                                  '⚫ Offline'}
                            </p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="button-group flex-shrink-0">
                        <button class="action-btn message-btn ${hasUnread ? 'has-unread' : ''}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                </path>
                            </svg>
                            Msg
                            ${unreadCount > 0 ? `<span class="unread-badge">${unreadCount > 9 ? '9+' : unreadCount}</span>` : ''}
                        </button>
                        <button class="action-btn invite-btn">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Invite
                        </button>
                        <button class="action-btn remove-btn" data-friend-id="${friendData.id}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728">
                                </path>
                            </svg>
                            Block
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // After rendering HTML, load avatars properly for each friend
    friends.forEach(friend => {
        const friendData = friend.friend;
        const avatarImg = document.getElementById(`friend-avatar-${friendData.id}`) as HTMLImageElement;
        if (avatarImg) {
            loadFriendAvatar(avatarImg, friendData.avatar_url || null, friendData.username);
        }
    });
}

function renderPendingRequests(requests: Friend[]) {
    const friendRequestsList = document.getElementById('friendRequestsList') as HTMLElement;
    
    if (!requests.length) {
        friendRequestsList.innerHTML = `
            <div class="text-center py-6 text-slate-400">
                <p>No pending friend requests</p>
            </div>
        `;
        return;
    }

    friendRequestsList.innerHTML = requests.map(request => {
        // For pending received requests, we want to show the sender's info
        // The 'friend' field contains the other person's info (sender in this case)
        const senderInfo = request.friend;
        const senderName = senderInfo.display_name || senderInfo.username;
        
        return `
        <div class="friend-card p-4 flex justify-between items-center">
            <div class="flex items-center">
                <img 
                    id="request-avatar-${request.id}"
                    src="${getDefaultAvatar(senderInfo.username)}" 
                    alt="${senderInfo.username}'s avatar"
                    class="w-12 h-12 rounded-full object-cover border-2 border-slate-700 mr-4"
                />
                <div>
                    <p class="font-medium">${senderName}</p>
                    <p class="text-sm text-slate-400">Sent ${new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="accept-btn px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm" 
                        data-friend-id="${request.senderId}">
                    Accept
                </button>
                <button class="decline-btn px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm" 
                        data-friend-id="${request.senderId}">
                    Decline
                </button>
            </div>
        </div>
        `;
    }).join('');
    
    // After rendering HTML, load avatars properly for each request
    requests.forEach(request => {
        const senderInfo = request.friend;
        const avatarImg = document.getElementById(`request-avatar-${request.id}`) as HTMLImageElement;
        if (avatarImg) {
            loadFriendAvatar(avatarImg, senderInfo.avatar_url || null, senderInfo.username);
        }
    });
}

function renderSentRequests(requests: Friend[]) {
    const sentRequestsContainer = document.getElementById('sentRequestsList');
    if (!sentRequestsContainer) return;

    if (!requests.length) {
        sentRequestsContainer.innerHTML = `
            <div class="text-center py-6 text-slate-400">
                <p>No pending sent requests</p>
            </div>
        `;
        return;
    }

    sentRequestsContainer.innerHTML = requests.map(request => {
        // For sent requests, we want to show the receiver's info
        // The 'friend' field contains the other person's info (receiver in this case)
        const receiverInfo = request.friend;
        const receiverName = receiverInfo.display_name || receiverInfo.username;
        
        return `
        <div class="friend-card p-4 flex justify-between items-center">
            <div class="flex items-center">
                <img 
                    id="sent-request-avatar-${request.id}"
                    src="${getDefaultAvatar(receiverInfo.username)}" 
                    alt="${receiverInfo.username}'s avatar"
                    class="w-12 h-12 rounded-full object-cover border-2 border-slate-700 mr-4"
                />
                <div>
                    <p class="font-medium">${receiverName}</p>
                    <p class="text-sm text-slate-400">Sent ${new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="cancel-request-btn px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm" 
                        data-friend-id="${request.receiverId}">
                    Cancel Request
                </button>
            </div>
        </div>
        `;
    }).join('');
    
    // After rendering HTML, load avatars properly for each sent request
    requests.forEach(request => {
        const receiverInfo = request.friend;
        const avatarImg = document.getElementById(`sent-request-avatar-${request.id}`) as HTMLImageElement;
        if (avatarImg) {
            loadFriendAvatar(avatarImg, receiverInfo.avatar_url || null, receiverInfo.username);
        }
    });
}
