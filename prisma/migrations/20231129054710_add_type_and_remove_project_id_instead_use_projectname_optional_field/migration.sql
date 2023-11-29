/*
  Warnings:

  - You are about to drop the column `projectId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CREATE', 'EDIT', 'DELETE', 'DONE');

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_projectId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "projectId",
ADD COLUMN     "projectName" TEXT,
ADD COLUMN     "type" "ActivityType" NOT NULL;
