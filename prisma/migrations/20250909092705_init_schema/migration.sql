-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,
    "light" TEXT,
    "lightOther" TEXT,
    "watering" TEXT,
    "wateringOther" TEXT,
    "tempMinC" INTEGER,
    "tempMaxC" INTEGER,
    "humidityMin" INTEGER,
    "humidityMax" INTEGER,
    "climateNotes" TEXT,
    "repotMinYears" INTEGER,
    "repotMaxYears" INTEGER,
    "repotOther" TEXT,
    "petSafe" BOOLEAN,
    "petNotes" TEXT,
    "imageUrl" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "ingredients" JSONB,
    "steps" JSONB,
    "tags" JSONB,
    "prepTimeMin" INTEGER,
    "cookTimeMin" INTEGER,
    "difficulty" TEXT NOT NULL DEFAULT 'EASY',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipe_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "location" TEXT,
    "appliedAt" DATETIME,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "contractType" TEXT,
    "cvUrl" TEXT,
    "coverUrl" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Plant_ownerId_idx" ON "Plant"("ownerId");

-- CreateIndex
CREATE INDEX "Recipe_ownerId_idx" ON "Recipe"("ownerId");

-- CreateIndex
CREATE INDEX "Application_ownerId_idx" ON "Application"("ownerId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");
