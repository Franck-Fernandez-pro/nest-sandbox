-- CreateTable
CREATE TABLE "Donation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "team" TEXT,
    "message" TEXT
);
