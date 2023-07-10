const knex = require("../database/connection");

const getCategories = async (req, res) => {
  try {
    const categories = await knex("categories");

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
}

module.exports = {
  getCategories
};