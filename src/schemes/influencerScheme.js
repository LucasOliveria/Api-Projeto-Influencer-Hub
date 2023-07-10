const joi = require("joi");

const influencerScheme = joi.object({
  name: joi.string().required().trim().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser vázio"
  }),
  email: joi.string().email().messages({
    "string.email": "O campo e-mail não está em um formato válido",
    "string.empty": "O campo e-mail não pode ser vázio"
  }),
  age: joi.number().positive().integer().messages({
    "number.positive": "O campo idade deve ser um número positivo",
    "number.integer": "O campo idade precisa ser um número inteiro",
    "number.base": "O campo idade precisa ser um número"
  }),
  subscribers: joi.number().required().positive().messages({
    "any.required": "O campo quantidade de inscritos é obrigatório",
    "number.positive": "O campo quantidade de inscritos deve ser um número positivo",
    "number.base": "O campo quantidade de inscritos precisa ser um número"
  }),
  at_channel: joi.string().required().trim().messages({
    "any.required": "O campo @ do canal é obrigatório",
    "string.empty": "O campo @ do canal não pode ser vázio"
  }),
  platform: joi.string().required().trim().messages({
    "any.required": "O campo plataforma é obrigatório",
    "string.empty": "O campo plataforma não pode ser vázio"
  }),
  id_category: joi.number().required().positive().integer().messages({
    "any.required": "O campo categoria é obrigatório",
    "number.positive": "O campo categoria deve ser um número positivo",
    "number.integer": "O campo categoria precisa ser um número inteiro",
    "number.base": "O campo categoria precisa ser um número"
  })
});

module.exports = influencerScheme;