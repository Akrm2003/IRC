import { API_CONFIG } from '../config/api';

interface UserProfile {
    id: number;
    username: string;
    email: string;
    display_name: string | null;
    avatar_url: string | null;
    createdAt: string;
}

interface ProfileStats {
    totalMatches: number;
    totalWins: number;
    winRate: string;
    averageScore: string;
}

interface ProfileResponse {
    profile: UserProfile[];
    stats: ProfileStats;
}

class ProfileHandler {
    private baseURL: string = API_CONFIG.USERS_BASE_URL;// <-- FIXED
    private isViewingOtherUser: boolean = false;
    private viewingUserId: number | null = null;
    
    constructor() {
        this.checkForUserIdParam();
        this.loadProfile();
        this.initializeEventListeners();
    }

    private checkForUserIdParam(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        
        if (userId && !isNaN(Number(userId))) {
            this.isViewingOtherUser = true;
            this.viewingUserId = Number(userId);
            console.log('👤 Viewing other user profile:', userId);
        } else {
            this.isViewingOtherUser = false;
            this.viewingUserId = null;
            console.log('👤 Viewing own profile');
        }
    }

    private async loadProfile(): Promise<void> {
        try {
            // Use different endpoint based on whether viewing own or other user's profile
            const endpoint = this.isViewingOtherUser 
                ? `${this.baseURL}/profile/${this.viewingUserId}`
                : `${this.baseURL}/profile`;
                
            console.log('Fetching profile from:', endpoint);
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            console.log('Profile response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response text:', responseText);
            
            if (!response.ok) {
                console.error('Profile fetch failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: responseText
                });
                throw new Error(`Failed to load profile: ${response.status} ${response.statusText}`);
            }
    
            const data = JSON.parse(responseText);
            console.log('Parsed profile data:', data);
            this.displayProfile(data);
        } catch (error) {
            console.error('Profile loading error:', error);
            this.showError('Error loading profile. Please check console for details.');
        }
    }

    private displayProfile(data: any): void {
        console.log('Displaying profile data:', data);
        console.log('🔍 isViewingOtherUser:', this.isViewingOtherUser);
        console.log('🔍 viewingUserId:', this.viewingUserId);
        
        // Handle different response formats
        let user: UserProfile;
        let stats: ProfileStats;
        
        if (this.isViewingOtherUser) {
            console.log('👤 Displaying OTHER user profile');
            // Other user profile format: { profile: UserProfile, stats: ProfileStats }
            user = data.profile;
            stats = data.stats;
        } else {
            console.log('👤 Displaying OWN profile');
            // Own profile format: { profile: UserProfile[], stats: ProfileStats }
            if (!data.profile || !data.profile.length) {
                console.error('No profile data found in response');
                this.showError('Profile data not found');
                return;
            }
            user = data.profile[0];
            stats = data.stats;
        }

        if (!user) {
            this.showError('Profile data not found');
            return;
        }

        console.log('Displaying profile for user:', user.username, 'Avatar URL:', user.avatar_url);

        // Hide/show edit functionality based on whether viewing own profile
        this.toggleEditFunctionality();

        // Update avatar
        const avatarImg = document.getElementById('profileAvatar') as HTMLImageElement;
        if (avatarImg) {
            if (user.avatar_url) {
                // Use Vite proxy for uploaded avatars
                const avatarUrl = user.avatar_url.startsWith('/uploads/') 
                    ? `${user.avatar_url}?t=${new Date().getTime()}`
                    : user.avatar_url;
                console.log('Setting profile avatar URL to:', avatarUrl);
                avatarImg.src = avatarUrl;
                
                // Add error handling for avatar loading
                avatarImg.onerror = () => {
                    console.warn('Failed to load avatar, using default');
                    avatarImg.src = this.getDefaultAvatar(user.username);
                };
            } else {
                console.log('No avatar URL, using default');
                avatarImg.src = this.getDefaultAvatar(user.username);
            }
            avatarImg.alt = `${user.username}'s avatar`;
        }

        // Update profile info
        const usernameEl = document.getElementById('username');
        if (usernameEl) usernameEl.textContent = user.username;

        const displayNameEl = document.getElementById('displayName') as HTMLInputElement;
        if (displayNameEl) displayNameEl.value = user.display_name || '';

        const emailEl = document.getElementById('email');
        if (emailEl) emailEl.textContent = user.email;

        // Update stats
        const totalMatchesEl = document.getElementById('totalMatches');
        if (totalMatchesEl) totalMatchesEl.textContent = stats.totalMatches.toString();

        const totalWinsEl = document.getElementById('totalWins');
        if (totalWinsEl) totalWinsEl.textContent = stats.totalWins.toString();

        const winRateEl = document.getElementById('winRate');
        if (winRateEl) winRateEl.textContent = `${stats.winRate}%`;

        const avgScoreEl = document.getElementById('avgScore');
        if (avgScoreEl) avgScoreEl.textContent = stats.averageScore;
    }
    private getDefaultAvatar(username: string): string {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=1e293b&textColor=ffffff`;
    }

    private initializeEventListeners(): void {
        // Avatar upload modal
        const uploadBtn = document.getElementById('uploadAvatarBtn');
        const avatarModal = document.getElementById('avatarModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const chooseFileBtn = document.getElementById('chooseFileBtn');
        const takePictureBtn = document.getElementById('takePictureBtn');
        const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;
        
        // Open modal
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                avatarModal?.classList.remove('hidden');
            });
        }

        // Close modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeAvatarModal();
            });
        }

        // Choose file option
        if (chooseFileBtn) {
            chooseFileBtn.addEventListener('click', () => {
                avatarInput?.click();
            });
        }

        // Take picture option
        if (takePictureBtn) {
            takePictureBtn.addEventListener('click', () => {
                this.initializeCamera();
            });
        }

        // File input change
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    this.handleAvatarFile(file);
                    this.closeAvatarModal();
                }
            });
        }

        // Camera controls
        this.initializeCameraControls();

        // Profile update
        const updateForm = document.getElementById('profileUpdateForm') as HTMLFormElement;
        if (updateForm) {
            updateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }
    }

    private async uploadAvatar(file: File): Promise<void> {
        try {
            console.log('Starting avatar upload:', file.name, file.type, file.size);
            
            // Validate file
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                this.showError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                this.showError('File size must be less than 5MB');
                return;
            }

            const formData = new FormData();
            formData.append('avatar', file);

            const uploadBtn = document.getElementById('uploadAvatarBtn');
            if (uploadBtn) {
                uploadBtn.textContent = 'Uploading...';
                (uploadBtn as HTMLButtonElement).disabled = true;
            }

            console.log('Sending upload request to:', `${this.baseURL}/upload-avatar`);
            const response = await fetch(`${this.baseURL}/upload-avatar`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            console.log('Upload response status:', response.status);
            
            if (response.ok) {
                const result = await response.json();
                console.log('Upload result:', result);
                
                // Update avatar immediately with proxy URL
                const avatarImg = document.getElementById('profileAvatar') as HTMLImageElement;
                if (avatarImg && result.avatar_url) {
                    // Use Vite proxy instead of direct backend access
                    const avatarUrl = result.avatar_url.startsWith('/uploads/') 
                        ? `${result.avatar_url}?t=${new Date().getTime()}`
                        : result.avatar_url;
                    console.log('Setting avatar URL to:', avatarUrl);
                    avatarImg.src = avatarUrl;
                    
                    // Force image reload
                    avatarImg.onload = () => console.log('Avatar image loaded successfully');
                    avatarImg.onerror = (e) => console.error('Avatar image failed to load:', e);
                }

                this.showSuccess('Avatar updated successfully!');
                // No need to reload profile - avatar is already updated above
            } else {
                const errorText = await response.text();
                console.error('Upload failed:', response.status, errorText);
                try {
                    const error = JSON.parse(errorText);
                    this.showError(error.error || 'Failed to upload avatar');
                } catch {
                    this.showError(`Upload failed: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Avatar upload error:', error);
            this.showError('Error uploading avatar');
        } finally {
            const uploadBtn = document.getElementById('uploadAvatarBtn');
            if (uploadBtn) {
                uploadBtn.textContent = 'Change Avatar';
                (uploadBtn as HTMLButtonElement).disabled = false;
            }

            // Hide preview and reset input
            const avatarPreview = document.getElementById('avatarPreview') as HTMLImageElement;
            const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;
            
            if (avatarPreview) avatarPreview.style.display = 'none';
            if (avatarInput) avatarInput.value = '';
        }
    }

    private async updateProfile(): Promise<void> {
        try {
            const displayNameInput = document.getElementById('displayName') as HTMLInputElement;
            const displayName = displayNameInput?.value.trim();

            const response = await fetch(`${this.baseURL}/update-profile`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    display_name: displayName
                })
            });

            if (response.ok) {
                this.showSuccess('Profile updated successfully!');
            } else {
                const error = await response.json();
                this.showError(error.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            this.showError('Error updating profile');
        }
    }

    private showSuccess(message: string): void {
        this.removeMessages();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4';
        successDiv.textContent = message;
        
        const container = document.querySelector('.profile-container');
        if (container) {
            container.insertBefore(successDiv, container.firstChild);
            setTimeout(() => successDiv.remove(), 5000);
        }
    }

    private showError(message: string): void {
        this.removeMessages();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.profile-container');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }

    private removeMessages(): void {
        const messages = document.querySelectorAll('.bg-green-500\\/20, .bg-red-500\\/20');
        messages.forEach(msg => msg.remove());
    }

    private toggleEditFunctionality(): void {
        console.log('🔧 toggleEditFunctionality called, isViewingOtherUser:', this.isViewingOtherUser);
        
        // Hide edit functionality when viewing other users' profiles
        const editElements = [
            'editDisplayNameBtn',
            'uploadAvatarBtn',
            'displayNameInput',
            'saveDisplayNameBtn',
            'cancelDisplayNameBtn'
        ];

        editElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            console.log(`🔧 Element ${elementId}:`, element ? 'found' : 'NOT FOUND');
            if (element) {
                if (this.isViewingOtherUser) {
                    console.log(`🚫 Hiding ${elementId}`);
                    element.style.display = 'none';
                } else {
                    console.log(`✅ Showing ${elementId}`);
                    element.style.display = '';
                }
            }
        });

        // Update page title to indicate whose profile we're viewing
        const titleElement = document.querySelector('title');
        if (titleElement) {
            if (this.isViewingOtherUser) {
                titleElement.textContent = 'User Profile | Ping Pong Arena';
            } else {
                titleElement.textContent = 'My Profile | Ping Pong Arena';
            }
        }

        // Add a "Back to Chat" or "View Profile" indicator if viewing other user
        if (this.isViewingOtherUser) {
            this.addViewingOtherUserIndicator();
        }
    }

    private addViewingOtherUserIndicator(): void {
        // Add an indicator that we're viewing another user's profile
        const container = document.querySelector('.profile-container');
        if (container && !document.getElementById('viewing-other-user-indicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'viewing-other-user-indicator';
            indicator.className = 'bg-blue-500/20 border border-blue-500 text-blue-100 px-4 py-3 rounded-lg mb-4 flex items-center justify-between';
            indicator.innerHTML = `
                <span>👤 Viewing another user's profile</span>
                <button onclick="window.close()" class="text-blue-300 hover:text-blue-100 underline">
                    Close Tab
                </button>
            `;
            container.insertBefore(indicator, container.firstChild);
        }
    }

    private handleAvatarFile(file: File): void {
        // Show preview
        const avatarPreview = document.getElementById('profileAvatar') as HTMLImageElement;
        if (avatarPreview) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
        
        // Upload the file
        this.uploadAvatar(file);
    }

    private closeAvatarModal(): void {
        const avatarModal = document.getElementById('avatarModal');
        const cameraSection = document.getElementById('cameraSection');
        const video = document.getElementById('cameraVideo') as HTMLVideoElement;
        
        // Hide modal
        avatarModal?.classList.add('hidden');
        
        // Hide camera section
        cameraSection?.classList.add('hidden');
        
        // Stop camera stream
        if (video && video.srcObject) {
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    }

    private async initializeCamera(): Promise<void> {
        try {
            const cameraSection = document.getElementById('cameraSection');
            const video = document.getElementById('cameraVideo') as HTMLVideoElement;
            
            // Show camera section
            cameraSection?.classList.remove('hidden');
            
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user' // Front camera
                } 
            });
            
            video.srcObject = stream;
            
        } catch (error) {
            console.error('Camera access error:', error);
            this.showError('Unable to access camera. Please check permissions.');
        }
    }

    private initializeCameraControls(): void {
        const captureBtn = document.getElementById('captureBtn');
        const stopCameraBtn = document.getElementById('stopCameraBtn');
        
        if (captureBtn) {
            captureBtn.addEventListener('click', () => {
                this.capturePhoto();
            });
        }
        
        if (stopCameraBtn) {
            stopCameraBtn.addEventListener('click', () => {
                this.closeAvatarModal();
            });
        }
    }

    private capturePhoto(): void {
        const video = document.getElementById('cameraVideo') as HTMLVideoElement;
        const canvas = document.getElementById('cameraCanvas') as HTMLCanvasElement;
        
        if (!video || !canvas) return;
        
        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0);
            
            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    // Create file from blob
                    const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
                    this.handleAvatarFile(file);
                    this.closeAvatarModal();
                }
            }, 'image/jpeg', 0.9);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileHandler();
});