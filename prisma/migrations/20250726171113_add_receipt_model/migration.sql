-- CreateEnum
CREATE TYPE "receipt_status" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "receipt" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" DOUBLE PRECISION,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "receipt_status" NOT NULL DEFAULT 'COMPLETED',
    "notes" TEXT,
    "tripDate" TIMESTAMP(3) NOT NULL,
    "tripTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "receipt_userId_idx" ON "receipt"("userId");

-- CreateIndex
CREATE INDEX "receipt_tripDate_idx" ON "receipt"("tripDate");

-- CreateIndex
CREATE INDEX "receipt_status_idx" ON "receipt"("status");

-- CreateIndex
CREATE INDEX "receipt_deletedAt_idx" ON "receipt"("deletedAt");

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
