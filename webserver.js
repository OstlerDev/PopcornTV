var logger = require('./logger');

function parseRange(str, size) {
    if (str.indexOf(",") != -1) {
        return;
    }
    if (str.substr(0, 6) == "bytes=") {
    	str = str.substr(6, str.length - 6);
    }
    var range = str.split("-"),
        start = parseInt(range[0], 10),
        end = parseInt(range[1], 10);
    // Case: -100
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
    // Case: 100-
    } else if (isNaN(end)) {
        end = size - 1;
    }

    // Invalid
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return;
    }

    return {start: start, end: end};
};

function startWebServer(localIp) {

	var url    = require("url");
	var http   = require("http");
	var path   = require("path");
	var fs     = require("fs");
	var querystring = require("querystring");
	var torrent = require('./streamer');
	var PreviousID = "0";

	var mime   = require("./mime").types;
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = querystring.parse(url.parse(request.url).query);
		logger.Debug("Query: " + JSON.stringify(query));
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname.indexOf("MoviePlay.xml") >= 0){
			logger.Debug('=== Starting MoviePlay.xml Generation ===');
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Streamer('Streamer: Starting Stream... Please wait for stream to be ready.');
			torrent.startStreamer(query.torrent, query.id, localIp);
			torrent.getStreamer().on('ready', function (data) {
				logger.Debug('=== Ending MoviePlay.xml Generation ===');
				if (data.isMP4){
					response.write(xml.generatePlayXML(torrent.getURL(), query.title, query.desc, query.poster));
					response.end();
				} else {
					xml.errorXML('Unsupported File Type', 'At this time .' + data.type + ' files are not supported. Please choose a different file/quality.', function(xml){
						response.write(xml);
						response.end();
					});
					torrent.getStreamer().close();
				}
			});
			torrent.getStreamer().on('close', function(){
				var aTVSettings = require('./settings.js');
				var keepMovies = aTVSettings.checkSetting('keep', query.UDID);

				if (keepMovies == 'Off'){
					logger.Debug('====== Keep Movies is Off, Deleting Files ======')
					fs.readdirSync("./").forEach(function(fileName) {
        				if (path.extname(fileName) === ".mp4") {
        					logger.Debug('Deleting ' + fileName);
            				fs.unlinkSync(fileName);
        				}
    				});
    				deleteFolderRecursive('/tmp/torrent-stream/');
				}
			})
			staticFile = false;
		} else if(pathname.indexOf("MoviesGrid.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting MoviesGrid.xml Generation ===');
			xml.generateMoviesXML(query.title, query.sort_by, function(xmlstring){
				logger.Debug('=== Ending MoviesGrid.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("Parade.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			if (query.type == 'movie'){
				logger.Debug('=== Starting Parade.xml Movie Generation ===');
				xml.generateMovieParadeXML(query.sort_by, function(xmlstring){
					logger.Debug('=== Ending Parade.xml Movie Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else if (query.type == 'tv'){
				logger.Debug('=== Starting Parade.xml TV Generation ===');
				xml.generateTVParadeXML(query.sort_by, function(xmlstring){
					logger.Debug('=== Ending Parade.xml TV Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("MoviesGenreGrid.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting MoviesGenreGrid.xml Generation ===');
			xml.generateMovieGenre(query.genre, function(xmlstring){
				logger.Debug('=== Ending MoviesGenreGrid.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("MoviePrePlay.xml") >= 0){
			try{
				torrent.getStreamer().close();
			} catch(e) {
				logger.Debug('Streamer: No Stream Running');
			}
			var aTVSettings = require('./settings.js');
			var fanart = aTVSettings.checkSetting('fanart', query.UDID);

			if (fanart == 'On'){
				var xml = require('./XMLGenerator');
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Ending MoviePrePlay.xml Generation ===');
				xml.generateMoviePrePlayFanartXML(query.torrentID, query.UDID, function(xmlstring){
					logger.Debug('=== Ending MoviePrePlay.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {
				var xml = require('./XMLGenerator');
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Starting MoviePrePlay.xml No Fanart Generation ===');
				xml.generateMoviePrePlayXML(query.torrentID, function(xmlstring){
					logger.Debug('=== Ending MoviePrePlay.xml No Fanart Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("allresults.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting allresults.xml Generation ===');
			xml.generateSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending allresults.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("tvresults.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting tvresults.xml Generation ===');
			xml.generateTVSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending tvresults.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("results.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting results.xml Generation ===');
			xml.generateMovieSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending results.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("TVGrid.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting TVGrid.xml Generation ===');
			xml.generateTVXML(query.title, query.sort_by, function(xmlstring){
				logger.Debug('=== Ending TVGrid.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("seasons.xml") >= 0){
			var aTVSettings = require('./settings.js');
			var fanart = aTVSettings.checkSetting('fanart', query.UDID);

			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting seasons.xml Generation ===');

			if (fanart == 'On'){
				xml.generateTVSeasonsFanart(query.imdb, query.title, function(xmlstring){
					logger.Debug('=== Ending seasons.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {
				xml.generateTVSeasons(query.imdb, query.title, function(xmlstring){
					logger.Debug('=== Ending seasons.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		}  else if(pathname.indexOf("episodes.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting episodes.xml Generation ===');
			xml.generateTVEpisodes(query.imdb, query.season, query.title, function(xmlstring){
				logger.Debug('=== Ending episodes.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("TVPrePlay.xml") >= 0){
			try{
				torrent.getStreamer().close();
			} catch(e) {
				logger.Debug('Streamer: No Stream Running');
			}
			var aTVSettings = require('./settings.js');
			var fanart = aTVSettings.checkSetting('fanart', query.UDID);

			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting TVPrePlay.xml Generation ===');
			if (fanart == 'On'){
				xml.generateTVPrePlayFanartXML(query.imdb, query.season, query.episode, query.UDID, function(xmlstring){
					logger.Debug('=== Ending TVPrePlay.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {
				xml.generateTVPrePlayXML(query.imdb, query.season, query.episode, query.UDID, function(xmlstring){
					logger.Debug('=== Ending TVPrePlay.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("settings.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting settings.xml Generation ===');
			xml.generateSettingsXML(query.UDID, function(xmlstring){
				logger.Debug('=== Ending settings.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("scrobble.xml") >= 0){
			var aTVSettings = require('./settings.js');
			var checkFavorite = aTVSettings.checkFavorite(query.type, query.id, query.UDID);

			if (checkFavorite){
				var xml = require('./XMLGenerator');
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Starting scrobble.xml Generation ===');
				xml.generateScrobbleXML(query.type, query.id, query.UDID, 'removeFavorite.xml', 'Remove from Favorites', function(xmlstring){
					logger.Debug('=== Ending scrobble.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {
				var xml = require('./XMLGenerator');
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Starting scrobble.xml Generation ===');
				xml.generateScrobbleXML(query.type, query.id, query.UDID, 'addFavorite.xml', 'Add to Favorites', function(xmlstring){
					logger.Debug('=== Ending scrobble.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("altersetting.xml") >= 0){
			var aTVSettings = require('./settings.js');
			aTVSettings.changeSetting(query.UDID, query.setting, query.newSetting);

			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting settings.xml Generation ===');
			xml.generateSettingsXML(query.UDID, function(xmlstring){
				logger.Debug('=== Ending settings.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("addFavorite.xml") >= 0){
			var aTVSettings = require('./settings.js');
			aTVSettings.addFavorite(query.type, query.id, query.UDID);

			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			xml.updateContextXML(function(xmlstring){
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("removeFavorite.xml") >= 0){
			var aTVSettings = require('./settings.js');
			aTVSettings.removeFavorite(query.type, query.id, query.UDID);

			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			xml.updateContextXML(function(xmlstring){
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("Favorites.xml") >= 0){
			var aTVSettings = require('./settings.js');
			var favorites = aTVSettings.getFavorites(query.UDID);
			logger.Debug(favorites);
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting Favorites.xml Generation ===');
			if (favorites != undefined && favorites.length >= 1){
				xml.generateFavoritesXML(favorites, function(xmlstring){
					logger.Debug('=== Starting Favorites.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {
				xml.errorXML('No Favorites', 'Please add some favorites by hovering over a Movie/TV poster and holding the select button.', function(xmlstring){
					logger.Debug('=== Starting Favorites.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf(".cer") >= 0){
			pathname = "certificates/trailers.cer";
		} else if(pathname.indexOf("/appletv/us/images/icons/trailerslogo.png") >= 0){
			pathname = "thumbnails/logo.png";
		} else if(pathname.indexOf("ScreenSaver.json") >= 0){
			var movieAPI = require('./MoviesAPI');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting ScreenSaver.json Generation ===');
			movieAPI.generateScreenSaverJSON(function(xmlstring){
				logger.Debug('=== Ending ScreenSaver.json Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf(".xml") >= 0){
			pathname = "templates" + pathname;
		}
		var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));
		logger.Web(pathname);
		if(staticFile){
			fs.stat(realPath, function(err, stats) {
				if (err) {
					logger.Web('404: ' + pathname)
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.write("This request URL " + pathname + " was not found on this server.");
					response.end();						
				} else {
					response.setHeader("Server", "Node/V5");
					response.setHeader('Accept-Ranges', 'bytes');				
					
					var ext = path.extname(realPath);
					ext = ext ? ext.slice(1) : "unknown";
					var contentType = mime[ext] || "application/octet-stream";
					
					response.setHeader("Content-Type", contentType);
					response.setHeader('Content-Length', stats.size);				
					if (request.headers["range"]) {
						var range = parseRange(request.headers["range"], stats.size);
						if (range) {
							response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
							response.setHeader("Content-Length", (range.end - range.start + 1));
							var raw = fs.createReadStream(realPath, {"start": range.start, "end": range.end});
							response.writeHead(206, "Partial Content");
							raw.pipe(response);
						} else {
							response.removeHeader("Content-Length");
							response.writeHead(416, "Request Range Not Satisfiable");
							response.end();						
						}					
					} else {
						var raw = fs.createReadStream(realPath);
						response.writeHead(200, "OK");
						raw.pipe(response);
					}
				}
			});
		}
	});
	server.listen(80);
	server.on('error', function(err){
		if (err.code == 'EADDRINUSE'){
			logger.error('========= FATAL ERROR =========');
			logger.error('Cannot bind to Port 80. Please make sure you are not running a web server on your machine!');
			logger.error('Error Code: ' + err.code);
			logger.error('===============================');
			process.exit();
		}
		logger.error('========= FATAL ERROR =========');
		logger.error('Cannot start web Server. Please make sure you are using the correct IP!');
		logger.error('Error Code: ' + err.code);
		logger.error('===============================');
		process.exit();
	})
	server.setTimeout(1000 * 1000 * 1000, function(response){
		logger.Debug('Timed Out');
	})
	logger.Web("listening on " + localIp + ":80");
}

function startSSLWebServer(localIp) {

	var url    = require("url");
	var https   = require("https");
	var path   = require("path");
	var mime   = require("./mime").types;

	//
	// SSL Certificates
	//
	fs = require('fs');
	options = {
	  key: fs.readFileSync('./assets/certificates/trailers.pem')
	, ca: [ fs.readFileSync('./assets/certificates/trailers.pem') ]
	, cert: fs.readFileSync('./assets/certificates/trailers.pem')
	, requestCert: false
	, rejectUnauthorized: false
	};

	server = https.createServer(options);
	server.listen(443);
	server.on('error', function(err){
		if (err.code == 'EADDRINUSE'){
			logger.error('========= FATAL ERROR =========');
			logger.error('Cannot bind to Port 443. Please make sure you are not running a web server on your machine!');
			logger.error('Error Code: ' + err.code);
			logger.error('===============================');
			process.exit();
		}
		logger.error('========= FATAL ERROR =========');
		logger.error('Cannot start web Server. Please make sure you are using the correct IP!');
		logger.error('Error Code: ' + err.code);
		logger.error('===============================');
		process.exit();
	})
	server.on('request', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname == "/appletv/us/js/application.js"){
			pathname = "js/application.js";
		}
		var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));
		logger.Web("SSL: " + pathname);
		
		if(staticFile){
			fs.stat(realPath, function(err, stats) {
				if (err) {
					logger.Web('SSL 404: ' + pathname)
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.write("This request URL " + pathname + " was not found on this server.");
					response.end();						
				} else {
					response.setHeader("Server", "Node/V5");
					response.setHeader('Accept-Ranges', 'bytes');				
					
					var ext = path.extname(realPath);
					ext = ext ? ext.slice(1) : "unknown";
					var contentType = mime[ext] || "application/octet-stream";
					
					response.setHeader("Content-Type", contentType);
					response.setHeader('Content-Length', stats.size);				
					if (request.headers["range"]) {
						var range = parseRange(request.headers["range"], stats.size);
						if (range) {
							response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
							response.setHeader("Content-Length", (range.end - range.start + 1));
							var raw = fs.createReadStream(realPath, {"start": range.start, "end": range.end});
							response.writeHead(206, "Partial Content");
							raw.pipe(response);
						} else {
							response.removeHeader("Content-Length");
							response.writeHead(416, "Request Range Not Satisfiable");
							response.end();						
						}					
					} else {
						var raw = fs.createReadStream(realPath);
						response.writeHead(200, "OK");
						raw.pipe(response);
					}
				}
			});
		}
	});
	logger.Web("SSL Web: listening on " + localIp + ":443");
}
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
      	logger.Debug('Deleting ' + curPath);
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
exports.startWebServer = startWebServer;
exports.startSSLWebServer = startSSLWebServer;
