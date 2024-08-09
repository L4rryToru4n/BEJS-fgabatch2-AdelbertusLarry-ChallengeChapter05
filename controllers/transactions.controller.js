const TRANSACTIONS = require("../models/transactions.model");

async function getTransactions(req, res) {
  try {
    let transaction = await TRANSACTIONS.getTransactions();

    const data = JSON.stringify(transaction, (key, value) =>
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
      "message": "No transactions have been found."
    });
  }
}

async function getTransaction(req, res) {
  try {
    const transaction_id = req.params.id;
    let transaction = await TRANSACTIONS.getTransaction(transaction_id);

    const data = JSON.stringify(transaction, (key, value) =>
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
      "message": "No transaction has been found."
    });
  }
}

async function createTransaction(req, res) {
  try {
    const body = req.body;
    let transaction = await TRANSACTIONS.createTransaction(body);

    const data = JSON.stringify(transaction, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Create transaction failed. Please complete your data request."
    });
  }
}

async function updateTransaction(req, res) {
  try {
    const body = req.body;
    const transaction_id = req.params.id
    let transaction = await TRANSACTIONS.updateTransaction(transaction_id, body);

    const data = JSON.stringify(transaction, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Update transaction failed. Please complete your data request."
    });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transaction_id = req.params.id
    let transaction = await TRANSACTIONS.deleteTransaction(transaction_id);

    const data = JSON.stringify(transaction, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    const temp = JSON.parse(data);

    const result = {
      "status": true,
      "data": temp
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      "status": false,
      "message": "Delete transaction failed. Please complete your data request."
    });
  }
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
};