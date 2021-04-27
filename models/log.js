const sequelize = require("sequelize");
const db = require("../db");

const Log = db.define("log", {
  description: {
    type: sequelize.STRING,
    allowNull: false,
  },
  definition: {
    type: sequelize.STRING,
    allowNull: false,
  },
  result: {
    type: sequelize.STRING,
    allowNull: false,
  },
  owner_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Log;
