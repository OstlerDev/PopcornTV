var logger = require('./logger');
var path = require('path');
var server;
var SSLserver;

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

	var xml = require('./XMLGenerator');
	var querystring = require("querystring");
	var torrent = require('./streamer');
	var ready;
	var progress;
	var port   = process.env.PORT != undefined ? process.env.PORT : 80;

	var mime   = require("./mime").types;
	server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = querystring.parse(url.parse(request.url).query);
		logger.Debug("Query: " + JSON.stringify(query));
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname.indexOf("MoviePlay.xml") >= 0){
			var aTVSettings = require('./settings.js');
			var subtitleSize = aTVSettings.checkSetting('subSize', query.UDID) || '100';

			if (subtitleSize == '')
				subtitleSize = '100';

			logger.Debug('=== Starting MoviePlay.xml Generation ===');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Streamer('Streamer: Starting Stream... Please wait for stream to be ready.');
			torrent.startStreamer(query.torrent, query.id, localIp);
			ready = false;
			progress = {status: 'downloading', downloaded: 0, progress: 0, downloadSpeed: 0}

			response.write(xml.generateProgressXML(query.poster));
			response.end();
			torrent.getStreamer().on('ready', function (data) {
				logger.Debug('=== Ending MoviePlay.xml Generation ===');
				if (data.isMP4){
					var playXML = xml.generatePlayXML(torrent.getURL(), decodeURIComponent(query.title), decodeURIComponent(query.desc), query.poster, (query.subtitle || 'Off'), subtitleSize);

					progress = {status: 'complete', xml: playXML};
					ready = true;
				} else {
					progress = {status: 'converting'};
					ready = true;
					// Start the conversion using FFMPEG
					convertFile(query.hash, function(){
						// As soon as the playlist file exists this will return so that we can start playing the episode.
						var playXML =xml.generatePlayXML('http://trailers.apple.com/converted/' + query.hash + '.m3u8', decodeURIComponent(query.title), decodeURIComponent(query.desc), query.poster, (query.subtitle || 'Off'), subtitleSize);
						
						progress = {status: 'complete', xml: playXML};
					});
				}
			});
			torrent.getStreamer().on('progress', function (torProgress) {
				torProgress.status = "downloading";
				if (ready == false)
					progress = torProgress;
			});
			torrent.getStreamer().on('close', function(){
				var aTVSettings = require('./settings.js');
				var keepMovies = aTVSettings.checkSetting('keep', query.UDID);

				try{
					ffmpeg.kill();
				} catch(e){}

				if (keepMovies == 'Off'){
					logger.Debug('====== Keep Movies is Off, Deleting Files ======')
					fs.readdirSync("./").forEach(function(fileName) {
        				if (path.extname(fileName) === ".mp4") {
        					logger.Debug('Deleting ' + fileName);
            				try{
            					fs.unlinkSync(fileName);
            				}catch(e){
            					logger.warning('Unable to delete file.');
            				}
        				}
    				});
    				deleteFolderRecursive(path.join('assets', 'torrent-stream'));
    				deleteFolderRecursive(path.join('assets', 'converted'));
				}
			})
			staticFile = false;
		} else if(pathname.indexOf("subtitle.json") >= 0){
			var subs = require('./SubtitleAPI');
			response.writeHead(200, {'Content-Type': 'text/json'});
			if (query.url == 'Off'){
				response.write('{}');
				response.end();
				staticFile = false;
			} else {
				logger.Debug('=== Starting subtitle.json Generation ===');
				subs.parseSRT(query.url, function(json){
					logger.Debug('=== Ending subtitle.json Generation ===');
					response.write(json);
					response.end();
				})
				staticFile = false;
			}
		} else if(pathname.indexOf("progress.json") >= 0){
			response.writeHead(200, {'Content-Type': 'text/json'});
			response.write(JSON.stringify(progress));
			response.end();
			staticFile = false;
		} else if(pathname.indexOf("more.json") >= 0){
			response.writeHead(200, {'Content-Type': 'text/json'});

			if (query.type == "movie"){
				var movies = require('./MoviesAPI');
				movies.getMovies(query.page, query.sort_by, query.amount, function(movies){
					response.write(JSON.stringify(movies));
					response.end();
				})
			}

			if (query.type == "tv"){
				var tv = require('./TVApi');
				tv.getTV(query.page, query.sort_by, query.amount, function(shows){
					response.write(JSON.stringify(shows));
					response.end();
				})
			}

			staticFile = false;
		} else if(pathname.indexOf("MoviesGrid.xml") >= 0){
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting MoviesGrid.xml Generation ===');
			xml.generateMoviesXML(query.title, query.sort_by, function(xmlstring){
				logger.Debug('=== Ending MoviesGrid.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("Parade.xml") >= 0){			
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
			var defaultQuality = query.quality || aTVSettings.checkSetting('quality', query.UDID);
			var defaultSubtitle = query.subtitle || aTVSettings.checkSetting('subtitle', query.UDID);
			var version = parseInt(request.headers['x-apple-tv-version']);

			if (aTVSettings.checkSetting('version', query.UDID) != '')
				version = aTVSettings.checkSetting('version', query.UDID);

			if (version < 6)
				fanart = 'Off';

			if (fanart == 'On'){				
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Ending MoviePrePlay.xml Generation ===');
				xml.generateMoviePrePlayFanartXML(query.torrentID, query.UDID, request.headers['x-apple-tv-resolution'], defaultQuality, defaultSubtitle, function(xmlstring){
					logger.Debug('=== Ending MoviePrePlay.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {				
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Starting MoviePrePlay.xml No Fanart Generation ===');
				xml.generateMoviePrePlayXML(query.torrentID, defaultQuality, defaultSubtitle, version, function(xmlstring){
					logger.Debug('=== Ending MoviePrePlay.xml No Fanart Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("quality.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting quality.xml Generation ===');
			xml.generateQuality(query.torrentID, query.UDID, query.qualities, query.subtitle, function(xmlstring){
				logger.Debug('=== Ending quality.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("subtitles.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting subtitles.xml Generation ===');
			xml.generateSubtitles(query.imdb, query.torrentID, query.UDID, query.quality, function(xmlstring){
				logger.Debug('=== Ending subtitles.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("qualitytv.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting qualitytv.xml Generation ===');
			xml.generateQualityTV(query.imdb, query.season, query.episode, query.UDID, query.qualities, query.subtitle, function(xmlstring){
				logger.Debug('=== Ending qualitytv.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("subtitlestv.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting subtitles.xml Generation ===');
			xml.generateSubtitlesTV(query.imdb, query.UDID, query.quality, query.episode, query.season, function(xmlstring){
				logger.Debug('=== Ending subtitles.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("extras.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting allresults.xml Generation ===');
			xml.generateMovieExtras(query.query, function(xmlstring){
				logger.Debug('=== Ending allresults.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("allresults.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting allresults.xml Generation ===');
			xml.generateSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending allresults.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("tvresults.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting tvresults.xml Generation ===');
			xml.generateTVSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending tvresults.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("results.xml") >= 0){			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting results.xml Generation ===');
			xml.generateMovieSearchResults(query.query, function(xmlstring){
				logger.Debug('=== Ending results.xml Generation ===');
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("TVGrid.xml") >= 0){			
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

			if (parseInt(request.headers['x-apple-tv-version']) < 6)
				fanart = 'Off';
			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting seasons.xml Generation ===');

			if (fanart == 'On'){
				xml.generateTVSeasonsFanart(query.imdb, query.title, request.headers['x-apple-tv-resolution'], function(xmlstring){
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
			var defaultQuality = query.tvquality || aTVSettings.checkSetting('tvquality', query.UDID) || "480p";
			var defaultSubtitle = query.subtitle || aTVSettings.checkSetting('subtitle', query.UDID);
			var version = parseInt(request.headers['x-apple-tv-version']);

			if (aTVSettings.checkSetting('version', query.UDID) != '')
				version = aTVSettings.checkSetting('version', query.UDID);

			if (version < 6)
				fanart = 'Off';
			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			logger.Debug('=== Starting TVPrePlay.xml Generation ===');
			if (fanart == 'On'){
				var API = require('./TVApi');
    			API.getEpisodeFanart(query.imdb, query.season, query.episode, request.headers['x-apple-tv-resolution'], function(show){
    				var options = {
    					type: 'TV',
    					imdb: query.imdb,
    					season: query.season,
    					episode: query.episode,
    					UDID: query.UDID,
    					resolution: request.headers['x-apple-tv-resolution']
    				}
					xml.generatePrePlayFanartXML(show, options, defaultQuality, defaultSubtitle, function(xmlstring){
						logger.Debug('=== Ending TVPrePlay.xml Generation ===');
						response.write(xmlstring);
						response.end();
					})
				})
			} else {
				xml.generateTVPrePlayXML(query.imdb, query.season, query.episode, query.UDID, defaultQuality, defaultSubtitle, version, function(xmlstring){
					logger.Debug('=== Ending TVPrePlay.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			}
			staticFile = false;
		} else if(pathname.indexOf("settings.xml") >= 0){			
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
				response.writeHead(200, {'Content-Type': 'text/xml'});
				logger.Debug('=== Starting scrobble.xml Generation ===');
				xml.generateScrobbleXML(query.type, query.id, query.UDID, 'removeFavorite.xml', 'Remove from Favorites', function(xmlstring){
					logger.Debug('=== Ending scrobble.xml Generation ===');
					response.write(xmlstring);
					response.end();
				})
			} else {				
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
			
			response.writeHead(200, {'Content-Type': 'text/xml'});
			xml.updateContextXML(function(xmlstring){
				response.write(xmlstring);
				response.end();
			})
			staticFile = false;
		} else if(pathname.indexOf("removeFavorite.xml") >= 0){
			var aTVSettings = require('./settings.js');
			aTVSettings.removeFavorite(query.type, query.id, query.UDID);
			
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
		} else if(pathname.indexOf("StopStream.xml") >= 0){
			try {
				torrent.getStreamer().close();
			} catch(e){
				logger.Debug('No Stream to Close.')
			}
			staticFile = false;
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
		var realPath = path.join(__dirname, "assets", path.normalize(pathname.replace(/\.\./g, "")));
		if (pathname.indexOf("log.xml") < 0) logger.Web(pathname);
		if(staticFile){
			fs.stat(realPath, function(err, stats) {
				if (err) {
					if (pathname.indexOf("log.xml") < 0) logger.Web('404: ' + pathname);
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
	server.listen(port, localIp);
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
	logger.Web("listening on " + localIp + ":" + port);
}

function startSSLWebServer(localIp) {

	var url    = require("url");
	var https   = require("https");
	var path   = require("path");
	var mime   = require("./mime").types;
	var port   = process.env.SSLPORT != undefined ? process.env.SSLPORT : 443;

	//
	// SSL Certificates
	//
	fs = require('fs');
	options = {
	  key: fs.readFileSync(__dirname + '/assets/certificates/trailers.pem')
	, ca: [ fs.readFileSync(__dirname + '/assets/certificates/trailers.pem') ]
	, cert: fs.readFileSync(__dirname + '/assets/certificates/trailers.pem')
	, requestCert: false
	, rejectUnauthorized: false
	};

	SSLserver = https.createServer(options);
	SSLserver.listen(port, localIp);
	SSLserver.on('error', function(err){
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
	SSLserver.on('request', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname.indexOf("application.js") >= 0){
			pathname = "js/application.js";
		}
		var realPath = path.join(__dirname, "assets", path.normalize(pathname.replace(/\.\./g, "")));
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
	logger.Web("SSL Web: listening on " + localIp + ":" + port);
}
var deleteFolderRecursive = function(locpath) {
  if( fs.existsSync(locpath) ) {
    fs.readdirSync(locpath).forEach(function(file,index){
      var curPath = path.join(locpath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
      	logger.Debug('Deleting ' + curPath);
        try {
        	fs.unlinkSync(curPath);
        } catch(e){
        	logger.warning('Cannot delete file.'); // Omit sending the file as then it is proof that the user downloaded the file.
        }

       }
    });
    try{
    	fs.rmdirSync(locpath);
    } catch (e) {
    	logger.warning('Unable to delete path.'); // Omit sending path so that it is not logged to server.
    }
  }
};

var spawn = require('child_process').spawn;
var ffmpeg;

function convertFile(hash, callback){
	logger.warning('=============== WARNING ===============');
	logger.warning('Attempting to convert non-supported file using FFMPEG.');
	logger.warning('This is VERY Unstable and most likely WILL NOT WORK!');
	logger.warning('=======================================');
	var torrentFile;
	var torPath = path.join('assets', 'torrent-stream', hash);

	fs.readdirSync(torPath).forEach(function(file, index){
		var curPath = path.join(torPath, file);
		if(fs.lstatSync(curPath).isDirectory()){
			fs.readdirSync(curPath).forEach(function(file2, index){
				logger.Debug(file2);
				var ext = path.extname(file2);
				if (ext == '.mkv' || ext == '.avi'){
					torrentFile = path.join(curPath, file2);
				}
			})
		} else {
			logger.Debug(file);
			var ext = path.extname(file);
			if (ext == '.mkv' || ext == '.avi'){
				torrentFile = path.join(torPath, file);
			}
		}
	})
	if (!fs.existsSync(path.join('assets', 'converted'))){
	    fs.mkdirSync(path.join('assets', 'converted'));
	}

	// ffmpeg -re -i test.mkv -max_delay 50000 -map 0  -c copy -c:v libx264 -profile:v baseline -flags -global_header -f segment -segment_time 5 -segment_list_flags +live -segment_wrap 0 -segment_list ../../test/playlist.m3u8  -segment_format mpegts ../../test/segment_%05d.ts

	var file = path.join('assets', 'converted', hash);
	var args = ['-re', '-i', torrentFile, '-max_delay', '50000', '-map', '0', '-c', 'copy', '-c:v', 'libx264', '-profile:v', 'baseline', '-flags', '+global_header', '-f', 'segment', '-segment_time', '3', '-segment_list_flags', '+live', '-segment_wrap', '0', '-segment_list', file + '.m3u8', '-segment_format', 'mpegts', file + '_%05d.ts']

	if (fs.existsSync('ffmpeg.exe')){
    	ffmpeg = spawn('ffmpeg.exe', args);
	} else if (fs.existsSync('ffmpeg')){
    	ffmpeg = spawn('./ffmpeg', args);
	} else {
		ffmpeg = spawn('ffmpeg', args);
	}

	var returned = false;
	var lastMessage;
    ffmpeg.stderr.on('data', function(data) {
        ffmpeg.stdin.setEncoding('utf8');
        if (data.toString().indexOf('Read error') > -1){
        	logger.error('=============== ERROR ===============');
        	logger.error('There was an error converting this file at:');
        	logger.error(lastMessage);
        	logger.error('Please try a different file.')
        	logger.error('=====================================');
        }

        logger.Debug(data.toString());
        if (!returned){
        	try{
	        	fs.lstatSync(file + '.m3u8');
	        	returned = true;
	        	callback();
	        } catch(e) {}
        }
        lastMessage = data.toString();
    });
}

function stop(){
	logger.Web('Stopping WebServer');
	server.close();
	logger.Web('Stopping SSL WebServer');
	SSLserver.close();
}
exports.startWebServer = startWebServer;
exports.startSSLWebServer = startSSLWebServer;
exports.stop = stop;
