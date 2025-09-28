# Backend Integration Guide

## ✅ Status: Ready for Backend

Both games auto-submit match results to `/api/users/matches` when someone wins.

## API Format
```json
{
    "player2_name": "Guest Name",
    "winner_name": "Winner Name", 
    "score_p1": 5,  // logged-in user
    "score_p2": 3   // guest/AI
}
```

## To Activate
1. Uncomment fetch code in both `submitMatchResult` functions:
   - `frontend/game/game_ai/game_final.ts`
   - `frontend/game/game_pvp/game_final.ts`
2. Recompile: `npx tsc` in each folder

## Testing
- Play until score = 5
- Check console for match data
- When ready, uncomment fetch to send to backend
