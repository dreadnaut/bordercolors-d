const borderColorsPrefs = new BorderColorsPrefs();

// apply border when the composer window first opens
window.addEventListener("compose-window-init", colorBorder, true);

// apply border when the user switches identity
document.getElementById("msgIdentity").addEventListener("command", colorBorder);


function colorBorder() {
    applyIdentityBorder(
        document.getElementById("msgIdentity").label
    );
}

function applyIdentityBorder(identity) {
    const isDefined = borderColorsPrefs.hasColor(identity);

    // Prepare border attributes
    const color = isDefined ? borderColorsPrefs.getColor(identity) : "gray";
    const style = isDefined ? "solid" : "dashed";
    const width = borderColorsPrefs.getInt("borderWidth", 1) + "px";

    // Apply the border
    var writingPanel = document.getElementById("headers-box").parentNode;
    writingPanel.setAttribute("style", `border: ${width} ${style} ${color}`);
}
