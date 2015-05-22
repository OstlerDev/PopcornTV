var Streamer = require('popcorn-streamer-server');

var torrent;
var ready = false;
var boundURL = "not ready";
var ID;
function startStreamer(url, torrentID) {
	ID = torrentID;
	var streamBuffer = 10 * 1024 * 1024;
	if (url.indexOf("youtube") >= 0){
		streamBuffer = 100;
	}
	torrent = new Streamer(url, 
	{
		progressInterval: 200,
		buffer: streamBuffer,
		port: 9999,
		writeDir: '',
		index: torrentID + '.mp4'
	});
	console.log('Starting downloader');
	torrent.on('ready', function (data) {
		console.log('Ready to Stream');
		console.log('binding to ' + data.streamUrl);
		boundURL = data.streamUrl;
		ready = true;
	});
	torrent.on('close', function () {
		console.log('im closed');
	});
	torrent.on('progress', function (progress) {
		console.log(progress);
	});
	torrent.on('error', function (e) {
		console.log(e);
	});
}

function isReady(){
	return ready;
}

function getURL(){
	return "http://10.0.1.2:9999/" + ID + ".mp4";
}

function getStreamer(){
	return torrent;
}

exports.startStreamer = startStreamer;
exports.isReady = isReady;
exports.getURL = getURL;
exports.getStreamer = getStreamer;