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

	var mime   = require("./mime").types;
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log(request.url);
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname.indexOf("MoviePlay.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			var torrent = require('./streamer');
			torrent.startStreamer('https://yts.to/torrent/download/17BC0989C415736BD5748A276233E56BB37C30AF.torrent');
			console.log('waiting on streamer to be ready');
			torrent.getStreamer().on('ready', function (data) {
				response.write(xml.generatePlayXML(torrent.getURL(), "Tron Legacy", "Sam Flynn and poops", "http://trailers.apple.com/Movies/TronLegacy.jpg"));
				response.end();
			});
			torrent.getStreamer().on('close', function () {
				console.log('Streaming Closed');
			});
			torrent.getStreamer().on('progress', function (progress) {
				console.log(progress);
			});
			staticFile = false;
		} else if(pathname.indexOf("MoviesGrid.xml") >= 0){
			var xml = require('./XMLGenerator');
			response.writeHead(200, {'Content-Type': 'text/xml'});
			response.write(xml.generatePopularMoviesXML());
			response.end();
			staticFile = false;
		} else if(pathname.indexOf(".xml") >= 0){
			pathname = "templates" + pathname;
		}
		var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));
		console.log("WEB: " + pathname);
		if(staticFile){
			fs.stat(realPath, function(err, stats) {
				if (err) {
					console.log('404: ' + pathname)
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
						console.log('All good! Just served: ' + pathname)
						response.writeHead(200, "OK");
						raw.pipe(response);
					}
				}
			});
		}
	});
	server.listen(80);
	console.log("WebServer listening on " + localIp + ":80");
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
	server.on('request', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log(request.url);
		var staticFile = true;
		if (pathname.charAt(pathname.length - 1) == "/") {
			pathname += "index.html";
		} else if(pathname == "/appletv/us/js/application.js"){
			pathname = "js/application.js";
		} else if(pathname.includes(".xml")){
			pathname = "templates/" + pathname;
		}
		var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));
		console.log("SSL WEB: " + pathname);
		
		if(staticFile){
			fs.stat(realPath, function(err, stats) {
				if (err) {
					console.log('404: ' + pathname)
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
						console.log('All good! Just served: ' + pathname)
						response.writeHead(200, "OK");
						raw.pipe(response);
					}
				}
			});
		}
	});
	console.log("SSL WebServer listening on " + localIp + ":443");
}

function create(server, host, port, publicDir){
	var express = require('express');
	var app = express();
	app.use(express.static(publicDir));

	return app;
}

exports.startWebServer = startWebServer;
exports.startSSLWebServer = startSSLWebServer;
