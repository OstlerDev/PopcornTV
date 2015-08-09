var images = require("images");
var logger = require("./logger");

function generateFanart(imdb, resolution, callback) {
    logger.Debug("=== Generating Fanart ===");
    var width = 1920;
    var height = 1080;
    if (resolution == '720') {
        width = 1280;
        height = 720;
    }
    var fs = require('fs');
    if (fs.existsSync(__dirname + '/assets/cache/' + imdb + '-' + resolution + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '-' + resolution + '.jpg');
    } else {
        var API = require('./MoviesAPI');
        var movies = API.getFanart(imdb, function(url) {
            if (url == null) {
                callback('thumbnails/Background_blank_' + resolution + '.jpg');
            } else {
                var http = require('https');
                var file = fs.createWriteStream(__dirname + "/tmp.jpg");
                var request = http.get(url, function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                        images(__dirname + '/tmp.jpg').resize(width, height).draw(images(__dirname + '/assets/thumbnails/gradient_' + resolution + '.png'), 0, 0).save(__dirname + '/assets/cache/' + imdb + '-' + resolution + '.jpg');
                        callback('cache/' + imdb + '-' + resolution + '.jpg');
                        fs.unlink(__dirname + '/tmp.jpg');
                    });
                }).on('error', function(e){
                  logger.error(e);
                });
            }
        });
    }
}

function generateFanartTV(url, imdb, resolution, callback) {
    logger.Debug("=== Generating Fanart for TV ===");
    var width = 1920;
    var height = 1080;
    if (resolution == '720') {
        width = 1280;
        height = 720;
    }
    var fs = require('fs');
    if (fs.existsSync(__dirname + '/assets/cache/' + imdb + '-' + resolution + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '-' + resolution + '.jpg');
    } else {
        var http = require('https');
        if (url == null) {
            callback('thumbnails/Background_blank_' + resolution + '.jpg');
        } else {
            var file = fs.createWriteStream(__dirname + "/tmp.jpg");
            var request = http.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    images(__dirname + '/tmp.jpg').resize(width, height).draw(images(__dirname + '/assets/thumbnails/gradient_' + resolution + '.png'), 0, 0).save(__dirname + '/assets/cache/' + imdb + '-' + resolution + '.jpg');
                    callback('cache/' + imdb + '-' + resolution + '.jpg');
                    fs.unlink(__dirname + '/tmp.jpg');
                });
            });
        }
    }
}

exports.generateFanart = generateFanart;
exports.generateFanartTV = generateFanartTV;