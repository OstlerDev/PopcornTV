var images = require("images");
var logger = require("./logger");

function generateFanart(imdb, resolution, callback) {
  logger.Debug("=== Generating Fanart ===");
  var width = 1920;
  var height = 1080;
  if (resolution == '720'){
    width = 1280;
    height = 720;
  }
    var fs = require('fs');
    if (fs.existsSync('assets/cache/' + imdb + '-' + resolution + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '-' + resolution + '.jpg');
    } else {
        var API = require('./MoviesAPI');
        var movies = API.getFanart(imdb, function(url) {
            var http = require('https');
            var file = fs.createWriteStream("tmp.jpg");
            var request = http.get(url, function(response) {
              response.pipe(file);
              file.on('finish', function() {
                images('tmp.jpg').resize(width, height).draw(images('assets/thumbnails/gradient_' + resolution + '.png'), 0, 0).save('assets/cache/' + imdb + '-' + resolution + '.jpg');
                callback('cache/' + imdb + '-' + resolution + '.jpg');
                fs.unlink('tmp.jpg');
              });
            });
        });
    }
}
function generateFanartTV(url, imdb, resolution, callback) {
    logger.Debug("=== Generating Fanart for TV ===");
    var width = 1920;
    var height = 1080;
    if (resolution == '720'){
      width = 1280;
      height = 720;
    }
    var fs = require('fs');
    if (fs.existsSync('assets/cache/' + imdb + '-' + resolution + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '-' + resolution + '.jpg');
    } else {
      var http = require('https');
      if (url == 'null') {
          callback('thumbnails/Background_blank_1080.jpg');
       } else {
           var file = fs.createWriteStream("tmp.jpg");
           var request = http.get(url, function(response) {
              response.pipe(file);
               file.on('finish', function() {
                   images('tmp.jpg').resize(width, height).draw(images('assets/thumbnails/gradient_' + resolution + '.png'), 0, 0).save('assets/cache/' + imdb + '-' + resolution + '.jpg');
                   callback('cache/' + imdb + '-' + resolution + '.jpg');
                   fs.unlink('tmp.jpg');
               });
          });
       }
    }
}

exports.generateFanart = generateFanart;
exports.generateFanartTV = generateFanartTV;