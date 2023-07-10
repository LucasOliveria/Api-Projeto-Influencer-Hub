const jwt = require("jsonwebtoken");
const knex = require("../database/connection");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password, authorized } = req.body;

  if (!name) {
    res.json("aqui")
  }

  try {
    const user = await knex("users").where({ email }).first();

    if (user) {
      return res.status(400).json("Este e-mail já possui cadastro.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await knex("users").insert({ name, email, password: encryptedPassword, authorized });

    return res.status(201).json("Usuário cadastrado com sucesso!")
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await knex("users").where({ email }).first()

    if (!user) {
      return res.status(400).json("Usuário ou senha incorreta!");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json("Usuário ou senha incorreta!");
    }

    const token = jwt.sign({ id: user.id }, process.env.PASS_JWT, { expiresIn: "8h" });

    const { password: _, ...userInfo } = user;

    return res.status(200).json({ usuario: userInfo, token });
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
}

const getProfile = async (req, res) => {
  res.status(200).json(req.user);
}

module.exports = {
  registerUser,
  login,
  getProfile
}