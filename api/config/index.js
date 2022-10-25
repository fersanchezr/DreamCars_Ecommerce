const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = require("../utils");

// inicio y llamo a la base de datos
const db = new Sequelize(DB_NAME, null, null, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

module.exports = db;
