var webservers = require("./webserver");
var dns = require('./dns');

var fs = require('fs');
if (fs.existsSync('config.json')) {
    var data = fs.readFileSync('./config.json'), config;
    try {
        config = JSON.parse(data);
        const LOCAL_IP = config.ip;
        console.log("Starting PopcornTV");
		dns.startDnsProxy(LOCAL_IP);
		webservers.startWebServer(LOCAL_IP);
		webservers.startSSLWebServer(LOCAL_IP);
    } catch (err) {
        console.log('There has been an error parsing your JSON.')
        console.log(err);
    }
} else {
    var myOptions = {
        ip: '10.0.1.2',
        default_dns: '8.8.8.8'
    };

    var data = JSON.stringify(myOptions);

    fs.writeFile('./config.json', data, function(err) {
        if (err) {
            console.log('There has been an error generating the Config, please report this error on the github page!');
            console.log(err.message);
            return;
        }
        console.log('Configuration Generated. Please fill in the IP, then restart the program!');
        process.exit();
    });
}