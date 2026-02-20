const { Op } = require('sequelize');
const { Movie, Actor } = require('../models');

exports.createMovie = async (data) => {
  const { title, releaseYear, format, actors } = data;

  const movie = await Movie.create({ title, releaseYear, format });

  if (actors && actors.length) {
    const actorInstances = [];

    for (const name of actors) {
      const [actor, created] = await Actor.findOrCreate({
        where: { name },
      });

      console.log(
        `createMovie: findOrCreate actor=${actor.name} created=${created}`,
      );

      actorInstances.push(actor);
    }

    await movie.setActors(actorInstances);
  }

  return Movie.findByPk(movie.id, {
    include: {
      model: Actor,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
};

exports.deleteMovie = async (id) => {
  const deletedCount = await Movie.destroy({ where: { id } });
  return deletedCount > 0;
};

exports.getMovieById = async (id) => {
  const movie = await Movie.findByPk(id, {
    include: {
      model: Actor,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  if (!movie) return null;

  return {
    id: movie.id,
    title: movie.title,
    releaseYear: movie.releaseYear,
    format: movie.format,
    actors: movie.Actors ? movie.Actors.map((a) => a.name) : [],
  };
};

exports.getAllMovies = async (filters = {}) => {
  const { title, actor, sort = 'asc' } = filters;
  const where = {};
  const include = [
    { model: Actor, attributes: ['name'], through: { attributes: [] } },
  ];

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  if (actor) {
    include[0].where = { name: { [Op.like]: `%${actor}%` } };
    include[0].required = true;
  }

  const movies = await Movie.findAll({
    where: Object.keys(where).length > 0 ? where : undefined,
    include,
    order: [['title', sort.toUpperCase()]],
    subQuery: false,
    distinct: true,
  });

  return movies.map((m) => ({
    id: m.id,
    title: m.title,
    releaseYear: m.releaseYear,
    format: m.format,
    actors: m.Actors.map((a) => a.name),
  }));
};
