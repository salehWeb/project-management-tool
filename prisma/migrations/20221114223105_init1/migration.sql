-- CreateEnum
CREATE TYPE "Rate" AS ENUM ('card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10');

-- DropIndex
DROP INDEX "Project_projectMangerId_key";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "rate" "Rate" NOT NULL DEFAULT 'card5';
