# What is PopcornTV?

PopcornTV is a simple application that allows an Apple TV to play stream Movies and TV shows directly from torrents. It pulls from yts.to as well as the Popcorn Time TV API to allow for a smooth interface and ease of use.

### How it works

PopcornTV works by hijacking the Trailers application on the Apple TV. In order to do this effectively we change the DNS server on the Apple TV to point to your own computer/server. I created this application in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from.

We pull all of our Movies from [YTS](https://yts.to/) by using the API that they provide. All TV shows use the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master)

### Preview
#### Preview Video
[Watch the latest video here! (v0.1.4a)](https://www.youtube.com/watch?v=s9R24DIXkQk)

#### Preview Images
![](http://i.imgur.com/Q8eQt73.jpg)
![](http://i.imgur.com/pW7xqmT.jpg)
![](http://i.imgur.com/uMBZnkS.png)
![](http://i.imgur.com/UXQcWfp.jpg)
![](http://i.imgur.com/OPS9vtR.jpg)
![](http://i.imgur.com/rwmXmir.png)
![](http://i.imgur.com/oD0n1NA.jpg)

### Installation

Please take a look at the Wiki for installation details [here!](https://github.com/OstlerDev/PopcornTV/wiki/How-to-Install)

### Bug Reporting
If you find a bug please let me know of it by submitting an "Issue" on the [Github page](https://github.com/OstlerDev/PopcornTV/issues). Be sure to include what you were doing, steps to reproduce the bug, and the crash log.


### What Works?

```
[X] Display Movies from yts.to
[X] Stream the movies directly from the torrents to the Apple TV
[X] Display Fanart and information about the movie including related Movies
[X] Display TV Shows and Information about them
[X] Watch Movie Trailers instantly
```

### Roadmap
Please view the [roadmap](https://github.com/OstlerDev/PopcornTV/wiki/Roadmap) for Planned features and ideas! 

### Bugs

Please take a look [here](https://github.com/OstlerDev/PopcornTV/issues) for the latest information on Bugs. Please submit all new bugs here as well.

#### Workflow
- Select Trailers application on Apple TV
- Intercept the DNS request on our server, if it is requesting 'trailers.apple.com' redirect the request to our own internal webserver, if not redirect the request to Googles Public DNS server.
- Generate XML and serve it to the Apple TV
- Once a Movie is selected to be played, use Popcorn Times streamer-server to download and stream the movie to a local port.


### Version History
```
0.1.4a - Clean up Code, Implement Certificate Generation. Initial Release
0.1.3a - Add TV Show Support (broken)
0.1.2a - Redesign UI
0.1.1a - Implement VideoAPI
0.1.0a - Initial Testing
```

### Tech

PopcornTV uses several API's and libraries.

* [NodeJS](https://nodejs.org/) - Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.
* [Popcorn Streamer Server](https://git.popcorntime.io/popcorntime/streamer-server) - Download torrents and stream them on the fly to a URL
* [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master) - Grab any and all TV shows that you may desire!
* [YTS API](https://yts.to/api) - An extensive database with over 5.6k movies.
* [PlexConnect](https://github.com/iBaa/PlexConnect) - For giving me some example source code that I used before moving to Node.js

### Development

Want to contribute? Great! Add the features that you want and submit a [pull request](https://github.com/OstlerDev/PopcornTV/pulls)! If you have a suggestion or comment, please post it on the [Github](https://github.com/OstlerDev/PopcornTV/issues/new) and tag it with "enhancement" or reply to this thread :)

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