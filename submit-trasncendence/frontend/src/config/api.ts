export const API_CONFIG = {
    BASE_URL: '/auth',
    USERS_BASE_URL: '/api/users',  // This will work with your nginx proxy
    ENDPOINTS: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        VERIFY_SESSION: '/verify-session',
        REFRESH: '/refresh',
        SETUP_2FA: '/2fa/verify',
        VERIFY_2FA: '/2fa/login'
    }
};

export function getApiUrl(endpoint: string): string {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}