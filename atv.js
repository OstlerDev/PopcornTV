var webservers = require("./webserver");
var dns = require('./dns');
const LOCAL_IP = "10.0.1.2"; // ************* Change to the IP address of the machine you are running the DNS proxy and Web server on *************

console.log("Starting PopcornTV");
dns.startDnsProxy(LOCAL_IP);
webservers.startWebServer(LOCAL_IP);
webservers.startSSLWebServer(LOCAL_IP);
