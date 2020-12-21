const dbConfig = require("../config/db.config.js");

const dbEnv = process.env.NODE_ENV == 'test' ? dbConfig.tests : dbConfig.dev;
console.log('Database: ', dbEnv.DB);

const Sequelize = require("sequelize");
const sequelizeConfig = new Sequelize(dbEnv.DB, dbEnv.USER, dbEnv.PASSWORD, {
  host: dbEnv.HOST,
  dialect: dbConfig.dev.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;

db.signup = require("./signup.model.js")(sequelizeConfig, Sequelize);

module.exports = db;