-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
