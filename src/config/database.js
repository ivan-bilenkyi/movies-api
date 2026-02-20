const { Sequelize } = require('sequelize');

const DB_PATH = process.env.DB_PATH;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

module.exports = sequelize;
