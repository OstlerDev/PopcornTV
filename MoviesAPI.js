var EventEmitter = require("events").EventEmitter;

function getMovies(sort_by, amount, callback) {
	var page = 1;
	var request = require("request")

	var url = "https://yts.to/api/v2/list_movies.json?sort_by=" + sort_by + "&limit=" + amount;
	console.log('Generating JSON, sort_by: ' + sort_by + '; amount: ' + amount);
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
	        callback(movie);
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

exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.searchMovies = searchMovies;