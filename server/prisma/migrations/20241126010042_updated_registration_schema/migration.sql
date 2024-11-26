/*
  Warnings:

  - You are about to drop the column `name` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `admissionId` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_eventId_fkey";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "name",
ADD COLUMN     "admissionId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
