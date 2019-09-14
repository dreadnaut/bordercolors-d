const borderColorsPrefs = new BorderColorsPrefs();


function onLoad() {
    var colorSelectors = document.getElementById('colorSelectors');
    getAllIdentities()
        .map((name) => createColorSelector(name, borderColorsPrefs.getColor(name)))
        .map((row) => colorSelectors.appendChild(row));

    const sizeSelector = document.getElementById('BorderWidth');
    sizeSelector.selectedIndex = borderColorsPrefs.getInt("borderWidth", 1) - 1;

    const frameSelector = document.getElementById('FrameStyle');
    frameSelector.selectedIndex = borderColorsPrefs.getInt('frameStyle', 0);

    document.addEventListener("dialogaccept", (event) => onAccept());
}

function onAccept() {
    var colorList = document.getElementById("colorSelectors").getElementsByTagName("hbox");
    for (i = 0; i < colorList.length; i++) {
        var accountId = colorList.item(i).getAttribute("id");
        var colorPicker = colorList.item(i).getElementsByTagName("input").item(0);
        var color = colorPicker.value;
        if (color != "transparent") {
            borderColorsPrefs.setColor(accountId, color.toString());
        }
    }

    const borderWidth = document.getElementById("BorderWidth").getAttribute("value");
    borderColorsPrefs.setInt("borderWidth", borderWidth);

    const frameStyle = document.getElementById("FrameStyle").getAttribute("value");
    borderColorsPrefs.setInt("frameStyle", frameStyle);
}

function getAllIdentities() {
    const accountManager = Components
        .classes["@mozilla.org/messenger/account-manager;1"]
        .getService(Components.interfaces.nsIMsgAccountManager);

    const names = [];

    for (let account of elementsOf(accountManager.accounts, 'nsIMsgAccount')) {
        for (let identity of elementsOf(account.identities, 'nsIMsgIdentity')) {
            names.push(identity.identityName);
        }
    }

    return names;
}

function* elementsOf(collection, itemType) {
    for (let i = 0; i < collection.length; i++) {
        yield collection.queryElementAt(i, Components.interfaces[itemType]);
    }
}

function createColorSelector(identity, color) {
    var picker = document.createElementNS("http://www.w3.org/1999/xhtml", "input");
    picker.type = "color";
    picker.value= color;

    var separator = document.createElement("separator");
    separator.setAttribute("orient", "vertical");

    var label = document.createElement("label");
    label.setAttribute("value", identity);

    var row = document.createElement("hbox");
    row.setAttribute("align", "center");
    row.setAttribute("id", identity);
    row.appendChild(picker);
    row.appendChild(separator);
    row.appendChild(label);

    return row;
}
