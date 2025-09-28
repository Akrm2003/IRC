// RPS Game Session Manager - handles complete games (best of 3/5)
export interface RPSRound {
    your_move: 'rock' | 'paper' | 'scissors';
    opponent_move: 'rock' | 'paper' | 'scissors';
    result: 'win' | 'lose' | 'draw';
}

export interface RPSGameSession {
    opponent_name: string;
    mode: 'solo' | 'pass' | 'match';
    rounds: RPSRound[];
    your_score: number;
    opponent_score: number;
    target_score: number; // 3 for best of 5, 2 for best of 3
    is_complete: boolean;
    final_result?: 'win' | 'lose' | 'draw';
}

export class RPSSessionManager {
    private currentSession: RPSGameSession | null = null;
    private onGameComplete?: (session: RPSGameSession) => void;

    constructor(onGameComplete?: (session: RPSGameSession) => void) {
        this.onGameComplete = onGameComplete;
    }

    // Start a new game session
    startNewGame(opponentName: string, mode: 'solo' | 'pass' | 'match', targetScore: number = 3): void {
        this.currentSession = {
            opponent_name: opponentName,
            mode: mode,
            rounds: [],
            your_score: 0,
            opponent_score: 0,
            target_score: targetScore,
            is_complete: false
        };
        
        console.log(`🎮 Started new RPS game: ${mode} vs ${opponentName} (first to ${targetScore})`);
    }

    // Add a round result to the current session
    addRound(yourMove: 'rock' | 'paper' | 'scissors', opponentMove: 'rock' | 'paper' | 'scissors'): string {
        if (!this.currentSession || this.currentSession.is_complete) {
            console.warn('No active game session or game already complete');
            return 'draw';
        }

        // Determine round result
        const result = this.determineRoundResult(yourMove, opponentMove);
        
        // Add round to session
        const round: RPSRound = {
            your_move: yourMove,
            opponent_move: opponentMove,
            result: result
        };
        
        this.currentSession.rounds.push(round);

        // Update scores
        if (result === 'win') {
            this.currentSession.your_score++;
        } else if (result === 'lose') {
            this.currentSession.opponent_score++;
        }

        console.log(`Round ${this.currentSession.rounds.length}: ${yourMove} vs ${opponentMove} = ${result}`);
        console.log(`Score: You ${this.currentSession.your_score} - ${this.currentSession.opponent_score} ${this.currentSession.opponent_name}`);

        // Check if game is complete
        this.checkGameComplete();

        return result;
    }

    // Check if the game is complete and handle completion
    private checkGameComplete(): void {
        if (!this.currentSession) return;

        const { your_score, opponent_score, target_score } = this.currentSession;

        // Game is complete when someone reaches the target score
        if (your_score >= target_score || opponent_score >= target_score) {
            this.currentSession.is_complete = true;

            // Determine final result
            if (your_score > opponent_score) {
                this.currentSession.final_result = 'win';
            } else if (opponent_score > your_score) {
                this.currentSession.final_result = 'lose';
            } else {
                this.currentSession.final_result = 'draw';
            }

            console.log(`🏆 Game Complete! Final result: ${this.currentSession.final_result}`);
            console.log(`Final score: You ${your_score} - ${opponent_score} ${this.currentSession.opponent_name}`);

            // Notify completion callback
            if (this.onGameComplete) {
                this.onGameComplete(this.currentSession);
            }
        }
    }

    // Determine the result of a single round
    private determineRoundResult(yourMove: 'rock' | 'paper' | 'scissors', opponentMove: 'rock' | 'paper' | 'scissors'): 'win' | 'lose' | 'draw' {
        if (yourMove === opponentMove) return 'draw';
        
        if (
            (yourMove === 'rock' && opponentMove === 'scissors') ||
            (yourMove === 'paper' && opponentMove === 'rock') ||
            (yourMove === 'scissors' && opponentMove === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }

    // Get current session info
    getCurrentSession(): RPSGameSession | null {
        return this.currentSession;
    }

    // Check if there's an active game
    hasActiveGame(): boolean {
        return this.currentSession !== null && !this.currentSession.is_complete;
    }

    // Get current score
    getCurrentScore(): { your_score: number; opponent_score: number; target_score: number } | null {
        if (!this.currentSession) return null;
        
        return {
            your_score: this.currentSession.your_score,
            opponent_score: this.currentSession.opponent_score,
            target_score: this.currentSession.target_score
        };
    }

    // Reset/clear current session
    resetSession(): void {
        this.currentSession = null;
        console.log('🔄 RPS session reset');
    }

    // Submit complete game to backend
    async submitCompleteGame(): Promise<boolean> {
        if (!this.currentSession || !this.currentSession.is_complete) {
            console.warn('No complete game to submit');
            return false;
        }

        // Don't submit solo games
        if (this.currentSession.mode === 'solo') {
            console.log('Solo game - not submitting to backend');
            return true;
        }

        try {
            console.log('📤 Submitting complete RPS game to backend...');
            
            const response = await fetch('/api/rps/matches', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    opponent_name: this.currentSession.opponent_name,
                    rounds: this.currentSession.rounds,
                    final_result: this.currentSession.final_result,
                    your_score: this.currentSession.your_score,
                    opponent_score: this.currentSession.opponent_score,
                    mode: this.currentSession.mode
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Complete RPS game recorded successfully:', result);
                return true;
            } else {
                const errorData = await response.json();
                console.error('❌ Failed to record complete RPS game:', errorData);
                return false;
            }
        } catch (error) {
            console.error('❌ Error submitting complete RPS game:', error);
            return false;
        }
    }
}
