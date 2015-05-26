# PopcornTV

PopcornTV is a simple application that allows an Apple TV to play lots of Movies and TV shows. It pulls from yts.to as well as the Popcorn Time TV API.

### How it works

PopcornTV works by hijacking the Trailers application on the Apple TV. In order to do this effectively we change the DNS server on the Apple TV to point to your own server. I created this application in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from.

We pull all of our Movies from [YTS](https://yts.to/) by using the API that they provide. All TV shows use the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master)

### For More Information

This readme may be outdated, but the site that can be found [here](http://popcorntv.io) is always up to date with the latest infomation and Todo lists.

### Development

Want to contribute? Great! Add the features that you want and submit a pull request! If you have a suggestion please post it on the main thread that can be found here

License
----

If you distribute a copy or make a fork of the project, you have to credit this project as source.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/ .

PopcornTV - Streaming video to an Apple TV through torrents Copyright © 2015 PopcornTV and the contributors PopcornTV is released under the GPL
