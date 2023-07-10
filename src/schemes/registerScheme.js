const joi = require("joi");

const registerScheme = joi.object({
  name: joi.string().required().trim().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser vázio"
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail não pode ser vázio",
    "string.email": "O campo e-mail não está em um formato válido"
  }),
  password: joi.string().required().trim().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha não pode ser vázio",
  }),
  authorized: joi.boolean().required().messages({
    "any.required": "O campo autorização é obrigatório",
    "boolean.base": "O campo autorização deve ser preenchido por verdadeiro ou falso"
  })
});

module.exports = registerScheme;