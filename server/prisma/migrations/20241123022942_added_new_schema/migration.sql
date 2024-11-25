/*
  Warnings:

  - You are about to drop the column `ticketType` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketType";

-- CreateTable
CREATE TABLE "Admissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Admissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Admissions" ADD CONSTRAINT "Admissions_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
