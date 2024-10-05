/*
  Warnings:

  - Added the required column `userPrompt` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "userPrompt" TEXT NOT NULL;
