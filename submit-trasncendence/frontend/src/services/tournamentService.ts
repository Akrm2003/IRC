import { Tournament, CreateTournamentData, SubmitMatchResultData, ApiResponse } from '../tournament/types';

const API_BASE = '/api/tournaments';

async function handleResponse<T>(response: Response): Promise<T> {
  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error('Failed to parse response as JSON:', error);
    throw new Error(`Invalid response from server: ${response.status} ${response.statusText}`);
  }
  
  if (!response.ok) {
    console.error('Error response data:', data);
    const errorMessage = data.error || 
                        data.message || 
                        (typeof data === 'string' ? data : 'An error occurred');
    throw new Error(errorMessage);
  }
  
  // If the response already has a data property, use it
  if (data.data !== undefined) {
    return data.data as T;
  }
  
  // Otherwise, use the whole response as data
  return data as T;
}

// Transform backend tournament data to match frontend types
function transformTournament(tournament: any): Tournament {
  console.log('Transforming tournament data:', tournament);
  
  if (!tournament) {
    console.error('Tournament data is null or undefined');
    throw new Error('Tournament data is null or undefined');
  }
  
  if (!tournament.id) {
    console.error('Tournament missing id field:', tournament);
    console.error('This usually indicates a backend serialization issue');
    throw new Error('Tournament data missing id field - backend may have serialization issues');
  }
  
  return {
    id: tournament.id.toString(),
    name: tournament.name,
    status: tournament.status,
    createdAt: new Date(tournament.createdAt).toISOString(),
    createdById: tournament.createdById?.toString() || '',
    winnerName: tournament.winnerName || null,
    players: tournament.players?.map((player: any) => ({
      id: player.id?.toString() || '',
      playerName: player.playerName || '',
      isUser: player.isUser || false,
      seed: player.seed || 0,
      user: player.user ? {
        id: player.user.id?.toString() || '',
        username: player.user.username || '',
        avatar: player.user.avatar_url || ''
      } : undefined
    })) || [],
    matches: tournament.matches?.map((match: any) => ({
      id: match.id?.toString() || '',
      tournamentId: match.tournamentId?.toString() || '',
      matchId: match.matchId?.toString() || '',
      roundNumber: match.roundNumber || 0,
      matchNumber: match.matchNumber || 0,
      player1Name: match.player1Name || '',
      player2Name: match.player2Name || null,
      match: {
        id: match.match?.id?.toString() || '',
        player1Name: match.match?.player1Name || '',
        player2Name: match.match?.player2Name || null,
        score_p1: match.match?.score_p1 || 0,
        score_p2: match.match?.score_p2 || 0,
        winnerName: match.match?.winnerName || null,
        status: match.match?.status || 'PENDING',
        createdAt: match.match?.createdAt || new Date().toISOString(),
        updatedAt: match.match?.updatedAt || new Date().toISOString()
      }
    })) || []
  };
}

export const createTournament = async (data: CreateTournamentData): Promise<Tournament> => {
  // Validate input data
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('Tournament name is required');
  }
  
  // Ensure we have a valid players array
  const players = Array.isArray(data.players) ? data.players : [];
  
  // Create the request payload
  const payload = {
    name: data.name.trim(),
    players: players
  };
  
  console.log('Sending tournament creation request:', {
    url: API_BASE,
    method: 'POST',
    data: payload,
    timestamp: new Date().toISOString()
  });
  
  console.log('Request payload stringified:', JSON.stringify(payload));
  
  // Test API connectivity
  console.log('Testing API endpoint connectivity...');
  
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });
    
    console.log('Raw response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    // Log response body for debugging
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      if (errorData.details) {
        console.error('Error details:', errorData.details);
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('Tournament created successfully:', result);
    console.log('Tournament object type:', typeof result.tournament);
    console.log('Tournament object keys:', result.tournament ? Object.keys(result.tournament) : 'No tournament object');
    
    // Handle different response formats
    if (result.tournament) {
      console.log('Using result.tournament:', result.tournament);
      return transformTournament(result.tournament);
    } else if (result.data) {
      console.log('Using result.data:', result.data);
      return transformTournament(result.data);
    } else {
      console.log('Using result directly:', result);
      return transformTournament(result);
    }
  } catch (error) {
    console.error('Error in createTournament:', error);
    throw error;
  }
};

