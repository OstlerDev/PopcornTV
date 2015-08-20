/*
 *  Original API created by Popcorn Time (?) and can be found here: https://git.popcorntime.io/popcorntime/opensubtitles/blob/master/index.js
 */

var xmlrpc = require('xmlrpc'),
    Q = require('q'),
    _ = require('lodash');
var logger = require('./logger');
var zlib = require('zlib');

var client = xmlrpc.createClient({ host: 'api.opensubtitles.org', port: 80, path: '/xml-rpc'});

function SubtitleAPI() {
    return;
}

var login = function (userAgent) {
    return Q.Promise(function (resolve, reject) {

        client.methodCall('LogIn', ['', '', 'en', userAgent], function (err, res) {
            if (err) {
                reject(err);
            }
            return resolve(res.token);
        });

    });
};

var search = function (data) {
    var opts = {};
    opts.sublanguageid = data.lang || 'all';

    // Do a hash or imdb check first (either), then fallback to filename
    // Without imdbid, only check filename
    if (data.hash) {
        opts.moviehash = data.hash;
    } else if (data.imdbid) {
        opts.imdbid = data.imdbid.replace('tt', '');
        opts.season = data.season;
        opts.episode = data.episode;
    } else {
        opts.tag = data.filename;
    }

    return Q.Promise(function (resolve, reject) {

        client.methodCall('SearchSubtitles', [
            data.token,
            [
                opts
            ]
        ], function (err, res) {

            if (err || res.data === false) {
                if (data.recheck !== true && data.imdbid) {
                    return reject(err || 'noResult');
                } else {
                    return reject(err || 'Unable to extract subtitle');
                }
            }

            // build our output
            var subs = {};

            _.each(res.data, function (sub) {

                if (sub.SubFormat !== 'srt') {
                    return;
                }

                // episode check
                if (res.data.season && res.data.episode) {
                    if (parseInt(sub.SeriesIMDBParent, 10) !== parseInt(res.data.imdbid.replace('tt', ''), 10)) {
                        return;
                    }
                    if (sub.SeriesSeason !== res.data.season) {
                        return;
                    }
                    if (sub.SeriesEpisode !== res.data.episode) {
                        return;
                    }
                }

                var tmp = {};
                tmp.url = sub.IDSubtitleFile + '@' + sub.SubEncoding;
                tmp.lang = sub.ISO639; // LanguageName
                tmp.downloads = sub.SubDownloadsCnt;
                tmp.score = 0;

                if (sub.MatchedBy === 'moviehash') {
                    tmp.score += 100;
                }
                if (sub.MatchedBy === 'tag') {
                    tmp.score += 50;
                }
                if (sub.UserRank === 'trusted') {
                    tmp.score += 100;
                }
                if (sub.MovieReleaseName.indexOf('YIFY') != -1 || sub.SubFileName.indexOf('YIFY') != -1) {
                    tmp.score += 100;
                }
                if (!subs[tmp.lang]) {
                    subs[tmp.lang] = tmp;
                } else {
                    // If score is 0 or equal, sort by downloads
                    if (tmp.score > subs[tmp.lang].score || (tmp.score === subs[tmp.lang].score && tmp.downloads > subs[tmp.lang].score.downloads)) {
                        subs[tmp.lang] = tmp;
                    }
                }
            });

            return resolve(subs);

        });

    });
};

function decode(content, encoding) {
    if (encoding !== 'UTF-8') {
        logger.Debug('Decoding with: ' + encoding);
        var iconv = require('iconv-lite');
        if(iconv.encodingExists(encoding))
            var buffer = iconv.decode(content, encoding);
        else if (iconv.encodingExists(encoding.replace('CP', 'win')))
            var buffer = iconv.decode(content, encoding.replace('CP', 'win'));
        else
            buffer = content;
    } else {
        buffer = content
    }
    return buffer.toString('UTF-8');
};

function getSRT(data, userAgent, callback) {
    login(userAgent)
        .then(function (token) {
            data.token = token;
            Q.Promise(function (resolve, reject) {
                client.methodCall('DownloadSubtitles', [
                    data.token,
                    [
                        data.id
                    ]
                ], function (err, res) {
                    if (err || res.data === false) {

                    } else {
                        var decoded = new Buffer(res.data[0].data, 'base64');
                        zlib.gunzip(decoded, function (err, unzipped) {
                            if (err) {
                                return logger.error(err.stack || err);
                            }
                            var content = decode(unzipped, data.encoding);
                            callback(content);
                        });
                    }
                })
            })
        }).fail(function (error) {
            return error;
        });
}

SubtitleAPI.prototype.searchEpisode = function (data, userAgent) {
    return login(userAgent)
        .then(function(token) {
            data.token = token;
            return search(data);
        }).fail(function (error) {
            if (error === 'noResult') {
                // try another search method
                return search({
                    filename: data.filename,
                    recheck: true,
                    token: data.token
                });
            } else {
                return error;
            }
        });
};

