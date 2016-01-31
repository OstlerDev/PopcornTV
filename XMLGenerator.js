var xml = require('xml');
var logger = require('./logger');
var atvSettings = require('./settings.js');

function generatePlayXML(options) {
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('body')
            .startElement('videoPlayer')
                .writeAttribute('id', 'com.sample.video-player')
                .startElement('httpFileVideoAsset')
                    .writeAttribute('id', options.title)
                    .writeElement('mediaURL', options.url)
                    .writeElement('title', options.title)
                    .writeElement('description', options.desc)
                    .writeElement('image', options.image)
                    .writeElement('upNextPresentationTime', '5')
                    .writeElement('upNextPresentationDuration', '20')
                    .startElement('videoPlayerSettings')
                        .writeElement('subtitleSize', (options.subtitleSize || '100'))
                    .endElement()
                    .startElement('myMetadata')
                        .writeElement('subtitleURL', 'http://trailers.apple.com/subtitle.json?url=' + options.subtitle)
                        .writeElement('traktToken', options.traktToken)
                    .endElement()
                .endElement()
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    return xw.toString();
}

function generateProgressXML(moviePosterURL) {
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/play.js')
              .endElement()
        .endElement()
        .startElement('body')
            .startElement('listWithPreview')
                .writeAttribute('id', 'id.progress.refresher')
                .writeAttribute('refreshInterval', '1')
                .writeAttribute('onRefresh', 'progressRefresh();')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', 'Buffering...')
                        .writeElement('subtitle', 'Please wait while your selection buffers')
                    .endElement()
                .endElement()
                .startElement('preview')
                    .startElement('mediaPreview')
                        .writeElement('image', moviePosterURL)
                    .endElement()
                .endElement()
                .startElement('menu')
                    .startElement('sections')
                        .startElement('menuSection')
                            .startElement('items')
                                .startElement('oneLineMenuItem')
                                    .writeAttribute('id', 'menuToChange')
                                    .writeElement('label', '[0%] 0.00MB - 0.00MB/s')
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    return xw.toString();
}

function errorXML(title, err, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('body')
            .startElement('dialog')
                .writeAttribute('id', 'com.sample.error-dialog')
                .writeElement('title', title)
                .writeElement('description', err)
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    callback(xw.toString());
}

function updateContextXML(callback)
{
    xmlstr = '<atv><body><optionList id="fakeUpdater" autoSelectSingleItem="true"> \
            <items><oneLineMenuItem id="0" onSelect="atv.unloadPage()"><label></label> \
            </oneLineMenuItem></items></optionList></body></atv>';
    callback(xmlstr);
}

function generateQuality(torrentID, UDID, qualities, subtitle, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
              .endElement()
        .endElement()
        .startElement('body')
            .startElement('optionDialog')
                .writeAttribute('id', 'scrobble.optionDialog')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', 'Select Quality')
                        .writeElement('subtitle', 'Please select your desired quality')
                    .endElement()
                .endElement()
                .startElement('menu')
                    .startElement('sections')
                        .startElement('menuSection')
                            .startElement('header')
                                .startElement('horizontalDivider')
                                    .writeAttribute('alignment', 'left')
                                    .writeElement('title', '')
                                .endElement()
                            .endElement()
                            .startElement('items');
                            qualities.split(",").forEach(function(quality){
                                xw.startElement('oneLineMenuItem')
                                    .writeAttribute('id', 'item')
                                    .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/MoviePrePlay.xml?torrentID=" + torrentID + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + subtitle + "');")
                                    .writeElement('label', quality)
                                .endElement();
                            })
                            xw.endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    callback(xw.toString());
}

function generateSubtitles(imdb, torrentID, UDID, quality, callback){
    var subs = require('./SubtitleAPI');
    var langConverter = require('./lang');
    subs.searchMovie({imdbid: imdb}, 'PopcornTV').then(function(subtitles){
        logger.Debug(subtitles);
        var subtitles2 = Object.keys(subtitles).sort();
        var XMLWriter = require('xml-writer');
        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                  .endElement()
            .endElement()
            .startElement('body')
                .startElement('optionDialog')
                    .writeAttribute('id', 'scrobble.optionDialog')
                    .startElement('header')
                        .startElement('simpleHeader')
                            .writeElement('title', 'Select Subtitles')
                            .writeElement('subtitle', 'Please select your desired language')
                        .endElement()
                    .endElement()
                    .startElement('menu')
                        .startElement('sections')
                            .startElement('menuSection')
                                .startElement('header')
                                    .startElement('horizontalDivider')
                                        .writeAttribute('alignment', 'left')
                                        .writeElement('title', '')
                                    .endElement()
                                .endElement()
                                .startElement('items')
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'item')
                                        .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/MoviePrePlay.xml?torrentID=" + torrentID + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + 'Off' + "');")
                                        .writeElement('label', 'Off')
                                    .endElement();;
                                subtitles2.forEach(function(lang){
                                    xw.startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'item')
                                        .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/MoviePrePlay.xml?torrentID=" + torrentID + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + subtitles[lang].url + "');")
                                        .writeElement('label', langConverter.getLanguageName(lang))
                                    .endElement();
                                })
                                xw.endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement();
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    }).fail(function(error){
        logger.error(error);
    });
}

function generateQualityTV(imdb, season, episode, UDID, qualities, subtitle, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
              .endElement()
        .endElement()
        .startElement('body')
            .startElement('optionDialog')
                .writeAttribute('id', 'scrobble.optionDialog')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', 'Select Quality')
                        .writeElement('subtitle', 'Please select your desired quality')
                    .endElement()
                .endElement()
                .startElement('menu')
                    .startElement('sections')
                        .startElement('menuSection')
                            .startElement('header')
                                .startElement('horizontalDivider')
                                    .writeAttribute('alignment', 'left')
                                    .writeElement('title', '')
                                .endElement()
                            .endElement()
                            .startElement('items');
                            qualities.split(",").forEach(function(quality){
                                xw.startElement('oneLineMenuItem')
                                    .writeAttribute('id', 'item')
                                    .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/TVPrePlay.xml?imdb=" + imdb + '&season=' + season + '&episode=' + episode + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + subtitle + "');")
                                    .writeElement('label', quality)
                                .endElement();
                            })
                            xw.endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    callback(xw.toString());
}

function generateSubtitlesTV(imdb, UDID, quality, episode, season, callback){
    var subs = require('./SubtitleAPI');
    var langConverter = require('./lang');
    subs.searchMovie({imdbid: imdb, episode: episode, season: season}, 'PopcornTV').then(function(subtitles){
        var subtitles2 = Object.keys(subtitles).sort();
        var XMLWriter = require('xml-writer');
        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                  .endElement()
            .endElement()
            .startElement('body')
                .startElement('optionDialog')
                    .writeAttribute('id', 'scrobble.optionDialog')
                    .startElement('header')
                        .startElement('simpleHeader')
                            .writeElement('title', 'Select Subtitles')
                            .writeElement('subtitle', 'Please select your desired language')
                        .endElement()
                    .endElement()
                    .startElement('menu')
                        .startElement('sections')
                            .startElement('menuSection')
                                .startElement('header')
                                    .startElement('horizontalDivider')
                                        .writeAttribute('alignment', 'left')
                                        .writeElement('title', '')
                                    .endElement()
                                .endElement()
                                .startElement('items')
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'item')
                                        .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/TVPrePlay.xml?imdb=" + imdb + '&season=' + season + '&episode=' + episode + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + 'Off' + "');")
                                        .writeElement('label', 'Off')
                                    .endElement();;
                                subtitles2.forEach(function(lang){
                                    xw.startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'item')
                                        .writeAttribute('onSelect', "atv.unloadPage();atv.loadAndSwapURL('http://trailers.apple.com/TVPrePlay.xml?imdb=" + imdb + '&season=' + season + '&episode=' + episode + '&UDID=' + UDID + '&quality=' + quality + '&subtitle=' + subtitles[lang].url + "');")
                                        .writeElement('label', langConverter.getLanguageName(lang))
                                    .endElement();
                                })
                                xw.endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement();
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    }).fail(function(error){
        logger.error(error);
    });
}

