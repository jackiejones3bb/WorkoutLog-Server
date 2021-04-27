require("dotenv").config();
const Express = require("express");
const db = require("./db");
const userController = require("./controllers/userController");
const logController = require("./controllers/logController");

const app = Express();

app.use(Express.json());

app.use("/log", logController);
app.use("/user", userController);

db.sync();

app.listen(process.env.PORT, () =>
  console.log(`[${process.env.PORT}]: a message`)
);
