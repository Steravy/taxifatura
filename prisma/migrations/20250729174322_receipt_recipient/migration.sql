-- CreateTable
CREATE TABLE "receipt_recipient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "emailSentAt" TIMESTAMP(3),
    "emailDelivered" BOOLEAN NOT NULL DEFAULT false,
    "emailError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "receiptId" TEXT NOT NULL,

    CONSTRAINT "receipt_recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "receipt_recipient_receiptId_idx" ON "receipt_recipient"("receiptId");

-- CreateIndex
CREATE INDEX "receipt_recipient_email_idx" ON "receipt_recipient"("email");

-- CreateIndex
CREATE INDEX "receipt_recipient_emailSent_idx" ON "receipt_recipient"("emailSent");

-- AddForeignKey
ALTER TABLE "receipt_recipient" ADD CONSTRAINT "receipt_recipient_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "receipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
