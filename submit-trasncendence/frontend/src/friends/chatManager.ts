import { clearFriendNotifications, showFriendNotification } from './friendRenderer';
import { userService } from '../services/userService';

// Declare Socket.IO global
declare const io: any;

// Socket and chat variables
let socket: any = null;
let currentChatFriendId: number | null = null;
let currentChatFriendName: string | null = null;
let currentUserId: number;

// Function to handle username/display name clicks
async function handleUsernameClick(usernameForLookup: string) {
    try {
        console.log('🔍 Looking up user by username:', usernameForLookup);
        
        // Search for users with this username
        const searchResult = await userService.searchUsers(usernameForLookup);
        const users = searchResult?.users || [];
        
        if (users.length === 0) {
            console.log('❌ No user found with username:', usernameForLookup);
            return;
        }
        
        // Find exact match (prioritize exact username match, then display name)
        let targetUser = users.find(user => user.username === usernameForLookup);
        
        if (!targetUser) {
            // If no exact username match, try display name match
            targetUser = users.find(user => user.display_name === usernameForLookup);
        }
        
        if (!targetUser) {
            // If still no exact match, try partial matches
            targetUser = users.find(user => 
                user.username.toLowerCase().includes(usernameForLookup.toLowerCase()) ||
                (user.display_name && user.display_name.toLowerCase().includes(usernameForLookup.toLowerCase()))
            );
        }
        
        if (!targetUser) {
            // If still no match, take the first result
            targetUser = users[0];
        }
        
        console.log('👤 Found user:', targetUser);
        
        // Navigate to read-only user profile in same window
        const profileUrl = `/profile/view-profile.html?userId=${targetUser.id}`;
        window.location.href = profileUrl;
        
    } catch (error) {
        console.error('❌ Error looking up user:', error);
    }
}

// Function to make a username clickable
function makeUsernameClickable(displayText: string, actualUsername?: string): string {
    const usernameForLookup = actualUsername || displayText;
    return `<span class="username-link cursor-pointer text-blue-400 hover:text-blue-300 hover:underline transition-colors" data-username="${usernameForLookup}">${displayText}</span>`;
}

// Function to parse message content and make @mentions and usernames clickable
function parseMessageContent(content: string): string {
    // Pattern to match @username or @"display name" mentions
    const mentionPattern = /@([a-zA-Z0-9_]+|"[^"]+"|'[^']+')/g;
    
    return content.replace(mentionPattern, (match, captured) => {
        // Remove quotes if present
        const username = captured.replace(/^["']|["']$/g, '');
        return `@${makeUsernameClickable(username)}`;
    });
}

export function initializeChatManager(userId: number) {
    currentUserId = userId;
    
    // Establish Socket.IO connection immediately for real-time notifications
    if (!socket) {
        // Use Vite proxy for Socket.IO connection (Firefox compatibility)
        // This will proxy to the backend through Vite dev server
        socket = io({
            withCredentials: true,
            path: '/socket.io/'
        });
        setupSocketListeners();
    }
}

export async function openChatModal(friendId: number, friendName: string) {
    console.log('💬 openChatModal called with:', { friendId, friendName });
    
    currentChatFriendId = friendId;
    currentChatFriendName = friendName;

    // Clear notifications for this friend
    clearFriendNotifications(friendId);

    // Update modal title and make it clickable
    const chatFriendNameElement = document.getElementById('chatFriendName') as HTMLElement;
    if (chatFriendNameElement) {
        // Make the friend name clickable
        chatFriendNameElement.innerHTML = makeUsernameClickable(friendName);
        chatFriendNameElement.style.cursor = 'pointer';
        
        // Add click event listener to the username link inside
        const usernameLink = chatFriendNameElement.querySelector('.username-link');
        if (usernameLink) {
            usernameLink.addEventListener('click', (e) => {
                e.preventDefault();
                const username = (e.target as HTMLElement).getAttribute('data-username');
                if (username) {
                    handleUsernameClick(username);
                }
            });
        }
    }

    // Clear previous messages and show loading
    const chatMessages = document.getElementById('chatMessages') as HTMLElement;
    chatMessages.innerHTML = `
        <div class="text-center text-slate-400 text-sm py-4">
            <div class="inline-flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full">
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Loading chat history...
            </div>
        </div>
    `;

    // Load chat history
    try {
        const response = await fetch(`/api/chat/messages/${friendId}`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const messages = await response.json();
            
            // Clear loading message
            chatMessages.innerHTML = '';
            
            if (messages.length === 0) {
                // Show welcome message if no history
                chatMessages.innerHTML = `
                    <div class="text-center text-slate-400 text-sm py-4">
                        <div class="inline-flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full">
                            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Start your conversation with ${friendName}
                        </div>
                    </div>
                `;
            } else {
                messages.forEach((msg: any) => {
                    appendMessage(
                        msg.senderId === currentUserId ? 'You' : friendName, 
                        msg.content, 
                        msg.senderId === currentUserId ? 'right' : 'left'
                    );
                });
            }
        }
    } catch (err) {
        chatMessages.innerHTML = '';
        appendMessage('System', 'Failed to load chat history', 'left');
    }

    // Connect to Socket.IO if not already connected
    if (!socket) {
        // Use Vite proxy for Socket.IO connection (Firefox compatibility)
        // This will proxy to the backend through Vite dev server
        socket = io({
            withCredentials: true,
            path: '/socket.io/'
        });
        setupSocketListeners();
    }

    // Show the chat modal
    const chatModal = document.getElementById('chatModal') as HTMLElement;
    if (chatModal) {
        chatModal.classList.remove('hidden');
    }
}

export function setupChatEventListeners() {
    const closeChatBtn = document.getElementById('closeChatBtn') as HTMLElement;
    const chatForm = document.getElementById('chatForm') as HTMLFormElement;
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;

    closeChatBtn?.addEventListener('click', () => {
        const chatModal = document.getElementById('chatModal') as HTMLElement;
        const chatMessages = document.getElementById('chatMessages') as HTMLElement;
        
        chatModal.classList.add('hidden');
        currentChatFriendId = null;
        chatMessages.innerHTML = '';
    });

    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentChatFriendId || !chatInput.value.trim()) return;
        const msg = chatInput.value.trim();

        // Send message to backend
        socket.emit('private_message', {
            to: currentChatFriendId,
            content: msg
        });

        // Show message in chat window
        appendMessage('You', msg, 'right');
        chatInput.value = '';
    });
}