function generateSettingsXML(UDID, commit, callback){
    var settings = atvSettings.loadSettings(UDID);
    logger.Debug(settings);

    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/settings.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('listWithPreview')
                    .writeAttribute('id', 'SettingsPage')
                    .startElement('header')
                        .startElement('simpleHeader')
                            .writeElement('title', 'Settings')
                        .endElement()
                    .endElement()
                    .startElement('preview')
                        .startElement('keyedPreview')
                            .writeElement('title', 'About')
                            .writeElement('summary', '')
                            .startElement('metadataKeys')
                                .writeElement('label', 'About')
                                .writeElement('label', 'Commit')
                                .writeElement('label', 'Authors')
                                .writeElement('label', 'Homepage')
                                .writeElement('label', 'Forum')
                            .endElement()
                            .startElement('metadataValues')
                                .writeElement('label', 'PopcornTV is a simple application that allows an Apple TV to play stream Movies and TV shows directly from torrents.')
                                .writeElement('label', commit)
                                .writeElement('label', 'OstlerDev')
                                .writeElement('label', 'https://popcorntv.io')
                                .writeElement('label', 'https://discuss.popcorntime.io/t/popcorntv-bringing-popcorn-time-to-your-apple-tv/')
                            .endElement()
                            .writeElement('image', 'http://trailers.apple.com/thumbnails/Logo.png')
                        .endElement()
                    .endElement()
                    .startElement('menu')
                        .startElement('sections')
                            .startElement('menuSection')
                                .startElement('header')
                                    .startElement('horizontalDivider')
                                        .writeAttribute('alignment', 'left')
                                        .writeElement('title', '')
                                    .endElement()
                                .endElement()
                                .startElement('items')
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'quality')
                                        .writeAttribute('onSelect', "toggleSetting('quality', '" + (settings.quality || "720p") + "')")
                                        .writeElement('label', 'Prefered Movie Quality')
                                        .writeElement('rightLabel', (settings.quality || "720p"))
                                    .endElement()
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'tvquality')
                                        .writeAttribute('onSelect', "toggleSetting('tvquality', '" + (settings.tvquality || "480p") + "')")
                                        .writeElement('label', 'Prefered TV Show Quality')
                                        .writeElement('rightLabel', (settings.tvquality || "480p"))
                                    .endElement()
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'fanart')
                                        .writeAttribute('onSelect', "toggleSetting('fanart', '" + (settings.fanart || 'On') + "')")
                                        .writeElement('label', 'Fanart')
                                        .writeElement('rightLabel', (settings.fanart || 'On'))
                                    .endElement()
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'keep')
                                        .writeAttribute('onSelect', "toggleSetting('keep', '" + (settings.keep || 'On') + "')")
                                        .writeElement('label', 'Keep Video Downloads')
                                        .writeElement('rightLabel', (settings.keep || 'On'))
                                    .endElement()
                                .endElement()
                            .endElement()
                            .startElement('menuSection')
                                .startElement('header')
                                    .startElement('horizontalDivider')
                                        .writeAttribute('alignment', 'left')
                                        .writeElement('title', 'Subtitles')
                                    .endElement()
                                .endElement()
                                .startElement('items')
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'subSize')
                                        .writeAttribute('onSelect', "toggleSetting('subSize', '" + (settings.subSize || '100') + "')")
                                        .writeElement('label', 'Subtitle Size')
                                        .writeElement('rightLabel', settings.subSize || '100')
                                    .endElement()
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'subtitle')
                                        .writeAttribute('onSelect', "toggleSetting('subtitle', '" + (settings.subtitle || 'Off') + "')")
                                        .writeElement('label', 'Default Subtitle Language')
                                        .writeElement('rightLabel', settings.subtitle || 'Off')
                                    .endElement()
                                .endElement()
                            .endElement()
                            .startElement('menuSection')
                                .startElement('header')
                                    .startElement('horizontalDivider')
                                        .writeAttribute('alignment', 'left')
                                        .writeElement('title', 'Advanced')
                                    .endElement()
                                .endElement()
                                .startElement('items')
                                    .startElement('oneLineMenuItem')
                                        .writeAttribute('id', 'tvendpoint')
                                        .writeAttribute('onSelect', "toggleSetting('tvendpoint', '" + (settings.tvendpoint || 'popcornwvnbg7jev.onion.to') + "')")
                                        .writeElement('label', 'TV API Endpoint')
                                        .writeElement('rightLabel', settings.tvendpoint || 'popcornwvnbg7jev.onion.to')
                                    .endElement();

                                    xw.endDocument();
                                    callback(xw.toString());
}

