# What is PopcornTV?

PopcornTV is a simple application that allows an Apple TV to play stream Movies and TV shows directly from torrents. It pulls from [yts.to](yts.to) as well as the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master) to allow users to watch most Movies and TV Shows Instantly.

## How it works

PopcornTV works by hijacking the Trailers application on the Apple TV. In order to do this effectively we change the DNS server on the Apple TV to point to your own computer/server. This application was initially created in 24 hours as a proof of concept that you are able to stream torrents directly to an Apple TV by generating valid XML for it to read from. It has since grown into a much more full fledged application.

We pull all of our Movies from [YTS](https://yts.to/) by using the API that they provide. All TV shows use the [Popcorn Time TV API](https://git.popcorntime.io/popcorntime/eztv-api/tree/master)

## Preview
### Preview Video
[Watch a video preview here (v0.1.4a)](https://www.youtube.com/watch?v=s9R24DIXkQk)

### Preview Images
![](http://i.imgur.com/7dB9zGp.jpg)
![](http://i.imgur.com/vigyOsZ.jpg)
![](http://i.imgur.com/296kywf.jpg)
![](http://i.imgur.com/S0yrFHo.jpg)
[More Screenshots](http://imgur.com/a/bKobV)

## Installation

Please take a look at the Wiki for installation details [here!](https://github.com/OstlerDev/PopcornTV/wiki/How-to-Install)

## Bugs & Bug Reporting
Before reporting a bug, please take a look at our [Bug Tracker](https://github.com/OstlerDev/PopcornTV/issues) for current known issues, if you cannot find your bug on there, please open up a new bug report by following [these steps.](https://github.com/OstlerDev/PopcornTV/wiki/How-to-report-an-issue)


## Version History
- [0.1.5 - Quality Selection, Subtitles, Favorites](https://github.com/OstlerDev/PopcornTV/releases/tag/v0.1.5)
- [0.1.4 - Clean up Code, Implement Certificate Generation. Initial Release](https://github.com/OstlerDev/PopcornTV/releases/tag/v0.1.4)
- 0.1.3 - Add TV Show Support (broken)
- 0.1.2 - Redesign UI
- 0.1.1 - Implement VideoAPI
- 0.1.0 - Initial Testing

## IRC

Have a burning question that you need answered, or just want to chat with the developers? The developers and some bug testers are hanging on IRC at #PopcornTV on Freenode ([Click here if you do not have an IRC Client](http://webchat.freenode.net/?channels=PopcornTV)).

We do always reply, though sometimes it takes a little longer to respond if we are watching movies or coding.


## Donations

![Donate Bitcoin](https://blockchain.info/Resources/buttons/donate_64.png)  
Do to the request of a few users I have setup a Bitcoin wallet to accept donations, if you wish to donate, send Bitcoin to the address below. Any amount, large or small really does help :)  
![](http://i.imgur.com/gX80gAQ.png)  
Address: 1MyQuMeJuzrG2XZmot4vub6WKVHnan5N3v  

Don't know how to buy or send Bitcoin? Take a look [here (how to buy),](https://www.coinbase.com/buy-bitcoin) and [here (how to send).](https://support.coinbase.com/customer/portal/articles/971437-how-do-i-send-bitcoin-to-somebody-else-)  
(p.s. I cannot accept Paypal donations because of legal reasons, sorry!)  

## Development

Want to contribute? Great! Add the features that you want and submit a [pull request](https://github.com/OstlerDev/PopcornTV/pulls)! 

Don't know how to code but still want to help? We need help with our Wiki, as well as help Bug Testing. If you still do not know exactly what to help with, join us on the IRC and we will give you a few ideas!

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