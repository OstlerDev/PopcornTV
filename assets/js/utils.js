/*

Credits for Utils.js goes to PlexConnect. The original file can be found here: https://github.com/iBaa/PlexConnect/blob/master/assets/js/utils.js

*/
// atv.Document extensions
if( atv.Document ) {
    atv.Document.prototype.getElementById = function(id) {
        var elements = this.evaluateXPath("//*[@id='" + id + "']", this);
        if ( elements && elements.length > 0 ) {
            return elements[0];
        }
        return undefined;
    }   
}


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
}


// string extension: format()
// see http://stackoverflow.com/a/4673436
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}


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

/*
 * Load More Results
 */
function loadMore(type, sort_by, page){

  // load json for type
  var json = {};
  if (type == "movie"){
    
  }


    var items = document.getElementById("items");
    var newPoster = document.makeElementNamed("moviePoster");

    newPoster.setAttribute("id", "50");
    newPoster.setAttribute('alwaysShowTitles', 'true');
    newPoster.setAttribute('onPlay', 'addUDIDtoQuery("http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=4212")');
    newPoster.setAttribute('onSelect', 'addUDIDtoQuery("http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=4212")');
    newPoster.setAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=movie&id=http://trailers.apple.com/Movies/MoviePrePlay.xml?torrentID=4212")');
    
    var title = document.makeElementNamed('title');
    title.textContent = "Test";
    newPoster.appendChild(title);
    var subtitle = document.makeElementNamed('subtitle');
    subtitle.textContent = "Test";
    newPoster.appendChild(subtitle);
    var image = document.makeElementNamed('image');
    image.textContent = "https://s.ynet.io/assets/images/movies/Edge_of_Tomorrow_2014/medium-cover.jpg";
    newPoster.appendChild(image);
    var defaultImage = document.makeElementNamed('defaultImage');
    defaultImage.textContent = "resource://Poster.png";
    newPoster.appendChild(defaultImage);

    items.appendChild(newPoster);
}

/*
 * ScrobbleMenu
 */
 function scrobbleMenu(url)
{
  fv = atv.device.softwareVersion.split(".");
  firmVer = fv[0] + "." + fv[1];
  if (parseFloat(firmVer) < 6.0)
  {
    // firmware <6.0
    // load standard scrobble menu
    atv.loadURL(url);
  }
  else
  {
    // firmware >=6.0
    // load scrobble menu xml
    // parse the xml and build a popup context menu 
    var url = url + "&UDID="+atv.device.udid
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
      try
      {
        if(req.readyState == 4)
        {
          xml = req.responseText;
          if(xml.indexOf('popUpMenu') !== -1)
          {
            xmlDoc = atv.parseXML(xml);
            atv.contextMenu.load(xmlDoc);
          }
          else
          {
            xmlDoc = atv.parseXML(xml);
            atv.loadXML(xmlDoc);
          }
          xmlDoc = atv.parseXML(xml);
          atv.contextMenu.load(xmlDoc);
        } 
      }
      catch(e)
      {
        req.abort();
      }
    }
    
    req.open('GET',unescape(url), false);
    req.send();
  }
}

/*
 * Add UDID to URL
 */
function addUDID(url)
{
  fv = atv.device.softwareVersion.split(".");
  var url = url + "?UDID=" + atv.device.udid;
  atv.loadURL(url);
}

/*
 * Add UDID to URL when there are already other query strings.
 */
function addUDIDtoQuery(url)
{
  fv = atv.device.softwareVersion.split(".");
  var url = url + "&UDID=" + atv.device.udid;
  atv.loadURL(url);
}

/*
 * xml updater Major Hack :)
 */
function updateContextXML()
{
  xmlstr = '<atv><body><optionList id="fakeUpdater" autoSelectSingleItem="true"> \
            <items><oneLineMenuItem id="0" onSelect="atv.unloadPage()"><label></label> \
            </oneLineMenuItem></items></optionList></body></atv>';
  xmlDoc = atv.parseXML(xmlstr);
  atv.loadXML(xmlDoc);
}


function errorXML(title, err){
  errorXML = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<atv>\n\
    <body>\n\
        <dialog id="com.sample.error-dialog">\n\
            <title>' + title + '</title>\n\
            <description>' + err + '</description>\n\
        </dialog>\n\
    </body>\n\
</atv>\n\
';
  xmlDoc = atv.parseXML(errorXML);
  atv.loadXML(xmlDoc);
}