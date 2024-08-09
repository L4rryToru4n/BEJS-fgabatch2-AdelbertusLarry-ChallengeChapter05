const ACCOUNT_TRANSACTION = require("../models/account_transaction.model");

async function getAccountTransactions(req, res) {
  try {
    let account_transaction = await ACCOUNT_TRANSACTION.getAccountTransactions();

    const data = JSON.stringify(account_transaction, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No user transactions have been found."
    });
  }
}

async function getAccountTransaction(req, res) {
  try {
    const bank_account_id = req.params.account_id;
    let account_transaction = await ACCOUNT_TRANSACTION.getAccountTransaction(bank_account_id);

    const data = JSON.stringify(account_transaction, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(404).json({
      "status": false,
      "message": "No user has been found."
    });
  }
}

module.exports = {
  getAccountTransactions,
  getAccountTransaction,
};