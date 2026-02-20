const movieService = require('../services/movie.service');
const parseMovies = require('../utils/parseMovies');

const create = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ message: 'Failed to create movie' });
  }
};

const remove = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete movie' });
  }
};

const getOne = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Get one error:', error);
    res.status(500).json({ message: 'Failed to fetch movie' });
  }
};

const getAll = async (req, res) => {
  try {
    const { title, actor, sort } = req.query;
    const movies = await movieService.getAllMovies({ title, actor, sort });
    res.json(movies);
  } catch (error) {
    console.error('Get all error:', error);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

const importMovies = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const movies = await parseMovies(req.file.path);
    res.json({ imported: movies.length, movies });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Import failed' });
  }
};

module.exports = {
  create,
  remove,
  getOne,
  getAll,
  importMovies,
};
