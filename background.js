
console.log("BorderColors-D is here!");

class BorderColorsSettings {

  onFirstLoad(callback) {
    // TODO ⚠ remove before release
    messenger.storage.local.clear().then(callback);

    // messenger.storage.local.get("firstLoadComplete")
    //   .then(keys => keys["firstLoadComplete"] && callback());
  }

  firstLoadComplete() {
    messenger.storage.local.set({ "firstLoadComplete": true });
  }

  getIdentityColor(identityId) {
    const key = `identity-${identityId}`;
    return messenger.storage.local.get(key)
      .then(keys => keys[key]);
  }

  setIdentityColor(identityId, color) {
    console.log(`Identity ${identityId} updated with color ${color}`);
    var keys = {};
    keys[`identity-${identityId}`] = color;
    messenger.storage.local.set(keys);
  }

}


const settings = new BorderColorsSettings();

settings.onFirstLoad(() => {
  console.log("Migrating legacy settings for BorderColors-D");
  migrateSettingsTo(settings);
  settings.firstLoadComplete();
});

function migrateSettingsTo(destinationSettings) {
  const migrateIdentity = async (identity) => {
    const label = `${identity.name} <${identity.email}>`;
    const pref = `extensions.borderColors-D.colors.${label}`;

    const color = await messenger.LegacyPrefs.get(pref, "");
    if (color) {
      destinationSettings.setIdentityColor(identity.id, color);
    }
  }

  const flattenToList = (objects, attribute) =>
    objects.reduce((list, x) => list.concat(x[attribute]), []);

  browser.accounts.list()
    .then(accounts => flattenToList(accounts, "identities"))
    .then(identities => identities.forEach(migrateIdentity));
}


class StyleSwitcher {

  constructor(styleProvider) {
    this.styleProvider = styleProvider;
    this.registeredStyle = null;

    browser.compose.onIdentityChanged.addListener(
      (tab, identityId) => this.applyStyleForIdentity(identityId)
    );
    browser.compose.onBeforeSend.addListener(
      () => this.removeStyle()
    );
    browser.windows.onCreated.addListener(
      (newWindow) => this.styleNewComposeWindow(newWindow)
    );
  }

  styleNewComposeWindow(newWindow) {
    if (newWindow.type != "messageCompose") {
      return;
    }
    browser.tabs.query({ windowId: newWindow.id })
      .then (details => {
        browser.compose.getComposeDetails(details[0].id)
          .then(tabdetails => {
            console.log("New compose window with identity:", tabdetails.identityId);
            this.applyStyleForIdentity(tabdetails.identityId);
          });
      });
  }

  async applyStyleForIdentity(identityId) {
    console.log("Applying new style for identity " + identityId);
    this.removeStyle();
    const code = await this.styleProvider(identityId);
    this.registeredStyle = await browser.composeScripts
      .register({ css: [ { code } ] });
  }

  removeStyle() {
    if (!this.registeredStyle) {
      return;
    }
    this.registeredStyle.unregister();
    this.registerStyle = null;
  }

}


class Styles {

  getStyle(styleId, color) {
    return "html { min-height: 100%; box-sizing: border-box; "
      + this.getHtmlStyle(styleId, color) + "}";
  }

  getHtmlStyle(styleId, color) {
    switch (styleId) {
      case "top-only":
        return this.topOnly(color);
      default:
        return this.undefinedStyle();
    }
  }

  topOnly(color) {
    return color
      ? "border-top: 10px solid " + color + ";"
      : "border-top: 10px dashed lightgray;";
  }

  undefinedStyle() {
    return "border: 0.75rem dashed lightgray;";
  }

}



const configuredStyle = 'top-only';
const styleProvider = new Styles();

let switcher = new StyleSwitcher(
  async identityId => styleProvider
    .getStyle(configuredStyle, await settings.getIdentityColor(identityId))
);