function generateMoviesXML(title, sort_by, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('scroller').writeAttribute('id', 'com.sample.movie-grid')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', title)
                    .endElement()
                .endElement()
                .startElement('items')
                    .startElement('grid')
                        .writeAttribute('columnCount', '7').writeAttribute('id', 'grid_0')
                            .startElement('items')
                            .writeAttribute('id', 'items');
    var API = require('./MoviesAPI');
    var movies = API.getMovies("1", sort_by, "50", function(movies){
        for(var i = 0; i <= movies.length-1; i++)
        {
            var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id + '&imdb=' + movies[i].imdb_code;
            xw.startElement('moviePoster')
                .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
            .writeElement('title', movies[i].title)
            .writeElement('subtitle', movies[i].year)
            .writeElement('image', movies[i].medium_cover_image)
            .writeElement('defaultImage', 'http://trailers.apple.com/thumbnails/movie-large.png')
            .endElement();
        }
            xw.startElement('moviePoster')
                .writeAttribute('id', "50")
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'loadMore("movie", "' + sort_by + '", "2")')
                .writeAttribute('onSelect', 'loadMore("movie", "' + sort_by + '", "2")')
            .writeElement('title', 'View More')
            .writeElement('subtitle', '')
            .writeElement('image', 'http://trailers.apple.com/thumbnails/view-more.png')
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateScrobbleXML(type, id, UDID, url, label, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('body')
            .startElement('popUpMenu')
                .writeAttribute('id', 'context_menu')
                .startElement('sections')
                    .startElement('menuSection')
                        .startElement('items')
                            .startElement('oneLineMenuItem')
                                .writeAttribute('id', 'item2')
                                .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/" + url + "?type=" + type + '&id=' + id + '&UDID=' + UDID + "')")
                                .writeElement('label', label)
                            .endElement()
                        .endElement()
                    .endElement()
                .endElement()
            .endElement()
        .endElement()
    .endElement();
    xw.endDocument();
    logger.Debug(xw.toString());
    callback(xw.toString());
}

function generateScrobbleXMLOLD(type, id, UDID, url, label, callback){
  var XMLWriter = require('xml-writer');
  xw = new XMLWriter;
  xw.startDocument(version='1.0', encoding='UTF-8');
  xw.startElement('atv')
      .startElement('head')
          .startElement('script')
              .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
      .endElement()
      .startElement('body')
          .startElement('optionDialog')
              .writeAttribute('id', 'scrobble.optionDialog')
              .startElement('header')
                  .startElement('simpleHeader')
                      .writeElement('title', 'Favorites')
                      .writeElement('subtitle', 'Add or remove movie from your Favorites.')
                  .endElement()
              .endElement()
              .startElement('menu')
                  .startElement('sections')
                      .startElement('menuSection')
                          .startElement('header')
                              .startElement('horizontalDivider')
                                  .writeAttribute('alignment', 'left')
                                  .writeElement('title', '')
                              .endElement()
                          .endElement()
                          .startElement('items')
                              .startElement('oneLineMenuItem')
                                  .writeAttribute('id', 'item')
                                  .writeAttribute('onSelect', "loadURL('http://trailers.apple.com/" + url + "?type=" + type + '&id=' + id + '&UDID=' + UDID + "');atv.unloadPage();")
                                  .writeElement('label', label)
                              .endElement()
                          xw.endElement()
                      .endElement()
                  .endElement()
              .endElement()
          .endElement()
      .endElement()
  .endElement();
  xw.endDocument();
  logger.Debug(xw.toString());
  callback(xw.toString());
}

function generateMovieParadeXML(sort_by, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('body')
            .startElement('preview')
                .startElement('paradePreview').writeAttribute('inOrder', 'true')
    var API = require('./MoviesAPI');
    var movies = API.getMovies("1", sort_by, "15", function(movies){
        for(var i = 0; i <= movies.length-1; i++)
        {
            xw.writeElement('image', movies[i].medium_cover_image)
        }
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateTVParadeXML(sort_by, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('body')
            .startElement('preview')
                .startElement('paradePreview').writeAttribute('inOrder', 'true')

    var API = require('./TVApi');
    var tv = API.getTV(1, sort_by, "15", function(shows){
        for(var i = 0; i <= shows.length-1; i++)
        {
            xw.writeElement('image', shows[i].images.poster)
        }
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateGenre(genre, type, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('preview')
                .startElement('scrollerPreview').writeAttribute('id', 'com.sample.scrollerPreview')
                    .startElement('items')
                        .startElement('grid')
                            .writeAttribute('id', 'grid_1')
                            .writeAttribute('columnCount', '5')
                            .startElement('items');
    if (type == 'movie'){
        var API = require('./MoviesAPI');
        var movies = API.getMoviesGenre(genre, "50", function(movies){
            for(var i = 0; i <= movies.length-1; i++)
            {
                var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
                xw.startElement('moviePoster')
                    .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                    .writeAttribute('alwaysShowTitles', 'true')
                    .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
                .writeElement('title', movies[i].title)
                .writeElement('subtitle', movies[i].year)
                .writeElement('image', movies[i].medium_cover_image)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
            }
            xw.endDocument();
            logger.Debug(xw.toString());
            callback(xw.toString());
        });
    } else if (type == 'tv'){
        var API = require('./TVApi');
        API.getGenre(genre, function(shows){
            for(var i = 0; i <= shows.length-1; i++)
            {
                var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
                xw.startElement('moviePoster')
                    .writeAttribute('id', shows[i].title.replace(/\s/g, ''))
                    .writeAttribute('alwaysShowTitles', 'true')
                    .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onHoldSelect', "scrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tv&id=" + shows[i].imdb_id + "')")
                .writeElement('title', shows[i].title)
                .writeElement('subtitle', shows[i].year + ' | ' + shows[i].num_seasons + ' Seasons')
                .writeElement('image', shows[i].images.poster)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
            }
            xw.endDocument();
            logger.Debug(xw.toString());
            callback(xw.toString());
        });
    }
}

function generateMovieExtras(query, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('preview')
                .startElement('scrollerPreview').writeAttribute('id', 'com.sample.scrollerPreview')
                    .startElement('items')
                        .startElement('grid')
                            .writeAttribute('id', 'grid_1')
                            .writeAttribute('columnCount', '5')
                            .startElement('items')
    var API = require('./MoviesAPI');
    var movies = API.searchMovies(query, function(movies){
        for(var i = 0; i <= movies.length-1; i++)
        {
            var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
            xw.startElement('moviePoster')
                .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
            .writeElement('title', movies[i].title)
            .writeElement('subtitle', movies[i].year)
            .writeElement('image', movies[i].medium_cover_image)
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        }
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateSearchResults(query, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('searchResults').writeAttribute('id', 'searchResults')
                .startElement('menu')
                    .startElement('sections');
    var API = require('./MoviesAPI');
    var movies = API.searchMovies(query, function(movies){
        if (movies.length > 0){
            xw.startElement('menuSection')
                            .startElement('header')
                                .startElement('horizontalDivider')
                                .writeAttribute('alignment', 'left')
                                .writeElement('title', 'Movies')
                                .endElement()
                            .endElement()
                            .startElement('items')
        }
        for(var i = 0; i <= movies.length-1; i++)
        {
            var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
            xw.startElement('twoLineEnhancedMenuItem')
                .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', 'oldScrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
            .writeElement('label', movies[i].title)
            .writeElement('image', movies[i].small_cover_image)
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        }
        if (movies.length > 0){
            xw.endElement()
            .endElement();
        }
        var API = require('./TVApi');
        var search = API.searchShows(query, function(shows){
            if (shows.length > 0){
                xw.startElement('menuSection')
                    .startElement('header')
                        .startElement('horizontalDivider')
                            .writeAttribute('alignment', 'left')
                            .writeElement('title', 'TV Shows')
                        .endElement()
                    .endElement()
                    .startElement('items');
            }
            for(var i = 0; i <= shows.length-1; i++)
            {
                var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
                xw.startElement('twoLineEnhancedMenuItem')
                    .writeAttribute('id', shows[i].title.replace(/\s/g, ''))
                    .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onHoldSelect', "oldScrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tv&id=" + shows[i].imdb_id + "')")
                .writeElement('label', shows[i].title)
                .writeElement('image', shows[i].images.poster)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
            }
            xw.endDocument();

            logger.Debug(xw.toString());
            callback(xw.toString());
        });
    });
}

function generateMovieSearchResults(query, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('searchResults').writeAttribute('id', 'searchResults')
                .startElement('menu')
                    .startElement('sections')
                        .startElement('menuSection')
                            .startElement('header')
                                .startElement('horizontalDivider')
                                .writeAttribute('alignment', 'left')
                                .writeElement('title', 'Movies')
                                .endElement()
                            .endElement()
                            .startElement('items')
    var API = require('./MoviesAPI');
    var movies = API.searchMovies(query, function(movies){
        for(var i = 0; i <= movies.length-1; i++)
        {
            var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
            xw.startElement('twoLineEnhancedMenuItem')
                .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', 'oldScrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
            .writeElement('label', movies[i].title)
            .writeElement('image', movies[i].small_cover_image)
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        }
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateTVSearchResults(query, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('searchResults').writeAttribute('id', 'searchResults')
                .startElement('menu')
                    .startElement('sections')
                        .startElement('menuSection')
                            .startElement('header')
                                .startElement('horizontalDivider')
                                .writeAttribute('alignment', 'left')
                                .writeElement('title', 'TV Shows')
                                .endElement()
                            .endElement()
                            .startElement('items')
    var API = require('./TVApi');
    var search = API.searchShows(query, function(shows){
        for(var i = 0; i <= shows.length-1; i++)
        {
            var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
            xw.startElement('twoLineEnhancedMenuItem')
                .writeAttribute('id', shows[i].title.replace(/\s/g, ''))
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', "oldScrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tv&id=" + shows[i].imdb_id + "')")
            .writeElement('label', shows[i].title)
            .writeElement('image', shows[i].images.poster)
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        }
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}

function generateMoviePrePlayFanartXML(torrentID, UDID, atvRes, quality, subtitle, callback){
    var API = require('./MoviesAPI');
    var inset = '690';
    if (atvRes == '720'){
        inset = '460';
    }
    var movies = API.getMovieWithFanart(torrentID, atvRes, function(movie, fanart){
        var XMLWriter = require('xml-writer');
        var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movie.id + '&UDID=' + UDID;
        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('itemDetailWithImageHeader')
                    .writeAttribute('id', 'com.apple.trailer')
                    .writeAttribute('layout', 'compact')
                    .startElement('styles')
                        .startElement('color')
                        .writeAttribute('name', 'titleColor')
                        .text('#fafafa')
                        .endElement()
                        .startElement('color')
                        .writeAttribute('name', 'metadataColor')
                        .text('#fafafa')
                        .endElement()
                    .endElement()
                    .startElement('header')
                        .startElement('imageHeader')
                            .startElement('image')
                            .writeAttribute('insets', '0, 0, ' + inset + ', 0')
                            .writeAttribute('required', 'true')
                            .text('http://trailers.apple.com/' + fanart)
                            .endElement()
                        .endElement()
                    .endElement()
                    .writeElement('title', movie.title)
                    .writeElement('footnote', movie.year)
                    .writeElement('rating', movie.mpa_rating)
                    .writeElement('summary', movie.description_full)
                    .startElement('userRatings')
                        .startElement('starRating')
                        .writeElement('percentage', movie.rt_audience_score)
                        .endElement()
                    .endElement()
                    .startElement('image')
                    .writeAttribute('style', 'moviePoster')
                    .text(movie.images.large_cover_image)
                    .endElement()
                    .writeElement('defaultImage', 'resource://Poster.png')
                    .startElement('table')
                        .startElement('columnDefinitions')
                            .startElement('columnDefinition')
                            .writeAttribute('alignment', 'left')
                            .writeAttribute('width', '50')
                            .writeElement('title', 'Details')
                            .endElement()
                        .endElement()
                        .startElement('rows')
                            .startElement('row')
                            .writeElement('label', parseGenre(movie.genres))
                            .endElement()
                            .startElement('row')
                            .writeElement('label', parseTime(movie.runtime))
                            .endElement()
                            .startElement('row')
                                .startElement('mediaBadges')
                                    .startElement('additionalMediaBadges');
                                        var num = 0;
                                        movie.torrents.forEach(function(torrent){
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + torrent.quality + '.png')
                                            .endElement();
                                            num += 1;
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + torrentHealth(torrent) + '.png')
                                            .endElement();
                                            num += 1;
                                        })
                                    xw.endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('centerShelf')
                        .startElement('shelf')
                        .writeAttribute('id', 'centerShelf')
                        .writeAttribute('columnCount', '4')
                        .writeAttribute('center', 'true')
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items')
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'play')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + selectTorrent(movie.torrents, quality) + "&id=" + torrentID + "&title=" + encodeURIComponent(movie.title.replace(/'/g, '')) + "&desc=" + encodeURIComponent(movie.description_full.replace(/'/g, '')) + "&poster=" + movie.images.large_cover_image + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Play')
                                            .writeElement('image', 'resource://Play.png')
                                            .writeElement('focusedImage', 'resource://PlayFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'trailer')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=https://www.youtube.com/watch?v=" + movie.yt_trailer_code + "&id=" + torrentID + "yt&poster=http://www.youtube.com/yt/brand/media/image/YouTube-logo-full_color.png')")
                                            .writeElement('title', 'Trailer')
                                            .writeElement('image', 'resource://Preview.png')
                                            .writeElement('focusedImage', 'resource://PreviewFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'select')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/quality.xml?torrentID=" + torrentID + '&UDID=' + UDID + '&qualities=' + getQualities(movie.torrents) + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Select Quality')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'subtitle')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/subtitles.xml?imdb=" + movie.imdb_code + "&torrentID=" + torrentID + '&UDID=' + UDID + '&quality=' + quality + "')")
                                            .writeElement('title', 'Subtitles')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                    .endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('divider')
                        .startElement('smallCollectionDivider')
                        .writeAttribute('alignment', 'left')
                        .writeElement('title', 'Related Movies')
                        .endElement()
                    .endElement()
                    .startElement('bottomShelf')
                        .startElement('shelf')
                            .writeAttribute('columnCount', '7')
                            .writeAttribute('id', 'bottomShelf')
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items');
                                        var API = require('./MoviesAPI');
                                        var movies = API.getRelatedMovies(torrentID, function(movies){
                                            for(var i = 0; i <= movies.length-1; i++)
                                            {
                                                var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
                                                xw.startElement('moviePoster')
                                                    .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                                                    .writeAttribute('alwaysShowTitles', 'true')
                                                    .writeAttribute('related', 'true')
                                                    .writeAttribute('onSelect', "addUDIDtoQuery('" + url + "')")
                                                    .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
                                                .writeElement('title', movies[i].title)
                                                .writeElement('subtitle', movies[i].year)
                                                .writeElement('image', movies[i].medium_cover_image)
                                                .writeElement('defaultImage', 'resource://Poster.png')
                                                .endElement();
                                            }
                                    xw.endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('moreInfo')
                        .startElement('listScrollerSplit')
                            .writeAttribute('id', 'com.sample.list-scroller-split')
                            .startElement('menu')
                                .startElement('sections')
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Genres')
                                                .writeElement('title', 'Genres')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.genres.forEach(function(genre){
                                                xw.startElement('oneLineMenuItem')
                                                    .writeAttribute('id', genre)
                                                    .writeElement('label', genre)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/MoviesGenreGrid.xml?genre=' + encodeURIComponent(genre))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement()
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Directors')
                                                .writeElement('title', 'Directors')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.directors.forEach(function(director){
                                                xw.startElement('oneLineMenuItem')
                                                    .writeAttribute('id', director.name)
                                                    .writeAttribute('accessibilityLabel', director.name)
                                                    .writeElement('label', director.name)
                                                    .writeElement('image', director.medium_image)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/extras.xml?query=' + encodeURIComponent(director.name))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement()
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Actors')
                                                .writeElement('title', 'Actors')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.actors.forEach(function(actor){
                                                xw.startElement('twoLineMenuItem')
                                                    .writeAttribute('id', actor.name)
                                                    .writeAttribute('accessibilityLabel', actor.name)
                                                    .writeElement('label', actor.name)
                                                    .writeElement('label2', actor.character_name)
                                                    .writeElement('image', actor.medium_image)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/extras.xml?query=' + encodeURIComponent(actor.name))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement();
                                    xw.endDocument();
                                    logger.Debug(xw.toString());
                                    callback(xw.toString());
                                });
    });
}
function generateMoviePrePlayXML(torrentID, quality, subtitle, aTVversion, callback){
    var API = require('./MoviesAPI');
    var movies = API.getMovie(torrentID, function(movie){
        var XMLWriter = require('xml-writer');
        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('itemDetail').writeAttribute('id', 'com.apple.trailers')
                    .writeElement('title', movie.title)
                    .writeElement('subtitle', movie.year)
                    .writeElement('rating', movie.mpa_rating)
                    .writeElement('summary', movie.description_full)
                    .startElement('image')
                        .writeAttribute('style', 'moviePoster')
                        .text(movie.images.large_cover_image)
                    .endElement()
                    .writeElement('defaultImage', 'resource://Poster.png')
                    .startElement('table')
                        .startElement('columnDefinitions')
                            .startElement('columnDefinition')
                            .writeAttribute('alignment', 'left')
                            .writeAttribute('width', '50')
                            .writeElement('title', 'Details')
                            .endElement()
                        .endElement()
                        .startElement('rows')
                            .startElement('row')
                               .writeElement('label', parseGenre(movie.genres))
                            .endElement()
                            .startElement('row')
                               .writeElement('label', parseTime(movie.runtime))
                            .endElement();
                            if (aTVversion >= 6){
                            xw.startElement('row')
                                .startElement('mediaBadges')
                                    .startElement('additionalMediaBadges');
                                       var num = 0;
                                        movie.torrents.forEach(function(torrent){
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + torrent.quality + '.png')
                                            .endElement();
                                            num += 1;
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + torrentHealth(torrent) + '.png')
                                            .endElement();
                                            num += 1;
                                        })
                                    xw.endElement()
                                .endElement()
                            .endElement();
                            }
                            xw.startElement('row')
                                .startElement('starRating')
                                    .writeElement('percentage', movie.rt_audience_score)
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('centerShelf')
                        .startElement('shelf')
                            .writeAttribute('id', 'centerShelf')
                            .writeAttribute('columnCount', '4')
                            .writeAttribute('center', 'true')
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items')
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'play')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + selectTorrent(movie.torrents, quality) + "&id=" + torrentID + "&title=" + encodeURIComponent(movie.title.replace(/'/g, '')) + "&desc=" + encodeURIComponent(movie.description_full.replace(/'/g, '')) + "&poster=" + movie.images.large_cover_image + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Play')
                                            .writeElement('image', 'resource://Play.png')
                                            .writeElement('focusedImage', 'resource://PlayFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'trailer')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=https://www.youtube.com/watch?v=" + movie.yt_trailer_code + "&id=" + torrentID + "yt')")
                                            .writeElement('title', 'Trailer')
                                            .writeElement('image', 'resource://Preview.png')
                                            .writeElement('focusedImage', 'resource://PreviewFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'select')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/quality.xml?torrentID=" + torrentID + '&qualities=' + getQualities(movie.torrents) + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Select Quality')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'subtitle')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('http://trailers.apple.com/subtitles.xml?imdb=" + movie.imdb_code + "&torrentID=" + torrentID + '&quality=' + quality + "')")
                                            .writeElement('title', 'Subtitles')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                    .endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('divider')
                        .startElement('smallCollectionDivider')
                        .writeAttribute('alignment', 'left')
                        .writeElement('title', 'Related Movies')
                        .endElement()
                    .endElement()
                    .startElement('bottomShelf')
                        .startElement('shelf')
                        .writeAttribute('columnCount', '7')
                        .writeAttribute('id', 'bottomShelf')
                        .startElement('sections')
                            .startElement('shelfSection')
                                .startElement('items');
                                    var API = require('./MoviesAPI');
                                    var movies = API.getRelatedMovies(torrentID, function(movies){
                                    for(var i = 0; i <= movies.length-1; i++)
                                    {
                                        var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
                                        xw.startElement('moviePoster')
                                            .writeAttribute('id', movies[i].title.replace(/\s/g, ''))
                                            .writeAttribute('alwaysShowTitles', 'true')
                                            .writeAttribute('related', 'true')
                                            .writeAttribute('onSelect', "addUDIDtoQuery('" + url + "')")
                                            .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movies[i].id + '")')
                                        .writeElement('title', movies[i].title)
                                        .writeElement('subtitle', movies[i].year)
                                        .writeElement('image', movies[i].medium_cover_image)
                                        .writeElement('defaultImage', 'resource://Poster.png')
                                        .endElement();
                                    }
                                    xw.endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('moreInfo')
                        .startElement('listScrollerSplit')
                            .writeAttribute('id', 'com.sample.list-scroller-split')
                            .startElement('menu')
                                .startElement('sections')
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Genres')
                                                .writeElement('title', 'Genres')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.genres.forEach(function(genre){
                                                xw.startElement('oneLineMenuItem')
                                                    .writeAttribute('id', genre)
                                                    .writeElement('label', genre)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/MoviesGenreGrid.xml?genre=' + encodeURIComponent(genre))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement()
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Directors')
                                                .writeElement('title', 'Directors')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.directors.forEach(function(director){
                                                xw.startElement('oneLineMenuItem')
                                                    .writeAttribute('id', director.name)
                                                    .writeAttribute('accessibilityLabel', director.name)
                                                    .writeElement('label', director.name)
                                                    .writeElement('image', director.medium_image)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/extras.xml?query=' + encodeURIComponent(director.name))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement()
                                    .startElement('menuSection')
                                        .startElement('header')
                                            .startElement('textDivider')
                                                .writeAttribute('alignment', 'left')
                                                .writeAttribute('accessibilityLabel', 'Actors')
                                                .writeElement('title', 'Actors')
                                            .endElement()
                                        .endElement()
                                        .startElement('items');
                                            movie.actors.forEach(function(actor){
                                                xw.startElement('twoLineMenuItem')
                                                    .writeAttribute('id', actor.name)
                                                    .writeAttribute('accessibilityLabel', actor.name)
                                                    .writeElement('label', actor.name)
                                                    .writeElement('label2', actor.character_name)
                                                    .writeElement('image', actor.medium_image)
                                                    .startElement('preview')
                                                        .writeElement('link', 'http://trailers.apple.com/extras.xml?query=' + encodeURIComponent(actor.name))
                                                    .endElement()
                                                .endElement();
                                            })
                                        xw.endElement()
                                    .endElement();
                                    xw.endDocument();
                                    logger.Debug(xw.toString());
                                    callback(xw.toString());
                                });
    });
}

function generateTVXML(title, sort_by, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('scroller').writeAttribute('id', 'com.sample.movie-grid')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', title)
                    .endElement()
                .endElement()
                .startElement('items')
                    .startElement('grid')
                        .writeAttribute('columnCount', '7').writeAttribute('id', 'grid_0')
                            .startElement('items')
                                .writeAttribute('id', 'items');
    var API = require('./TVApi');
    var tv = API.getTV(1, sort_by, "50", function(shows){
        for(var i = 0; i <= shows.length-1; i++)
        {
            var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
            xw.startElement('moviePoster')
                .writeAttribute('id', shows[i].title.replace(/\s/g, ''))
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', "scrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tv&id=" + shows[i].imdb_id + "')")
            .writeElement('title', shows[i].title)
            .writeElement('subtitle', shows[i].year + ' | ' + shows[i].num_seasons + ' Seasons')
            .writeElement('image', shows[i].images.poster)
            .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        }

            xw.startElement('moviePoster')
                .writeAttribute('id', "50")
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'loadMore("tv", "' + sort_by + '", "2")')
                .writeAttribute('onSelect', 'loadMore("tv", "' + sort_by + '", "2")')
                .writeElement('title', 'View More')
                .writeElement('subtitle', '')
                .writeElement('image', 'http://trailers.apple.com/thumbnails/view-more.png')
                .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}
function generateTVSeasons(imdb, seriesTitle, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    var API = require('./TVApi');
    var tv = API.getSeasons(imdb, function(seasons, seasonNumbers){
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('body')
                .startElement('scroller').writeAttribute('id', 'com.sample.menu-items-with-sections')
                    .startElement('header')
                        .startElement('simpleHeader')
                            .writeElement('title', seriesTitle)
                        .endElement()
                    .endElement()
                    .startElement('items')
                        .startElement('collectionDivider')
                            .writeAttribute('alignment', 'left')
                            .writeElement('title', '')
                        .endElement()
                        .startElement('shelf')
                        .writeAttribute('id', 'coverflow').writeAttribute('columnCount', Math.min(seasonNumbers.length, 5))
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items');
        for(var i = 0; i <= seasons.length-1; i++)
        {
            if (seasonNumbers.indexOf(i) > -1){
                if (i == 0){
                    title = "Specials"
                } else {
                    var title = 'Season ' + i;
                }
                if (seasons[i].images.poster.thumb == null){
                    seasons[i].images.poster.thumb = 'resource://Poster.png';
                }
                var url = 'http://trailers.apple.com/episodes.xml?imdb=' + imdb + '&season=' + i + '&title=' + seriesTitle.replace(/ /g,"%20");
                xw.startElement('goldenPoster')
                    .writeAttribute('id', i)
                    .writeAttribute('alwaysShowTitles', 'true')
                    .writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
                    .writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
                    .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=tvshow&id=' + imdb + '")')
                .writeElement('title', title)
                .writeElement('image', seasons[i].images.poster.thumb)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
            }
        }
                                    xw.endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                        .startElement('collectionDivider')
                            .writeAttribute('alignment', 'left')
                            .writeElement('title', '')
                        .endElement();
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}
function generateTVSeasonsFanart(imdb, seriesTitle, resolution, callback){
    var inset1 = '-434';
    var inset2 = '900';
    if (resolution == '720'){
        inset1 =  '-270';
        inset2 =  '580';
    }
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    var API = require('./TVApi');
    var tv = API.getSeasonsFanart(imdb, resolution, function(seasons, seasonNumbers, fanart){
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('body')
                .startElement('scroller').writeAttribute('id', 'com.sample.menu-items-with-sections')
                    .startElement('header')
                        .startElement('imageHeader')
                            .startElement('image')
                            .writeAttribute('insets', inset1 + ', 0, ' + inset2 + ', 0')
                            .writeAttribute('required', 'true')
                            .text(fanart)
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('items')
                        .startElement('shelf')
                        .writeAttribute('id', 'coverflow').writeAttribute('columnCount', Math.min(seasonNumbers.length, 7))
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items');
        for(var i = 0; i <= seasons.length-1; i++)
        {
            if (seasonNumbers.indexOf(seasons[i].number) > -1){
                if (seasons[i].number == 0){
                    title = "Specials"
                } else {
                    var title = 'Season ' + seasons[i].number;
                }
                if (seasons[i].images.poster.thumb == null){
                    seasons[i].images.poster.thumb = 'resource://Poster.png';
                }
                var url = 'http://trailers.apple.com/episodes.xml?imdb=' + imdb + '&season=' + seasons[i].number + '&title=' + seriesTitle.replace(/ /g,"%20");
                xw.startElement('moviePoster')
                    .writeAttribute('id', i)
                    .writeAttribute('alwaysShowTitles', 'true')
                    .writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
                    .writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
                .writeElement('title', title)
                .writeElement('image', seasons[i].images.poster.thumb)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
            }
        }
        xw.endDocument();

        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}
function generateTVEpisodes(imdb, season, title, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    var API = require('./TVApi');
    var tv = API.getEpisodes(imdb, season, function(episodes, episodeNumbers, fanart){
        if (season == '0'){
            var subtitle = 'Specials'
        } else {
            var subtitle = 'Season ' + season;
        }
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('listWithPreview').writeAttribute('id', 'com.sample.menu-items-with-sections')
                    .startElement('header')
                        .startElement('simpleHeader')
                            .writeElement('title', title)
                            .writeElement('subtitle', subtitle)
                        .endElement()
                    .endElement()
                    .startElement('menu')
                        .startElement('sections')
                            .startElement('menuSection')
                                .startElement('items');
        for(var i = 0; i <= episodes.length; i++)
        {
            var num = i+1;
            if (episodeNumbers.indexOf(num) > -1){
                if (episodes[i].title == null){
                    continue;
                }
                if (episodes[i].overview == null){
                    episodes[i].overview = 'No Overview';
                }
                if (episodes[i].images.screenshot.thumb == null){
                    episodes[i].images.screenshot.thumb = 'resource://16x9.png';
                }
                logger.Debug(episodes[i]);
                var url = 'http://trailers.apple.com/TVPrePlay.xml?imdb=' + imdb + '&season=' + season + '&episode=' + episodes[i].number;
                xw.startElement('twoLineEnhancedMenuItem')
                    .writeAttribute('id', episodes[i].ids.trakt)
                    .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeElement('label', 'Episode ' + episodes[i].number)
                .writeElement('rightLabel', episodes[i].title)
                .writeElement('image', episodes[i].images.screenshot.thumb)
                .writeElement('defaultImage', 'resource://16x9.png')
                    .startElement('preview')
                        .startElement('keyedPreview')
                            .writeElement('title', episodes[i].title)
                            .writeElement('summary', episodes[i].overview)
                            .writeElement('image', episodes[i].images.screenshot.thumb)
                            .startElement('metadataKeys')
                                .writeElement('label', 'Resolution')
                            .endElement()
                            .startElement('metadataValues')
                                .writeElement('label', '720p')
                            .endElement()
                        .endElement()
                    .endElement()
                .endElement();
            }
        }
        xw.endDocument();
        logger.Debug(xw.toString());
        callback(xw.toString());
    });
}
function generateTVPrePlayXML(imdb, season, episode, UDID, quality, subtitle, aTVversion, callback){
    var API = require('./TVApi');
    var tmpEp = episode;
    var episode = API.getEpisode(imdb, season, episode, function(show, moreEpisodes, episodeNumbers, torrentLink, poster, fullShow){
        if (show.images.screenshot.full == null){
            show.images.screenshot.full = 'resource://16x9.png';
        }
        if (show.overview == null){
            show.overview = 'No Overview could be Found.';
        }
        var XMLWriter = require('xml-writer');
        var url = "http://trailers.apple.com/Movies/TVPrePlay.xml?imdb=" + imdb + '&season=' + season + '&episode=' + tmpEp + '&UDID=' + UDID;
        var torrentURL = encodeURIComponent(selectTorrentTV(torrentLink, quality).replace(/%5B/g, '').replace(/%5D/g, ''));
        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('itemDetail')
                    .writeAttribute('id', 'com.apple.trailer')
                    .writeElement('title', show.title)
                    .writeElement('subtitle', fullShow.network);
                    if (fullShow.certification != null)
                        xw.writeElement('rating', fullShow.certification);
                    xw.writeElement('summary', show.overview)
                    .startElement('image')
                        .writeAttribute('style', 'sixteenByNinePoster')
                        .text(show.images.screenshot.full)
                    .endElement()
                    .writeElement('defaultImage', 'resource://16x9.png')
                    .startElement('table')
                        .startElement('columnDefinitions')
                            .startElement('columnDefinition')
                            .writeAttribute('alignment', 'left')
                            .writeAttribute('width', '50')
                            .writeElement('title', 'Details')
                            .endElement()
                        .endElement()
                        .startElement('rows')
                            .startElement('row')
                               .writeElement('label', parseGenre(fullShow.genres))
                            .endElement()
                            .startElement('row')
                               .writeElement('label', parseTime(fullShow.runtime))
                            .endElement();
                            if (parseInt(aTVversion) >= 6){
                            xw.startElement('row')
                                .startElement('mediaBadges')
                                    .startElement('additionalMediaBadges');
                                        var num = 0;
                                        getQualitiesTV(torrentLink).forEach(function(quality){
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + quality + '.png')
                                            .endElement();
                                            num += 1;
                                        })
                                    xw.endElement()
                                .endElement()
                            .endElement();
                            }
                            xw.startElement('row')
                                .startElement('starRating')
                                    .writeElement('percentage', Math.round(show.rating * 10))
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('centerShelf')
                        .startElement('shelf')
                        .writeAttribute('id', 'centerShelf')
                        .writeAttribute('columnCount', '4')
                        .writeAttribute('center', 'true')
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items')
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'play')
                                            .writeAttribute('onSelect', "atv.loadURL('" + encodeURI("http://trailers.apple.com/Movies/MoviePlay.xml?id=" + imdb + "&UDID=" + UDID + "&title=" + encodeURIComponent(show.title.replace(/'/g, '')) + "&desc=" + encodeURIComponent(show.overview.replace(/'/g, '')) + "&poster=" + show.images.screenshot.thumb + "&torrent=" + torrentURL + '&subtitle=' + subtitle) + "')")
                                            .writeElement('title', 'Play')
                                            .writeElement('image', 'resource://Play.png')
                                            .writeElement('focusedImage', 'resource://PlayFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'select')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/qualitytv.xml?imdb=" + imdb + '&season=' + season + '&episode=' + tmpEp + '&UDID=' + UDID + '&qualities=' + getQualitiesTV(torrentLink) + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Select Quality')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'subtitle')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/subtitlestv.xml?imdb=" + imdb + "&episode=" + tmpEp + '&season=' + season + '&UDID=' + UDID + '&quality=' + quality + "')")
                                            .writeElement('title', 'Subtitles')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                    .endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('divider')
                        .startElement('smallCollectionDivider')
                        .writeAttribute('alignment', 'left')
                        .writeElement('title', 'Related Movies')
                        .endElement()
                    .endElement()
                    .startElement('bottomShelf')
                        .startElement('shelf')
                        .writeAttribute('columnCount', '7')
                        .writeAttribute('id', 'bottomShelf')
                        .startElement('sections')
                            .startElement('shelfSection')
                                .startElement('items');
                                    moreEpisodes.forEach(function(ep){
                                        var url = "http://trailers.apple.com/Movies/TVPrePlay.xml?imdb=" + imdb + '&season=' + season + '&episode=' + ep.number + '&UDID=' + UDID;
                                        if (ep.title == null){
                                            return;
                                        }
                                        if (ep.images.screenshot.thumb == null){
                                            ep.images.screenshot.thumb = 'resource://16x9.png';
                                        }
                                        xw.startElement('moviePoster')
                                            .writeAttribute('id', 'test')
                                            .writeAttribute('alwaysShowTitles', 'true')
                                            .writeAttribute('related', 'true')
                                            .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                                            .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                                        .writeElement('title', ep.title)
                                        .writeElement('subtitle', "Episode " + ep.number)
                                        .writeElement('image', ep.images.screenshot.thumb)
                                        .writeElement('defaultImage', 'resource://16x9.png')
                                        .endElement();
                                    })
                                    xw.endDocument();
                                    logger.Debug(xw.toString());
                                    logger.Debug(selectTorrentTV(torrentLink, quality));
                                    callback(xw.toString());
    });
}
function generatePrePlayFanartXML(show, options, quality, subtitle, callback){
    var inset = '690';
    if (options.resolution == '720'){
        inset = '460';
    }
        logger.warning(show);
        if (show.description == null){
            show.description = 'No Overview could be Found.';
        }
        var XMLWriter = require('xml-writer');
        var url = "http://trailers.apple.com/Movies/TVPrePlay.xml?imdb=" + options.imdb + '&season=' + options.season + '&episode=' + options.episode + '&UDID=' + options.UDID;
        var parseTorrent = require('parse-torrent');
        var infoHash = parseTorrent(selectTorrentTV(show.torrents, quality)).infoHash;
        var torrentURL = encodeURIComponent(selectTorrentTV(show.torrents, quality).replace(/%5B/g, '').replace(/%5D/g, ''));

        xw = new XMLWriter;
        xw.startDocument(version='1.0', encoding='UTF-8');
        xw.startElement('atv')
            .startElement('head')
                .startElement('script')
                    .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
                .endElement()
            .endElement()
            .startElement('body')
                .startElement('itemDetailWithImageHeader')
                    .writeAttribute('id', 'com.apple.trailer')
                    .writeAttribute('layout', 'compact')
                    .startElement('styles')
                        .startElement('color')
                        .writeAttribute('name', 'titleColor')
                        .text('#fafafa')
                        .endElement()
                        .startElement('color')
                        .writeAttribute('name', 'metadataColor')
                        .text('#fafafa')
                        .endElement()
                    .endElement()
                    .startElement('header')
                        .startElement('imageHeader')
                            .startElement('image')
                            .writeAttribute('insets', '0, 0, ' + inset + ', 0')
                            .writeAttribute('required', 'true')
                            .text(show.images.fanart)
                            .endElement()
                        .endElement()
                    .endElement()
                    .writeElement('title', show.title)
                    .writeElement('footnote', show.year);
                    if (show.rating != null)
                        xw.writeElement('rating', show.rating);
                    xw.writeElement('summary', show.description)
                    .startElement('userRatings')
                        .startElement('starRating')
                        .writeElement('percentage', show.rt_rating)
                        .endElement()
                    .endElement()
                    .startElement('image')
                        .writeAttribute('style', 'moviePoster')
                        .text(show.images.poster)
                    .endElement()
                    .writeElement('defaultImage', 'resource://Poster.png')
                    .startElement('table')
                        .startElement('columnDefinitions')
                            .startElement('columnDefinition')
                            .writeAttribute('alignment', 'left')
                            .writeAttribute('width', '50')
                            .writeElement('title', 'Details')
                            .endElement()
                        .endElement()
                        .startElement('rows')
                            .startElement('row')
                            .writeElement('label', parseGenre(show.genres))
                            .endElement()
                            .startElement('row')
                            .writeElement('label', parseTime(show.runtime))
                            .endElement()
                            .startElement('row')
                                .startElement('mediaBadges')
                                    .startElement('additionalMediaBadges')
                                        var num = 0;
                                        getQualitiesTV(show.torrents).forEach(function(quality){
                                            xw.startElement('urlBadge')
                                            .writeAttribute('insertIndex', num)
                                            .writeAttribute('required', 'true')
                                            .writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/' + quality + '.png')
                                            .endElement();
                                            num += 1;
                                        })
                                    xw.endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('centerShelf')
                        .startElement('shelf')
                        .writeAttribute('id', 'centerShelf')
                        .writeAttribute('columnCount', '4')
                        .writeAttribute('center', 'true')
                            .startElement('sections')
                                .startElement('shelfSection')
                                    .startElement('items')
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'play')
                                            .writeAttribute('onSelect', "atv.loadURL('" + encodeURI("http://trailers.apple.com/Movies/MoviePlay.xml?id=" + options.imdb + "&UDID=" + options.UDID + "&title=" + encodeURIComponent(show.title.replace(/'/g, '')) + "&desc=" + encodeURIComponent(show.description.replace(/'/g, '')) + "&poster=" + show.images.poster + "&torrent=" + torrentURL + '&subtitle=' + subtitle + '&hash=' + infoHash) + "')")
                                            .writeElement('title', 'Play')
                                            .writeElement('image', 'resource://Play.png')
                                            .writeElement('focusedImage', 'resource://PlayFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'select')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/qualitytv.xml?imdb=" + options.imdb + '&season=' + options.season + '&episode=' + options.episode + '&UDID=' + options.UDID + '&qualities=' + getQualitiesTV(show.torrents) + '&subtitle=' + subtitle + "')")
                                            .writeElement('title', 'Select Quality')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                        .startElement('actionButton')
                                            .writeAttribute('id', 'subtitle')
                                            .writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/subtitlestv.xml?imdb=" + options.imdb + "&episode=" + options.episode + '&season=' + options.season + '&UDID=' + options.UDID + '&quality=' + quality + "')")
                                            .writeElement('title', 'Subtitles')
                                            .writeElement('image', 'resource://Queue.png')
                                            .writeElement('focusedImage', 'resource://QueueFocused.png')
                                        .endElement()
                                    .endElement()
                                .endElement()
                            .endElement()
                        .endElement()
                    .endElement()
                    .startElement('divider')
                        .startElement('smallCollectionDivider')
                        .writeAttribute('alignment', 'left')
                        .writeElement('title', 'More Episodes')
                        .endElement()
                    .endElement()
                    .startElement('bottomShelf')
                        .startElement('shelf')
                        .writeAttribute('columnCount', '7')
                        .writeAttribute('id', 'bottomShelf')
                        .startElement('sections')
                            .startElement('shelfSection')
                                .startElement('items');
                                    show.related.forEach(function(ep){
                                        var url = "http://trailers.apple.com/Movies/TVPrePlay.xml?imdb=" + options.imdb + '&season=' + options.season + '&episode=' + ep.number;
                                        if (ep.title == null){
                                            return;
                                        }
                                        if (ep.screenshot == null){
                                            ep.screenshot = 'resource://16x9.png';
                                        }
                                        xw.startElement('moviePoster')
                                            .writeAttribute('id', 'test')
                                            .writeAttribute('alwaysShowTitles', 'true')
                                            .writeAttribute('related', 'true')
                                            .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                                            .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                                        .writeElement('title', ep.title)
                                        .writeElement('subtitle', ep.subtitle)
                                        .writeElement('image', ep.screenshot)
                                        .writeElement('defaultImage', 'resource://16x9.png')
                                        .endElement();
                                    })

                                    xw.endDocument();
                                    logger.Debug(xw.toString());
                                    callback(xw.toString());
}
function generateFavoritesXML(favorites, callback){
    var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
        .startElement('head')
            .startElement('script')
                .writeAttribute('src', 'http://trailers.apple.com/js/utils.js')
            .endElement()
        .endElement()
        .startElement('body')
            .startElement('scroller').writeAttribute('id', 'com.sample.movie-grid')
                .startElement('header')
                    .startElement('simpleHeader')
                        .writeElement('title', 'Favorites')
                    .endElement()
                .endElement()
                .startElement('items')
                    .startElement('grid')
                        .writeAttribute('columnCount', '7').writeAttribute('id', 'grid_0')
                            .startElement('items');
    var processed = 0;
    favorites.forEach(function(favorite){
        if (favorite.type == 'movie'){
            var API = require('./MoviesAPI');
            var movies = API.getMovie(favorite.id, function(movie){

            var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movie.id;
            xw.startElement('moviePoster')
                .writeAttribute('id', movie.title.replace(/\s/g, ''))
                .writeAttribute('alwaysShowTitles', 'true')
                .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                .writeAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=' + movie.id + '")')
                .writeElement('title', movie.title)
                .writeElement('subtitle', movie.year)
                .writeElement('image', movie.images.medium_cover_image)
                .writeElement('defaultImage', 'resource://Poster.png')
            .endElement();
            processed += 1;
            if (processed == favorites.length){
                xw.endDocument();

                logger.Debug(xw.toString());
                callback(xw.toString());
            }
            });
        } else if (favorite.type == 'tvshow' || favorite.type == 'tv'){
            var API = require('./TVApi');
            var tv = API.getShow(favorite.id, function(show){
                var url = 'http://trailers.apple.com/seasons.xml?imdb=' + show.imdb_id + '&title=' + show.title.replace(/ /g,"%20");
                xw.startElement('moviePoster')
                    .writeAttribute('id', show.title.replace(/\s/g, ''))
                    .writeAttribute('alwaysShowTitles', 'true')
                    .writeAttribute('onPlay', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onSelect', 'addUDIDtoQuery("' + url + '")')
                    .writeAttribute('onHoldSelect', "scrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tv&id=" + show.imdb_id + "')")
                .writeElement('title', show.title)
                .writeElement('subtitle', show.year + ' | ' + show.num_seasons + ' Seasons')
                .writeElement('image', show.images.poster)
                .writeElement('defaultImage', 'resource://Poster.png')
                .endElement();
                processed += 1;
                if (processed == favorites.length){
                    xw.endDocument();

                    logger.Debug(xw.toString());
                    callback(xw.toString());
                }
            });
        }
    })
}

function parseTime(runtime){
    var hour = parseInt(Math.floor(runtime)/60)
    var minute = runtime%60
    if (hour == 0){
        return minute + 'min';
    } else if (minute == 0){
        return hour + 'hr';
    } else {
        return hour + 'hr ' + minute + 'min';
    }
}
function parseGenre(genres){
    if (genres.length == 0){
        return 'No Known Genres';
    }
    if (genres[1] != undefined){
        return capitalizeFirstLetter(genres[0]) + '/' + capitalizeFirstLetter(genres[1]); // Trakt.tv Genres are Lowercase so we capitalize them :)
    } else {
        return capitalizeFirstLetter(genres[0]);
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function nullCheck(string){
    if (string == null){
        return 'Undefined';
    } else {
        return string;
    }
}
function getQualities(torrents){
    var quality = [];
    torrents.forEach(function(torrent){
        quality.push(torrent.quality);
    })
    logger.Debug(quality);
    return quality;
}
function getQualitiesTV(torrents){
    var quality = [];
    if (torrents['480p'] != undefined){
        quality.push('480p')
    }
    if (torrents['720p'] != undefined){
        quality.push('720p')
    }
    if (torrents['1080p'] != undefined){
        quality.push('1080p')
    }
    logger.Debug(quality);
    return quality;
}
function torrentHealth(torrent){
    var health = torrent.seeds / torrent.peers;
    logger.Debug('Torrent Health: ' + torrent.quality + ': ' + health);
    if (health >= 1.5){
        return 'good';
    } else if (health >= 0.75){
        return 'ok';
    } else if (health >= 0.01){
        return 'bad';
    }
    return 'unknown';
}
function selectTorrent(torrents, quality){
    var torrentURL;
    torrents.forEach(function(torrent){
        if (torrent.quality === quality){
            logger.Debug('found quality! ' + torrent.quality + ' | ' + torrent.url);
            torrentURL = torrent.url;
        }
    })
    if (torrentURL == undefined && quality == '3D'){
        torrentURL = torrents[torrents.length-1].url;
    } else if (torrentURL == undefined){
        torrentURL = torrents[0].url;
    }
    return torrentURL;
}
function selectTorrentTV(torrents, quality){
    try {
        var torrentURL = torrents[quality].url;
    } catch(e){
        var torrentURL = undefined;
        if (torrentURL == undefined && (quality == '3D' || quality == '1080p')){
            if (torrents['1080p'] != undefined){
                torrentURL = torrents['1080p'].url;
            } else if (torrents['720p'] != undefined){
                torrentURL = torrents['720p'].url;
            } else if (torrents['480p'] != undefined){
                torrentURL = torrents['480p'].url;
            }
        }
        if (torrentURL == undefined){
            torrentURL = torrents[0].url;
        }
    }
    return torrentURL;
}
exports.generatePlayXML = generatePlayXML;
exports.generateProgressXML = generateProgressXML;
exports.errorXML = errorXML;
exports.updateContextXML = updateContextXML;
exports.generateQuality = generateQuality;
exports.generateSubtitles = generateSubtitles;
exports.generateQualityTV = generateQualityTV;
exports.generateSubtitlesTV = generateSubtitlesTV;
exports.generateSettingsXML = generateSettingsXML;
exports.generateGenre = generateGenre;
exports.generateMoviesXML = generateMoviesXML;
exports.generateScrobbleXML = generateScrobbleXML;
exports.generateScrobbleXMLOLD = generateScrobbleXMLOLD;
exports.generateMoviePrePlayXML = generateMoviePrePlayXML;
exports.generateMoviePrePlayFanartXML = generateMoviePrePlayFanartXML;
exports.generateMovieParadeXML = generateMovieParadeXML;
exports.generateTVParadeXML = generateTVParadeXML;
exports.generateSearchResults = generateSearchResults;
exports.generateMovieSearchResults = generateMovieSearchResults;
exports.generateTVSearchResults = generateTVSearchResults;
exports.generateTVXML = generateTVXML;
exports.generateTVSeasons = generateTVSeasons;
exports.generateTVSeasonsFanart = generateTVSeasonsFanart;
exports.generateTVEpisodes = generateTVEpisodes;
exports.generateTVPrePlayXML = generateTVPrePlayXML;
exports.generatePrePlayFanartXML = generatePrePlayFanartXML;
exports.generateFavoritesXML = generateFavoritesXML;
exports.generateMovieExtras = generateMovieExtras;
