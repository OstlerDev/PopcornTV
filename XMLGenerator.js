var xml = require('xml');

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

function generateMoviesHomeXML(){
	console.log(xml(
	[{atv: 
		[{body: 
			[{listWithPreview: 
				[{ _attr: 
					{ id: 'Library_List'}
				}, {header: [
					{simpleHeader: [{title: 'Movies Library'}]}
				]}, {menu: [{
					sections: [{
						menuSection: [{
							items: [
							{oneLineMenuItem: [{ _attr: {id: 'main'}},
								{label: 'Popular Movies'}
								]}
							]
						}]
					}]
				}]
				}]
			}]
		}]
	}], { declaration: { encoding: 'UTF-8'}}));
	return xml(
	[{atv: 
		[{body: 
			[{listWithPreview: 
				[{ _attr: 
					{ id: 'Library_List'}
				}, {header: [
					{simpleHeader: [{title: 'Movies Library'}]}
				]}, {menu: [{
					sections: [{
						menuSection: [{
							items: [
							{oneLineMenuItem: [{ _attr: {id: 'main'}},
								{label: 'Popular Movies'}
								]}
							]
						}]
					}]
				}]
				}]
			}]
		}]
	}], { declaration: { encoding: 'UTF-8'}});
}

function generateMoviesXML(title, sort_by, callback){
	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
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
    	//console.log(movies);
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

    	//console.log(xw.toString());
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
    	//console.log(movies);
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

    	//console.log(xw.toString());
    	callback(xw.toString());
    });
}

function generateMoviePrePlayXML(torrentID, callback){
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
	  								.writeAttribute('onSelect', "atv.loadURL('http://trailers.apple.com/Movies/MoviePlay.xml?torrent=" + movie.torrents[0].url + "&id=" + torrentID + "')")
	  								.writeElement('title', 'Play')
	  								.writeElement('image', 'resource://Play.png')
	  								.writeElement('focusedImage', 'resource://PlayFocused.png')
	  							.endElement()
	  							.startElement('actionButton')
	  								.writeAttribute('id', 'trailer')
	  								.writeAttribute('onSelect', 'atv.loadURL("http://trailers.apple.com/Movies/MoviePlay.xml?torrent=https://www.youtube.com/watch?v=' + movie.yt_trailer_code + "&id=" + torrentID + 'yt")')
	  								.writeElement('title', 'Trailer')
	  								.writeElement('image', 'resource://Preview.png')
	  								.writeElement('focusedImage', 'resource://PreviewFocused.png')
	  							.endElement()
    	xw.endDocument();

    	//console.log(xw.toString());
    	callback(xw.toString());
    });		
}

//generatePopularMoviesXML(function(xml){
//	console.log(xml);
//});

exports.generatePlayXML = generatePlayXML;
exports.generateMoviesHomeXML = generateMoviesHomeXML;
exports.generateMoviesXML = generateMoviesXML;
exports.generateMoviePrePlayXML = generateMoviePrePlayXML;
exports.generateSearchResults = generateSearchResults;