function init() {
    const prefs = new BorderColorsPrefs();

    var accountManager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
    var accountsList = accountManager.accounts;
    for (var i = 0; i < accountsList.length; i++) {
        var nextAccount = accountsList.queryElementAt(i, Components.interfaces.nsIMsgAccount);
        var identitiesList = nextAccount.identities;
        for (var j = 0; j < identitiesList.length; j++) {
            var nextIdentity = identitiesList.queryElementAt(j, Components.interfaces.nsIMsgIdentity);
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
            newColorPicker.setAttribute("color", prefs.getColor(nextIdentity.identityName));
            newHbox.appendChild(newColorPicker);
            newHbox.appendChild(newSeparator);
            newHbox.appendChild(newLabel);
            container.appendChild(newHbox);
        }
    }

    const sizeSelector = document.getElementById('BorderWidth');
    sizeSelector.selectedIndex = prefs.getInt("borderWidth", 1) - 1;
}

function accept() {
    const prefs = new BorderColorsPrefs();

    var colorList = document.getElementById("colorSelectors").getElementsByTagName("hbox");
    for (i = 0; i < colorList.length; i++) {
        var accountId = colorList.item(i).getAttribute("id");
        var color = colorList.item(i).getElementsByTagName("colorpicker").item(0).getAttribute("color");
        prefs.setColor(accountId, color.toString());
    }
    var borderWidth = document.getElementById("BorderWidth").getAttribute("value");
    prefs.setInt("borderWidth", borderWidth);
}
