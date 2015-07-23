var webservers = require("./webserver");
var dns = require('./dns');
var ip = require("ip");
var logger = require('./logger');
var fs = require('fs');

if(require.main === module)
    start();

function startServers(data) {
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

function createCertificate(){
    var pem = require('pem');
    logger.notice('Creating SSL Certificates...');
    pem.createCertificate({days:7200, selfSigned:true, country: 'US', commonName: 'trailers.apple.com'}, function(err, keys){
        try{
            fs.writeFileSync(__dirname + '/assets/certificates/trailers.cer', keys.certificate + '\n' + keys.serviceKey);
            fs.writeFileSync(__dirname + '/assets/certificates/trailers.pem', keys.certificate + '\n' + keys.serviceKey);
            start();
        } catch(e){
            logger.warning('Unable to create certificates, generating them on the server, please wait...');
            var http = require('https');
            var cer = fs.createWriteStream(__dirname + "/assets/certificates/trailers.cer");
            var pem = fs.createWriteStream(__dirname + "/assets/certificates/trailers.pem");
            var request = http.get('https://popcorntv.io/createCert.php', function(response) {
                response.pipe(cer);
                response.pipe(pem);
                cer.on('finish', function() {
                   start();
                });
            }).on('error', function(e){
                logger.warning('Unable to create or download certificates, please report this bug on Github.')
              logger.error(e);
            });
        }
    });
}

function start(){
    if (!fs.existsSync(__dirname + '/assets/certificates/trailers.cer')){
        createCertificate();
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
}

function stop(){
    dns.stop();
    webservers.stop();
    logger.notice('PopcornTV Stopped.');
}

exports.start = start;
exports.stop = stop;