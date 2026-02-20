const { Sequelize } = require('sequelize');

const DB_PATH = process.env.DB_PATH;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH,
  logging: false,
});

module.exports = sequelize;
