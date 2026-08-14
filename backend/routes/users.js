const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");
const {
  userRegisterValidator,
  userUpdateValidator,
  userAvatarUpdateValidator,
} = require("../middlewares/userValidations");

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", userRegisterValidator, createUser);

router.patch("/me", userUpdateValidator, updateUser);

router.patch("/me/avatar", userAvatarUpdateValidator, updateUserAvatar);

module.exports = router;
