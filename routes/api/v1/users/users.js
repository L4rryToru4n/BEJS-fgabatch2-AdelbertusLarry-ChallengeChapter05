var express = require('express');
var router = express.Router();
const user = require('../../../../controllers/users.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: Big int
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The fullname of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           description: The password key of the user
 *         isDeleted:
 *           type: boolean
 *           description: Whether the user has been deleted
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: password123
 *     GetUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the user object
 *       example:
 *         status: true
 *         data: {
 *                id: 1n,
 *                name: John Doe,
 *                email: john.doe@example.com
 *         }
 *     GetUserErrResponse:
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
 *         message: No user has been found
 *     GetUsersResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: array of objects
 *           description: The array of users objects
 *       example:
 *         status: true
 *         data: [
 *            {
 *               id: 1n,
 *               name: John Doe,
 *               email: john.doe@example.com
 *            },
 *            {
 *               id: 2n,
 *               name: Mary Sue,
 *               email: mary.sue@example.com
 *            },
 *            {
 *               id: 3n,
 *               name: Kevin Witt,
 *               email: kevin.witt@example.com
 *            },
 *         ]
 *     GetUsersErrResponse:
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
 *         message: No users have been found
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the user object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             name: John Doe,
 *             email: john.doe@example.com,
 *             password: $2a$12$7U5z1j1mn5/1.L6HkdHiQuYeCngvOLYhRWcABLQCspcEEKEvXfzd.,
 *             isDeleted: false
 *         }
 *     CreateUserErrResponse:
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
 *         message: Create user failed. Please complete your data request.
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: Object
 *           description: The details of the user object
 *       example:
 *         status: true
 *         data: {
 *             id: 1n,
 *             name: John Doe,
 *             email: john.doe@example.com,
 *             password: $2a$12$7U5z1j1mn5/1.L6HkdHiQuYeCngvOLYhRWcABLQCspcEEKEvXfzd.,
 *             isDeleted: false
 *         }
 *     UpdateUserErrResponse:
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
 *         message: Update user failed. Please complete your data request.
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Whether the response is a success 
 *         data:
 *           type: object
 *           description: The details of the user object
 *       example:
 *         status: true
 *         data: {
 *                id: 1n,
 *                name: John Doe,
 *                email: john.doe@example.com,
 *                password: $2a$12$7U5z1j1mn5/1.L6HkdHiQuYeCngvOLYhRWcABLQCspcEEKEvXfzd.,
 *                isDeleted: true
 *         }
 *     DeleteUserErrResponse:
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
 *         message: Delete user failed. Please complete your data request
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The management of users API
 * /users:
 *   get:
 *     summary: Lists all of the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/GetUsersResponse'
 *       404:
 *         description: The users were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersErrResponse'
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserErrResponse'
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *       404:
 *         description: The user was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserErrResponse'
 * /users/update/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       400:
 *         description: Request failed because of a bad request or malformed body request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserErrResponse'
 * /users/delete/{i}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteUserResponse'
 *       400:
 *         description: The user was not found
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteUserErrResponse'
 */

router.get('/', user.getUsers);
router.get('/:id', user.getUser);
router.post('/create', user.createUser);
router.put('/update/:id', user.updateUser);
router.delete('/delete/:id', user.deleteUser);

module.exports = router;
