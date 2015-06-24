// settings for atv.player - communicated in PlayVideo/videoPlayerSettings
var subtitleSize;

// metadata - communicated in PlayVideo/myMetadata
var mediaURL;
var duration, partDuration;  // milli-sec (int)
var subtitleURL;

// information for atv.player - computed internally to application.js
var lastReportedTime = -1;
var remainingTime = 0;
var startTime = 0;  // milli-sec

atv.config = { 
    "doesJavaScriptLoadRoot": true,
    "DEBUG_LEVEL": 4,
    "ROOT_URL": "http://trailers.apple.com/appletv/index.xml"
};

/*
 * ATVLogger
 */
function log(msg, level)
{
    level = level || 'Debug';
    var req = new XMLHttpRequest();
    var url = "http://trailers.apple.com/log.xml?level=" + level.toString() + "&log=" + encodeURIComponent(msg);
    req.open('GET', url, true);
    req.send();
};

atv.onAppEntry = function()
{
    atv.loadURL('http://trailers.apple.com/navbar.xml');
}

atv.onScreensaverPhotosSelectionEntry = function() {
    // The collection object is passed to atv.onExecuteQuery as parameters to load Images.
    // Currently only one collection is able to be passed.
    var collection = {
        "id": "trailers-posters",
        "name": "Trailer Posters",
        "type": "collection"
    };
    atv.setScreensaverPhotosCollection(collection);
}
atv.onScreensaverPhotosSelectionExit = function() {
}
atv.onExecuteQuery = function(query, callback) {
  var requestedNumImages = query.length;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://trailers.apple.com/ScreenSaver.json?UDID=" + atv.device.udid + "&length=" + requestedNumImages, false);
  xhr.send();

  var ScreensaverPhotos = JSON.parse(xhr.responseText);
  if (ScreensaverPhotos.length > requestedNumImages) {
    ScreensaverPhotos = ScreensaverPhotos.slice(0, requestedNumImages);
  }
  callback.success(ScreensaverPhotos);
}

atv.player.didStopPlaying = function()
{ 
  // Kill the torrent stream session.
  var url = 'http://trailers.apple.com/StopStream.xml';
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
};

 /*
  * Handle ATV player time change
  */
atv.player.playerTimeDidChange = function(time)
{
  remainingTime = Math.round((duration / 1000) - time);
  var thisReportTime = Math.round(time*1000)
  
  // correct thisReportTime with startTime if stacked media part
  thisReportTime += startTime;
  
  if (subtitle)
      updateSubtitle(thisReportTime);
};

/*
 *
 * Subtitle handling/rendering
 *
 */
var subtitleView = {'shadowRB': [], 'subtitle': []};
var subtitle = [];
var subtitlePos = 0;
var screenFrame = atv.device.screenFrame;
var containerView = new atv.View();
// constants
var subtitleMaxLines = 4;


function initSubtitleView()
{
  var width = screenFrame.width;
  var height = screenFrame.height * 1/14 * subtitleSize/100;  // line height: 1/14 seems to fit to 40pt font
  
  var xOffset = screenFrame.width * 1/640;  // offset for black letter shadow/border/background
  var yOffset = screenFrame.height * 1/360;
  
  // Setup the subtitle frames
  for (var i=0;i<subtitleMaxLines;i++)
  {
    // shadow right bottom
    subtitleView['shadowRB'][i] = new atv.TextView();
    subtitleView['shadowRB'][i].backgroundColor = { red: 0, blue: 0, green: 0, alpha: 0.0};
    subtitleView['shadowRB'][i].frame = { "x": screenFrame.x + xOffset,
                                          "y": screenFrame.y - yOffset + (height * (subtitleMaxLines-i-0.5)),
                                          "width": width, "height": height
                                        };
    // subtitle
    subtitleView['subtitle'][i] = new atv.TextView();
    subtitleView['subtitle'][i].backgroundColor = { red: 0, blue: 0, green: 0, alpha: 0.0};
    subtitleView['subtitle'][i].frame = { "x": screenFrame.x,
                                          "y": screenFrame.y + (height * (subtitleMaxLines-i-0.5)),
                                          "width": width, "height": height
                                        };
  }
  
  return subtitleView;
}

