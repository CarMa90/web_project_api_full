const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require("../controllers/users");
const {
  userUpdateValidator,
  userAvatarUpdateValidator,
} = require("../middlewares/userValidations");

router.get("/", getUsers);

router.get("/me", getUserInfo);

router.get("/:userId", getUserById);

router.patch("/me", userUpdateValidator, updateUser);

router.patch("/me/avatar", userAvatarUpdateValidator, updateUserAvatar);

module.exports = router;
