var Winston = require('winston');
require('winston-loggly');

if (process.argv[2] != undefined){
	var level = process.argv[2];
} else {
	var level = "Web";
}

var logger = startLogger(level);

function startLogger(LoggingLevel){
    var logglyLevel = 'notice';
    if (LoggingLevel == 'Debug')
        logglyLevel = 'Debug';
	var logger = new (Winston.Logger)({
        exitOnError: false,
    	levels: {Debug: 0, Web: 1, DNS: 1, Streamer: 1, notice: 2, warning: 3, error: 4},
	    transports: [
    	    new Winston.transports.Console({
        	    level: LoggingLevel,
        	    colorize: true,
        	    prettyPrint: true,
        	    json: false,
                handleExceptions: true
        	}),
        	new (Winston.transports.File)({ 
        		filename: __dirname + '/PopcornTV.log', 
        		level: LoggingLevel, 
        		prettyPrint: true, 
        		json: false,
        		maxsize: 10 * 1024 * 1024,
        		maxFiles: 3,
        		tailable: true,
                handleExceptions: true
        	}),
            new Winston.transports.Loggly({
                level: logglyLevel,
                subdomain: 'popcorntv',
                inputToken: '82e99d85-2ef6-4c3b-9978-5853cf8fe869',
                json: true,
                handleExceptions: true
            })
    	],
    	colors: {Debug: "red", Web: "cyan", DNS: "cyan", Streamer: "cyan", notice: "white", warning: "yellow", error: "red"}
	});
	if (LoggingLevel != "Web"){
		logger.notice("Started logger in " + LoggingLevel + " mode!");
	}
	return logger;
}

module.exports=logger;