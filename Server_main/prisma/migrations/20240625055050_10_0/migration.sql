/*
  Warnings:

  - A unique constraint covering the columns `[num]` on the table `row` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "row_num_key" ON "row"("num");
