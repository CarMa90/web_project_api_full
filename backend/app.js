const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const { userRegisterValidator } = require("./middlewares/userValidations");
const auth = require("./middlewares/auth");
const cors = require("cors");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

const { PORT = 3000 } = process.env;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signin", userRegisterValidator, login);
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
  console.log("========== ERROR ==========");
  console.log("err.name:", err.name);
  console.log("err.message:", err.message);
  console.log("err.statusCode:", err.statusCode);
  console.log("err.validation:", err.validation);
  console.log("===========================");

  if (err.validation) {
    return res.status(400).send({
      message: err.validation.body.message,
    });
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor." : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
