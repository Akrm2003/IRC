// Match service for fetching match data from backend
export interface PongMatch {
    id: number;
    player2Name: string;
    winnerName: string;
    score_p1: number;
    score_p2: number;
    played_at: string;
    gameType?: string;
}

export interface RPSMatch {
    id: number;
    opponent: string;
    result: string; // 'win', 'loss', 'draw'
    score_p1: number;
    score_p2: number;
    created_at: string;
    game_type?: string;
}

export interface MatchStats {
    total_matches: number;
    wins: number;
    losses: number;
    draws?: number;
    win_rate: number;
}

export interface RPSHistoryResponse {
    matches: RPSMatch[];
    stats: MatchStats;
}

class MatchService {
    private baseUrl = '/api/users';
    private rpsBaseUrl = '/api/rps';

    /**
     * Get current user ID from profile
     */
    async getCurrentUserId(): Promise<number> {
        try {
            // Add cache-busting to prevent stale user data
            const cacheBuster = `?t=${Date.now()}`;
            
            const response = await fetch(`/api/users/profile${cacheBuster}`, {
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
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

    /**
     * Get user's Pong match history
     */
    async getPongMatches(): Promise<PongMatch[]> {
        try {
            // First get the current user ID
            const userId = await this.getCurrentUserId();
            
            // Add cache-busting to prevent stale data
            const cacheBuster = `?t=${Date.now()}`;
            
            const response = await fetch(`${this.baseUrl}/matches/${userId}${cacheBuster}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch pong matches: ${response.status}`);
            }

            const data = await response.json();
            console.log('📊 Pong matches received from backend:', data);
            
            // Log the first match to see the structure
            if (data && data.length > 0) {
                console.log('📋 First Pong match structure:', data[0]);
            }
            
            return data || [];
        } catch (error) {
            console.error('Error fetching pong matches:', error);
            throw error;
        }
    }

    /**
     * Get user's Rock Paper Scissors match history
     */
    async getRPSMatches(): Promise<RPSHistoryResponse> {
        try {
            // Add cache-busting to prevent stale data
            const cacheBuster = `?t=${Date.now()}`;
            
            const response = await fetch(`${this.rpsBaseUrl}/history${cacheBuster}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch RPS matches: ${response.status}`);
            }

            const data = await response.json();
            return data || { matches: [], stats: { total_matches: 0, wins: 0, losses: 0, draws: 0, win_rate: 0 } };
        } catch (error) {
            console.error('Error fetching RPS matches:', error);
            throw error;
        }
    }

    /**
     * Get combined match statistics
     */
    async getCombinedStats(): Promise<{
        totalMatches: number;
        totalWins: number;
        totalLosses: number;
        totalDraws: number;
        overallWinRate: number;
        pongStats: { matches: number; wins: number; losses: number; winRate: number };
        rpsStats: { matches: number; wins: number; losses: number; draws: number; winRate: number };
    }> {
        try {
            const [pongMatches, rpsData] = await Promise.all([
                this.getPongMatches(),
                this.getRPSMatches()
            ]);

            // Calculate Pong stats
            const pongWins = pongMatches.filter(match => {
                // Assuming the logged-in user is always player1
                return match.winnerName && (
                    match.winnerName.toLowerCase().includes('you') ||
                    match.score_p1 > match.score_p2
                );
            }).length;
            const pongLosses = pongMatches.length - pongWins;
            const pongWinRate = pongMatches.length > 0 ? (pongWins / pongMatches.length) * 100 : 0;

            // RPS stats from backend
            const rpsStats = rpsData.stats;

            // Combined stats
            const totalMatches = pongMatches.length + rpsStats.total_matches;
            const totalWins = pongWins + rpsStats.wins;
            const totalLosses = pongLosses + rpsStats.losses;
            const totalDraws = rpsStats.draws || 0;
            const overallWinRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

            return {
                totalMatches,
                totalWins,
                totalLosses,
                totalDraws,
                overallWinRate,
                pongStats: {
                    matches: pongMatches.length,
                    wins: pongWins,
                    losses: pongLosses,
                    winRate: pongWinRate
                },
                rpsStats: {
                    matches: rpsStats.total_matches,
                    wins: rpsStats.wins,
                    losses: rpsStats.losses,
                    draws: rpsStats.draws || 0,
                    winRate: rpsStats.win_rate
                }
            };
        } catch (error) {
            console.error('Error calculating combined stats:', error);
            throw error;
        }
    }

    /**
     * Format date for display
     */
    formatDate(dateString: string): string {
        try {
            if (!dateString) {
                console.warn('No date string provided');
                return 'No date';
            }
            
            const date = new Date(dateString);
            
            // Check if date is valid
            if (isNaN(date.getTime())) {
                console.warn('Invalid date string:', dateString);
                return 'Invalid date';
            }
            
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error, 'dateString:', dateString);
            return 'Unknown date';
        }
    }

    /**
     * Get result badge class for styling
     */
    getResultBadgeClass(result: string): string {
        switch (result.toLowerCase()) {
            case 'win':
                return 'win-badge';
            case 'loss':
                return 'loss-badge';
            case 'draw':
                return 'draw-badge';
            default:
                return 'draw-badge';
        }
    }

    /**
     * Determine if user won a pong match
     */
    isPongMatchWin(match: PongMatch): boolean {
        // Simple logic: if player1 score is higher, user won
        // This assumes the logged-in user is always player1
        return match.score_p1 > match.score_p2;
    }

    /**
     * Get pong match result
     */
    getPongMatchResult(match: PongMatch): 'win' | 'loss' | 'draw' {
        if (match.score_p1 > match.score_p2) return 'win';
        if (match.score_p1 < match.score_p2) return 'loss';
        return 'draw';
    }
}

// Export singleton instance
export const matchService = new MatchService();
