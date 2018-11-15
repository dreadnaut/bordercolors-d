function init() {
    var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
    var properties = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    var myProperties = properties.getBranch("extensions.borderColorsGT.");
    var accountManager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
    var accountsList = accountManager.accounts;
    for (var i = 0; i < accountsList.length; i++) {
        var nextAccount = accountsList.queryElementAt(i, Components.interfaces.nsIMsgAccount);
        var identitiesList = nextAccount.identities;
        for (var j = 0; j < identitiesList.length; j++) {
            var nextIdentity = identitiesList.queryElementAt(j, Components.interfaces.nsIMsgIdentity);
            var identityProperty = myProperties.getChildList("colors." + nextIdentity.identityName);
            if (identityProperty.length === 0) {
                myProperties.setCharPref("colors." + nextIdentity.identityName, "#FFFFFF");
            }
            var newHbox = document.createElement("hbox");
            var newLabel = document.createElement("label");
            var newSeparator = document.createElement("separator");
            var newColorPicker = document.createElement("colorpicker");
            newLabel.setAttribute("value", nextIdentity.identityName);
            newHbox.setAttribute("align", "center");
            newHbox.setAttribute("id", nextIdentity.identityName);
            newSeparator.setAttribute("orient", "vertical");
            var container = document.getElementById('colorSelectors');
            newColorPicker.setAttribute("type", "button");
            newColorPicker.setAttribute("color", myProperties.getCharPref("colors." + nextIdentity.identityName));
            newHbox.appendChild(newColorPicker);
            newHbox.appendChild(newSeparator);
            newHbox.appendChild(newLabel);
            container.appendChild(newHbox);
        }
    }
    var borderWidth = myProperties.getChildList("borderWidth");
    size = document.getElementById('BorderWidth');
    if (borderWidth.length === 0) {
        size.selectedIndex = 0;
    } else {
        size.selectedIndex = myProperties.getCharPref("borderWidth") - 1;
    }
}

function accept() {
    var properties = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    var myProperties = properties.getBranch("extensions.borderColorsGT.");
    var colorList = document.getElementById("colorSelectors").getElementsByTagName("hbox");
    for (i = 0; i < colorList.length; i++) {
        var accountId = colorList.item(i).getAttribute("id");
        var color = colorList.item(i).getElementsByTagName("colorpicker").item(0).getAttribute("color");
        myProperties.setCharPref("colors." + accountId, color.toString());
    }
    var borderWidth = document.getElementById("BorderWidth").getAttribute("value");
    myProperties.setCharPref("borderWidth", borderWidth);
}
