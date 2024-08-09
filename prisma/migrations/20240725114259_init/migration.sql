-- AlterTable
ALTER TABLE "BankAccounts" ADD COLUMN     "isDeleted" BOOLEAN;

-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "isDeleted" BOOLEAN;

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "isDeleted" BOOLEAN;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isDeleted" BOOLEAN;