export const getTournament = async (id: string): Promise<Tournament> => {
  console.log('Getting tournament with ID:', id);
  
  const response = await fetch(`${API_BASE}/${id}`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log('Get tournament response status:', response.status);
  
  if (!response.ok) {
    let errorMessage = 'Failed to get tournament';
    try {
      const error = await response.json();
      errorMessage = error.error || error.message || errorMessage;
      console.error('Get tournament error response:', error);
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log('Tournament data received:', data);
  return transformTournament(data);
};

export const getMyTournaments = async (): Promise<Tournament[]> => {
  console.log('🏆 Fetching user tournaments...');
  
  try {
    const response = await fetch(`${API_BASE}/my-tournaments`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Tournament fetch response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Raw tournament data received:', data);
    console.log('Data type:', typeof data, 'Is array:', Array.isArray(data));
    
    // If the response is an array, map each item through the transformer
    if (Array.isArray(data)) {
      console.log(`Processing ${data.length} tournaments from array`);
      const tournaments = data.map(transformTournament);
      console.log('Transformed tournaments:', tournaments);
      return tournaments;
    }
    
    // If the response has a data property that's an array, use that
    if (data.data && Array.isArray(data.data)) {
      console.log(`Processing ${data.data.length} tournaments from data.data`);
      return data.data.map(transformTournament);
    }
    
    // If it's a single tournament object
    if (data.id) {
      console.log('Processing single tournament object');
      return [transformTournament(data)];
    }
    
    // If we can't determine the format, return an empty array
    console.warn('Unexpected tournament data format:', data);
    return [];
    
  } catch (error) {
    console.error('❌ Failed to fetch tournaments:', error);
    throw error;
  }
};

export const submitMatchResult = async (
  tournamentId: string,
  matchId: string,
  scoreP1: number,
  scoreP2: number
): Promise<Tournament> => {
  const response = await fetch(
    `${API_BASE}/${tournamentId}/matches/${matchId}/result`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scoreP1, scoreP2 }),
      credentials: 'include',
    }
  );

  return handleResponse<Tournament>(response);
};

export const deleteTournament = async (tournamentId: string): Promise<void> => {
  console.log('Deleting tournament with ID:', tournamentId);
  
  const response = await fetch(`${API_BASE}/${tournamentId}`, {
    method: 'DELETE',
    credentials: 'include',
    // Remove Content-Type header since DELETE doesn't need a body
  });

  console.log('Delete response status:', response.status);
  
  if (!response.ok) {
    let errorMessage = 'Failed to delete tournament';
    try {
      const error = await response.json();
      errorMessage = error.error || error.message || errorMessage;
      console.error('Delete error response:', error);
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    throw new Error(errorMessage);
  }
};

// Submit match result from Pong game
export const submitPongMatchResult = async (
  tournamentId: string, 
  matchId: string, 
  winner: string, 
  scoreWinner: number, 
  scoreLoser: number
): Promise<Tournament> => {
  console.log('Submitting Pong match result:', { tournamentId, matchId, winner, scoreWinner, scoreLoser });
  
  // Convert to the format expected by the backend
  // Assuming player1 is the first player in the match, we need to determine scores
  const response = await fetch(`${API_BASE}/${tournamentId}/matches/${matchId}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      scoreP1: scoreWinner, // This will be adjusted based on who won
      scoreP2: scoreLoser,
      winner: winner
    }),
    credentials: 'include',
  });

  return handleResponse<Tournament>(response);
};
