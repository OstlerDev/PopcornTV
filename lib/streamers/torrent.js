var inherits = require('util').inherits
  , torrentStream = require('torrent-stream')
  , readTorrent = require('read-torrent')
  , crypto = require('crypto');

var Streamer = require('./base');

/* -- Torrent Streamer -- */
function TorrentStreamer(source, options) {
	if(!(this instanceof TorrentStreamer))
		return new TorrentStreamer(source, options);

	Streamer.call(this, options);
	var self = this;
	options = options || {};

	if(options.torrent &&
	   options.torrent.id &&
	   options.torrent.id.length < 20) {
		var idRemainder = 20 - options.torrent.id.length;
		var remainderHash = crypto.createHash('sha1')
							.update(crypto.pseudoRandomBytes(idRemainder))
							.digest('hex')
							.slice(0, idRemainder);
		options.torrent.id += remainderHash;
	}

	this._ready = false;

	readTorrent(source, function(err, torrent) {
		if(err) throw err;

		self._torrentStream = torrentStream(torrent, options.torrent);
		self._torrentStream.on('uninterested', function() { self._torrentStream.swarm.pause() });
		self._torrentStream.on('interested',   function() { self._torrentStream.swarm.resume() });

		self._torrentStream.on('ready', function() {
			if (typeof options.fileIndex !== 'number') {
				index = self._torrentStream.files.reduce(function(a, b) {
					return a.length > b.length ? a : b;
				});
				index = self._torrentStream.files.indexOf(index);
			}

			self._torrentStream.files[index].select();
			self.file = self._torrentStream.files[index];
			self.filesize = self._torrentStream.torrent.files[index].length;
			self._progress.setLength(self.file.length);
			self._streamify.resolve(self.file.createReadStream());
			self._isReady();
		})
	})
}
inherits(TorrentStreamer, Streamer);

TorrentStreamer.prototype._requestProgress = function() {
	var swarm = this._torrentStream.swarm;
	return {
		pieces: swarm.piecesGot,
		size: this.filesize,
		peers: swarm.wires.filter(function(wire) {return !wire.peerChoking && wire.peerInterested}).length,
		seeds: swarm.wires.filter(function(wire) {return !wire.peerInterested}).length,
		connections: swarm.wires.length,
		uploadSpeed: swarm.uploadSpeed()
	};
}

TorrentStreamer.prototype.seek = function(start, end) {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');
	if(!this._ready) return;

	var opts = {
		start: start
	}

	if(end !== undefined) {
		opts.end = end;
	}

	this._streamify.unresolve();
	this._streamify.resolve(this.file.createReadStream(opts));
}

TorrentStreamer.prototype.destroy = function() {
	if(this._destroyed) throw new ReferenceError('Streamer already destroyed');

	this._torrentStream.destroy();
	this._streamify.unresolve();
	this._ready = false;
	this._torrentStream = null;
	this.file = {};
	this._destroyed = true;
}

module.exports = TorrentStreamer;
