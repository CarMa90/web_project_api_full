const { celebrate, Joi } = require("celebrate");

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "El campo nombre es requerido",
      "string.min": "El campo nombre debe tener al menos 2 caracteres",
      "string.max": "El campo nombre debe tener menos de 30 caracteres",
    }),
    link: Joi.string()
      .required()
      .pattern(
        new RegExp(
          /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i,
        ),
      )
      .messages({
        "any.required": "El campo link es requerido",
        "string.pattern.base": "El link tiene que ser una url válida",
      }),
  }),
});

module.exports = { createCardValidator };
