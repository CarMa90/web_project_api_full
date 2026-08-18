const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ConflictError = require("../errors/conflict-err");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => res.send({ data: user }))
    .catch(() => {
      return next(
        new NotFoundError("No se encontró ningún usuario con ese ID"),
      );
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new NotFoundError(
        "No se encontró ningún usuario con ese ID",
      );
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de usuario invalido."));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (password.length < 8) {
    return next(
      new BadRequestError("La contraseña debe de ser de al menos 8 caracteres"),
    );
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) =>
      res.send({
        data: {
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      }),
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map((error) => error.message)
          .join(", ");

        return next(new BadRequestError(message));
      }
      if (err.cause?.code === 11000) {
        return next(new ConflictError(err.message));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { returnDocument: "after", runValidators: true, upsert: false },
  )
    .orFail(() => {
      const error = new NotFoundError(
        "No se encontró ningún usuario con ese ID",
      );
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { returnDocument: "after", runValidators: true, upsert: false },
  )
    .orFail(() => {
      const error = new NotFoundError(
        "No se encontró ningún usuario con ese ID",
      );
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" },
      );
      return res.status(200).send({ token });
    })
    .catch(() => {
      return next(new UnauthorizedError("Verifique el email o contraseña"));
    });
};
