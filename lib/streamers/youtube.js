var inherits = require('util').inherits
  , ytdl = require('ytdl-core');

var Streamer = require('./base');

/* -- YouTube Streamer -- */
function YoutubeStreamer(source, options) {
	if(!(this instanceof YoutubeStreamer))
		return new YoutubeStreamer(source, options);

	Streamer.call(this, options);
	var self = this;
	options = options || {};
	options.youtube = options.youtube || {};

	this._options = options;
	this._source = source;
	this._video = ytdl(source, {quality: options.youtube.audio ? 140 : (options.youtube.hd ? 22 : 18)});
	this._video.on('info', function(info, format) {
		self._progress.setLength(format.size);
        self.file.length = format.size;
	})
	this._streamify.resolve(this._video);
}
inherits(YoutubeStreamer, Streamer);

YoutubeStreamer.prototype.seek = function(start, end) {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	var self = this;
	start = start || 0;

	this._video = ytdl(this._source, {quality: this._options.youtube.audio ? 140 : (this._options.youtube.hd ? 22 : 18), range: start + '-' + (end !== undefined ? end : '')});
	this._video.on('info', function(info, format) {
		self._progress.setLength(format.size);
	})

	this._streamify.unresolve();
	this._streamify.resolve(this._video);
}

YoutubeStreamer.prototype.destroy = function() {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	this._streamify.unresolve();
	this._video = null;
	this._destroyed = true;
    this.file = {};
}

module.exports = YoutubeStreamer;
