// Create Model for Bank Accounts

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BANK_ACCOUNTS = {
  getBankAccounts: async () => {
    try {
      let result = await prisma.bankAccounts.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          user_id: true,
          bank_name: true,
          bank_account_number: true,
          balance: true
        }
      })
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  getBankAccount: async (id) => {
    try {
      let result = await prisma.bankAccounts.findUniqueOrThrow({
        where: {
          id: Number(id),
          isDeleted: false
        },
        select: {
          id: true,
          user_id: true,
          bank_name: true,
          bank_account_number: true,
          balance: true
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  createBankAccount: async (body) => {
    try {
      let result = await prisma.bankAccounts.create({
        data: {
          user_id: body.user_id,
          bank_name: body.bank_name,
          bank_account_number: body.bank_account_number,
          balance: body.balance,
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  updateBankAccount: async (id, body) => {
    try {
      let result = await prisma.bankAccounts.update({
        where: {
          id: Number(id)
        },
        data: {
          user_id: body.user_id,
          bank_name: body.bank_name,
          bank_account_number: body.bank_account_number,
          balance: body.balance,
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  deleteBankAccount: async (id) => {
    try {
      let result = await prisma.bankAccounts.update({
        where: {
          id: Number(id)
        },
        data: {
          isDeleted: true
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
};

module.exports = BANK_ACCOUNTS;