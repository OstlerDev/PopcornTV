var fs = require('fs');
var logger = require('./logger')

function changeSetting(UDID, setting, newSetting){
    var data = fs.readFileSync('./aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        logger.Debug('Changing setting ' + setting + ' from ' + settings[UDID][setting] + ' to ' + newSetting + ' - UDID: ' + UDID);
        settings[UDID][setting] = newSetting;
        fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
    } catch (err) {
        logger.error('There is an error changing a setting, please post this on the Github page')
        logger.error(err);
        process.exit();
    }
}
function loadSettings(UDID){
    if (fs.existsSync('aTVSettings.json')) {
        logger.Debug('Loading Settings');
        var data = fs.readFileSync('./aTVSettings.json'), config;
        try {
            settings = JSON.parse(data);
            
            if (settings[UDID] == undefined) {
                logger.Debug("Adding TV " + UDID);
                return addTV(UDID);
            } else {
                return settings[UDID];
            }
        } catch (err) {
            logger.error('There is an error loading settings, please post this on the Github page')
            logger.error(err);
        }
    } else {
        var settings = {};
        settings[UDID] = {
            quality: '720p',
            fanart: 'On',
            subtitle: 'Off',
            keep: 'On'
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
        subtitle: 'Off',
        keep: 'On'
    };

    var data = JSON.stringify(settings, null, 4);

    fs.writeFile('./aTVSettings.json', data, function(err) {});
}
function addTV(UDID){
    logger.Debug('=== Settings ===');
    logger.Debug('TV not in settings file, adding it. UDID: ' + UDID);
    var data = fs.readFileSync('./aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        settings[UDID] = {
            quality: '720p',
            fanart: 'On',
            subtitle: 'Off',
            keep: 'On'
        };
        fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
        return settings[UDID];
    } catch (err) {
        logger.error('There is an error adding a TV, please post this on the Github page')
        logger.error(err);
    }
}
function addFavorite(type, id, UDID){
    try {
        var data = fs.readFileSync('./aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            favorites = settings[UDID].favorites || [];
            favorites.push({type: type, id: id});
            settings[UDID].favorites = favorites;
            fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
        } catch (err) {
            logger.error('There is an error adding to favorite, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
    }
}
function removeFavorite(type, id, UDID){
    try {
        var data = fs.readFileSync('./aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            favorites = settings[UDID].favorites || [];
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].type == type && favorites[i].id == id){
                    favorites.splice(i, 1);
                }
            };

            settings[UDID].favorites = favorites;
            fs.writeFileSync('./aTVSettings.json', JSON.stringify(settings, null, 4));
        } catch (err) {
            logger.error('There is an error removing from favorites, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
    }
}
function checkFavorite(type, id, UDID){
    try{
        var data = fs.readFileSync('./aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            favorites = settings[UDID].favorites || [];
            var isFavorite = false;
            favorites.forEach(function(favorite){
                if (favorite.type == type && favorite.id == id){
                    isFavorite = true;
                }
            })
            return isFavorite;
        } catch (err) {
            logger.error('There is an error checking favorites, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
    }
}
function checkSetting(setting, UDID){
    try{
        var data = fs.readFileSync('./aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            setting = settings[UDID][setting] || [];

            return setting;
        } catch (err) {
            logger.error('There is an error checking settings, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
    }
}
function getFavorites(UDID){
    try{
        var data = fs.readFileSync('./aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            if (settings[UDID] == undefined){
                addTV(UDID);
                return [];
            } else {
                favorites = settings[UDID].favorites || [];
                return favorites;
            }
        } catch (err) {
            logger.error('There is an error getting favorites, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
        return undefined;
    }
}

exports.loadSettings = loadSettings;
exports.checkSetting = checkSetting;
exports.changeSetting = changeSetting;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.checkFavorite = checkFavorite;
exports.getFavorites = getFavorites;