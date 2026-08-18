const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const userRegisterValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email().messages({
        "any.required": "El campo email es requerido",
        "string.email": "El formato de email es incorrecto",
      }),
      password: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .messages({
          "string.min": "La contraseña debe de ser de al menos 8 caracteres",
          "string.pattern.base":
            "La contraseña debe de contener al menos una mayuscula, una minuscula, un número y un símbolo",
          "any.required": "El campo password es requerido",
        }),
    })
    .unknown(true),
});

const userLoginValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().messages({
        "any.required": "El campo email es requerido",
      }),
      password: Joi.string().required().messages({
        "any.required": "El campo password es requerido",
      }),
    })
    .unknown(true),
});

const userUpdateValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).messages({
        "any.required": "El campo nombre es requerido",
        "string.min": "El campo nombre debe tener al menos 2 caracteres",
        "string.max": "El campo nombre debe tener menos de 30 caracteres",
      }),
      about: Joi.string().required().min(2).max(30).messages({
        "any.required": "El campo about es requerido",
        "string.min": "El campo about debe tener al menos 2 caracteres",
        "string.max": "El campo about debe tener menos de 30 caracteres",
      }),
    })
    .unknown(true),
});

const userAvatarUpdateValidator = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!validator.isURL(value)) {
            return helpers.error("any.url");
          }
          return value;
        })
        .messages({
          "any.required": "El campo avatar es requerido",
          "any.url": "El avatar tiene que ser una url válida",
        }),
    })
    .unknown(true),
});

module.exports = {
  userRegisterValidator,
  userUpdateValidator,
  userAvatarUpdateValidator,
  userLoginValidator,
};
