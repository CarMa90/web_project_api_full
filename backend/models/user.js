const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "Verifique el email o la contraseña"],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) =>
        `Lo sentimos ${props.value} no es un correo electrónico válido`,
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe de ser de al menos 8 caracteres"],
    validate: {
      validator(v) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(v);
      },
      message: () =>
        "La contraseña debe de contener al menos una mayuscula, una minuscula, un número y un caracter especial.",
    },
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        const regex =
          /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i;
        return regex.test(v);
      },
      message: (props) => `Lo sentimos ${props.value} no es un enlace válido.`,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Verifique el email o contraseña"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Verifique el email o contraseña"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("User", userSchema);
