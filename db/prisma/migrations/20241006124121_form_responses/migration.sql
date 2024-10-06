-- CreateTable
CREATE TABLE "FormResponses" (
    "id" TEXT NOT NULL,
    "jsonUserResponse" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormResponses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormResponses" ADD CONSTRAINT "FormResponses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
