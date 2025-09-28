/*
  Warnings:

  - You are about to drop the column `OnlineStatus` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `friendId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Friend` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Friend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER,
    "receiverId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'NOTHING',
    "onlineStatus" TEXT NOT NULL DEFAULT 'OFFLINE',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Friend_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Friend_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Friend" ("created_at", "id", "status", "updated_at") SELECT "created_at", "id", "status", "updated_at" FROM "Friend";
DROP TABLE "Friend";
ALTER TABLE "new_Friend" RENAME TO "Friend";
CREATE UNIQUE INDEX "Friend_senderId_receiverId_key" ON "Friend"("senderId", "receiverId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
