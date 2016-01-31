var fs = require('fs');
var logger = require('./logger');

/*
    Change setting for UDID in aTVSettings.json, this is called from the settings page.
*/
function changeSetting(UDID, setting, newSetting){
    if (setting == 'tvendpoint'){
        setTVEndpoint(newSetting);
        return;
    }
    var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        logger.Debug('Changing setting ' + setting + ' from ' + settings[UDID][setting] + ' to ' + newSetting + ' - UDID: ' + UDID);
        settings[UDID][setting] = newSetting;
        fs.writeFileSync(__dirname + '/aTVSettings.json', JSON.stringify(settings, null, 4));
    } catch (err) {
        logger.error('There is an error changing a setting, please post this on the Github page')
        logger.error(err);
        process.exit();
    }
}

/*
    Load and return settings for UDID
*/
function loadSettings(UDID){
    if (fs.existsSync(__dirname + '/aTVSettings.json')) {
        logger.Debug('Loading Settings');
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), config;
        try {
            settings = JSON.parse(data);

            if (settings[UDID] == undefined) {
                logger.Debug("Adding TV " + UDID);
                return addTV(UDID);
            } else {
                settings[UDID].tvendpoint = getTVEndpoint();
                return settings[UDID];
            }
        } catch (err) {
            logger.error('There is an error loading settings, please post this on the Github page')
            logger.error(err);
        }
    } else {
        logger.notice('No Settings file... Creating one now...');
        return createFile(UDID);
    }
}

/*
    If the file is null then we need to create it so we call this function, it adds the first TV UDID and basic settings
*/
function createFile(UDID){
    var settings = {};
    settings[UDID] = {
        quality: '720p',
        fanart: 'On',
        subtitle: 'Off',
        keep: 'Off',
        subSize: '100'
    };

    var data = JSON.stringify(settings, null, 4);

    fs.writeFileSync(__dirname + '/aTVSettings.json', data);

    return settings;
}

/*
    Add a TV to the settings file, used because we need to allow multiple Apple TV's per file.
*/
function addTV(UDID){
    logger.Debug('=== Settings ===');
    logger.Debug('TV not in settings file, adding it. UDID: ' + UDID);
    var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
    try {
        settings = JSON.parse(data);
        settings[UDID] = {
            quality: '720p',
            fanart: 'On',
            subtitle: 'Off',
            keep: 'Off',
            subSize: '100'
        };
        fs.writeFileSync(__dirname + '/aTVSettings.json', JSON.stringify(settings, null, 4));
        return settings[UDID];
    } catch (err) {
        logger.error('There is an error adding a TV, please post this on the Github page')
        logger.error(err);
    }
}

/*
    Add a favorite to the settings file for the UDID
*/
function addFavorite(type, id, UDID){
    try {
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            favorites = settings[UDID].favorites || [];
            favorites.push({type: type, id: id});
            settings[UDID].favorites = favorites;
            fs.writeFileSync(__dirname + '/aTVSettings.json', JSON.stringify(settings, null, 4));
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

/*
    Remove a favorite from the settings file for the UDID
*/
function removeFavorite(type, id, UDID){
    try {
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            favorites = settings[UDID].favorites || [];
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].type == type && favorites[i].id == id){
                    favorites.splice(i, 1);
                }
            };

            settings[UDID].favorites = favorites;
            fs.writeFileSync(__dirname + '/aTVSettings.json', JSON.stringify(settings, null, 4));
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

/*
    Check to see if the type and ID is a favorite, this is used to generate the scrobble XML and figure out which one is needed to be used.
*/
function checkFavorite(type, id, UDID){
    try{
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
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

/*
    Check setting for UDID and return it.
*/
function checkSetting(setting, UDID){
    try{
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
        try {
            settings = JSON.parse(data);
            setting = settings[UDID][setting] || [];

            return setting;
        } catch (err) {
            settings = addTV(UDID);
            return settings[UDID][setting];
        }
    } catch(e){
        logger.Debug(e);
        logger.warning('Settings file does not exist, creating...');
        createFile(UDID);
    }
}

/*
    Get all Favorites for the UDID, this is used in the favorites.xml generation
*/
function getFavorites(UDID){
    try{
        var data = fs.readFileSync(__dirname + '/aTVSettings.json'), settings;
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

function getTVEndpoint(){
    try{
        var data = fs.readFileSync(__dirname + '/config.json'), settings, endpoint;
        try {
            settings = JSON.parse(data);
            endpoint = settings.tvendpoint || 'popcornwvnbg7jev.onion.to';
            return endpoint;
        } catch (err) {
            logger.error('There is an error checking the TV API Endpoint, please post this on the Github page')
            logger.error(err);
            process.exit();
        }
    } catch(e){
        logger.warning('Config file does not exist, please report this error on the github page');
        logger.error(e);
    }
}

function setTVEndpoint(newEndpoint){
    var data = fs.readFileSync(__dirname + '/config.json'), settings, endpoint;
    try {
        settings = JSON.parse(data);
        endpoint = settings.tvendpoint || 'popcornwvnbg7jev.onion.to';
        logger.Debug('Changing TV API Endpoint to ' + newEndpoint + ' from ' + endpoint);
        settings.tvendpoint = newEndpoint;
        fs.writeFileSync(__dirname + '/config.json', JSON.stringify(settings, null, 4));
    } catch (err) {
        logger.error('There is an error changing the TV API Endpoint, please post this on the Github page')
        logger.error(err);
        process.exit();
    }
}

exports.loadSettings = loadSettings;
exports.checkSetting = checkSetting;
exports.changeSetting = changeSetting;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.checkFavorite = checkFavorite;
exports.getFavorites = getFavorites;
exports.getTVEndpoint = getTVEndpoint;
exports.setTVEndpoint = setTVEndpoint;