export function appendMessage(sender: string, content: string, align: 'left' | 'right') {
    const chatMessages = document.getElementById('chatMessages') as HTMLElement;
    
    // Remove the "Chat started" placeholder if it exists
    const placeholder = chatMessages.querySelector('.text-center');
    if (placeholder && placeholder.textContent?.includes('Chat started')) {
        placeholder.remove();
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex ${align === 'right' ? 'justify-end' : 'justify-start'} mb-3`;
    
    const isSystem = sender === 'System';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isSystem) {
        msgDiv.innerHTML = `
            <div class="bg-slate-700/50 text-slate-300 px-3 py-2 rounded-lg text-sm max-w-xs text-center">
                ${content}
            </div>
        `;
    } else {
        // Make sender name clickable if it's from the left (other user)
        const senderDisplay = align === 'left' ? makeUsernameClickable(sender) : 'You';
        
        msgDiv.innerHTML = `
            <div class="flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} max-w-xs">
                <div class="flex items-center gap-2 mb-1">
                    ${align === 'left' ? `<span class="text-xs text-slate-400 font-medium">${senderDisplay}</span>` : ''}
                    <span class="text-xs text-slate-500">${timestamp}</span>
                    ${align === 'right' ? `<span class="text-xs text-slate-400 font-medium">You</span>` : ''}
                </div>
                <div class="px-4 py-2 rounded-2xl ${
                    align === 'right' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
                        : 'bg-slate-700 text-white rounded-bl-md'
                } shadow-lg">
                    <p class="text-sm leading-relaxed">${parseMessageContent(content)}</p>
                </div>
            </div>
        `;
    }
    
    chatMessages.appendChild(msgDiv);
    
    // Add click event listeners to username links
    const usernameLinks = msgDiv.querySelectorAll('.username-link');
    usernameLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const username = (e.target as HTMLElement).getAttribute('data-username');
            if (username) {
                handleUsernameClick(username);
            }
        });
    });
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupSocketListeners() {
    socket.on('private_message', (msg: any) => {
        // If chat with this friend is open, show in chat window and mark as read
        if (msg.from === currentChatFriendId) {
            appendMessage(currentChatFriendName || 'Friend', msg.content, 'left');
            // Mark as read
            socket.emit('message_read', { messageId: msg.messageId });
        } else {
            // Otherwise, show notification
            showFriendNotification(msg.from, msg.content);
        }
    });
    
    socket.on('message_error', (err: any) => {
        appendMessage('System', err.error || 'Message error', 'left');
    });
    
    socket.on('message_read', (data: any) => {
        // Handle read receipts if needed
        console.log('Message read by recipient:', data);
    });
}

export function handleInviteClick(friendId: number, friendName: string) {
    if (socket) {
        // Send invite message via socket
        socket.emit('private_message', {
            to: friendId,
            content: "Let's play! 🏓"
        });
        // Optionally, show a toast or notification
        appendMessage('You', "Let's play! 🏓 (invite sent)", 'right');
    } else {
        // If socket not connected, open chat modal to initialize socket, then send
        openChatModal(friendId, friendName);
        setTimeout(() => {
            if (socket) {
                socket.emit('private_message', {
                    to: friendId,
                    content: "Let's play! 🏓"
                });
                appendMessage('You', "Let's play! 🏓 (invite sent)", 'right');
            }
        }, 500);
    }
}

// Getter functions for external access
export function getSocket() { return socket; }
export function getCurrentChatFriendId() { return currentChatFriendId; }
export function getCurrentChatFriendName() { return currentChatFriendName; }
