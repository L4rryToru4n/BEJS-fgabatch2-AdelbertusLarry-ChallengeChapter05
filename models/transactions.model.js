// Create Model for Transactions

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TRANSACTIONS = {
  getTransactions: async () => {
    try {
      let result = await prisma.transactions.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          source_account_id: true,
          destination_account_id: true,
          amount: true
        }
      })
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  getTransaction: async (id) => {
    try {
      let result = await prisma.transactions.findUniqueOrThrow({
        where: {
          id: Number(id),
          isDeleted: false
        },
        select: {
          source_account_id: true,
          destination_account_id: true,
          amount: true
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  createTransaction: async (body) => {
    try {
      let result = await prisma.transactions.create({
        data: {
          source_account_id: body.source_account_id,
          destination_account_id: body.destination_account_id,
          amount: body.amount
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  updateTransaction: async (id, body) => {
    try {
      let result = await prisma.transactions.update({
        where: {
          id: Number(id)
        },
        data: {
          source_account_id: body.source_account_id,
          destination_account_id: body.destination_account_id,
          amount: body.amount
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  deleteTransaction: async (id) => {
    try {
      let result = await prisma.transactions.update({
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

module.exports = TRANSACTIONS;