function updateSubtitle(time)
{
    // rewind, if needed
    while(subtitlePos>0 && time<subtitle.Timestamp[subtitlePos].time)
    {
        subtitlePos--;
    }
    // forward
    while(subtitlePos<subtitle.Timestamp.length-1 && time>subtitle.Timestamp[subtitlePos+1].time)
    {
        subtitlePos++;
    }
    // current subtitle to show: subtitle.Timestamp[subtitlePos]
    
    // get number of lines (max subtitleMaxLines)
    var lines
    if (subtitle.Timestamp[subtitlePos].Line)
        lines = Math.min(subtitle.Timestamp[subtitlePos].Line.length, subtitleMaxLines);
    else
        lines = 0;
    
    // update subtitleView[]
    var i_view=0;
    for (var i=0;i<subtitleMaxLines-lines;i++)  // fill empty lines on top
    {
        subtitleView['shadowRB'][i_view].attributedString = {
            string: "",
            attributes: { pointSize: 40.0 * subtitleSize/100,
                          color: {red: 0, blue: 0, green: 0, alpha: 1.0}
                        }
        };
        subtitleView['subtitle'][i_view].attributedString = {
            string: "",
            attributes: { pointSize: 40.0 * subtitleSize/100,
                          color: {red: 1, blue: 1, green: 1, alpha: 1.0}
                        }
        };
        i_view++;
    }
    for (var i=0;i<lines;i++)  // fill used lines
    {
        subtitleView['shadowRB'][i_view].attributedString = {
            string: subtitle.Timestamp[subtitlePos].Line[i].text,
            attributes: { pointSize: 40.0 * subtitleSize/100,
                          color: {red: 0, blue: 0, green: 0, alpha: 1.0},
                          weight: subtitle.Timestamp[subtitlePos].Line[i].weight || 'normal',
                          alignment: "center",
                          breakMode: "clip"
                        }
        };
        subtitleView['subtitle'][i_view].attributedString = {
            string: subtitle.Timestamp[subtitlePos].Line[i].text,
            attributes: { pointSize: 40.0 * subtitleSize/100,
                          color: {red: 1, blue: 1, green: 1, alpha: 1.0},
                          weight: subtitle.Timestamp[subtitlePos].Line[i].weight || 'normal',
                          alignment: "center",
                          breakMode: "clip"
                        }
        };
        i_view++;
    }
    
    //if (time<10000)
      //log("updateSubtitle done, subtitlePos="+subtitlePos);
}

function getMetadata()
{
    // update mediaURL and myMetadata
    mediaURL = atv.player.asset.getTextContent('mediaURL');
    
    var metadata = atv.player.asset.getElementByTagName('myMetadata');
    if (metadata != null)
    {
        // todo: subtitle handling with playlists/stacked media
        subtitleURL = metadata.getTextContent('subtitleURL');
        log('updateMetadata/getMetadata done');
    }
    log('updateMetadata done');
}

/*
 * Handle ATV playback will start
 */
atv.player.willStartPlaying = function()
{
    // init timer vars
    lastReportedTime = -1;
    lastTranscoderPingTime = -1;
    remainingTime = 0;  // reset remaining time
    startTime = 0;  // starting time for stacked media subsequent parts
    //todo: work <bookmarkTime> and fix "resume" for stacked media
    
    // get baseURL, OSD settings, ...
    var videoPlayerSettings = atv.player.asset.getElementByTagName('videoPlayerSettings');
    if (videoPlayerSettings != null)
    {
        subtitleSize = videoPlayerSettings.getTextContent('subtitleSize');
        log('willStartPlaying/getVideoPlayerSettings done');
    }
    
    // mediaURL and myMetadata
    getMetadata();
    
  // load subtitle - aTV subtitle JSON
  subtitle = [];
  subtitlePos = 0;
  // when... not transcoding or
  //         transcoding and PMS skips subtitle (dontBurnIn)
  log("subtitleURL: "+subtitleURL);
    
  // read subtitle stream
  var req = new XMLHttpRequest();
  req.onreadystatechange = function()
  {
    if (req.readyState==4)  // 4: request is complete
    {
      subtitle = JSON.parse(req.responseText);
      log(subtitle);
    }
  };
  req.open('GET', subtitleURL, true);  // true: asynchronous
  req.send();
  log('willStartPlaying/parseSubtitleJSON done');
  
  var Views = [];
  
  // create subtitle view
  subtitleView = initSubtitleView();
  for (var i=0;i<subtitleMaxLines;i++)
  {
      Views.push(subtitleView['shadowRB'][i]);
      Views.push(subtitleView['subtitle'][i]);
  }
  log('willStartPlaying/createSubtitleView done');
  
  // Paint the views on Screen.
  containerView.subviews = Views;
  atv.player.overlay = containerView;

  log('willStartPlaying done');
};
// atv.Element extensions
if( atv.Element ) {
  atv.Element.prototype.getElementsByTagName = function(tagName) {
    return this.ownerDocument.evaluateXPath("descendant::" + tagName, this);
  }

  atv.Element.prototype.getElementByTagName = function(tagName) {
    var elements = this.getElementsByTagName(tagName);
    if ( elements && elements.length > 0 ) {
      return elements[0];
    }
    return undefined;
  }

    // getTextContent - return empty string if node not existing.
    atv.Element.prototype.getTextContent = function(tagName) {
        var element = this.getElementByTagName(tagName);
        if (element && element.textContent)
            return element.textContent;
        else
            return '';
    }
}