SubtitleAPI.prototype.searchMovie = function(data, userAgent) {
    return login(userAgent)
        .then(function(token) {
            data.token = token;
            return search(data);
        }).fail(function (error) {
            if (error === 'noResult') {
                // try another search method
                return error;
            } else {
                return error;
            }
        });
};

SubtitleAPI.prototype.searchYSubs = function(imdb, callback){
    var request = require("request")

    var url = "http://api.yifysubtitles.com/subs/" + imdb;
    logger.Debug("=== Getting YSubs results ===")
    logger.Debug(url);
    request({
        url: url,
        json: true
    }, function (error, response, body) {
       if (!error && response.statusCode === 200) {
            var subs = body;
            callback(subs);
        } else {
            logger.warning("Error connecting to api.yifysubtitles.com and grabbing json: " + url);
            return;
        }
    })
}

SubtitleAPI.prototype.getSubtitle = function(userAgent, data, langCode){
    return login(userAgent)
        .then(function(token) {
            data.token = token;
            return search(data);
        }).fail(function (error) {
            if (error === 'noResult') {
                // try another search method
                return error;
            } else {
                return error;
            }
        });
}

SubtitleAPI.prototype.parseSRT = function(url, callback){
    logger.Debug("=== Getting and Parsing SRT ===")
    logger.Debug(url);
    var split = url.split('@');
    getSRT({id: split[0], encoding: split[1]}, 'PopcornTV', function (SRT) {
        var subtitle = {"Timestamp": [] }
        // Seperate the SRT into an array.
        var srtPartTmp = SRT.split(/(\r\n|\n\r|\n|\r)\1+(?=[0-9]+)/);

        var srtParts = [];
        var timeHide_last = 0;
        var unsupported = false;
        for(var i = 0; i < srtPartTmp.length; i += 2) {  // Remove the un-needed blank spaces from the array. (every other)
            srtParts.push(srtPartTmp[i]);
        }
        srtParts.forEach(function(Item){
           ItemPart = Item.split(/\r\n|\n\r|\n|\r/);
           try {
               timePart = ItemPart[1].replace(/\s/g, '').split(/:|,|-->/);
           } catch(e) {
                subtitle['Timestamp'].push({ 'time': '2000', 'Line': [ {'text': 'This subtitle is not supported currently'}] });
                subtitle['Timestamp'].push({ 'time': '6000' });
                unsupported = true;
                callback(JSON.stringify(subtitle));
                return;
            }

            timeShow = parseInt(timePart[0])*1000*60*60 +
                       parseInt(timePart[1])*1000*60 +
                       parseInt(timePart[2])*1000 +
                        parseInt(timePart[3]);
            timeHide = parseInt(timePart[4])*1000*60*60 +
                       parseInt(timePart[5])*1000*60 +
                       parseInt(timePart[6])*1000 +
                       parseInt(timePart[7]);

            // Skip telling the subtitle to turn off if there is a new message at the same point as the last one left off.
            if (timeHide_last != timeShow){
               subtitle['Timestamp'].push({ 'time': timeHide_last });
            }
            timeHide_last = timeHide;

            // current Time
            subtitle['Timestamp'].push({ 'time': timeShow, 'Line': [] });
            //JSON += '  { "time":'+str(timeHide_last)+', "Line": [\n'

            // analyse format: <...> - i_talics (light), b_old (heavy), u_nderline (?), font color (?)
            for (var j = 2; j < ItemPart.length; j++) {
                var weight = 'normal';
                var color = {
                    r: 1,
                    g: 1,
                    b: 1
                };
                var group = ItemPart[j].match(/<([^/]*?)>/);
                if (group != null && (group[1] == "i" || group[1] == "I"))
                    weight = 'light';
                if (group != null && (group[1] == "b" || group[1] == "B"))
                    weight = 'heavy';
                if (group != null && group[1].indexOf('font') > -1){
                    color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(group[1].replace('font color=', ''));
                    if (color){
                        color = {
                            r: parseInt(color[1], 16)/255,
                            g: parseInt(color[2], 16)/255,
                            b: parseInt(color[3], 16)/255
                        }
                    }
                }

                line = ItemPart[j].replace(/<.*?>/, '');
                for (var i = 0; i < 10; i++) {
                    line = line.replace(/<.*?>/, '');
                };

                subtitle['Timestamp'][Object.keys(subtitle['Timestamp']).length-1]['Line'].push({ 'text': line, 'weight': weight, color: color});
            };
        })
        subtitle['Timestamp'].push({ 'time': timeHide_last });
        if (!unsupported) callback(JSON.stringify(subtitle));
    });
}

module.exports = new SubtitleAPI();
