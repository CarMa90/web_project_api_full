const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { isCelebrateError } = require("celebrate");
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("./middlewares/userValidations");
const auth = require("./middlewares/auth");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

const { PORT = 3000 } = process.env;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/crash-test", () => {
  process.exit(1);
});
app.post("/signin", userLoginValidator, login);
app.post("/signup", userRegisterValidator, createUser);

app.use(requestLogger);

app.use(auth);

app.use("/users", usersRoutes);

app.use("/cards", cardsRoutes);

app.use((req, res) => {
  res.status(404).send({
    mensaje: "Recurso solicitado no encontrado",
  });
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  console.log("ERROR COMPLETO:");
  console.log(err);

  if (isCelebrateError(err)) {
    const body = err.details.get("body");

    if (body) {
      return res.status(400).send({
        message: body.details[0].message,
      });
    }
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor." : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
