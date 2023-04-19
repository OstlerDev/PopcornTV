function scrobbleStart(imdb, type){
    var url = 'https://api-v2launch.trakt.tv/scrobble/start';
    makeRequest(url, function(body){
        console.log(body);
    })
}

function makeRequest(url, callback){
    var request = require('request');
    
    logger.Debug(url);
    request.post({
        url: url,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'authorization': '', //auth Bearer code
            'trakt-api-version': '2',
            'trakt-api-key': '' //trakt api key
        },
        body: {"movie": {"ids": {"imdb": 'tt0468569'}}}
    }, function (error, response, body) {
       if (!error && response.statusCode === 200) {
           callback(body);
        } else {
            console.warning("Error connecting to trakt.tv and grabbing json: " + url);
            return;
        }
    })
}

scrobbleStart('tt11358390', 'movie');