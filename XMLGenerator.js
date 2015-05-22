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

function generatePopularMoviesXML(){
	/*
	var builder = require('xmlbuilder');
	var xml = builder.create({
		atv: {
			body: {
				scroller: {'@id': 'com.sample.movie-grid'}, 
					header: {
						simpleHeader: {
							title: 'Popular Movies'
						}
					}, items: {
						grid: {'@columnCount': '7', '@id': 'grid_0'}
					}
				}
		}
	});
	for(var i = 1; i <= 5; i++)
	{
	  var item = xml.ele('moviePoster', {id: 'LegoMovie', alwaysShowTitles: 'true', onPlay: 'atv.loadURL("")', onSelect: 'atv.loadURL("")'}, {title: "The Lego Movie", subtitle: '2014', image: 'https://s.ynet.io/assets/images/movies/The_Lego_Movie_2014/large-cover.jpg', defaultImage: 'resource://Poster.png'});
	}
	var xmlString = xml.end({ pretty: true, indent: '  ', newline: '\n' });
	console.log(xmlString);
	return xmlString;
	*/
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
    for(var i = 1; i <= 50; i++)
	{
	  xw.startElement('moviePoster').writeAttribute('id', 'LegoMovie').writeAttribute('alwaysShowTitles', 'true').writeAttribute('onPlay', 'atv.loadURL("")').writeAttribute('onSelect', 'atv.loadURL("")')
	  	.writeElement('title', 'The Lego Movie')
	  	.writeElement('subtitle', '2014')
	  	.writeElement('image', 'https://s.ynet.io/assets/images/movies/The_Lego_Movie_2014/large-cover.jpg')
	  	.writeElement('defaultImage', 'resource://Poster.png')
	  .endElement();
	}
    xw.endDocument();

    //console.log(xw.toString());
    return xw.toString();
}
exports.generatePlayXML = generatePlayXML;
exports.generateMoviesHomeXML = generateMoviesHomeXML;
exports.generatePopularMoviesXML = generatePopularMoviesXML;