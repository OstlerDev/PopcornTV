# What is PopcornTV?

PopcornTV is a simple application that allows an Apple TV to play stream Movies and TV shows directly from torrents. It pulls from yts.to as well as the Popcorn Time TV API to allow for a smooth interface and ease of use.

### How it works

PopcornTV works by hijacking the Trailers application on the Apple TV. In order to do this effectively we change the DNS server on the Apple TV to point to your own computer/server. I created this application in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from.

We pull all of our Movies from [YTS](https://yts.to/) by using the API that they provide. All TV shows use the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master)

### Preview
#### Preview Video
[Watch the latest video here](https://www.youtube.com/watch?v=dlnwrfkbna4)! Please excuse the bad video quality, it was filmed in one take on my iPhone. I will be uploading more videos in the future if so desired

#### Preview Images
![](http://i.imgur.com/Q8eQt73.jpg)
![](http://i.imgur.com/pW7xqmT.jpg)
![](http://i.imgur.com/uMBZnkS.png)
![](http://i.imgur.com/UXQcWfp.jpg)
![](http://i.imgur.com/OPS9vtR.jpg)
![](http://i.imgur.com/rwmXmir.png)
![](http://i.imgur.com/oD0n1NA.jpg)

### Installation

Step 1. Download Popcorn TV or Clone the Repository  
Step 2. Open Terminal or the Command prompt and enter the commands below. I have only tested this on a Mac, so if there are issues on Windows or Linux please let me know so that I can update the guide!  
```sh
$ cd PopcornTV
$ sudo npm install
$ sudo node atv.js
```
Step 2.5. On the first run it will generate the certificates needed to run the application, once those are generated restart the program using:  
```sh
$ sudo node atv.js
```
Step 3. Go to your Apple TV and select the settings Application.  
Step 4. Select General > Network > "Your Network" > "Your network" again. You should end on a page that says "Wifi Configuration" at the top.   
Step 5. Go down to "Configure DNS" and set it to Manual, then enter in the local IP address of your Computer that is running PopcornTV  
Step 6. Once the DNS is set, menu out back to the "General" page.  
Step 7. Scroll down to where it says "Send Data to Apple" and select it then set it to "No"  
Step 8. Once your setting says "No", while hovering over "Send Data to Apple" (like shown in the image below) press the "Play/Pause" button on your Apple TV remote. It will open up a screen that we will use in the next window.  
![](http://i.imgur.com/ZUwdFkq.jpg)
Step 9. Select "Add Profile" then click "Ok"  
Step 10. On the "Add Profile" page it should pull up a text box. Type in "http://trailers.apple.com/trailers.cer" then click "Submit". This adds a custom profile to your Apple TV that allows SSL connections between your Apple TV and the PopcornTV Application.  

Now that you have all the tedious work out of the way, go to the Apple TV home screen and select the "Trailers" application! Browse the movies you want and select it!

### Bug Reporting
If you find a bug please let me know of it by submitting an "Issue" on the Github page. Be sure to include what you were doing, steps to reproduce the bug, and the crash log.


### What Works?

```
[X] Display Movies from yts.to
[X] Stream the movies directly from the torrents to the Apple TV
[X] Display Fanart and information about the movie including related Movies
[X] Display TV Shows and Information about them
```

### Todo's

```
[X] Add more movie libraries
[X] Redo layout
[-] Add TV Show Support (Requires work with FFMPEG & Magnet URL Bug fix)
[X] Implement Certificate Generation
[ ] Add more dynamic loading to load more then 50 results
[ ] Add VPN support(?)
[ ] Add Quality selection
[ ] Add Settings
[ ] Look into Subtitle Support
[ ] Add Anime Support
[ ] Add Option to either Delete or Keep Videos Downloaded
```

### Bugs

```
[X] Unable to stream same torrent after leaving the stream
[X] Streamer unable to stream Youtube videos
[X] Related Movies not displaying
[ ] TV Magnet Links do not work with streamer-server
[ ] Unable to stream low seeded movies because of Apple TV Timeout
[ ] Unable to stream TV Shows that are not in .mp4 format.
[ ] TVPrePlay Season poster art
```

### Ideas
```
[ ] Switch to SSL Only
[ ] Add Current time and finish time to display while the movie is playing
[ ] Add "Watch Later" to save movies and TV shows that you either want to subscribe to or watch at a later date
```

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

### Why is it not released yet?

I have decided to hold off on the initial release of this software until it is actually ready for release. Currently there are many features missing that I want to get working as well as some bugs that I wish to smash before a release from me.

### Development

Want to contribute? Great! Add the features that you want and submit a pull request! If you have a suggestion or comment, please post on this thread or email me at: hello@popcorntv.io

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