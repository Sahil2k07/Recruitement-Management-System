/*
  Warnings:

  - You are about to drop the column `TotalApplicant` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "TotalApplicant",
ADD COLUMN     "TotalApplicans" INTEGER NOT NULL DEFAULT 0;
