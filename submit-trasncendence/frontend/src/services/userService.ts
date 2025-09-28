// Types for user data
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface UserStats {
  totalMatches: number;
  totalWins: number;
  winRate: string;
  averageScore: string;
}

export interface Profile {
    id: number;
    username: string;
    email: string;
    display_name?: string;
    avatar_url?: string;
    createdAt: string;
}

export interface ProfileStats {
    totalMatches: number;
    totalWins: number;
    winRate: string;
    averageScore: string;
}

export interface ProfileResponse {
    profile: Profile[];
    stats: ProfileStats;
}

export interface UserProfileWithStats {
    profile: Profile;
    stats: ProfileStats;
    friendStatus?: 'PENDING' | 'ACCEPTED' | 'NONE';
}

export interface FriendUser {
  id: number;
  username: string;
  display_name?: string;
  avatar_url?: string;
}

export interface Friend {
  id: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  onlineStatus: 'ONLINE' | 'OFFLINE' | 'INGAME';
  createdAt: string;
  updatedAt: string;
  senderId: number;
  receiverId: number;
  friend: {
    id: number;
    username: string;
    display_name?: string;
    avatar_url?: string;
  };
}

export interface FriendsResponse {
  friends: Friend[];
}

export interface Match {
  id: number;
  player1Id: number;
  player2Id: number;
  winnerId: number;
  score_p1: number;
  score_p2: number;
  createdAt: string;
}

export interface SearchUser {
  id: number;
  username: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  friendStatus: 'none' | 'friends' | 'request_sent' | 'request_received';
}

export interface SearchResult {
  users: SearchUser[];
  total: number;
  query: string;
}

export interface UserProfileResponse {
  profile: {
    id: number;
    username: string;
    display_name?: string;
    avatar_url?: string;
    created_at: string;
  };
  friendStatus: 'none' | 'friends' | 'request_sent' | 'request_received' | 'self';
  stats: {
    totalMatches: number;
    totalWins: number;
    winRate: string;
    averageScore: string;
  };
}

export class UserService {
    private baseUrl = '/api/users';

    /**
     * Get the current user's profile
     */
    async getProfile(): Promise<ProfileResponse> {
        try {
            console.log('🔄 Fetching profile data...');
            
            const response = await fetch(`${this.baseUrl}/profile`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('📡 Profile response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Profile fetch error:', errorData);
                throw new Error(errorData.message || 'Failed to fetch profile');
            }

            const data = await response.json();
            console.log('✅ Profile data received:', data);
            return data;
        } catch (error) {
            console.error('🚨 getProfile error:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(data: { display_name?: string; avatar_url?: string }): Promise<{ message: string }> {
        try {
          const response = await fetch(`${this.baseUrl}/upload/update-profile`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.status}`);
          }

          return await response.json();
        } catch (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      }

      /**
       * Get user's friends with optional cache-busting
       * @param forceRefresh If true, bypass cache and force a fresh fetch
       */
      async getFriends(forceRefresh: boolean = false): Promise<Friend[]> {
        try {
          console.log(`🔄 ${forceRefresh ? 'Force ' : ''}Fetching friends...`);
          const url = new URL(`${this.baseUrl}/friends`, window.location.origin);
          
          // Add cache-busting parameter if forcing refresh
          if (forceRefresh) {
            url.searchParams.append('_t', Date.now().toString());
          }
          
          const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Cache-Control': forceRefresh ? 'no-cache, no-store, must-revalidate' : 'default',
              'Pragma': forceRefresh ? 'no-cache' : 'default',
              'Expires': forceRefresh ? '0' : 'default'
            }
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch friends');
          }

          const data = await response.json();
          console.log('✅ Friends data received:', { 
            count: data.friends?.length || 0,
            hasUpdates: forceRefresh ? 'Forced refresh' : 'Normal fetch'
          });

          if (!data || !Array.isArray(data.friends)) {
            throw new Error('Invalid friends data structure');
          }

          return data.friends;
        } catch (error) {
          console.error('🚨 getFriends error:', error);
          throw error;
        }
      }

      /**
       * Search for users by username or display name
       */
      async searchUsers(query: string, limit: number = 10): Promise<SearchResult> {
        try {
          console.log('🔍 Searching users with query:', query);
          const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to search users');
          }

          const data = await response.json();
          console.log('✅ Search results:', data);
          // Ensure we return the correct SearchResult format
          return {
            users: Array.isArray(data) ? data : (data.users || []),
            total: data.total || (Array.isArray(data) ? data.length : 0),
            query: query
          };
        } catch (error) {
          console.error('🚨 searchUsers error:', error);
          throw error;
        }
      }

      /**
       * Get user profile by user ID
       */
      async getUserProfile(userId: number): Promise<UserProfileWithStats> {
        try {
          console.log('👤 Fetching user profile for ID:', userId);
          const response = await fetch(`${this.baseUrl}/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user profile');
          }

          const data = await response.json();
          console.log('✅ User profile data:', data);
          return data;
        } catch (error) {
          console.error('🚨 getUserProfile error:', error);
          throw error;
        }
      }

      /**
       * Send a friend request
       */
      async sendFriendRequest(friendId: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/friends/${friendId}`, {
          method: 'POST',
          credentials: 'include',
          headers: {}
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || 'Failed to send friend request');
        }
      }

      /**
       * Respond to a friend request
       */
      async respondToFriendRequest(friendId: number, status: 'ACCEPTED' | 'DECLINED'): Promise<void> {
        const endpoint = status === 'ACCEPTED' ? 'accept' : 'decline';
        const response = await fetch(`${this.baseUrl}/friends/${friendId}/${endpoint}`, { 
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to respond to friend request');
        }
      }

      /**
       * Remove a friend
       */
      async removeFriend(friendId: number): Promise<{ message: string }> {
        const response = await fetch(`${this.baseUrl}/friend/${friendId}`, { 
          method: 'DELETE',
          credentials: 'include'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to remove friend');
        }

        return await response.json();
      }

      /**
       * Get user's match history
       */
      async getMatches(userId: number): Promise<Match[]> {
        const response = await fetch(`${this.baseUrl}/matches/${userId}`, { 
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch matches');
        }

        return await response.json();
      }
}

// Export a singleton instance
export const userService = new UserService();