const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new NotFoundError(
        "No se encontró ninguna tarjeta con ese ID",
      );
      throw error;
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError(
          "Prohibido eliminar una tarjeta que no es de tu propiedad",
        );
      }

      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { returnDocument: "after" },
  )
    .orFail(() => {
      const error = new NotFoundError(
        `La tarjeta con id: ${req.params.cardId} no existe`,
      );
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequestError(`El id: ${req.params.cardId} no es válido`),
        );
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { returnDocument: "after" },
  )
    .orFail(() => {
      const error = new NotFoundError(
        `La tarjeta con id: ${req.params.cardId} no existe`,
      );
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequestError(`El id: ${req.params.cardId} no es válido`),
        );
      }

      return next(err);
    });
};
