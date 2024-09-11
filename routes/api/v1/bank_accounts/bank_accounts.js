var express = require('express');
var router = express.Router();
const bank_account = require('../../../../controllers/bank_accounts.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     BankAccounts:
 *       type: object
 *       required:
 *         - user_id
 *         - bank_name
 *         - bank_account_number
 *         - balance
 *       properties:
 *         id:
 *           type: Big int
 *           description: The auto-generated id of the bank account
 *         user_id:
 *           type: Big int
 *           description: The bank account's related user id
 *         bank_name:
 *           type: string
 *           description: The bank name of the bank account
 *         bank_account_number:
 *           type: Big int
 *           description: The number of the bank account
 *         balance:
 *           type: float
 *           description: The balance number of the bank account
 *         isDeleted:
 *           type: boolean
 *           description: Whether the bank account has been deleted
 *       example:
 *         user_id: 1
 *         bank_name: Binar Bank
 *         bank_account_number: 1
 *         balance: 100.0
 *     GetBankAccountsResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The array of bank accounts objects
 *       example:
 *         status: true
 *         data: [
 *            {
 *               id: 1n,
 *               user_id: 1n,
 *               bank_name: Binar Bank,
 *               bank_account_number: 1n,
 *               balance: 80.0
 *            },
 *            {
 *               id: 2n,
 *               user_id: 2n,
 *               bank_name: Binar Bank,
 *               bank_account_number: 2n,
 *               balance: 90.0
 *            },
 *            {
 *               id: 3n,
 *               user_id: 3n,
 *               bank_name: Mawar Bank,
 *               bank_account_number: 3n,
 *               balance: 100.0
 *            }
 *         ]
 *     GetBankAccountsErrResponse:
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
 *         message: No bank accounts have been found
 *     GetBankAccountResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the bank account object
 *       example:
 *         status: true
 *         data: {
 *                id: 1n,
 *                user_id: 1n,
 *                bank_name: Binar Bank,
 *                bank_account_number: 1n,
 *                balance: 100.0
 *         }
 *     GetBankAccountErrResponse:
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
 *         message: No bank account has been found
 *     CreateBankAccountResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the bank account object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             bank_name: Binar Bank,
 *             bank_account_number: 1n,
 *             balance: 100.0,
 *             isDeleted: false
 *         }
 *     CreateBankAccountErrResponse:
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
 *         message: Create bank account failed. Please complete your data request.
 *     UpdateBankAccountResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the bank account object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             bank_name: Mawar Bank,
 *             bank_account_number: 3n,
 *             balance: 150.0,
 *             isDeleted: false
 *         }
 *     UpdateBankAccountErrResponse:
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
 *         message: Update bank account failed. Please complete your data request.
 *     DeleteBankAccountResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the bank account object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             user_id: 1n,
 *             bank_name: Binar Bank,
 *             bank_account_number: 1n,
 *             address: Example 02 St. No. 03,
 *             isDeleted: true
 *         }
 *     DeleteBankAccountErrResponse:
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
 *         message: Delete bank account failed. Please complete your data request
 * 
 */

/**
 * @swagger
 * tags:
 *   name: BankAccounts
 *   description: The management of bank accounts API
 * /bank_accounts:
 *   get:
 *     summary: Lists all of the bank accounts
 *     tags: [BankAccounts]
 *     responses:
 *       200:
 *         description: The list of the bank accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetBankAccountsResponse'
 *       404:
 *         description: The bank accounts were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBankAccountsErrResponse'
 * /bank_accounts/create:
 *   post:
 *     summary: Create a new bank account
 *     tags: [BankAccounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankAccounts'
 *     responses:
 *       200:
 *         description: The created bank account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBankAccountResponse'
 *       400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBankAccountErrResponse'
 * /bank_accounts/{id}:
 *   get:
 *     summary: Get the bank account by id
 *     tags: [BankAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bank account id
 *     responses:
 *       200:
 *         description: The bank account response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBankAccountResponse'
 *       404:
 *         description: The bank account was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBankAccountErrResponse'
 * /bank_accounts/update/{id}:
 *   put:
 *    summary: Update the bank account by the id
 *    tags: [BankAccounts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bank account id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BankAccounts'
 *    responses:
 *      200:
 *         description: The bank account was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateBankAccountResponse'
 *      400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateBankAccountErrResponse'
 * /bank_accounts/delete/{id}:
 *   delete:
 *     summary: Remove the bank account by id
 *     tags: [BankAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bank account id
 *     responses:
 *       200:
 *         description: The bank account was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteBankAccountResponse'
 *       400:
 *         description: The bank account was not found
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteBankAccountErrResponse'
 */

/* CRUD transactions */
router.get('/', bank_account.getBankAccounts);
router.get('/:id', bank_account.getBankAccount);
router.post('/create', bank_account.createBankAccount);
router.put('/update/:id', bank_account.updateBankAccount);
router.delete('/delete/:id', bank_account.deleteBankAccount);

module.exports = router;
