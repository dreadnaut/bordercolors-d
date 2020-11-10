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

  get fallbackColor() {
    return '#d3d3da';
  }

  onFirstLoad(callback) {
    this._get("firstLoadComplete")
      .then(keys => keys["firstLoadComplete"] || callback());
  }

  firstLoadComplete() {
    this._set({ "firstLoadComplete": true });
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
    return messenger.storage.local.set(data);
  }

}

