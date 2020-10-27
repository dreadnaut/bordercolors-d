/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

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
  }

  get style() {
    return this._get('highlightStyle')
      .then(keys => keys['highlightStyle'] || this.fallbackStyle);
  }

  setStyle(style) {
    console.log(`Setting highlight style: ${style}`);
    this._set({ "highlightStyle":  style });
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

  // Private methods, one day

  _get(query) {
    return messenger.storage.local.get(query);
  }

  _set(data) {
    return messenger.storage.local.set(data);
  }

}

