const knex = require("../database/connection");

const registerInfluencer = async (req, res) => {
  const { id, authorized } = req.user;
  const { name, email, age, subscribers, at_channel, platform, id_category } = req.body;

  if (!authorized) {
    return res.status(401).json("Esse usuário não está autorizado para realizar cadastros");
  }

  try {
    if (email) {
      const influencer = await knex("influencers").where({ email }).first();

      if (influencer) {
        return res.status(400).json("Este e-mail já foi cadastrado.");
      }
    }

    const channel = await knex("influencers").where({ at_channel }).first();

    if (channel) {
      return res.status(400).json("O @ do canal já possui registro.");
    }

    const categorySelected = await knex("categories").select("category").where({ id: id_category }).first();

    if (!categorySelected) {
      return res.status(400).json("Categoria inválida.");
    }

    const registeredInfluencer = await knex("influencers").insert({ name, email, age, subscribers, at_channel, platform, id_user: id, id_category }).returning("*");

    const { category } = categorySelected;

    const newInfluencer = {
      ...registeredInfluencer[0],
      category
    }

    res.status(200).json(newInfluencer);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Erro interno do servidor!");
  }

}

module.exports = {
  registerInfluencer
}