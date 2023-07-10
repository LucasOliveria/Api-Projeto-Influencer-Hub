const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json("Usuário não autorizado!");
  }

  const justToken = authorization.split(" ")[1]

  try {
    const verifyToken = jwt.verify(justToken, process.env.PASS_JWT);

    const user = await knex("users").where({ id: verifyToken.id }).select("id", "name", "email", "authorized").first();

    if (!user) {
      return res.status(401).json("Usuário não autorizado!");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json("Usuário não autorizado!");
  }
}

module.exports = validateToken;