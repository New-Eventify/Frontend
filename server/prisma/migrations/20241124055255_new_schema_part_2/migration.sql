/*
  Warnings:

  - You are about to drop the `Admissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdmissionsToTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdmissionsToTicket" DROP CONSTRAINT "_AdmissionsToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdmissionsToTicket" DROP CONSTRAINT "_AdmissionsToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "eventCategory" DROP DEFAULT,
ALTER COLUMN "eventType" DROP DEFAULT,
ALTER COLUMN "title" DROP DEFAULT;

-- DropTable
DROP TABLE "Admissions";

-- DropTable
DROP TABLE "_AdmissionsToTicket";

-- CreateTable
CREATE TABLE "Admission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
