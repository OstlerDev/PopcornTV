var Winston = require('winston');
if (process.argv[2] != undefined){
	var level = process.argv[2];
} else {
	var level = "Web";
}

var logger = startLogger(level);

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

function startLogger(LoggingLevel){
	var logger = new (Winston.Logger)({
    	levels: {Debug: 0, Web: 1, DNS: 1, Streamer: 1, notice: 2, warning: 3, error: 4},
	    transports: [
    	    new Winston.transports.Console({
        	    level: LoggingLevel,
        	    colorize: true,
        	    prettyPrint: true,
        	    json: false
        	}),
        	new (Winston.transports.File)({ 
        		filename: './PopcornTV.log', 
        		level: LoggingLevel, 
        		prettyPrint: true, 
        		json: false,
        		maxsize: 10 * 1024 * 1024,
        		maxFiles: 3,
        		tailable: true
        	})
    	],
    	colors: {Debug: "red", Web: "cyan", DNS: "cyan", Streamer: "cyan", notice: "white", warning: "yellow", error: "red"}
	});
	return logger;
}

module.exports=logger;