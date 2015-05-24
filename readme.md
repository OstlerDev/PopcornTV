# PopcornTV

PopcornTV is a simple application that allows an Apple TV to play lots of Movies and TV shows. It pulls from yts.to as well as the Popcorn Time TV API.

### How it works

PopcornTV works by hijacking the Trailers application on the Apple TV. In order to do this effectively we change the DNS server on the Apple TV to point to your own server. I created this application in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from.

We pull all of our Movies from [YTS](https://yts.to/) by using the API that they provide. All TV shows use the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master)

#### Workflow
  - Select Trailers application on Apple TV
  - Intercept the DNS request on our server, if it is requesting 'trailers.apple.com' redirect the request to our own internal webserver, if not redirect the request to Googles Public DNS server.
  - Generate XML and serve it to the Apple TV
  - Once a Movie is selected to be played, use Popcorn Times streamer-server to download and stream the movie to a local port.


### Version
0.1.1

### Tech

PopcornTV uses several API's and libraries.

* [NodeJS](https://nodejs.org/) - Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.
* [Popcorn Streamer Server](https://git.popcorntime.io/popcorntime/streamer-server) - Download torrents and stream them on the fly to a URL
* [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master) - Grab any and all TV shows that you may desire!
* [YTS API](https://yts.to/api) - An extensive database with over 5.6k movies.

### Installation

Before we can install PopcornTV we need to make sure that NodeJS is installed. Once you get that installed and ready we can proceed! Once you have 

```sh
$ git clone [git-repo-url] PopcornTV
$ cd PopcornTV
$ npm install
$ node atv.js
```
### Todo's

```
[ ] Add more movie libraries
[ ] Add more dynamic loading to load more then 50 results
[ ] Add TV Show Support
[ ] Add Settings
```

### Development

Want to contribute? Great! Add the features that you want and submit a pull request! If you have a suggestion please post it on the main thread that can be found here

License
----

None yet! Thus the private repo :3

