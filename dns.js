var logger = require('./logger');

const DOMAIN_ATV = "trailers.apple.com";
const IP_DNS     = "8.8.8.8"; // *********** Googles Default DNS ***********
const ATV_UPDATE = ['mesu.apple.com', 'appldnld.apple.com', 'appldnld.apple.com.edgesuite.net'];

function resolveDNSDomain(msg) {
	var domain = [];
	var index  = 12;
	var offset;
	while (offset = msg.readUInt8(index++)) {
		var sub = "";
		for (var i = 0; i <  offset; i++) {
			try{
				sub += String.fromCharCode(msg.readUInt8(index++));
			} catch(e) {
				logger.error(e);
			}
		}
		sub && domain.push(sub)
	}
	return domain.join(".");
}

var _domain = "";
var _ip     = "";
function resolveDNSIp(msg) {
	if (msg.readUInt16LE(2) != 0x8081) return -1;
	
	var domain = [];
	var index  = 12;
	var offset;
	while (offset = msg.readUInt8(index++)) {
		var sub = "";
		for (var i = 0; i < offset; i++) {
			sub += String.fromCharCode(msg.readUInt8(index++));
		}
		sub && domain.push(sub);
	}
	_domain = domain.join(".");
	index += 4;
	while (msg.readUInt32BE(index + 2) != 0x00010001) {
		index += 10;
		var rdLength = msg.readUInt16BE(index);
		index += (rdLength + 2);
		
		if (index >= msg.length) return -1;
	}
	if (msg.readUInt16BE(index + 10) != 4) return -1;
	
	index += 12;
	_ip = msg.readUInt8(index) + "."
	     +msg.readUInt8(index + 1) + "."
	     +msg.readUInt8(index + 2) + "."
	     +msg.readUInt8(index + 3);
	return index;
}

function dot2num(dot) {
	var d = dot.split('.');
	return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function getMsg(tag, domain, ip) {
	var msg = { size: 0, msg: ""};
	var offset = 0;
	
	msg.size = 128;
	msg.msg  = new Buffer(msg.size);
	msg.msg.writeUInt16BE(tag, offset);
	offset += 2;
	msg.msg.writeUInt16BE(0x8180, offset);
	offset += 2;
	msg.msg.writeUInt32BE(0x00010001, offset);
	offset += 4;
	msg.msg.writeUInt32BE(0x00000000, offset);
	offset += 4;
	
	//write domain
	var d = domain.split('.');
	for (var i = 0; i < d.length; i++) {
		var length = d[i].length;
		msg.msg.writeUInt8(length, offset++);
		msg.msg.write(d[i], offset, length);
		offset += length;
	}
	msg.msg.writeUInt8(0, offset++);
	
	msg.msg.writeUInt32BE(0x00010001, offset);
	offset += 4;
	msg.msg.writeUInt16BE(0xC00C, offset);
	offset += 2;
	msg.msg.writeUInt32BE(0x00010001, offset);
	offset += 4;
	msg.msg.writeUInt32BE(0x00000C82, offset);
	offset += 4;
	msg.msg.writeUInt16BE(0x0004, offset);
	offset += 2;
	msg.msg.writeUInt32BE(ip, offset);
	offset += 4;
	
	msg.size = offset;
	return msg;
}

function startDnsProxy(localIp) {
	var dgram = require("dgram");
	
	var dns;
	dns = dgram.createSocket("udp4", function(msg, rinfo) {
		var domain  = resolveDNSDomain(msg);
		var server  = this;
		var address = rinfo.address;
		var port    = rinfo.port;

		if (domain == DOMAIN_ATV) {
			var tag = msg.readUInt16BE(0);
			var ip  = dot2num(localIp);
			var newMsg = getMsg(tag, domain, ip);
			logger.Debug(DOMAIN_ATV + " change to " + localIp);
			server.send(newMsg.msg, 0, newMsg.size, port, address);
			return;
		} else if(domain == ATV_UPDATE[0] || domain == ATV_UPDATE[1] || domain == ATV_UPDATE[2]){
			var tag = msg.readUInt16BE(0);
			var ip  = dot2num('127.0.0.1');
			var newMsg = getMsg(tag, domain, ip);
			logger.DNS('Blocking ATV Update Attempt');
			logger.Debug(DOMAIN_ATV + " change to " + '127.0.0.1');
			server.send(newMsg.msg, 0, newMsg.size, port, address);
			return;
		} else {
			logger.DNS(domain);
		}
		dgram.createSocket("udp4", function(msg, rinfo) {
			server.send(msg, 0, rinfo.size, port, address);
			this.close();
		}).send(msg, 0, rinfo.size, 53, IP_DNS);
	});
	dns.bind(53, localIp);
	dns.on('error', function(err){
		if (err.code == 'EADDRINUSE'){
			logger.error('========= FATAL ERROR =========');
			logger.error('Cannot bind to Port 53. Please make sure you are not running a DNS server on your machine!');
			logger.error('Error Code: ' + err.code);
			logger.error('===============================');
			process.exit();
		}
		logger.error('========= FATAL ERROR =========');
		logger.error('Cannot start DNS Server. Please make sure you are using the correct IP!');
		logger.error('Error Code: ' + err.code);
		logger.error('===============================');
		process.exit();
	})
	logger.DNS("DnsProxy binding on " + localIp + ":53");
}

exports.startDnsProxy = startDnsProxy;