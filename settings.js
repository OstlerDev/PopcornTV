var fs = require('fs');
var logger = require('./logger')

function changeSetting(UDID, setting, newSetting){
    var data = fs.readFileSync('./aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        settings[UDID][setting] = newSetting;
        fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
    } catch (err) {
        logger.error('There is an error changing a setting, please post this on the Github page')
        logger.error(err);
        process.exit();
    }
}
function loadSetting(UDID, setting){

}
function loadSettings(UDID){
    if (fs.existsSync('aTVSettings.json')) {
        var data = fs.readFileSync('./aTVSettings.json'), config;
        try {
            settings = JSON.parse(data);
            
            if (settings[UDID] == undefined) {
                console.log("Adding TV " + UDID);
                return addTV(UDID);
            } else {
                return settings[UDID];
            }
        } catch (err) {
            logger.error('There is an error starting Popcorn TV, please post this on the Github page')
            logger.error(err);
        }
    } else {
        var settings = {};
        settings[UDID] = {
            quality: '720p',
            fanart: 'On',
            subtitle: 'Off'
        };

        var data = JSON.stringify(settings, null, 4);

        fs.writeFile('./aTVSettings.json', data);

        return settings[UDID];
    }
}
function createFile(UDID){
    var settings = {};
    settings[UDID] = {
        quality: '720p',
        fanart: 'On',
        subtitle: 'Off'
    };

    var data = JSON.stringify(settings, null, 4);

    fs.writeFile('./aTVSettings.json', data, function(err) {});
}
function addTV(UDID){
    var data = fs.readFileSync('./aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        settings[UDID] = {
            quality: '720p',
            fanart: 'On',
            subtitle: 'Off'
        };
        fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
        return settings[UDID];
    } catch (err) {
        logger.error('There is an error changing a setting, please post this on the Github page')
        logger.error(err);
    }
}

exports.loadSettings = loadSettings;
exports.loadSetting = loadSetting;
exports.changeSetting = changeSetting;