var inherits = require('util').inherits
  , URI = require('URIjs')
  , fs = require('fs');

var Streamer = require('./base');

/* -- File Streamer -- */
function FileStreamer(source, options) {
	if(!(this instanceof FileStreamer)) 
		return new FileStreamer(source, options);

	Streamer.call(this, options);
	var self = this;
	options = options || {};

	if(URI(source).protocol() === 'file') {
		source = URI(source).path();
	}

	this._options = options;
	this._source = source;

	this._fileStream = fs.createReadStream(source);

	this._streamify.resolve(this._fileStream);
}
inherits(FileStreamer, Streamer);

FileStreamer.prototype.seek = function(start, end) {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');
	
	var self = this;
	start = start || 0;

	this._fileStream = fs.createReadStream(this._source, {start: start, end: end});

	this._streamify.unresolve();
	this._streamify.resolve(this._fileStream);
}

FileStreamer.prototype.destroy = function() {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	this._streamify.unresolve();
	this._fileStream = null;
	this._destroyed = true;
}

module.exports = FileStreamer;