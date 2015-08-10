var inherits = require('util').inherits
  , PassThrough = require('stream').PassThrough
  , streamify = require('streamify')
  , progressStream = require('progress-stream');

/* -- Base Streamer -- */
function Streamer(options) {
	var self = this;

	options = options || {};
	var progressOptions = {
		time: options.progressInterval || 1000,
		speed: options.speedDelay
	}

	PassThrough.call(this);

	this._destroyed = false;

    this.file = {};
	this.downloaded = 0;
	this.progress = 0;
	this.downloadSpeed = 0;
	this.eta = Infinity;

    this._isReady = function() {
        self._ready = true;
        self.emit('ready', self.file);
    }

	this._streamify = streamify(options.streamify);
	this._progress = progressStream(progressOptions);

	this._progress.on('progress', function(progress) {
		self.downloaded = progress.transferred;
		self.progress = progress.percentage;
		self.downloadSpeed = progress.speed;
		self.eta = progress.eta || Infinity;

		var progObj = {
			downloaded: progress.transferred,
			progress: progress.percentage,
			downloadSpeed: progress.speed,
			eta: progress.eta || Infinity
		};

		if(typeof self._requestProgress === 'function') {
			var upstreamProg = self._requestProgress();
			for(var key in upstreamProg) {
				if(upstreamProg[key] !== 'undefined') {
					progObj[key] = upstreamProg[key];
					if(self[key] === undefined) {
						// TODO: Is this the best way to do it?
						self[key] = upstreamProg[key];
					}
				}
			}
		}

		self.emit('progress', progObj)
	})

	this._streamify.pipe(this._progress).pipe(this);
}
inherits(Streamer, PassThrough);

Streamer.prototype.seek = function(start, end) {
	// Virtual function, implemented in child
}

Streamer.prototype.destroy = function() {
	// Virtual function, implemented in child
}

module.exports = Streamer;
