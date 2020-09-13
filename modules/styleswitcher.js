/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class StyleSwitcher {

  constructor(styleProvider) {
    this.styleProvider = styleProvider;
    this.registeredStyle = null;

    browser.windows.onCreated.addListener(
      newWindow => this.styleNewComposeWindow(newWindow)
    );
    browser.compose.onIdentityChanged.addListener(
      (tab, identityId) => this.applyStyleForIdentity(identityId)
    );
    browser.compose.onBeforeSend.addListener(
      () => this.removeStyle()
    );
  }

  async styleNewComposeWindow(newWindow) {
    if (newWindow.type != "messageCompose") {
      return;
    }
    const tabs = await browser.tabs.query({ windowId: newWindow.id });
    const applyStyle = async () => {
      const details = await browser.compose.getComposeDetails(tabs[0].id);
      console.log("New compose window with identity:", details.identityId);
      this.applyStyleForIdentity(details.identityId);
    };
    setTimeout(applyStyle, 250);
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
