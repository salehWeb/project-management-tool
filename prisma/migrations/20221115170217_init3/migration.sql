-- AlterTable
ALTER TABLE "File" ALTER COLUMN "ticketId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "title" TEXT;
