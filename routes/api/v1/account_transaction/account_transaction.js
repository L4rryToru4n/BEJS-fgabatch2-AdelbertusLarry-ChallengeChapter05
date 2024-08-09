var express = require('express');
var router = express.Router();
const account_transaction = require('../../../../controllers/account_transaction.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     GetAccountTransactionsResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The array of account transactions objects
 *       example:
 *         status: true
 *         data: [
 *            {
 *               id: 1n,
 *               bank_account_number: 1n,
 *               user: {
 *                 name: John Doe
 *               },
 *               from_source_transfer: [
 *                 {
 *                    id: 1n,
 *                    destination_account: {
 *                      user: {
 *                        name: Mary Sue
 *                      }
 *                    },
 *                    amount: 10.0
 *                 }
 *               ],
 *               from_destination_transfer: [
 *                 {
 *                    id: 2n,
 *                    source_account: {
 *                      user: {
 *                        name: Mary Sue
 *                      }
 *                    },
 *                    amount: 15.0
 *                 }
 *               ]
 *            },
 *            {
 *               id: 2n,
 *               bank_account_number: 2n,
 *               user: {
 *                 name: Mary Sue
 *               },
 *               from_source_transfer: [
 *                 {
 *                    id: 2n,
 *                    destination_account: {
 *                      user: {
 *                        name: John Doe
 *                      }
 *                    },
 *                    amount: 15.0
 *                 }
 *               ],
 *               from_destination_transfer: [
 *                 {
 *                    id: 1n,
 *                    source_account: {
 *                      user: {
 *                        name: John Doe
 *                      }
 *                    },
 *                    amount: 10.0
 *                 }
 *               ]
 *            }
 *         ]
 *     GetAccountTransactionsErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: No account transactions have been found
 *     GetAccountTransactionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the account transaction object
 *       example:
 *         status: true
 *         data: {
 *                 id: 1n,
 *                 bank_account_number: 1n,
 *                 user: {
 *                  name: John Doe
 *                 },
 *                 from_source_transfer: [
 *                   {
 *                      id: 1n,
 *                      destination_account: {
 *                        user: {
 *                          name: Mary Sue
 *                        }
 *                      },
 *                      amount: 10.0
 *                   }
 *                 ],
 *                 from_destination_transfer: [
 *                   {
 *                      id: 2n,
 *                      destination_account: {
 *                        user: {
 *                          name: Mary Sue
 *                        }
 *                      },
 *                      amount: 15.0
 *                   }
 *                 ]
 *         }
 *     GetAccountTransactionErrResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         message:
 *           type: string
 *           description: The details of the response
 *       example:
 *         status: false
 *         message: No account transaction has been found
 */

/**
 * @swagger
 * tags:
 *   name: AccountTransactions
 *   description: The management of account transactions API
 * /account_transactions:
 *   get:
 *     summary: Lists all of the account transactions
 *     tags: [AccountTransactions]
 *     responses:
 *       200:
 *         description: The list of the account transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetAccountTransactionsResponse'
 *       404:
 *         description: The account transactions were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAccountTransactionsErrResponse'
 * /account_transactions/{account_id}:
 *   get:
 *     summary: Get the transaction by bank account number id
 *     tags: [AccountTransactions]
 *     parameters:
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bank account number id
 *     responses:
 *       200:
 *         description: The account transaction response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAccountTransactionResponse'
 *       404:
 *         description: The account transaction was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAccountTransactionErrResponse'
 */

/* GET account transactions */
router.get('/', account_transaction.getAccountTransactions);
router.get('/:account_id', account_transaction.getAccountTransaction);

module.exports = router;
