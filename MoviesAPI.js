function getMovies(sort_by, amount, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/list_movies.json?sort_by=" + sort_by + "&limit=" + amount;
	console.log(url);
	console.log('Generating XML, sort_by: ' + sort_by + '; amount: ' + amount);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movies = body.data.movies;
	        callback(movies);
	    } else {
			console.log("Error connecting to yts.to and grabbing json: " + url);
			return;
	    }
	})
}
function getMoviesGenre(genre, amount, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/list_movies.json?genre=" + genre + "&limit=" + amount + '&sort_by=seeds';
	console.log('Generating XML, genre: ' + genre + '; amount: ' + amount);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movies = body.data.movies;
	        callback(movies);
	    } else {
			console.log("Error connecting to yts.to and grabbing json: " + url);
			return;
	    }
	})
}
function getMovie(torrentID, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/movie_details.json?with_images=true&movie_id=" + torrentID;
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movie = body.data;
	        var Fan = require('./fanartGenerator')
	        try {
	        	Fan.generateFanart(movie.imdb_code, function(url){
					callback(movie, url);
				});
	        } catch(e) {
	        	movie['rt_audience_score'] = '50';
	        	callback(movie, 'thumbnails/Background_blank_1080.jpg');
	        }
	    } else {
			console.log("Error connecting to yts.to and grabbing json: " + url);
			return;
	    }
	})
}
function searchMovies(query, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/list_movies.json?sort_by=seeds&query_term=" + query;
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movies = body.data.movies;
	        callback(movies);
	    } else {
			console.log("Error connecting to yts.to and grabbing json: " + url);
			return;
	    }
	})
}
function getFanart(imdb, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/movies/' + imdb + '?extended=images';
	request({
	    url: url,
	    json: true,
	    headers: {
	    	'Content-Type': 'application/json',
	    	'trakt-api-version': '2',
	    	'trakt-api-key': '8e798f3c3ed286081991f459f3d8fcb4e40969a31ce29f1f08e0ac4dbaf49258'
	    }
	}, function (error, response, body) {
		//console.log('Status:', response.statusCode);
 	   if (!error && response.statusCode === 200) {
	        var fanart = body.images.fanart.full;
	        //console.log(fanart);
	        callback(fanart);
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getRelatedMovies(movie_id, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/movie_suggestions.json?movie_id=" + movie_id;
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var movies = body.data.movie_suggestions;
	        callback(movies);
	    } else {
			console.log("Error connecting to yts.to and grabbing json: " + url);
			return;
	    }
	})
}

exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.searchMovies = searchMovies;
exports.getFanart = getFanart;
exports.getRelatedMovies = getRelatedMovies;
exports.getMoviesGenre = getMoviesGenre;