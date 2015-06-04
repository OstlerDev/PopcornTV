// Dependency: utils.js
/*
 *   Credits for original settings.js goes to PlexConnect. The original file can be found here: https://github.com/iBaa/PlexConnect/blob/master/assets/js/settings.js
 */


/*
 * Update Settings
 */
function toggleSettings(opt, template) 
{
  // read new XML
  var url = "altersettings.xml"+ opt + "&UDID="+atv.device.udid
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  doc=req.responseXML;
  
  // get "opt" element of displayed XML
  var dispval = document.getElementById(opt).getElementByTagName("rightLabel");
  if (!dispval) // No rightlabel must be a checkmark :)
  {
    mainMenuItem = document.getElementById(opt);
    newMenuItem = doc.getElementById(opt);
    var mainAccessories = mainMenuItem.getElementByTagName("accessories");
    var newAccessories = newMenuItem.getElementByTagName("accessories");
    if ( mainAccessories ) mainAccessories.removeFromParent();
    if ( newAccessories )
    {
      accessories = document.makeElementNamed("accessories");
      var checkmark = document.makeElementNamed("checkMark");
      accessories.appendChild(checkmark);
      mainMenuItem.appendChild(accessories);
    }
    return;
  }

    // get "opt" element of fresh XML
  var newval = doc.getElementById(opt).getElementByTagName("rightLabel");
  if (!newval) return undefined;  // error - element not found
  
  log("new setting - "+opt+"="+newval.textContent);
    
  // push new value to display
  dispval.textContent = newval.textContent;
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
    log('Saving Settings file');
  }
}