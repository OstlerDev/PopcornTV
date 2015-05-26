// Dependency: utils.js


// page internal storage
var navbarCurrentItemId = null;  // is there a clean way to grab unbuffered current index in reloadNavbar()?


/*
 * navigation bar - dynamic loading of menu pages
 */
function loadMenuPage(event)
{
    navbarCurrentItemId = event.navigationItemId;
    
    var item = document.getElementById(navbarCurrentItemId);
    var url = item.getElementByTagName('url').textContent;
    
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        try
        {
            if(req.readyState == 4)
            {
                doc = req.responseXML
                if(event) event.success(doc);
                else atv.loadXML(doc);
            }
        }
        catch(e)
        {
            req.abort();
        }
    }
    req.open('GET', url, true);
    req.send();
};
