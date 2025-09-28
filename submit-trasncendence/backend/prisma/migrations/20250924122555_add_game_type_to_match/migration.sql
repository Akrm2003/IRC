-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player1Id" INTEGER NOT NULL,
    "player2Name" TEXT NOT NULL,
    "winnerId" INTEGER,
    "winnerName" TEXT NOT NULL,
    "score_p1" INTEGER NOT NULL,
    "score_p2" INTEGER NOT NULL,
    "gameType" TEXT NOT NULL DEFAULT 'pong',
    "played_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Match_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("id", "played_at", "player1Id", "player2Name", "score_p1", "score_p2", "winnerId", "winnerName") SELECT "id", "played_at", "player1Id", "player2Name", "score_p1", "score_p2", "winnerId", "winnerName" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
