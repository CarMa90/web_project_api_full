const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { createCardValidator } = require("../middlewares/cardsValidations");

router.get("/", getCards);

router.post("/", createCardValidator, createCard);

router.delete("/:cardId", deleteCardById);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
