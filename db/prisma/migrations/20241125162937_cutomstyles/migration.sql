-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "CustomStyles" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "borderStyle" TEXT NOT NULL DEFAULT '',
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "CustomStyles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomStyles" ADD CONSTRAINT "CustomStyles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
