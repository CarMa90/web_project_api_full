const { celebrate, Joi, Segments } = require("celebrate");

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
        /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i,
      )
      .messages({
        "any.required": "El campo link es requerido",
        "string.pattern.base": "El link tiene que ser una url válida",
      }),
  }),
});

const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "El cardId debe ser un ID válido de Mongo.",
        "any.required": "El cardId es obligatorio.",
      }),
  }),
});

module.exports = { createCardValidator, cardIdValidator };
