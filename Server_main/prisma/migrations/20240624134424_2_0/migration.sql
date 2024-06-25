/*
  Warnings:

  - You are about to drop the column `column1` on the `Row` table. All the data in the column will be lost.
  - You are about to drop the column `column2` on the `Row` table. All the data in the column will be lost.
  - You are about to drop the column `column3` on the `Row` table. All the data in the column will be lost.
  - You are about to drop the column `column86` on the `Row` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Row" DROP COLUMN "column1",
DROP COLUMN "column2",
DROP COLUMN "column3",
DROP COLUMN "column86",
ADD COLUMN     "column" TEXT[];
