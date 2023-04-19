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
            'authorization': 'Bearer 07e5793def102a012f19af929360d75dd4af5a14b97ce8e61698adbbd14ef2c6',
            'trakt-api-version': '2',
            'trakt-api-key': '8e798f3c3ed286081991f459f3d8fcb4e40969a31ce29f1f08e0ac4dbaf49258'
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