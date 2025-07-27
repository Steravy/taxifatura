/*
  Warnings:

  - Added the required column `vehicleId` to the `receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "receipt" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicle_userId_idx" ON "vehicle"("userId");

-- CreateIndex
CREATE INDEX "vehicle_deletedAt_idx" ON "vehicle"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_licensePlate_key" ON "vehicle"("licensePlate");

-- CreateIndex
CREATE INDEX "receipt_vehicleId_idx" ON "receipt"("vehicleId");

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
