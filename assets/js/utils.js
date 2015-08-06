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
  page = parseInt(page);

  // load json for type
  var url = "http://trailers.apple.com/more.json?UDID=" + atv.device.udid + "&type=" + type + "&sort_by=" + sort_by + "&amount=50" + "&page=" + page;
  var req = new XMLHttpRequest();
  req.open('GET',unescape(url), false);
  req.send();

  var response = JSON.parse(req.responseText);

  // select items
  var items = document.getElementById("items");
  var morePoster = document.getElementById((page-1)*50);

  // add all items into the DOM
  for (var i = 0; i < response.length; i++) {
    if (type == "tv"){
      response[i].id = response[i].imdb_id;
      response[i].year = response[i].year + ' | ' + response[i].num_seasons + ' Seasons';
      response[i].medium_cover_image = response[i].images.poster;
    }
    var newPoster = document.makeElementNamed("moviePoster");

    newPoster.setAttribute("id", i+(50*(page-1)));
    newPoster.setAttribute('alwaysShowTitles', 'true');
    if (type == "movie"){
      newPoster.setAttribute('onPlay', 'addUDIDtoQuery("http://trailers.apple.com/MoviePrePlay.xml?torrentID=' + response[i].id + '")');
      newPoster.setAttribute('onSelect', 'addUDIDtoQuery("http://trailers.apple.com/MoviePrePlay.xml?torrentID=' + response[i].id + '")');
    } else if (type == "tv") {    
      //var url = 'http://trailers.apple.com/seasons.xml?imdb=' + shows[i].imdb_id + '&title=' + shows[i].title.replace(/ /g,"%20");
      newPoster.setAttribute('onPlay', 'addUDIDtoQuery("http://trailers.apple.com/seasons.xml?imdb=' + response[i].imdb_id  + '&title=' + response[i].title.replace(/ /g,"%20") + '")');
      newPoster.setAttribute('onSelect', 'addUDIDtoQuery("http://trailers.apple.com/seasons.xml?imdb=' + response[i].imdb_id  + '&title=' + response[i].title.replace(/ /g,"%20") + '")');
    }
    newPoster.setAttribute('onHoldSelect', 'scrobbleMenu("http://trailers.apple.com/scrobble.xml?type=' + type + '&id=' + response[i].id + '")');
    
    var title = document.makeElementNamed('title');
    title.textContent = response[i].title;
    newPoster.appendChild(title);
    var subtitle = document.makeElementNamed('subtitle');
    subtitle.textContent = response[i].year;
    newPoster.appendChild(subtitle);
    var image = document.makeElementNamed('image');
    image.textContent = response[i].medium_cover_image;
    newPoster.appendChild(image);
    var defaultImage = document.makeElementNamed('defaultImage');
    defaultImage.textContent = "resource://Poster.png";
    newPoster.appendChild(defaultImage);

    items.appendChild(newPoster);
  };

  morePoster.setAttribute('id', (page*50));
  page += 1;
  morePoster.setAttribute('onPlay', 'loadMore("' + type + '", "' + sort_by + '", "' + page + '")');
  morePoster.setAttribute('onSelect', 'loadMore("' + type + '", "' + sort_by + '", "' + page + '")');
  items.appendChild(morePoster);
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