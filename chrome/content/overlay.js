window.addEventListener("compose-window-init", function() {
    colorBorder();
}, true);

var accountSelector = document.getElementById("msgIdentity");
accountSelector.setAttribute("oncommand", "colorBorder();");

function colorBorder() {
    const prefs = new BorderColorsPrefs();

    LoadIdentity(false);
    //Retrieve the panel
    var writingPanel = document.getElementById("headers-box").parentNode;
    //Apply the border
    var selectedIdentity = accountSelector.label;

    var BWidth = prefs.getInt("borderWidth", 1);

    if (prefs.hasColor(selectedIdentity)) {
        writingPanel.setAttribute("style", "border: " + BWidth + "px solid  " + prefs.getColor(selectedIdentity));
    } else {
        writingPanel.setAttribute("style", "border: " + BWidth + "px dashed gray");
    }
}
