import { getApiUrl, API_CONFIG } from '../config/api';

let isVerifying = false;
let isRedirecting = false;

/**
 * Verifies if the user is currently authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
export async function verifyAuthentication(): Promise<boolean> {
    try {
        console.log('🔍 Starting verification check');
        
        // Log token presence without exposing values
        const hasAccessToken = document.cookie.includes('token=');
        const hasRefreshToken = document.cookie.includes('refresh_token=');
        
        console.log('🍪 Token status:', {
            access: hasAccessToken ? 'Present' : 'Missing',
            refresh: hasRefreshToken ? 'Present' : 'Missing'
        });

        const response = await fetch('/api/auth/verify-session', {
            method: 'GET',
            credentials: 'include',  // Important: include credentials
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('📡 Verify response status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Verification successful:', data);
            return true;
        }

        // If response is 401, try refresh flow
        if (response.status === 401 && hasRefreshToken) {
            console.log('🔄 Attempting token refresh...');
            
            const refreshResponse = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });

            if (refreshResponse.ok) {
                console.log('✨ Token refreshed successfully');
                // Retry verification after refresh
                return await verifyAuthentication();
            }
        }

        console.log('❌ Verification failed');
        return false;

    } catch (error) {
        // Don't log verification errors to console for security
        return false;
    }
}

/**
 * Redirects to login page if not authenticated
 * @returns {Promise<boolean>} True if authenticated, false if redirected
 */
export async function requireAuth(): Promise<boolean> {
    // Prevent multiple simultaneous redirections
    if (isRedirecting) {
        console.log('🚫 Already redirecting, skipping...');
        return false;
    }
    
    const isAuthenticated = await verifyAuthentication();
    
    if (!isAuthenticated && !isRedirecting) {
        console.log('🔄 User not authenticated, redirecting to login...');
        isRedirecting = true;
        
        // Clear any stale auth data
        clearAuthData();
        
        // Use replace to avoid back button issues and reduce aborted requests
        window.location.replace('/auth/login');
        return false;
    }
    
    return true;
}

/**
 * Clear all authentication-related data
 */
function clearAuthData(): void {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    
    // Clear sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authToken');
    
    // Clear cookies (if you have control over them)
    const cookies = ['session_token', 'auth_token', 'tmp_token', 'user_session'];
    cookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
}

/**
 * Logs the user out
 * @returns {Promise<boolean>} True if logout was successful
 */
export async function logout(): Promise<boolean> {
    try {
        console.log("🔓 Sending logout request");
        
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        console.log("🔓 Logout response status:", response.status);
        
        // Always clear local data regardless of server response
        clearAuthData();
        
        // Reset flags
        isVerifying = false;
        isRedirecting = false;
        
        // Redirect to login
        window.location.href = '/auth/login.html';
        return true;
        
    } catch (error) {
        // Don't log logout errors to console for security
        clearAuthData();
        isVerifying = false;
        isRedirecting = false;
        window.location.href = '/auth/login.html';
        return false;
    }
}

/**
 * Check if user needs 2FA verification
 * @returns {Promise<boolean>} True if 2FA is needed
 */
export async function check2FAStatus(): Promise<boolean> {
    try {
        console.log('🔐 Checking 2FA status...');
        console.log('🍪 All cookies:', document.cookie);
        
        // Check if we have a full authentication token
        const hasAuthToken = document.cookie.includes('token=');
        
        // Only check for tmp_token if we don't have a full auth token
        if (!hasAuthToken) {
            const cookies = document.cookie.split(';');
            const hasTmpToken = cookies.some(cookie => {
                const trimmed = cookie.trim();
                return trimmed.startsWith('tmp_token=') && trimmed.split('=')[1];
            });
            
            console.log('🔐 Has tmp_token:', hasTmpToken);
            return hasTmpToken;
        }
        
        return false;
    } catch (error) {
        // Don't log 2FA status errors to console for security
        return false;
    }
}