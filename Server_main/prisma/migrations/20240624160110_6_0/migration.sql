/*
  Warnings:

  - You are about to drop the column `newId` on the `col` table. All the data in the column will be lost.
  - The primary key for the `row` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `row` table. All the data in the column will be lost.
  - Added the required column `rowId` to the `col` table without a default value. This is not possible if the table is not empty.
  - Added the required column `num` to the `row` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "col" DROP CONSTRAINT "col_id_fkey";

-- AlterTable
ALTER TABLE "col" DROP COLUMN "newId",
ADD COLUMN     "rowId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "row" DROP CONSTRAINT "row_pkey",
DROP COLUMN "id",
ADD COLUMN     "num" INTEGER NOT NULL,
ALTER COLUMN "rowId" DROP DEFAULT,
ALTER COLUMN "rowId" SET DATA TYPE TEXT,
ADD CONSTRAINT "row_pkey" PRIMARY KEY ("rowId");
DROP SEQUENCE "row_rowId_seq";

-- AddForeignKey
ALTER TABLE "col" ADD CONSTRAINT "col_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "row"("rowId") ON DELETE CASCADE ON UPDATE CASCADE;
