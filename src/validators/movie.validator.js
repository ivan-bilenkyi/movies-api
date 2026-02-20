const Joi = require('joi');

exports.createMovieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  releaseYear: Joi.number().integer().required(),
  format: Joi.string().valid('VHS', 'DVD', 'Blu-Ray').required(),
  actors: Joi.array().items(Joi.string()).min(1).required(),
});
