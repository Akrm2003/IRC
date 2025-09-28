-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "google_id" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "avatar_url" TEXT,
    "display_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "totp_secret" TEXT
);
INSERT INTO "new_User" ("avatar_url", "created_at", "display_name", "email", "id", "password", "totp_secret", "updated_at", "username") SELECT "avatar_url", "created_at", "display_name", "email", "id", "password", "totp_secret", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_totp_secret_key" ON "User"("totp_secret");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
