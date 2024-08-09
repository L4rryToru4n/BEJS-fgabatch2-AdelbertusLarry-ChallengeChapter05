const BANK_ACCOUNTS = require("../models/bank_accounts.model");

async function getBankAccounts(req, res) {
  try {
    let bank_account = await BANK_ACCOUNTS.getBankAccounts();

    const data = JSON.stringify(bank_account, (key, value) =>
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
      "message": "No bank accounts have been found."
    });
  }
}

async function getBankAccount(req, res) {
  try {
    const bank_account_id = req.params.id;
    let bank_account = await BANK_ACCOUNTS.getBankAccount(bank_account_id);

    const data = JSON.stringify(bank_account, (key, value) =>
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
      "message": "No bank account has been found."
    });
  }
}

async function createBankAccount(req, res) {
  try {
    const body = req.body;
    let bank_account = await BANK_ACCOUNTS.createBankAccount(body);

    const data = JSON.stringify(bank_account, (key, value) =>
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
      "message": "Create bank account failed. Please complete your data request."
    });
  }
}

async function updateBankAccount(req, res) {
  try {
    const body = req.body;
    const bank_account_id = req.params.id
    let bank_account = await BANK_ACCOUNTS.updateBankAccount(bank_account_id, body);

    const data = JSON.stringify(bank_account, (key, value) =>
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
      "message": "Update bank account failed. Please complete your data request."
    });
  }
}

async function deleteBankAccount(req, res) {
  try {
    const bank_account_id = req.params.id
    let bank_account = await BANK_ACCOUNTS.deleteBankAccount(bank_account_id);

    const data = JSON.stringify(bank_account, (key, value) =>
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
      "message": "Delete profile failed. Please complete your data request."
    });
  }
}

module.exports = {
  getBankAccounts,
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount
};