const router = require('express').Router();
const controller = require('../controllers/movie.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const validate = require('../middleware/validate.middleware');
const { createMovieSchema } = require('../validators/movie.validator');

router.post('/import', auth, upload.single('file'), controller.importMovies);
router.post('/', auth, validate(createMovieSchema), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', auth, controller.remove);

module.exports = router;
