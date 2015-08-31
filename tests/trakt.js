var logger = require('../logger.js');

function scrobble(action, imdb, type){
    var url = 'https://api-v2launch.trakt.tv/scrobble/' + action;
    logger.Debug("=== Starting Scrobble ===");
    makeRequest(url, {"movie": {"ids": {"imdb": 'tt0468569'}}}, function(body){
        logger.Debug(body);
    })
}

function getWatchlist(type, callback){
    var url = 'https://api-v2launch.trakt.tv/sync/watchlist/' + type;
    logger.Debug("=== Getting Watchlist ===");
    makeRequest(url, function(body){
        callback(body);
    })
}

function makePostRequest(url, body, callback){
    var request = require('request');

    logger.Debug(url);
    request.post({
        url: url,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer 07e5793def102a012f19af929360d75dd4af5a14b97ce8e61698adbbd14ef2c6',
            'trakt-api-version': '2',
            'trakt-api-key': '8e798f3c3ed286081991f459f3d8fcb4e40969a31ce29f1f08e0ac4dbaf49258'
        },
        body: body
    }, function (error, response, body) {
       if (!error && response.statusCode === 201) {
           callback(body);
        } else {
            logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
            logger.warning(body);
            return;
        }
    })
}
function makeRequest(url, callback){
    var request = require('request');

    logger.Debug(url);
    request({
        url: url,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer 07e5793def102a012f19af929360d75dd4af5a14b97ce8e61698adbbd14ef2c6',
            'trakt-api-version': '2',
            'trakt-api-key': '8e798f3c3ed286081991f459f3d8fcb4e40969a31ce29f1f08e0ac4dbaf49258'
        }
    }, function (error, response, body) {
       if (!error && response.statusCode === 200) {
           callback(body);
        } else {
            logger.warning("Error connecting to trakt.tv and grabbing json: " + url);
            logger.warning(body);
            return;
        }
    })
}

//scrobble('stop', 'tt0468569', 'movie');
getWatchlist('episodes', function(episodes){
    logger.Debug(episodes);
})