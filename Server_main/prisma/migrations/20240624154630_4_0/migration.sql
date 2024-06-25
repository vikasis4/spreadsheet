/*
  Warnings:

  - You are about to drop the column `column` on the `row` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "row" DROP COLUMN "column",
ADD COLUMN     "rowId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "col" (
    "id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "newId" TEXT NOT NULL,

    CONSTRAINT "col_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "col" ADD CONSTRAINT "col_id_fkey" FOREIGN KEY ("id") REFERENCES "row"("id") ON DELETE CASCADE ON UPDATE CASCADE;
