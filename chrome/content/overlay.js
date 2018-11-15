  window.addEventListener("compose-window-init", function() {
		colorBorder();
	}, true);

var accountSelector = document.getElementById("msgIdentity");
accountSelector.setAttribute("oncommand","colorBorder();");

function colorBorder(){
	LoadIdentity(false);
	//Retrieve the panel
	var writingPanel = document.getElementById("headers-box").parentNode;
	//Apply the border
	var properties = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var myProperties = properties.getBranch("extensions.borderColorsGT.");
	var selectedIdentity = accountSelector.label;
	var identityProperty = myProperties.getChildList("colors."+selectedIdentity);
	var borderWidth =  myProperties.getChildList("borderWidth");
	var BWidth;
	if(borderWidth.length==0){
		BWidth = 1;
	}
	else{
		BWidth = myProperties.getCharPref("borderWidth");
	}
	if(identityProperty.length==0){
		writingPanel.setAttribute("style","border: "+BWidth+"px dashed gray");
	}
	else{
		writingPanel.setAttribute("style","border: "+BWidth+"px solid  "+myProperties.getCharPref("colors."+selectedIdentity));
	}
}