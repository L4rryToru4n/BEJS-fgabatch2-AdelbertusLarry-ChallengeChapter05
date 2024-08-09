// https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn

const { Prisma } = require("@prisma/client");
const USERS = require("../models/users.model");
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

async function authenticate(req, res) {
  try {
    const body = req.body;
    let token = await USERS.getCredentials(body);

    if (token) {
      const result = {
        "status": true,
        "message": "Login successful !",
        "token": token
      }
      
      return res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      }).status(200).send(result);
    }
    else {
      const result = {
        "status": false,
        "message": "Login failed. Email or password doesn't match."
      }

      return res.status(401).send(result);
    }

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({
          "status": false,
          "message": "No such user has been found."
        });
      }
      return res.status(404).send({
        "status": false,
        "message": "Login failed. Please complete your data request."
      });
    }
  }
}

function whoami(req, res) {
  return res.status(200).json({
    status: true,
    message: "OK",
    data: { user: req.user }
  });
}

async function oauth2(req, res) {

  const temp = JSON.stringify(req.user, (key, value) =>
    typeof value === "bigint" ? value.toString() + "n" : value
  );
  const data = JSON.parse(temp);

  let token = jwt.sign({ ...data, password: null }, JWT_SECRET_KEY);

  return res.json({
    status: true,
    message: 'OK',
    data: { token }
  });
}

async function clearJWT(req, res) {
  res.clearCookie('access_token');
  return res.status(200).json({
    status: true,
    message: "Log out successful."
  });
} 

module.exports = {
  authenticate,
  whoami,
  oauth2,
  clearJWT
};