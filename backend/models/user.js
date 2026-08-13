const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
    minlength: 8,
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
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
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

module.exports = mongoose.model("User", userSchema);
