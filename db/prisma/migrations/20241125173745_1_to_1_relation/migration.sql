/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `CustomStyles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomStyles_createdBy_key" ON "CustomStyles"("createdBy");
