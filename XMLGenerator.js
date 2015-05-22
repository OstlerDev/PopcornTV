const DOMAIN_ATV = "trailers.apple.com";
const IP_DNS     = "8.8.8.8"; // *********** Googles Default DNS ***********

function generatePlayXML(url, title, desc, image) {
	var xml = require('xml');
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

exports.generatePlayXML = generatePlayXML;