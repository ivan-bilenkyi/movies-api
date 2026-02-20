const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user.model')(sequelize, DataTypes);
const Movie = require('./movie.model')(sequelize, DataTypes);
const Actor = require('./actor.model')(sequelize, DataTypes);

Movie.belongsToMany(Actor, { through: 'MovieActors' });
Actor.belongsToMany(Movie, { through: 'MovieActors' });

module.exports = {
  sequelize,
  User,
  Movie,
  Actor,
};
