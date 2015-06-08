// Dependency: utils.js
/*
 *   Credits for original settings.js goes to PlexConnect. The original file can be found here: https://github.com/iBaa/PlexConnect/blob/master/assets/js/settings.js
 */


/*
 * Update Settings
 */
function toggleSetting(setting, curSetting) 
{
  if (setting == 'quality'){
    switch(curSetting){
      case '480p':
        var newSetting = '720p';
        break;
      case '720p':
        var newSetting = '1080p';
        break;
      case '1080p':
        var newSetting = '3D';
        break;
      case '3D':
        var newSetting = '480p';
        break;
      default:
        var newSetting = '720p';
    }
  } else if (setting == 'fanart'){
    if (curSetting == 'On'){
      var newSetting = 'Off';
    } else {
      var newSetting = 'On';
    }
  } else if (setting == 'subtitle'){
    if (curSetting == 'Off'){
      var newSetting = 'On';
    } else {
      var newSetting = 'Off';
    }
  }
  // read new XML
  var url = "http://trailers.apple.com/altersetting.xml?setting="+ setting + '&newSetting=' + newSetting + "&UDID="+atv.device.udid
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  doc=req.responseXML;
  
  atv.loadAndSwapXML(doc);
};

/* 
 *  Save settings
 */
atv.onPageUnload = function(pageID) 
{
  if (pageID == 'SettingsPage')
  {
    var url = "SaveSettings.xml" 
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
  }
}