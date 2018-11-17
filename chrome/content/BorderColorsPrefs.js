class BorderColorsPrefs {

    constructor() {
        this.prefs = Components
            .classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService)
            .getBranch("extensions.borderColors-D.");
    }

    setInt(key, value) {
        this.prefs.setIntPref(key, value);
    }

    getInt(key, defaultValue) {
        return this.prefs.prefHasUserValue(key)
            ? this.prefs.getIntPref(key)
            : defaultValue;
    }

    hasColor(identity) {
        return this.prefs.prefHasUserValue(this._getColorKey(identity));
    }

    getColor(identity) {
        const key = this._getColorKey(identity);
        return this.prefs.prefHasUserValue(key)
            ? this.prefs.getCharPref(key)
            : "transparent";
    }

    setColor(identity, color) {
        this.prefs.setCharPref(this._getColorKey(identity), color);
    }

    _getColorKey(identity) {
        return "colors." + identity;
    }

}
