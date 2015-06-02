var webservers = require("./webserver");
var dns = require('./dns');
var ip = require("ip");

var fs = require('fs');
if (!fs.existsSync('assets/certificates/trailers.cer')){
    var pem = require('pem');
    console.log('SSL Certificate does not exist, Please restart PopcornTV once the process ends!');
    pem.createCertificate({days:720, selfSigned:true, country: 'US', commonName: 'trailers.apple.com'}, function(err, keys){
        fs.writeFile('assets/certificates/trailers.cer', keys.certificate+ '\n' + keys.serviceKey);
        fs.writeFile('assets/certificates/trailers.pem', keys.certificate+ '\n' + keys.serviceKey);
    });
} else if (fs.existsSync('config.json')) {
    var data = fs.readFileSync('./config.json'), config;
    try {
        config = JSON.parse(data);
        const LOCAL_IP = config.ip;
        console.log("Starting PopcornTV");
		dns.startDnsProxy(LOCAL_IP);
		webservers.startWebServer(LOCAL_IP);
		webservers.startSSLWebServer(LOCAL_IP);
    } catch (err) {
        console.log('There is an error starting Popcorn TV, please post this on the Github page')
        console.log(err);
        process.exit();
    }
} else {
    var myOptions = {
        ip: ip.address(),
        default_dns: '8.8.8.8'
    };

    var data = JSON.stringify(myOptions);

    fs.writeFile('./config.json', data, function(err) {
        if (err) {
            console.log('There has been an error generating the Config, please report this error on the github page!');
            console.log(err.message);
            return;
        }
        var data = fs.readFileSync('./config.json'), config;
        try {
            config = JSON.parse(data);
            const LOCAL_IP = config.ip;
            console.log("Starting PopcornTV");
            dns.startDnsProxy(LOCAL_IP);
            webservers.startWebServer(LOCAL_IP);
            webservers.startSSLWebServer(LOCAL_IP);
        } catch (err) {
            console.log('There is an error starting Popcorn TV, please post this on the Github page')
            console.log(err);
            process.exit();
        }
    });
}