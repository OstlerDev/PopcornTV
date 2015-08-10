var inherits = require('util').inherits
  , request = require('request');

var Streamer = require('./base');

/* -- HTTP Streamer -- */
function HttpStreamer(source, options) {
	if(!(this instanceof HttpStreamer))
		return new HttpStreamer(source, options);

	Streamer.call(this, options);
	var self = this;
	options = options || {};

	this.request = request.defaults({
		encoding: null
	});

	this._options = options;
	this._source = source;
	this._req = this.request(source, options.http);
	this._req.on('response', function(res) {
		var length = self._req.getHeader('content-length', res.headers);
		if(length !== undefined) {
            self._progress.setLength(parseInt(length));
            self.file.length = length;
        }
	})
	this._streamify.resolve(this._req);
}
inherits(HttpStreamer, Streamer);

HttpStreamer.prototype.seek = function(start, end) {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	var self = this;
	start = start || 0;

	if(this._req)
		this._req.destroy();

	this._req = this.request(this._source, {
		headers: {
			'Range': 'bytes=' + start + '-' + (end !== undefined ? end : '')
		}
	}).on('response', function(res) {
		var length = self._req.getHeader('content-length', res.headers);
		if(length !== undefined)
			self._progress.setLength(parseInt(length));
	})

	this._streamify.unresolve();
	this._streamify.resolve(this._req);
}

HttpStreamer.prototype.destroy = function() {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	if(this._req)
		this._req.destroy();
	this._streamify.unresolve();
	this._req = null;
	this._destroyed = true;
    this.file = {};
}

module.exports = HttpStreamer;
