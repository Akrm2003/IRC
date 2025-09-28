// View-only profile page for other users

interface UserProfile {
    id: number;
    username: string;
    display_name?: string;
    email: string;
    avatar_url?: string;
    created_at: string;
}

interface ProfileStats {
    totalMatches: number;
    totalWins: number;
    winRate: number;
}

interface MatchResponse {
    player1Id: number;
    player2Id: number;
    player1Name: string;
    player2Name: string;
    score_p1: number;
    score_p2: number;
    winnerId: number;
    createdAt: string;
}

class ViewProfileHandler {
    private baseURL: string = '/api/users';
    private viewingUserId: number | null = null;
    private messagesContainer: HTMLElement | null = null;

    constructor() {
        this.init();
    }

    async init(): Promise<void> {
        // Check authentication
        try {
            const authResponse = await fetch('/api/auth/verify-session', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (!authResponse.ok) {
                window.location.href = '/auth/login.html';
                return;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/auth/login.html';
            return;
        }
        this.checkForUserIdParam();
        this.loadProfile();
    }

    private checkForUserIdParam(): void {
        const params = new URLSearchParams(window.location.search);
        // Check for both 'id' and 'userId' parameters for compatibility
        const userId = params.get('id') || params.get('userId');
        
        console.log('URL parameters:', window.location.search);
        console.log('Looking for user ID parameter, found:', userId);
        
        if (userId && !isNaN(Number(userId))) {
            this.viewingUserId = Number(userId);
            console.log('👤 Viewing user profile:', userId);
        } else {
            console.error('❌ Invalid or missing userId parameter');
            console.error('Available parameters:', Array.from(params.entries()));
            this.showError('Invalid or missing user ID. Please provide a valid user ID in the URL.');
        }
    }

    private async loadProfile(): Promise<void> {
        if (!this.viewingUserId) {
            this.showError('No user ID available to load profile');
            return;
        }

        try {
            const endpoint = `${this.baseURL}/profile/${this.viewingUserId}`;
            console.log('Fetching profile from:', endpoint);
            
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Profile fetch failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                throw new Error(`Failed to load profile: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Profile data received:', data);
            this.displayProfile(data);
        } catch (error) {
            console.error('Profile loading error:', error);
            this.showError('Error loading profile. Please try again.');
        }
    }
    private updateElement(id: string, value: string | number): void {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value.toString();
        }
    }

    private displayProfile(data: { profile?: UserProfile; stats?: ProfileStats }): void {
        console.log('Displaying profile data:', data);
        
        try {
            // Extract user and stats from response
            const user = data.profile || (data as unknown as UserProfile);
            const stats = data.stats;

            if (!user) {
                throw new Error('No user data found in response');
            }

            console.log('Displaying profile for user:', {
                username: user.username,
                display_name: user.display_name,
                has_avatar: !!user.avatar_url,
                avatar_url: user.avatar_url
            });

            // Update profile info
            this.updateElement('username', user.username || 'Username not available');
            
            // Handle display name
            const displayNameElement = document.getElementById('displayName');
            if (displayNameElement) {
                const hasDisplayName = user.display_name && user.display_name.trim() !== '';
                const isDifferentFromUsername = hasDisplayName && user.display_name !== user.username;
                
                if (isDifferentFromUsername) {
                    displayNameElement.textContent = user.display_name || '';
                    displayNameElement.style.display = 'block';
                    console.log('Displaying display name:', user.display_name);
                } else {
                    displayNameElement.style.display = 'none';
                    console.log('Hiding display name - not set or same as username');
                }
            }

            // Update avatar
            this.loadAvatarImage(user);
            
            // Update other profile info
            this.updateElement('email', user.email || 'Email not available');
            
            // Format join date
            if (user.created_at) {
                const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                this.updateElement('joinDate', `Member since ${joinDate}`);
            } else {
                this.updateElement('joinDate', 'Member since unknown');
            }

            // Update stats
            if (stats) {
                this.updateElement('totalMatches', stats.totalMatches || 0);
                this.updateElement('wins', stats.totalWins || 0);
                this.updateElement('losses', (stats.totalMatches || 0) - (stats.totalWins || 0));
                this.updateElement('winRate', stats.winRate ? `${stats.winRate}%` : '0%');
            }

            // Load match history
            this.loadMatchHistory();
            
        } catch (error) {
            console.error('Error displaying profile:', error);
            this.showError('Error displaying profile data');
        }
    }

    private async loadMatchHistory(): Promise<void> {
        if (!this.viewingUserId) return;
        
        try {
            const response = await fetch(`${this.baseURL}/profile/${this.viewingUserId}/matches`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to load matches: ${response.status}`);
            }

            const matches: MatchResponse[] = await response.json();
            this.renderMatchHistory(matches);
        } catch (error) {
            console.error('Error loading match history:', error);
            const matchHistoryEl = document.getElementById('matchHistory');
            if (matchHistoryEl) {
                matchHistoryEl.innerHTML = '<div class="text-center text-slate-400 py-8">Failed to load match history</div>';
            }
        }
    }


    private renderMatchHistory(matches: MatchResponse[]): void {
        const container = document.getElementById('matchHistory');
        if (!container) return;
        
        if (!matches || matches.length === 0) {
            container.innerHTML = '<div class="text-center text-slate-400 py-8">No matches played yet</div>';
            return;
        }

        const matchesHtml = matches.slice(0, 10).map((match: MatchResponse) => {
            // Determine opponent and scores based on whether user was player1 or player2
            const isPlayer1 = match.player1Id === this.viewingUserId;
            const opponent = isPlayer1 ? match.player2Name : match.player1Name;
            const userScore = isPlayer1 ? match.score_p1 : match.score_p2;
            const opponentScore = isPlayer1 ? match.score_p2 : match.score_p1;
            const isWin = match.winnerId === this.viewingUserId;
            const date = new Date(match.createdAt).toLocaleDateString();
            
            return `
                <div class="match-card rounded-lg p-3 sm:p-4 mb-3 flex items-center justify-between ${isWin ? 'bg-green-900/30' : 'bg-red-900/30'}">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isWin ? 'bg-green-500' : 'bg-red-500'}">
                            <span class="text-white text-sm font-bold">${isWin ? 'W' : 'L'}</span>
                        </div>
                        <div>
                            <div class="font-medium">vs ${opponent || 'Unknown'}</div>
                            <div class="text-xs text-slate-400">${date}</div>
                        </div>
                    </div>
                    <div class="text-lg font-bold">
                        ${userScore} - ${opponentScore}
                    </div>
                </div>`;
        }).join('');

        container.innerHTML = matchesHtml;
    }

    private async loadAvatarImage(user: UserProfile): Promise<void> {
        console.log('🖼️ Starting avatar loading for user:', user.username);
        
        const avatarImg = document.getElementById('profileAvatar') as HTMLImageElement;
        if (!avatarImg) {
            console.error('❌ Avatar image element with ID "profileAvatar" not found in DOM');
            console.log('Available elements with "avatar" in ID:', 
                Array.from(document.querySelectorAll('[id*="avatar"]')).map(el => el.id));
            return;
        }

        console.log('✅ Found avatar image element:', avatarImg);
        
        const username = user.username || 'user';
        const defaultAvatar = this.getDefaultAvatar(username);
        
        console.log('🎨 Generated default avatar URL:', defaultAvatar);
        
        // Always set alt text
        avatarImg.alt = `${username}'s avatar`;
        
        // Check if user has a custom avatar
        if (!user.avatar_url || user.avatar_url.trim() === '') {
            console.log('📷 No custom avatar URL found, using default avatar');
            console.log('Setting avatar src to:', defaultAvatar);
            avatarImg.src = defaultAvatar;
            
            // Verify the image was set
            setTimeout(() => {
                console.log('🔍 Avatar src after setting default:', avatarImg.src);
            }, 100);
            return;
        }

        let avatarUrl = user.avatar_url.trim();
        console.log('🔗 Original avatar URL from user data:', avatarUrl);
        
        try {
            // Process the URL based on memory about avatar URL construction
            avatarUrl = this.processAvatarUrl(avatarUrl);
            console.log('🔄 Processed avatar URL:', avatarUrl);
            
            // Only add cache-busting for local uploads, not external services
            let finalUrl = avatarUrl;
            const isLocalUpload = avatarUrl.startsWith('/uploads/') || avatarUrl.startsWith('uploads/');
            
            if (isLocalUpload) {
                const separator = avatarUrl.includes('?') ? '&' : '?';
                finalUrl = `${avatarUrl}${separator}t=${Date.now()}`;
                console.log('⚡ Local upload - added cache-busting:', finalUrl);
            } else {
                console.log('🌍 External service - no cache-busting to avoid rate limits:', finalUrl);
            }
            
            // For both local uploads and Google services, try direct loading
            if (isLocalUpload || avatarUrl.includes('googleusercontent.com') || avatarUrl.includes('googleapis.com')) {
                const serviceType = isLocalUpload ? 'Local upload' : 'Google service';
                console.log(`🔗 ${serviceType} detected - attempting direct load without testing`);
                
                // For local uploads, try different URL approaches
                if (isLocalUpload) {
                    console.log('🔧 Trying different URL approaches for local upload...');
                    
                    // Try the relative path first
                    console.log('📁 Attempt 1: Relative path -', finalUrl);
                    avatarImg.src = finalUrl;
                    
                    // Set up error handler that tries alternative URLs
                    const handleImageError = (event: Event) => {
                        console.warn(`❌ Relative path failed, trying HTTPS backend direct`);
                        
                        // Try direct backend URL with HTTPS (backend runs on HTTPS)
                        const backendUrl = `https://localhost:3000${finalUrl.split('?')[0]}`;
                        console.log('📁 Attempt 2: Direct backend HTTPS -', backendUrl);
                        
                        avatarImg.removeEventListener('error', handleImageError);
                        avatarImg.removeEventListener('load', handleImageLoad);
                        
                        // Set up new handlers for backend attempt
                        const handleBackendError = () => {
                            console.warn(`❌ Backend direct also failed, using default`);
                            avatarImg.src = defaultAvatar;
                        };
                        
                        const handleBackendLoad = () => {
                            console.log(`✅ Backend direct load successful!`);
                        };
                        
                        avatarImg.addEventListener('error', handleBackendError, { once: true });
                        avatarImg.addEventListener('load', handleBackendLoad, { once: true });
                        avatarImg.src = backendUrl;
                    };
                    
                    // Set up success handler
                    const handleImageLoad = (event: Event) => {
                        console.log(`✅ ${serviceType} loaded successfully via relative path!`);
                        avatarImg.removeEventListener('load', handleImageLoad);
                        avatarImg.removeEventListener('error', handleImageError);
                    };
                    
                    avatarImg.addEventListener('error', handleImageError, { once: true });
                    avatarImg.addEventListener('load', handleImageLoad, { once: true });
                    
                } else {
                    // Google service handling (unchanged)
                    avatarImg.src = finalUrl;
                    
                    const handleImageError = () => {
                        console.warn(`❌ ${serviceType} failed to load, using default`);
                        avatarImg.src = defaultAvatar;
                    };
                    
                    const handleImageLoad = () => {
                        console.log(`✅ ${serviceType} loaded successfully!`);
                    };
                    
                    avatarImg.addEventListener('error', handleImageError, { once: true });
                    avatarImg.addEventListener('load', handleImageLoad, { once: true });
                }
                
                // Add a timeout to check final state
                setTimeout(() => {
                    console.log('🔍 Avatar state after 2 seconds:');
                    console.log('  - Current src:', avatarImg.src);
                    console.log('  - Natural width:', avatarImg.naturalWidth);
                    console.log('  - Natural height:', avatarImg.naturalHeight);
                    console.log('  - Complete:', avatarImg.complete);
                }, 2000);
                return;
            }
            
            // Test if the image loads (for other external services)
            console.log('🧪 Testing if image loads...');
            const imageLoaded = await this.testImageLoad(finalUrl);
            
            if (imageLoaded) {
                console.log('✅ Custom avatar loaded successfully, setting src');
                avatarImg.src = finalUrl;
            } else {
                console.warn('❌ Custom avatar failed to load, using default');
                console.log('Setting default avatar src to:', defaultAvatar);
                avatarImg.src = defaultAvatar;
            }
            
            // Verify the final result
            setTimeout(() => {
                console.log('🔍 Final avatar src:', avatarImg.src);
                console.log('🔍 Avatar element visible?', avatarImg.offsetWidth > 0 && avatarImg.offsetHeight > 0);
            }, 200);
            
        } catch (error) {
            console.error('💥 Error loading custom avatar:', error);
            console.log('Setting fallback default avatar src to:', defaultAvatar);
            avatarImg.src = defaultAvatar;
        }
    }

    private processAvatarUrl(avatarUrl: string): string {
        console.log('🔧 Processing avatar URL:', avatarUrl);
        console.log('🌐 Current location:', {
            protocol: window.location.protocol,
            host: window.location.host,
            origin: window.location.origin
        });
        
        // Handle local uploads - backend serves uploads at /uploads/ prefix
        if (avatarUrl.startsWith('/uploads/') || 
            (avatarUrl.startsWith('uploads/') && !avatarUrl.startsWith('http'))) {
            // For development, the frontend dev server proxies /uploads/ to backend
            // So we should use relative paths, not absolute URLs
            const cleanPath = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
            console.log('📁 Local upload detected, using relative path for proxy:', cleanPath);
            return cleanPath; // Return relative path for dev server proxy
        }
        
        // Handle localhost:3000 URLs (backend server) - convert to relative path for proxy
        if (avatarUrl.includes('localhost:3000')) {
            // Extract the path part and make it relative for proxy
            const url = new URL(avatarUrl);
            const relativePath = url.pathname + url.search;
            console.log('🔄 Backend URL detected, converting to relative path:', relativePath);
            return relativePath;
        }
        
        // Return as-is for external URLs
        console.log('🌍 External URL, returning as-is:', avatarUrl);
        return avatarUrl;
    }

    private testImageLoad(url: string): Promise<boolean> {
        return new Promise((resolve) => {
            const testImg = new Image();
            
            // Don't set crossOrigin for same-origin requests to avoid CORS issues
            if (!url.startsWith(window.location.origin)) {
                testImg.crossOrigin = 'anonymous';
            }
            
            const timeout = setTimeout(() => {
                console.warn('⏰ Image load timeout for URL:', url);
                resolve(false);
            }, 5000);
            
            testImg.onload = () => {
                clearTimeout(timeout);
                console.log('✅ Image loaded successfully:', url);
                resolve(true);
            };
            
            testImg.onerror = (e) => {
                clearTimeout(timeout);
                console.error('❌ Image load error for URL:', url);
                console.error('Error details:', e);
                
                // Try to get more error info
                fetch(url, { method: 'HEAD' })
                    .then(response => {
                        console.log('🔍 HEAD request status:', response.status, response.statusText);
                        if (response.status === 429) {
                            console.warn('🚫 Rate limited! Too many requests to:', url);
                        }
                    })
                    .catch(fetchError => {
                        console.error('🔍 HEAD request failed:', fetchError);
                    });
                
                resolve(false);
            };
            
            console.log('🧪 Testing image load for:', url);
            testImg.src = url;
        });
    }

    private getDefaultAvatar(username: string): string {
        // Generate a consistent color based on username
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue},50%,50%&color=fff&size=256`;
    }

    private showError(message: string): void {
        if (!this.messagesContainer) {
            this.messagesContainer = document.getElementById('messages');
        }
        
        if (!this.messagesContainer) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
        errorDiv.textContent = message;
        
        this.messagesContainer.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => {
                if (errorDiv.parentNode === this.messagesContainer) {
                    this.messagesContainer?.removeChild(errorDiv);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ViewProfileHandler();
});
