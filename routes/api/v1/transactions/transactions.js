var express = require('express');
var router = express.Router();
const transaction = require('../../../../controllers/transactions.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Transactions:
 *       type: object
 *       required:
 *         - source_account_id
 *         - destination_account_id
 *         - amount
 *       properties:
 *         id:
 *           type: Big int
 *           description: The auto-generated id of the transaction
 *         source_account_id:
 *           type: Big int
 *           description: The transaction's related source account id
 *         destination_account_id:
 *           type: Big int
 *           description: The transaction's related destination account id
 *         amount:
 *           type: Big int
 *           description: The amount number of the transaction
 *       example:
 *         source_account_id: 1
 *         destination_account_id: 2
 *         amount: 20.0
 *     GetTransactionsResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The array of transactions objects
 *       example:
 *         status: true
 *         data: [
 *            {
 *               id: 1n,
 *               source_account_id: 2n,
 *               destination_account_id: 1n,
 *               amount: 30.0,
 *            },
 *            {
 *               id: 2n,
 *               source_account_id: 1n,
 *               destination_account_id: 3n,
 *               amount: 40.0,
 *            },
 *            {
 *               id: 3n,
 *               source_account_id: 2n,
 *               destination_account_id: 3n,
 *               amount: 50.0,
 *            }
 *         ]
 *     GetTransactionsErrResponse:
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
 *         message: No transactions have been found
 *     GetTransactionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the transaction object
 *       example:
 *         status: true
 *         data: {
 *                source_account_id: 2n,
 *                destination_account_id: 3n,
 *                amount: 20.0
 *         }
 *     GetTransactionErrResponse:
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
 *         message: No transaction has been found
 *     CreateTransactionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the transaction object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             source_account_id: 3n,
 *             destination_account_id: 2n,
 *             amount: 40.0,
 *             isDeleted: false
 *         }
 *     CreateTransactionErrResponse:
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
 *         message: Create transaction failed. Please complete your data request.
 *     UpdateTransactionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the transaction object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             source_account_id: 1n,
 *             destination_account_id: 2n,
 *             amount: 20.0,
 *             isDeleted: false
 *         }
 *     UpdateTransactionErrResponse:
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
 *         message: Update transaction failed. Please complete your data request.
 *     DeleteTransactionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the transaction object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             source_account_id: 1n,
 *             destination_account_id: 2n,
 *             amount: 15.0,
 *             isDeleted: true
 *         }
 *     DeleteTransactionErrResponse:
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
 *         message: Delete transaction failed. Please complete your data request
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: The management of transactions API
 * /transactions:
 *   get:
 *     summary: Lists all of the bank accounts
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: The list of the transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTransactionsResponse'
 *       404:
 *         description: The transactions were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionsErrResponse'
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transactions'
 *     responses:
 *       200:
 *         description: The created transaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTransactionResponse'
 *       400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTransactionErrResponse'
 * /transactions/{id}:
 *   get:
 *     summary: Get the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: The transaction response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionResponse'
 *       404:
 *         description: The bank account was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionErrResponse'
 *   put:
 *    summary: Update the transaction by the id
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transactions'
 *    responses:
 *      200:
 *         description: The bank transaction was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionResponse'
 *      400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionErrResponse'
 *   delete:
 *     summary: Remove the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: The transaction was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteTransactionResponse'
 *       400:
 *         description: The transaction was not found
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteTransactionErrResponse'
 */

/* CRUD transactions */
router.get('/', transaction.getTransactions);
router.get('/:id', transaction.getTransaction);
router.post('/create', transaction.createTransaction);
router.put('/update/:id', transaction.updateTransaction);
router.delete('/delete/:id', transaction.deleteTransaction);

module.exports = router;
