var Streamer = require('popcorn-streamer-server');

var torrent;
var ready = false;
var boundURL = "not ready";
function startStreamer(url) {
	torrent = new Streamer(url, 
	{
		progressInterval: 200,
		buffer: 10 * 1024 * 1024,
		port: 9999,
		writeDir: '',
		index: 'video.mp4'
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
	return "http://10.0.1.2:9999/video.mp4";
}

function getStreamer(){
	return torrent;
}

exports.startStreamer = startStreamer;
exports.isReady = isReady;
exports.getURL = getURL;
exports.getStreamer = getStreamer;