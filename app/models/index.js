const dbConfig = require("../config/db.config.js");

const dbEnv = process.env.NODE_ENV == 'test' ? dbConfig.tests : dbConfig.dev;

const Sequelize = require("sequelize");
const sequelizeConfig = new Sequelize(dbConfig.dev.DB, dbConfig.dev.USER, dbConfig.dev.PASSWORD, {
  host: dbConfig.dev.HOST,
  dialect: dbConfig.dev.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;

db.signup = require("./signup.model.js")(sequelizeConfig, Sequelize);

module.exports = db;