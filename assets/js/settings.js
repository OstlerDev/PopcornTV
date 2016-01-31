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
  } else if (setting == 'tvquality'){
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
  } else if (setting == 'subSize'){
     switch(curSetting){
      case '25':
        var newSetting = '50';
        break;
      case '50':
        var newSetting = '75';
        break;
      case '75':
        var newSetting = '100';
        break;
      case '100':
        var newSetting = '125';
        break;
      case '125':
        var newSetting = '150';
        break;
      case '150':
        var newSetting = '25';
        break;
      default:
        var newSetting = '100';
    }
  } else if (setting == 'keep'){
    if (curSetting == 'Off'){
      var newSetting = 'On';
    } else {
      var newSetting = 'Off';
    }
  } else if (setting == 'subtitle'){
    if (curSetting == 'Off'){
      var newSetting = 'Off';
    } else {
      var newSetting = 'Off';
    }
  } else if (setting == 'tvendpoint'){
    if (curSetting == 'popcornwvnbg7jev.onion.to'){
      var newSetting = 'popcorntime.ws/api/eztv/';
    } else {
      var newSetting = 'popcornwvnbg7jev.onion.to';
    }
  }
  // read new XML
  var url = "http://trailers.apple.com/altersetting.xml?setting="+ setting + '&newSetting=' + newSetting + "&UDID="+atv.device.udid
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();

  var doc = req.responseXML;

  var displayValue = document.getElementById(setting).getElementByTagName("rightLabel");
  var newValue = doc.getElementById(setting).getElementByTagName("rightLabel");
  if (!newValue) return undefined;  // error - element not found
  
  displayValue.textContent = newValue.textContent;

  var newURL = doc.getElementById(setting).getAttribute("onSelect");
  if (!newURL) return undefined;  // error - element not found
  
  document.getElementById(setting).setAttribute("onSelect", newURL);
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
