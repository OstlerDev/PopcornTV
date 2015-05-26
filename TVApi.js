function getTV(sort_by, amount, callback) {
	var page = 1;
	var request = require("request")

	var url = "http://eztvapi.re/shows/" + page.toString();
	console.log(url);
	console.log('Generating TV XML');
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var shows = body;
	        callback(shows);
	    } else {
			console.log("Error connecting to eztvapi.re and grabbing json: " + url);
			return;
	    }
	})
}
function getSeasons(imdb, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons?extended=images';
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
	        var seasons = body;
	        //console.log(fanart);
	        getFanart(imdb, function(url){
	        	getSeasonNumbers(imdb, function(numbers){
	        		callback(seasons, numbers, url);
	        	})
	        })
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getFanart(imdb, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '?extended=images';
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
	        var gen = require('./fanartGenerator');
	        gen.generateFanartTV(fanart, imdb, function(url){
	        	callback('http://trailers.apple.com/' + url);
	        });
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getScreenshot(imdb, season, episode, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '/episodes/' + episode + '?extended=images';
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
	        var screenshot = body.images.screenshot.thumb;
	        //console.log(fanart);
	        callback(screenshot);
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getSeasonNumbers(imdb, callback){
	var request = require("request")

	var url = "http://eztvapi.re/show/" + imdb;
	console.log(url);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var shows = body.episodes;
	        var seasons = [];
	        shows.forEach(function(episode){
	        	//console.log(episode.season);
	        	if (seasons.indexOf(episode.season) == -1)
	        		seasons.push(episode.season);
	        });
	        callback(seasons.sort());
	    } else {
			console.log("Error connecting to eztvapi.re and grabbing json: " + url);
			return;
	    }
	})
}

exports.getTV = getTV;
exports.getFanart = getFanart;
exports.getSeasons = getSeasons;
