/*
  Warnings:

  - Added the required column `description` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "timeStamp" SET DEFAULT CURRENT_TIMESTAMP;
