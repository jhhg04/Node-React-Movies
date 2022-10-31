const { Router } = require('express');
const {
	most_popular,
	movieId,
	now_playing,
	search
} = require('../controllers');

const router = Router();

// fetch the first page of popular movies from
router.get('/most_popular', most_popular);

// fetch the first page of Now Playing movies
router.get('/now_playing', now_playing);

//
router.get('/search', search);

// Fetch details for a specific specific film
router.get('/movies/:movieId', movieId);

module.exports = router;
