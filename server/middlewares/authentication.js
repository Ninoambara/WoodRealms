const { Customer } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function customerAuthentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "unauthenticated" };
    }
    const payload = verifyToken(access_token);

    const findUser = await Customer.findByPk(payload.id);
    if (!findUser) {
      throw { name: "unauthenticated" };
    }
    req.user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = customerAuthentication;
