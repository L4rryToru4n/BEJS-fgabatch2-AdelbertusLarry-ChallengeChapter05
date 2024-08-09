const { PrismaClient, Prisma } = require('@prisma/client');
const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const ACCOUNT_TRANSACTION = {
  getAccountTransactions: async () => {
    try {
      let result = await client.bankAccounts.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          bank_account_number: true,
          user: {
            select: {
              name: true
            }
          },
          from_source_transfer: {
            select: {
              id: true,
              destination_account: {
                select: {
                  user: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              amount: true
            }
          },
          from_destination_transfer: {
            select: {
              id: true,
              source_account: {
                select: {
                  user: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              amount: true
            }
          }
        }
      })
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  getAccountTransaction: async (account_id) => {
    try {
      let result = await client.bankAccounts.findMany({
        where: {
          bank_account_number: Number(account_id),
          isDeleted: false
        },
        select: {
          id: true,
          bank_account_number: true,
          user: {
            select: {
              name: true
            }
          },
          from_source_transfer: {
            select: {
              destination_account: {
                select: {
                  user: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              amount: true
            }
          },
          from_destination_transfer: {
            select: {
              source_account: {
                select: {
                  user: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              amount: true
            }
          }
        }
      });
      return result;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        console.error(err.message);
      }
      throw err;
    }
  },
};

module.exports = ACCOUNT_TRANSACTION;