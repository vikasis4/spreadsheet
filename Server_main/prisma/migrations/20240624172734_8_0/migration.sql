/*
  Warnings:

  - A unique constraint covering the columns `[rowId]` on the table `col` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "col_rowId_key" ON "col"("rowId");
