var logger = require("./logger");

function getMovies(page, sort_by, amount, callback) {
	return;
}
function getMoviesGenre(genre, amount, callback) {
	return;
}
function getMovieWithFanart(ID, resolution, callback) {
	var page = 1;
	var request = require("request")

	var url = "";
	logger.Debug("=== Getting Movie ===");
	logger.Debug(url);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movie = body.data;
	        logger.Debug(movie);
	        var Fan = require('./fanartGenerator')
	        try {
	        	Fan.generateFanart(movie.imdb_code, resolution, function(url){
					callback(movie, url);
				});
	        } catch(e) {
	        	movie['rt_audience_score'] = '50';
	        	callback(movie, 'thumbnails/Background_blank_1080.jpg');
	        }
	    } else {
			logger.warning("Error connecting to website and grabbing json: " + url);
			return;
	    }
	})
}
function getMovie(ID, callback) {
	return;
}
function searchMovies(query, callback) {
	return;
}
function getFanart(imdb, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/movies/' + imdb + '?extended=images';
	logger.Debug("=== Getting Fanart ===");
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: {
	    	'Content-Type': 'application/json',
	    	'trakt-api-version': '2',
	    	'trakt-api-key': '' // Removed Trakt.tv Key
	    }
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var fanart = body.images.fanart.full;
	        logger.Debug(fanart);
	        callback(fanart);
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getRelatedMovies(movie_id, callback) {
	return;
}
function generateScreenSaverJSON(callback){
	var request = require("request")
	var url = "";
	logger.Debug("=== Getting Movies ===");
	logger.Debug(url);

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movies = body.data.movies;
	        logger.Debug(movies);
	        var json = [];
	        movies.forEach(function(movie){
	        	json.push({
	        		type: 'photo',
	        		id: 'photo_' + movie.id,
	        		assets: [{
	        			width: 406,
	        			height: 600,
	        			src: movie.medium_cover_image
	        		}]
	        	})
	        });
	        logger.Debug(json);
	        callback(JSON.stringify(json));
	    } else {
			logger.warning("Error connecting to website and grabbing json: " + url);
			return;
	    }
	})
}

exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.getMovieWithFanart = getMovieWithFanart;
exports.searchMovies = searchMovies;
exports.getFanart = getFanart;
exports.getRelatedMovies = getRelatedMovies;
exports.getMoviesGenre = getMoviesGenre;
exports.generateScreenSaverJSON = generateScreenSaverJSON;