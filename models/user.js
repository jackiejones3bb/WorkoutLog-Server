const sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: sequelize.STRING,
    allowNull: false,
  },
  passwordhash: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
