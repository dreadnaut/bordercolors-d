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

    const borderStyle = `${width} ${style} ${color}`;
    const frameStyle = borderColorsPrefs.getInt("frameStyle", 0);

    // Apply the border
    switch (frameStyle) {
        // case 0: "full window" handled as default, at the bottom
        case 1: // full window, top and bottom
            document.getElementById("headers-box").parentNode
                .setAttribute("style", `border-top: ${borderStyle}; border-bottom: ${borderStyle};`);
            break;
        case 2: // headers
            document.getElementById("headers-box")
                .setAttribute("style", `border: ${borderStyle}; -moz-appearance: none;`);
            break;
        case 3: // headers, top and bottom
            document.getElementById("headers-box")
                .setAttribute("style", `border-top: ${borderStyle}; border-bottom: ${borderStyle};`
                    + "-moz-appearance: none; -moz-border-top-colors: unset;");
            break;
        case 4: // text area
            document.getElementById("appcontent")
                .setAttribute("style", `border: ${borderStyle};`);
            break;
        case 5: // textarea, top and bottom
            document.getElementById("appcontent")
                .setAttribute("style", `border-top: ${borderStyle}; border-bottom: ${borderStyle};`);
            break;
        case 6: // text area, top
            document.getElementById("appcontent")
                .setAttribute("style", `border-top: ${borderStyle};`);
            break;
        case 7: // textarea, gradient on the left side
            document.getElementById("content-frame")
                .setAttribute("style", `border-left: ${borderStyle}; border-image: linear-gradient(to bottom, ${color}, white 50%) 1 100%;`);
            break;
        case 8: // textarea, gradient on the right side
            document.getElementById("content-frame")
                .setAttribute("style", `border-right: ${borderStyle}; border-image: linear-gradient(to bottom, ${color}, white 50%) 1 100%;`);
            break;
        default: // case 0: full window
            document.getElementById("headers-box").parentNode
                .setAttribute("style", `border: ${borderStyle};`);
    }
}
