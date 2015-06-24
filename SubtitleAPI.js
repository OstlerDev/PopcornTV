/*
 *  Original API created by Popcorn Time (?) and can be found here: https://git.popcorntime.io/popcorntime/opensubtitles/blob/master/index.js
 */

var xmlrpc = require('xmlrpc'),
    Q = require('q'),
    _ = require('lodash');
var logger = require('./logger');

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
    opts.sublanguageid = 'all';

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
                tmp.url = sub.SubDownloadLink.replace('.gz', '.srt');
                tmp.lang = sub.ISO639;
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

SubtitleAPI.prototype.searchMovie = function (data, userAgent) {
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

SubtitleAPI.prototype.parseSRT = function(url, callback){
    var request = require("request")
    var subtitle = {"Timestamp": [] }

    logger.Debug("=== Getting and Parsing SRT ===")
    logger.Debug(url);
    request(url, function (error, response, body) {
       if (!error && response.statusCode === 200) {
            var SRT = body;

            // Seperate the SRT into an array.
            var srtPartTmp = SRT.split(/(\r\n|\n\r|\n|\r)\1+(?=[0-9]+)/);
            
            var srtParts = [];
            var timeHide_last = 0;
            for(var i = 0; i < srtPartTmp.length; i += 2) {  // Remove the un-needed blank spaces from the array. (every other)
                srtParts.push(srtPartTmp[i]);
            }

            srtParts.forEach(function(Item){
                ItemPart = Item.split(/\r\n|\n\r|\n|\r/)
                timePart = ItemPart[1].replace(/\s/g, '').split(/:|,|-->/);
                
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
                for (var i = 2; i < ItemPart.length; i++) {
                    var weight = '';
                    var group = ItemPart[i].match(/<([^/]*?)>/);
                    if (group != null && (group[1] == "i" || group[1] == "I"))
                        weight = 'light';
                    if (group != null && (group[1] == "b" || group[1] == "B"))
                        weight = 'heavy';

                    line = ItemPart[i].replace(/<.*?>/, '');
                    line = line.replace(/<.*?>/, '');

                    if (weight == ''){
                        subtitle['Timestamp'][Object.keys(subtitle['Timestamp']).length-1]['Line'].push({ 'text': line });
                    } else {
                        subtitle['Timestamp'][Object.keys(subtitle['Timestamp']).length-1]['Line'].push({ 'text': line, "weight": weight});
                    }
                };
            })
            subtitle['Timestamp'].push({ 'time': timeHide_last });
            callback(JSON.stringify(subtitle));
        } else {
            logger.warning("Error connecting to URL and grabbing SRT: " + url);
            return;
        }
    })
}

module.exports = new SubtitleAPI();