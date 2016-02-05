# Project Discontinued
After the legal action taken against certain members of the PopcornTime.io team I decided that it was best and safest to discontinue working on the project and move onto greener pastures. Thank you all for your continued support. There will be no pull requests or code updates accepted to this repository. It was a fun proof of concept, and challenging to develop, but will no longer be supported.

I have left most of the source intact (less the API) for other programs to use as a reference point. Feel free to use the code to create a port, I can suggest Plex, Vodo, Archive.org etc. Please do not use this project or code for illicit purposes, it is intended for educational use and legal purposes only. The XML generation and schema are still hard to find and finicky as there is no real reference point, feel free to look thru [XMLGenerator.js](https://github.com/OstlerDev/PopcornTV/blob/master/XMLGenerator.js) to see how I generated valid XML to send to the Apple TV.

Thank you for your understanding and support
- OstlerDev

# What was PopcornTV?

PopcornTV was a simple application that allowed an Apple TV to play stream Movies and TV shows directly from torrents. It pulls from various databases and showed users movies and TV shows in a nice format. One of the main points of PopcornTV was to prove that such a thing was possible, albeit difficult.

## How it worked

PopcornTV worked by hijacking the Trailers application on the Apple TV. In order to do this effectively we changed the DNS server on the Apple TV to point to your own computer/server. This application was initially created in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from. It since grew into a much more full fledged application before being discontinued.

## Demo
### Demo Images
![](http://i.imgur.com/7dB9zGp.jpg)
![](http://i.imgur.com/vigyOsZ.jpg)
![](http://i.imgur.com/296kywf.jpg)
![](http://i.imgur.com/S0yrFHo.jpg)
[More Screenshots](http://imgur.com/a/bKobV)

## Version History
- 0.1.5 - Quality Selection, Subtitles, Favorites
- 0.1.4 - Clean up Code, Implement Certificate Generation. Initial Release
- 0.1.3 - Add TV Show Support (broken)
- 0.1.2 - Redesign UI
- 0.1.1 - Implement VideoAPI
- 0.1.0 - Initial Testing

License
----

If you distribute a copy or make a fork of the project, you have to credit this project as source.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/ .


PopcornTV - Streaming video to an Apple TV through torrents
Copyright © 2015  PopcornTV and the contributors
PopcornTV is released under the GPL