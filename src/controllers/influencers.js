const knex = require("../database/connection");

const registerInfluencer = async (req, res) => {
  const { id, authorized } = req.user;
  const { name, email, age, subscribers, at_channel, platform, id_category } = req.body;

  if (!authorized) {
    return res.status(401).json("Esse usuário não está autorizado a realizar cadastros");
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

const getInfluencers = async (req, res) => {
  try {
    const influencers = await knex("influencers").orderBy("id", "asc");
    let categoriesList = [];

    for (const influencer of influencers) {
      const categoryName = await knex("categories").where({ id: influencer.id_category }).first();

      influencer.category = categoryName.category;

      categoriesList.push(influencer);
    }

    res.status(200).json(categoriesList);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
}

const updateInfluencer = async (req, res) => {
  const { authorized } = req.user;
  const { idInfluencer } = req.params;
  const { name, email, age, subscribers, at_channel, platform, id_category } = req.body;

  if (!authorized) {
    return res.status(401).json("Esse usuário não está autorizado a realizar atualizações");
  }

  try {
    const influencer = await knex("influencers").where({ id: idInfluencer }).first();

    if (!influencer) {
      return res.status(404).json("Influencer não encontrado!")
    }

    if (email && influencer.email !== email) {
      const influencerEmail = await knex("influencers").where({ email }).first();

      if (influencerEmail) {
        return res.status(400).json("Este e-mail já foi cadastrado.");
      }
    }

    if (influencer.at_channel !== at_channel) {
      const channel = await knex("influencers").where({ at_channel }).first();

      if (channel) {
        return res.status(400).json("O @ do canal já possui registro.");
      }
    }

    const categorySelected = await knex("categories").select("category").where({ id: id_category }).first();

    if (!categorySelected) {
      return res.status(400).json("Categoria inválida.");
    }

    const updatedInfluencer = await knex("influencers").update({ name, email, age, subscribers, at_channel, platform, id_category }).where({ id: idInfluencer }).returning("*");

    const { category } = categorySelected;

    const newInfluencer = {
      ...updatedInfluencer[0],
      category
    }

    res.status(200).json(newInfluencer);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Erro interno do servidor!");
  }
}

const deleteInfluencer = async (req, res) => {
  const { authorized } = req.user;
  const { idInfluencer } = req.params;

  if (!authorized) {
    return res.status(401).json("Esse usuário não está autorizado a excluir registros");
  }

  try {
    const influencer = await knex("influencers").where({ id: idInfluencer }).first();

    if (!influencer) {
      return res.status(404).json("Influencer não encontrado!")
    }

    const deleteInfluencer = await knex("influencers").del().where({ id: idInfluencer });

    if (!deleteInfluencer) {
      return res.status(400).json("Não foi possível excluir o influenciador");
    }

    res.status(200).json("Influenciador excluído com sucesso");
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
}

module.exports = {
  registerInfluencer,
  getInfluencers,
  updateInfluencer,
  deleteInfluencer
}