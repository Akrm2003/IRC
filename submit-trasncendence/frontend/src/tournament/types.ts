// User and Player types
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Player {
  id: string;
  playerName: string;
  isUser: boolean;
  seed: number;
  user?: User;
}

// Match related types
export type MatchStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Match {
  id: string;
  player1Name: string;
  player2Name: string | null;
  score_p1: number;
  score_p2: number;
  winnerName: string | null;
  status: MatchStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  matchId: string;
  roundNumber: number;
  matchNumber: number;
  player1Name: string;
  player2Name: string | null;
  match: Match;
}

// Tournament related types
export type TournamentStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Tournament {
  id: string;
  name: string;
  status: TournamentStatus;
  createdAt: string;
  updatedAt?: string;
  createdById: string;
  createdBy?: User;
  winnerName?: string | null;
  players: Player[];
  matches: TournamentMatch[];
  winnerId?: string;
  winner?: User;
}

// Form and API data types
export interface CreateTournamentData {
  name: string;
  players: string[]; // Array of user IDs
}

export interface SubmitMatchResultData {
  tournamentId: string;
  matchId: string;
  scoreP1: number;
  scoreP2: number;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Friend/User selection types
export interface Friend extends User {
  selected?: boolean;
}

// Component prop types
export interface CreateTournamentFormProps {
  onTournamentCreated: () => void;
  friends: Friend[];
  loading?: boolean;
}

export interface TournamentListProps {
  tournaments: Tournament[];
  loading?: boolean;
  onTournamentClick: (id: string) => void;
}

export interface TournamentDetailProps {
  tournament: Tournament;
  onBack: () => void;
  onMatchResultSubmit: (data: SubmitMatchResultData) => Promise<void>;
  isOrganizer: boolean;
}
