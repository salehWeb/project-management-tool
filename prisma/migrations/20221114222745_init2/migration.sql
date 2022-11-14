/*
  Warnings:

  - You are about to drop the column `projectId` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDark` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TicketStatus" ADD VALUE 'REVIEWING';

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "isDark" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "projectId";
