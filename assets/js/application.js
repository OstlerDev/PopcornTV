atv.config = { 
    "doesJavaScriptLoadRoot": true,
    "DEBUG_LEVEL": 4,
    "ROOT_URL": "http://trailers.apple.com/appletv/index.xml"
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