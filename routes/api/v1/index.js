const express = require('express');
const router = express.Router();
const USERS_ROUTER = require('./users/users');
const PROFILES_ROUTER = require('./profiles/profiles');
const BANK_ACCOUNTS_ROUTER = require('./bank_accounts/bank_accounts');
const TRANSACTIONS_ROUTER = require('./transactions/transactions');
const ACCOUNT_TRANSACTION_ROUTER = require('./account_transaction/account_transaction');
const AUTH_MIDDLEWARE = require('../../../middlewares/restrict');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Routes protected using Middleware
router.use('/users', AUTH_MIDDLEWARE, USERS_ROUTER);
router.use('/profiles', AUTH_MIDDLEWARE, PROFILES_ROUTER);
router.use('/bank_accounts', AUTH_MIDDLEWARE, BANK_ACCOUNTS_ROUTER);
router.use('/transactions', AUTH_MIDDLEWARE, TRANSACTIONS_ROUTER);
router.use('/account_transaction', AUTH_MIDDLEWARE, ACCOUNT_TRANSACTION_ROUTER);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Basic Banking System API with Swagger",
      version: "0.8.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      }
    },
    servers: [
      {
        url: "http://127.0.0.1:5000",
      },
    ],
  },
  apis: [
    "./routes/api/v1/account_transaction/*.js",
    "./routes/api/v1/bank_accounts/*.js",
    "./routes/api/v1/profiles/*.js",
    "./routes/api/v1/transactions/*.js",
    "./routes/api/v1/users/*.js",
    "./routes/api/v1/authentication/*.js"
  ],
};

const specs = swaggerJsdoc(options);

// Route for Swagger UI Documentation
router.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = router;