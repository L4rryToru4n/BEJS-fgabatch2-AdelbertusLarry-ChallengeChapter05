/*
  Warnings:

  - A unique constraint covering the columns `[bank_account_number]` on the table `BankAccounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Transactions_source_account_id_destination_account_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccounts_bank_account_number_key" ON "BankAccounts"("bank_account_number");
