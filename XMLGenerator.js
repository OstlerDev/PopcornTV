var xml = require('xml');
var logger = require('./logger');
var atvSettings = require('./settings.js');

function generatePlayXML(url, title, desc, image) {
	return xml(
	[{atv: 
		[{body: 
			[{videoPlayer: 
				[{ _attr: 
					{ id: 'com.sample.video-player'}
				}, {httpFileVideoAsset: [
					{ _attr: 
						{ id: title}
					},
					{mediaURL: url}, {title: title}, {description: desc}, {image: image}
					]
				}]
			}]
		}]
	}], { declaration: { encoding: 'UTF-8'}});
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

function generatePlayDelay(url){

}

function generateSettingsXML(UDID, callback){
	var settings = atvSettings.loadSettings(UDID);
	logger.Debug(settings);

	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
	xw.startDocument(version='1.0', encoding='UTF-8');
    	xw.startElement('atv')
    		.startElement('head')
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
    							.writeElement('label', 'Version')
    							.writeElement('label', 'Authors')
    							.writeElement('label', 'Homepage')
    							.writeElement('label', 'Forum')
    						.endElement()
    						.startElement('metadataValues')
    							.writeElement('label', 'PopcornTV is a simple application that allows an Apple TV to play stream Movies and TV shows directly from torrents. It pulls from yts.to as well as the Popcorn Time TV API to allow for a smooth interface and ease of use.')
    							.writeElement('label', '0.1.5 dev')
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
    									.writeAttribute('onSelect', "toggleSetting('quality', '" + settings.quality + "')")
    									.writeElement('label', 'Prefered Quality')
    									.writeElement('rightLabel', settings.quality)
    								.endElement()
    								.startElement('oneLineMenuItem')
    									.writeAttribute('id', 'fanart')
    									.writeAttribute('onSelect', "toggleSetting('fanart', '" + settings.fanart + "')")
    									.writeElement('label', 'Fanart')
    									.writeElement('rightLabel', settings.fanart)
    								.endElement()
    								.startElement('oneLineMenuItem')
    									.writeAttribute('id', 'subtitle')
    									.writeAttribute('onSelect', "toggleSetting('subtitle', '" + settings.subtitle + "')")
    									.writeElement('label', 'Enable Subtitle Support')
    									.writeElement('rightLabel', settings.subtitle)
    								.endElement()
    								.startElement('oneLineMenuItem')
    									.writeAttribute('id', 'keep')
    									.writeAttribute('onSelect', "toggleSetting('keep', '" + settings.fanart + "')")
    									.writeElement('label', 'Keep Movie Downloads')
    									.writeElement('rightLabel', settings.fanart)
    								.endElement();

    								xw.endDocument();

    								logger.Debug(xw.toString());
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
    						.startElement('items');
    var API = require('./MoviesAPI');
    var movies = API.getMovies(sort_by, "50", function(movies){
    	for(var i = 0; i <= movies.length-1; i++)
		{
			var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
	  		xw.startElement('moviePoster')
	  			.writeAttribute('id', movies[i].title.replace(/\s/g, ''))
	  			.writeAttribute('alwaysShowTitles', 'true')
	  			.writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
	  			.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
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

function generateMovieParadeXML(sort_by, callback){
	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
    	.startElement('body')
    		.startElement('preview')
    			.startElement('paradePreview').writeAttribute('inOrder', 'true')
    var API = require('./MoviesAPI');
    var movies = API.getMovies(sort_by, "15", function(movies){
    	for(var i = 0; i <= movies.length-1; i++)
		{
	  		xw.writeElement('image', movies[i].medium_cover_image)
		}
    	xw.endDocument();
    	logger.Debug(xw.toString());
    	callback(xw.toString());
    });
}

function generateMovieGenre(genre, callback){
	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
    	.startElement('body')
    		.startElement('preview')
    			.startElement('scrollerPreview').writeAttribute('id', 'com.sample.scrollerPreview')
    				.startElement('items')
    					.startElement('grid')
    						.writeAttribute('id', 'grid_1')
    						.writeAttribute('columnCount', '5')
    						.startElement('items')
    var API = require('./MoviesAPI');
    var movies = API.getMoviesGenre(genre, "50", function(movies){
    	for(var i = 0; i <= movies.length-1; i++)
		{
	  		var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movies[i].id;
	  		xw.startElement('moviePoster')
	  			.writeAttribute('id', movies[i].title.replace(/\s/g, ''))
	  			.writeAttribute('alwaysShowTitles', 'true')
	  			.writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
	  			.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
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
	  			.writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
	  			.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
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

function generateMoviePrePlayXML(torrentID, callback){
	var API = require('./MoviesAPI');
    var movies = API.getMovie(torrentID, function(movie, fanart){
    	var XMLWriter = require('xml-writer');
		var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + movie.id;
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
    				.writeAttribute('onVolatileReload', "atv.loadAndSwapURL('" + url + "')")
    				.writeAttribute('volatile', 'true')
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
    						.writeAttribute('insets', '0, 0, 690, 0')
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
	  								.startElement('additionalMediaBadges')
	  									.startElement('urlBadge')
	  									.writeAttribute('insertIndex', '0')
	  									.writeAttribute('required', 'true')
	  									.writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/720.png')
	  									.endElement()
	  									.startElement('urlBadge')
	  									.writeAttribute('insertIndex', '1')
	  									.writeAttribute('required', 'true')
	  									.writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/1080.png')
	  									.endElement()
	  								.endElement()
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
	  										.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + movie.torrents[0].url + "&id=" + torrentID + "&title=" + movie.title.replace(/ /g,"%20") + "&desc=" + movie.description_full.replace(/ /g,"%20").replace(/['"]+/g, '') + "&poster=" + movie.images.medium_cover_image + "')")
	  										.writeElement('title', 'Play')
	  										.writeElement('image', 'resource://Play.png')
	  										.writeElement('focusedImage', 'resource://PlayFocused.png')
	  									.endElement()
	  									.startElement('actionButton')
	  										.writeAttribute('id', 'trailer')
	  										.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=https://www.youtube.com/watch?v=" + movie.yt_trailer_code + "&id=" + torrentID + "yt')")
	  										.writeElement('title', 'Trailer')
	  										.writeElement('image', 'resource://Preview.png')
	  										.writeElement('focusedImage', 'resource://PreviewFocused.png')
	  									.endElement()
	  									.startElement('actionButton')
	  										.writeAttribute('id', 'select')
	  										.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/quality.xml')")
	  										.writeElement('title', 'Select Quality')
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
								  			.writeAttribute('onSelect', "atv.loadURL('" + url + "')")
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
    });		
}
function generateNoFanartXML(torrentID, callback){
	var API = require('./MoviesAPI');
    var movies = API.getMovie(torrentID, function(movie){
    	var XMLWriter = require('xml-writer');
    	xw = new XMLWriter;
    	xw.startDocument(version='1.0', encoding='UTF-8');
    	xw.startElement('atv')
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
	  								.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + movie.torrents[0].url + "&id=" + torrentID + "&title=" + movie.title.replace(/ /g,"%20") + "&desc=" + movie.description_full.replace(/ /g,"%20").replace(/['"]+/g, '') + "&poster=" + movie.images.medium_cover_image + "')")
	  								.writeElement('title', 'Play')
	  								.writeElement('image', 'resource://Play.png')
	  								.writeElement('focusedImage', 'resource://PlayFocused.png')
	  							.endElement()
	  							.startElement('actionButton')
	  								.writeAttribute('id', 'trailer')
	  								.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=https://www.youtube.com/watch?v=" + movie.yt_trailer_code + "&id=" + torrentID + "yt')")
	  								.writeElement('title', 'Trailer')
	  								.writeElement('image', 'resource://Preview.png')
	  								.writeElement('focusedImage', 'resource://PreviewFocused.png')
	  							.endElement()
	  							.startElement('actionButton')
	  								.writeAttribute('id', 'select')
	  								.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/quality.xml')")
	  								.writeElement('title', 'Select Quality')
	  								.writeElement('image', 'resource://Queue.png')
	  								.writeElement('focusedImage', 'resource://QueueFocused.png')
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
								  			.writeAttribute('onSelect', "atv.loadURL('" + url + "')")
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
    						.startElement('items');
    var API = require('./TVApi');
    var tv = API.getTV(sort_by, "50", function(shows){
    	for(var i = 0; i <= shows.length-1; i++)
		{
			var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
	  		xw.startElement('moviePoster')
	  			.writeAttribute('id', shows[i].title.replace(/\s/g, ''))
	  			.writeAttribute('alwaysShowTitles', 'true')
	  			.writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
	  			.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
	  			.writeAttribute('onHoldSelect', "scrobbleMenu('http://trailers.apple.com/scrobble.xml?type=tvshow&id=" + shows[i].imdb_id + "')")
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
function generateTVSeasons(imdb, seriesTitle, callback){
	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    var API = require('./TVApi');
    var tv = API.getSeasons(imdb, function(seasons, seasonNumbers, fanart){
    	xw.startDocument(version='1.0', encoding='UTF-8');
    	xw.startElement('atv')
    		.startElement('body')
    			.startElement('scroller').writeAttribute('id', 'com.sample.menu-items-with-sections')
    				.startElement('header')
    					.startElement('imageHeader')
    						.startElement('image')
    						.writeAttribute('insets', '-434, 0, 900, 0')
    						.writeAttribute('required', 'true')
    						.text(fanart)
    						.endElement()
    					.endElement()
    				.endElement()
    				.startElement('items')
    					.startElement('shelf')
    					.writeAttribute('id', 'coverflow').writeAttribute('columnCount', seasonNumbers.length)
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
				var url = 'http://trailers.apple.com/episodes.xml?imdb=' + imdb + '&season=' + i + '&title=' + seriesTitle.replace(/ /g,"%20");
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
    	xw.startDocument(version='1.0', encoding='UTF-8');
    	xw.startElement('atv')
    		.startElement('body')
    			.startElement('listWithPreview').writeAttribute('id', 'com.sample.menu-items-with-sections')
    				.startElement('header')
    					.startElement('simpleHeader')
    						.writeElement('title', title)
    						.writeElement('subtitle', 'Season ' + season)
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
				logger.Debug(episodes[i]);
				if (episodes[i].title == null){
					logger.warning('TV Grid Produced null values, this could be an error with Trakt.tv OR eztvapi.re');
					episodes[i].title = 'No Title';
				}
				if (episodes[i].images.screenshot.thumb == null){
					logger.warning('TV Grid Produced null values, this could be an error with Trakt.tv OR eztvapi.re');
					episodes[i].images.screenshot.thumb = 'resource://16x9.png';
				}
				if (episodes[i].overview == null){
					logger.warning('TV Grid Produced null values, this could be an error with Trakt.tv OR eztvapi.re');
					episodes[i].overview = 'No Overview';
				}
				logger.Debug(episodes[i]);
				var url = 'http://trailers.apple.com/TVPrePlay.xml?imdb=' + imdb + '&season=' + season + '&episode=' + num;
	  			xw.startElement('twoLineEnhancedMenuItem')
	  				.writeAttribute('id', episodes[i].ids.trakt)
	  				.writeAttribute('onPlay', 'atv.loadURL("' + url + '")')
	  				.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
	  			.writeElement('label', 'Episode ' + num)
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
function generateTVPrePlayXML(imdb, season, episode, callback){
	var API = require('./TVApi');
    var episode = API.getEpisode(imdb, season, episode, function(show, moreEpisodes, episodeNumbers, torrentLink, fanart, poster, fullShow){
    	var XMLWriter = require('xml-writer');
		var url = "http://trailers.apple.com/Movies/TVPrePlay.xml?torrentID=" + imdb;
    	xw = new XMLWriter;
    	xw.startDocument(version='1.0', encoding='UTF-8');
    	xw.startElement('atv')
    		.startElement('body')
    			.startElement('itemDetailWithImageHeader')
    				.writeAttribute('id', 'com.apple.trailer')
    				.writeAttribute('layout', 'compact')
    				.writeAttribute('onVolatileReload', "atv.loadAndSwapURL('" + url + "')")
    				.writeAttribute('volatile', 'true')
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
    						.writeAttribute('insets', '0, 0, 690, 0')
    						.writeAttribute('required', 'true')
    						.text(fanart)
    						.endElement()
    					.endElement()
    				.endElement()
	  				.writeElement('title', show.title)
	  				.writeElement('footnote', fullShow.network)
	  				.writeElement('rating', fullShow.certification)
	  				.writeElement('summary', show.overview)
	  				.startElement('userRatings')
	  					.startElement('starRating')
	  					.writeElement('percentage', Math.round(show.rating * 10))
	  					.endElement()
	  				.endElement()
	  				.startElement('image')
	  					.writeAttribute('style', 'moviePoster')
	  					.text(poster)
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
	  						.writeElement('label', parseGenre(fullShow.genres))
	  						.endElement()
	  						.startElement('row')
	  						.writeElement('label', parseTime(fullShow.runtime))
	  						.endElement()
	  						.startElement('row')
	  							.startElement('mediaBadges')
	  								.startElement('additionalMediaBadges')
	  									.startElement('urlBadge')
	  									.writeAttribute('insertIndex', '0')
	  									.writeAttribute('required', 'true')
	  									.writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/720.png')
	  									.endElement()
	  									.startElement('urlBadge')
	  									.writeAttribute('insertIndex', '1')
	  									.writeAttribute('required', 'true')
	  									.writeAttribute('src', 'http://trailers.apple.com/thumbnails/MediaBadges/1080.png')
	  									.endElement()
	  								.endElement()
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
	  										.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + encodeURIComponent(torrentLink[0].url) + "&id=" + imdb + "&title=" + show.title.replace(/ /g,"%20") + "&desc=" + show.overview.replace(/ /g,"%20").replace(/['"]+/g, '') + "&poster=" + show.images.screenshot.thumb + "')")
	  										.writeElement('title', 'Play')
	  										.writeElement('image', 'resource://Play.png')
	  										.writeElement('focusedImage', 'resource://PlayFocused.png')
	  									.endElement()
	  									.startElement('actionButton')
	  										.writeAttribute('id', 'select')
	  										.writeAttribute('onSelect', "atv.loadURL('quality.xml')") // need to add in quality selection stuff
	  										.writeElement('title', 'Select Quality')
	  										.writeElement('image', 'resource://Queue.png')
	  										.writeElement('focusedImage', 'resource://QueueFocused.png')
	  									.endElement()
	  								.endElement()
	  							.endElement()
	  						.endElement()
	  					.endElement()
	  				.endElement();/*
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
										var url = "http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=" + 'test';
								  		xw.startElement('moviePoster')
								  			.writeAttribute('id', 'test')
								  			.writeAttribute('alwaysShowTitles', 'true')
								  			.writeAttribute('related', 'true')
								  			.writeAttribute('onSelect', 'atv.loadURL("' + url + '")')
								  		.writeElement('title', 'title')
								  		.writeElement('subtitle', 'subtitle')
								  		.writeElement('image', '404image')
								  		.writeElement('defaultImage', 'resource://Poster.png')
								  		.endElement();*/
									xw.endDocument();
									logger.Debug(encodeURIComponent(torrentLink[0].url));
									logger.Debug(xw.toString());
									callback(xw.toString());
    });		
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
	if (genres[1] != undefined){
		return capitalizeFirstLetter(genres[0]) + '/' + capitalizeFirstLetter(genres[1]); // Trakt.tv Genres are Lowercase so we capitolize them :)
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

exports.generatePlayXML = generatePlayXML;
exports.errorXML = errorXML;
exports.generateSettingsXML = generateSettingsXML;
exports.generateMovieGenre = generateMovieGenre;
exports.generateMoviesXML = generateMoviesXML;
exports.generateScrobbleXML = generateScrobbleXML;
exports.generateMoviePrePlayXML = generateMoviePrePlayXML;
exports.generateNoFanartXML = generateNoFanartXML;
exports.generateMovieParadeXML = generateMovieParadeXML;
exports.generateSearchResults = generateSearchResults;
exports.generateTVXML = generateTVXML;
exports.generateTVSeasons = generateTVSeasons;
exports.generateTVEpisodes = generateTVEpisodes;
exports.generateTVPrePlayXML = generateTVPrePlayXML;