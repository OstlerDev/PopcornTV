var webservers = require("./webserver");
var dns = require('./dns');
var ip = require("ip");
var logger = require('./logger');

startServers = function(data) {
	try {
        config = JSON.parse(data);
        const LOCAL_IP = config.ip;
        logger.notice("Starting PopcornTV");
        dns.startDnsProxy(LOCAL_IP);
        webservers.startWebServer(LOCAL_IP);
        webservers.startSSLWebServer(LOCAL_IP);
    } catch (err) {
        logger.error('There is an error starting Popcorn TV, please post this on the Github page')
        console.error(err);
        process.exit();
    }
}

var fs = require('fs');
if (!fs.existsSync('assets/certificates/trailers.cer')){
    var pem = require('pem');
    logger.warning('SSL Certificate does not exist, Please restart PopcornTV once the process ends!');
    pem.createCertificate({days:7200, selfSigned:true, country: 'US', commonName: 'trailers.apple.com'}, function(err, keys){
        try{
            fs.writeFile('assets/certificates/trailers.cer', keys.certificate + '\n' + keys.serviceKey);
            fs.writeFile('assets/certificates/trailers.pem', keys.certificate + '\n' + keys.serviceKey);
            logger.notice('Certificate successfully saved, please restart PopcornTV using the same command that you just ran.');
        } catch(e){
            logger.warning('Unable to create certificates, generating them on the server, please wait...');
            var http = require('http');
            var cer = fs.createWriteStream("assets/certificates/trailers.cer");
            var pem = fs.createWriteStream("assets/certificates/trailers.pem");
            var request = http.get('http://popcorntv.io/createCert.php', function(response) {
                response.pipe(cer);
                response.pipe(pem);
                file.on('finish', function() {
                   logger.notice('Certificate successfully saved, please restart PopcornTV using the same command that you just ran.');
                });
            }).on('error', function(e){
                logger.warning('Unable to create or download certificates, please report this bug on Github.')
              logger.error(e);
            });
        }
    });
} else if (fs.existsSync('config.json')) {
    var data = fs.readFileSync('./config.json'), config;
    startServers(data);
} else {
    var myOptions = {
        ip: ip.address(),
        default_dns: '8.8.8.8'
    };

    var data = JSON.stringify(myOptions, null, 4);

    fs.writeFile('./config.json', data, function(err) {
        if (err) {
            logger.error('There has been an error generating the Config, please report this error on the github page!');
            logger.error(err.message);
            return;
        }
        var data = fs.readFileSync('./config.json'), config;
        startServers(data);
    });
}