-- CreateTable
CREATE TABLE "Admissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Admissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdmissionsToTicket" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdmissionsToTicket_AB_unique" ON "_AdmissionsToTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_AdmissionsToTicket_B_index" ON "_AdmissionsToTicket"("B");

-- AddForeignKey
ALTER TABLE "_AdmissionsToTicket" ADD CONSTRAINT "_AdmissionsToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Admissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdmissionsToTicket" ADD CONSTRAINT "_AdmissionsToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
