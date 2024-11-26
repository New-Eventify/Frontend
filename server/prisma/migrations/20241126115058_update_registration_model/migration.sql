/*
  Warnings:

  - You are about to drop the column `admissionId` on the `Registration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_admissionId_fkey";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "admissionId";

-- CreateTable
CREATE TABLE "RegistrationAdmission" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RegistrationAdmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegistrationAdmission" ADD CONSTRAINT "RegistrationAdmission_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationAdmission" ADD CONSTRAINT "RegistrationAdmission_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
