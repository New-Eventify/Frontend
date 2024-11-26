/*
  Warnings:

  - You are about to drop the `Admissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admissions" DROP CONSTRAINT "Admissions_ticketId_fkey";

-- DropTable
DROP TABLE "Admissions";
