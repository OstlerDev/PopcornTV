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

function progressRefresh(){
  var url = "http://trailers.apple.com/progress.json?UDID=" + atv.device.udid;
  var req = new XMLHttpRequest();
  req.open('GET',unescape(url), false);
  req.send();

  var progress = JSON.parse(req.responseText);

  log(progress.downloaded);

  document.getElementById('menuToChange').getElementByTagName('label').textContent = '[' + progress.progress.toFixed(0) + '%] ' + (progress.downloaded / 1024 / 1024).toFixed(2) + 'MB - ' + (progress.downloadSpeed / 1024 / 1024).toFixed(2) + 'MB/s';
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