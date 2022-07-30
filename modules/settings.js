/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

const ON_CHANGE = 'borderColors.settings.changed';

export class Settings {

  getIdentityColor(identityId) {
    const key = `identity-${identityId}`;
    return this._get(key)
      .then(keys => keys[key]);
  }

  setIdentityColor(identityId, color) {
    var keys = {};
    keys[`identity-${identityId}`] = color;
    this._set(keys);
    this._dispatch(ON_CHANGE);
  }

  get style() {
    return this._get('highlightStyle')
      .then(keys => keys['highlightStyle'] || this.fallbackStyle);
  }

  setStyle(style) {
    this._set({ "highlightStyle":  style });
    this._dispatch(ON_CHANGE);
  }

  get fallbackStyle() {
    return 'top';
  }

  get sizes() {
    return [ 'small', 'medium', 'large' ];
  }

  get size() {
    return this._get('highlightSize')
      .then(keys => keys['highlightSize'] || this.fallbackSize);
  }

  setSize(size) {
    this._set({ "highlightSize":  size });
    this._dispatch(ON_CHANGE);
  }

  get fallbackSize() {
    return 'large';
  }

  get fallbackColor() {
    return '#d3d3da';
  }

  onChange(callback) {
    this._extensionPage().addEventListener(ON_CHANGE, callback);
  }

  // Private methods, one day
  
  _dispatch(eventName) {
    this._extensionPage().dispatchEvent(new Event(eventName));
  }

  _extensionPage() {
    return window.browser.extension.getBackgroundPage();
  }

  _get(query) {
    return messenger.storage.local.get(query);
  }

  _set(data) {
    const key = Object.keys(data)[0];
    const value = data[key];
    console.log(`[BorderColors preferences] Setting '${key}' to '${value}'`);
    setTimeout(function() {
      messenger.storage.local.get(key).then(function(keys) {
        const actually_stored = keys[key];
        if (actually_stored == value) {
          console.log(`[BorderColors preferences] '${key}' contains '${value}' as expected`);
        } else {
          console.log(`[BorderColors preferences] '${key}' contains '${actually_stored}' instead of '${value}'`);
        }
      });
    }, 2000);
    return messenger.storage.local.set(data);
  }

}

