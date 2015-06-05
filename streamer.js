var Streamer = require('./streamer-server');
var logger = require('./logger');

var torrent;
var ready = false;
var boundURL = "not ready";
var ID;
var ip;
function startStreamer(url, torrentID, localIp) {
	ID = torrentID;
	ip = localIp;
	var streamBuffer = 10 * 1024 * 1024;
	if (url.indexOf("youtube") >= 0){
		streamBuffer = 3 * 1024 * 1024;
	}
	torrent = new Streamer(url, 
	{
		youtube: {
			hd: true
		},
		hostname: ip,
		progressInterval: 200,
		buffer: streamBuffer,
		port: 9999,
		writeDir: '',
		index: torrentID + '.mp4'
	});
	torrent.on('ready', function (data) {
		logger.Streamer('Streamer: Ready to Stream, binding to ' + data.streamUrl);
		boundURL = data.streamUrl;
		ready = true;
	});
	torrent.on('close', function () {
		logger.Debug('Streamer: Stream Closed');
	});
	torrent.on('progress', function (progress) {
		logger.Debug(progress);
	});
	torrent.on('error', function (e) {
		logger.error(e);
	});
}

function getURL(){
	return "http://" + ip + ":9999/" + ID + '.mp4';
}

function getStreamer(){
	return torrent;
}

exports.startStreamer = startStreamer;
exports.getURL = getURL;
exports.getStreamer = getStreamer;