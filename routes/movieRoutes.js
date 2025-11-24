const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// GET routes
router.get('/', movieController.getAllMovies);
router.get('/top-rated', movieController.getTopRatedMovies);
router.get('/recent', movieController.getRecentMovies);
router.get('/user/:email', movieController.getMoviesByUser);
router.get('/:id', movieController.getMovieById);

// POST routes
router.post('/', movieController.createMovie);

// PUT routes
router.put('/:id', movieController.updateMovie);

// DELETE routes
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
