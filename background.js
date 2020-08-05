
console.log("BorderColors-D is here!");

// TODO if first load, migrate legacy prefs
// TODO connect style provider to current prefs

let switcher = new StyleSwitcher(randomStyle);


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

  applyStyleForIdentity(identityId) {
    console.log("Applying new style for identity " + identityId);
    this.removeStyle();
    this.applyStyle(this.styleProvider(identityId));
  }

  async applyStyle(code) {
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




// TODO migrate existing colors

mapIdentities().then(identities => {
  identities.forEach(identity => {
    messenger.LegacyPrefs
      .get("extensions.borderColors-D.colors." + identity.label, "[none set]")
      .then(color => console.log(`${identity.label} => ${color}`));
  });
});


async function mapIdentities() {
  accounts = await browser.accounts.list();

  return accounts.reduce(
    (identities, account) => identities.concat(account.identities.map(mapIdentity)),
    []
  );
}

function mapIdentity(identity) {
  return {
    id: identity.id,
    label: `${identity.name} <${identity.email}>`,
  }
}


// TODO replace this with a collection of styles

function randomStyle() {
  const colors = [ 'red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'black' ];
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  return "html { "
          + "min-height: 100%;"
          + "border-left: 10px solid " + newColor + ";"
          + "}";
}

