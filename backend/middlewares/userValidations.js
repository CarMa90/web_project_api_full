const { celebrate, Joi } = require("celebrate");

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
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
        .messages({
          "string.min": "La contraseña debe de ser de al menos 8 caracteres",
          "string.pattern.base":
            "La contraseña debe de contener al menos una mayuscula, una minuscula, un número y un símbolo",
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
        .pattern(
          new RegExp(
            /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i,
          ),
        )
        .messages({
          "any.required": "El campo avatar es requerido",
          "string.pattern.base": "El avatar tiene que ser una url válida",
        }),
    })
    .unknown(true),
});

module.exports = {
  userRegisterValidator,
  userUpdateValidator,
  userAvatarUpdateValidator,
};
