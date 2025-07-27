/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_slug_key" ON "vehicle"("slug");

-- CreateIndex
CREATE INDEX "vehicle_slug_idx" ON "vehicle"("slug");
