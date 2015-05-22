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

function generatePopularMoviesXML(callback){
	var XMLWriter = require('xml-writer');
    xw = new XMLWriter;
    xw.startDocument(version='1.0', encoding='UTF-8');
    xw.startElement('atv')
    	.startElement('body')
    		.startElement('scroller').writeAttribute('id', 'com.sample.movie-grid')
    			.startElement('header')
    				.startElement('simpleHeader')
    					.writeElement('title', 'Popular Movies')
    				.endElement()
    			.endElement()
    			.startElement('items')
    				.startElement('grid')
    					.writeAttribute('columnCount', '7').writeAttribute('id', 'grid_0')
    						.startElement('items');
    var API = require('./MoviesAPI');
    var movies = API.getMovies("seeds", "50", function(movies){
    	//console.log(movies);
    	for(var i = 0; i <= movies.length-1; i++)
		{
	  		xw.startElement('moviePoster').writeAttribute('id', movies[i].title.replace(/\s/g, '')).writeAttribute('alwaysShowTitles', 'true').writeAttribute('onPlay', 'atv.loadURL("http://trailers.apple.com/Movies/MoviePrePlay.xml")').writeAttribute('onSelect', 'atv.loadURL("http://trailers.apple.com/Movies/MoviePrePlay.xml")')
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

//generatePopularMoviesXML(function(xml){
//	console.log(xml);
//});

exports.generatePlayXML = generatePlayXML;
exports.generateMoviesHomeXML = generateMoviesHomeXML;
exports.generatePopularMoviesXML = generatePopularMoviesXML;