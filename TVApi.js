function getTV(sort_by, amount, callback) {
	var page = 1;
	var request = require("request")

	if(sort_by == "seeds"){
		var url = "http://eztvapi.re/shows/" + page.toString();
	} else {
		var url = "http://eztvapi.re/shows/" + page.toString() + "?sort=" + sort_by;
	}
	//console.log(url);
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
function getEpisodes(imdb, season, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '?extended=full,images';
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
	        var episodes = body;
	        //console.log(fanart);
	        getEpisodeNumbers(imdb, season, function(numbers){
	        	callback(episodes, numbers, url);
	        });
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getEpisode(imdb, season, episodeNum, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '?extended=full,images';
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
	        var episodes = body;
	        //console.log(fanart);
	        getEpisodeNumbers(imdb, season, function(numbers){
	        	var moreEpisodes = [];
	        	var show;
	        	episodes.forEach(function(episode){
	        		//get the single show we want
	        		if(episode.season == season && episode.number == episodeNum){
	        			show = episode;
	        		}
	        		// get the rest of the shows of the season
	        		if(episode.season == season){
	        			moreEpisodes.push(episode);
	        		}
	        	})
	        	//get the torrents for the show
	        	getTorrents(imdb, season, episodeNum, function(torrents){
	        		// get the fanart for the show
	        		getScreenshotFanart(imdb, season, episodeNum, function(fanart){
	        			callback(show, moreEpisodes, numbers, torrents, fanart);
	        		})
	        	})
	        });
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
 	   		//console.log(body);
	        var screenshot = body;
	        callback(screenshot);
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getScreenshotFanart(imdb, season, episode, callback){
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
 	   		//console.log(body);
	        var screenshot = body.images.screenshot.full;
	        var gen = require('./fanartGenerator');
	        gen.generateFanartTV(screenshot, body.ids.tvdb, function(url){
	        	callback('http://trailers.apple.com/' + url);
	        });
	    } else {
			console.log("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getSeasonNumbers(imdb, callback){
	var request = require("request")

	var url = "http://eztvapi.re/show/" + imdb;
	//console.log(url);
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
function getEpisodeNumbers(imdb, season, callback){
	var request = require("request")

	var url = "http://eztvapi.re/show/" + imdb;
	//console.log(url);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var shows = body.episodes;
	        var episodes = [];
	        shows.forEach(function(episode){
	        	if (episode.season == season && episodes.indexOf(episode.episode) == -1)
	        		episodes.push(episode.episode);
	        });
	        callback(episodes.sort(function(a, b){return a-b}));
	    } else {
			console.log("Error connecting to eztvapi.re and grabbing json: " + url);
			return;
	    }
	})
}
function getTorrents(imdb, season, episode, callback) {
	var page = 1;
	var request = require("request")

	var url = "http://eztvapi.re/show/" + imdb;
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var shows = body.episodes;
	        shows.forEach(function(show){
	        	if (show.season == season && show.episode == episode){
	        		console.log(show.torrents[0].url);
	        		callback(show.torrents);
	        	}
	        });
	    } else {
			console.log("Error connecting to eztvapi.re and grabbing json: " + url);
			return;
	    }
	})
}

exports.getTV = getTV;
exports.getFanart = getFanart;
exports.getSeasons = getSeasons;
exports.getEpisodes = getEpisodes;
exports.getEpisode = getEpisode;
