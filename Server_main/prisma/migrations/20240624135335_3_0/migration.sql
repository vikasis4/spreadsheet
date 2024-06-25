/*
  Warnings:

  - You are about to drop the `Row` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Row";

-- CreateTable
CREATE TABLE "row" (
    "id" SERIAL NOT NULL,
    "column" TEXT[],

    CONSTRAINT "row_pkey" PRIMARY KEY ("id")
);
