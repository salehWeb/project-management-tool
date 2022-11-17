/*
  Warnings:

  - The values [USER] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fileUrl` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `isDark` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('ADMIN', 'PROJECT_MANAGER', 'DEVELOPER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';
COMMIT;

-- DropIndex
DROP INDEX "File_fileUrl_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileUrl";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "color",
DROP COLUMN "isDark";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';

-- CreateIndex
CREATE UNIQUE INDEX "File_name_key" ON "File"("name");
