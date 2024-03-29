var logger = require("./logger");
var api = require('./settings.js').getTVEndpoint();

const trakt_headers = {
	'Content-Type': 'application/json',
	'trakt-api-version': '2',
	'trakt-api-key': '' // Removed Trakt Key.
}

function getTV(page, sort_by, amount, callback) {
	return;
}
function getShow(imdb, callback){
	return;
}
function getShowInfo(imdb, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '?extended=full';
	logger.Debug("=== Getting Show Information ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var show = body;
	        logger.Debug(show);
	        callback(show);
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	});
}
function getSeasons(imdb, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons?extended=images';
	logger.Debug("=== Getting Seasons ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var seasons = body;
	        getSeasonNumbers(imdb, function(numbers){
	        	callback(seasons, numbers);
	        })
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getSeasonsFanart(imdb, resolution, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons?extended=images';
	logger.Debug("=== Getting Seasons ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var seasons = body;
	        getFanart(imdb, resolution, function(url){
	        	getSeasonNumbers(imdb, function(numbers){
	        		callback(seasons, numbers, url);
	        	})
	        })
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getEpisodes(imdb, season, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '?extended=full,images';
	logger.Debug("=== Getting Episodes ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var episodes = body;
	        getEpisodeNumbers(imdb, season, function(numbers){
	        	callback(episodes, numbers, url);
	        });
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getEpisode(imdb, season, episodeNum, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '?extended=full,images';
	logger.Debug("=== Getting Episode ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var episodes = body;
	        getEpisodeNumbers(imdb, season, function(numbers){
	        	var moreEpisodes = [];
	        	var show;
	        	episodes.forEach(function(episode){
	        		//get the single show we want
	        		if(episode.season == season && episode.number == episodeNum){
	        			show = episode;
	        		}
	        		// get the rest of the shows of the season
	        		if(episode.season == season && numbers.indexOf(episode.number) > -1){
	        			moreEpisodes.push(episode);
	        		}
	        	})
	        	//get the torrents for the show
	        	getTorrents(imdb, season, episodeNum, function(torrents){
	        		getSeasons(imdb, function (seasons, numbers, url) {
	        			seasons.forEach(function(seasonNum){
	        				if (seasonNum.number == season){
	        					getShowInfo(imdb, function(fullShow){
	        						callback(show, moreEpisodes, numbers, torrents, seasonNum.images.poster.thumb, fullShow);
	        					});
	        				}
	        			});
	        		});
	        	});
	        });
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getEpisodeFanart(imdb, season, episodeNum, resolution, callback) {
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '?extended=full,images';
	logger.Debug("=== Getting Episode ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var episodes = body;
	        var response = {
	        	type: 'TV',
	        	imdb: imdb,
	        	youtube: undefined,
	        	images: {},
	        	related: []
	        };
	        getEpisodeNumbers(imdb, season, function(numbers){
	        	var show;
	        	episodes.forEach(function(episode){
	        		//get the single show we want
	        		if(episode.season == season && episode.number == episodeNum){
	        			show = episode;
	        			response.title = show.title;
	        			response.description = show.overview;
	        			response.rt_rating = Math.round(show.rating*10);
	        		}
	        		// get the rest of the shows of the season
	        		if(episode.season == season && numbers.indexOf(episode.number) > -1){
	        			response.related[episode.number] = {
	        				title: episode.title,
	        				subtitle: "Episode " + episode.number,
	        				screenshot: episode.images.screenshot.thumb
	        			}
	        		}
	        	})
	        	if (isReady(response)) callback(response);
	        });
	        //get the torrents for the show
	        getTorrents(imdb, season, episodeNum, function(torrents){
	        	response.torrents = torrents;
	        	if (isReady(response)) callback(response);
	        });
	        // get the fanart for the show
	        getScreenshotFanart(imdb, season, episodeNum, resolution, function(fanart){
	       		response.images.fanart = fanart;
	       		if (isReady(response)) callback(response);	
	        });
	        getSeasons(imdb, function (seasons, numbers, url) {
	        	seasons.forEach(function(seasonNum){
	        		if (seasonNum.number == season){
	        			response.images.poster = seasonNum.images.poster.full;
	        			if (isReady(response)) callback(response);
	        		}
	        	});
	        });
	        getShowInfo(imdb, function(fullShow){
	        	response.rating = fullShow.certification;
	        	response.year = fullShow.network;
	        	response.runtime = fullShow.runtime;
	        	response.genres = fullShow.genres;
	        	if (isReady(response)) callback(response);
	        });
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getFanart(imdb, resolution, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '?extended=images';
	logger.Debug("=== Getting Fanart ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var fanart = body.images.fanart.full;
	        logger.Debug(fanart);
	        var gen = require('./fanartGenerator');
	        gen.generateFanartTV(fanart, imdb, resolution, function(url){
	        	callback('http://trailers.apple.com/' + url);
	        });
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getScreenshot(imdb, season, episode, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '/episodes/' + episode + '?extended=images';
	logger.Debug("=== Getting Screenshot ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        logger.Debug(body);
	        var screenshot = body;
	        callback(screenshot);
	    } else {
			clogger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getScreenshotFanart(imdb, season, episode, resolution, callback){
	var request = require('request');

	var url = 'https://api-v2launch.trakt.tv/shows/' + imdb + '/seasons/' + season + '/episodes/' + episode + '?extended=images';
	logger.Debug("=== Getting Screenshot Fanart ===")
	logger.Debug(url);
	request({
	    url: url,
	    json: true,
	    headers: trakt_headers
	}, function (error, response, body) {
 	   if (!error && response.statusCode === 200) {
	        var screenshot = body.images.screenshot.full;
	        if (body.images.screenshot.full == null)
	        	callback('http://trailers.apple.com/thumbnails/Background_blank_' + resolution + '.png');
	        logger.Debug(screenshot);
	        var gen = require('./fanartGenerator');
	        gen.generateFanartTV(screenshot, body.ids.imdb, resolution, function(url){
	        	callback('http://trailers.apple.com/' + url);
	        });
	    } else {
			logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
			return;
	    }
	})
}
function getSeasonNumbers(imdb, callback){
	return;
}
function getEpisodeNumbers(imdb, season, callback){
	return;
}
function getTorrents(imdb, season, episode, callback) {
	return;
}
function searchShows(query, callback) {
	return;
}

function getGenre(genre, callback){
	return;
}

function isReady(response){
	return;
}

exports.getTV = getTV;
exports.getShow = getShow;
exports.getFanart = getFanart;
exports.getSeasons = getSeasons;
exports.getSeasonsFanart = getSeasonsFanart;
exports.getEpisodes = getEpisodes;
exports.getEpisode = getEpisode;
exports.getEpisodeFanart = getEpisodeFanart;
exports.searchShows = searchShows;
exports.getGenre = getGenre;
