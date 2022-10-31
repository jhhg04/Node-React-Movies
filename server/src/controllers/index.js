const dotenv = require('dotenv');
const axios = require('axios');
const lodash = require('lodash');

// Setup configuration
dotenv.config();
const API_KEY = process.env.TMDB_KEY;

//
const movie_db = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	timeout: 2000,
	params: {
		api_key: API_KEY
	}
});

// fetch the first page of popular movies from
const most_popular = (req, res) => {
	movie_db
		.get('/movie/popular')
		.then((api_response) => {
			res.send(api_response.data.results);
		})
		.catch((error_response) => {
			console.log(error_response);
		});
};

// fetch the first page of Now Playing movies
const now_playing = (req, res) => {
	movie_db
		.get('/movie/upcoming')
		.then((api_response) => {
			res.send(api_response.data.results);
		})
		.catch((error_response) => {
			console.log(error_response);
		});
};

//
const search = (req, res) => {
	movie_db
		.get('/search/movie', {
			params: {
				query: req.query.title,
				include_adult: false
			}
		})
		.then((api_response) => {
			res.send(
				lodash.filter(api_response.data.results, (result) => {
					return result.poster_path != null;
				})
			);
		})
		.catch((error_response) => {
			console.log(error_response);
		});
};

// Fetch details for a specific specific film
const movieId = (req, res) => {
	movie_db
		.get('/movie/' + req.params.movieId)
		.then((api_response) => {
			res.send(api_response.data);
		})
		.catch((error_response) => {
			console.log(error_response);
		});
};

module.exports = {
	most_popular,
	now_playing,
	search,
	movieId
};
