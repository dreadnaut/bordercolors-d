/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class StyleSwitcher {

  constructor(styleProvider) {
    this.styleProvider = styleProvider;
    this.registeredStyle = null;
    this.tabStyles = new Map();

    browser.windows.onCreated.addListener(
      newWindow => this.styleNewComposeWindow(newWindow)
    );
    browser.compose.onIdentityChanged.addListener(
      (tab, identityId) => this.applyStyleForIdentity(tab.id, identityId)
    );
    browser.compose.onBeforeSend.addListener(
      (tab) => this.removeStyle(tab.id)
    );
  }

  async styleNewComposeWindow(newWindow) {
    if (newWindow.type != "messageCompose") {
      return;
    }
    const tabs = await browser.tabs.query({ windowId: newWindow.id });
    const targetTabId = tabs[0].id;
    const applyStyle = async () => {
      const details = await browser.compose.getComposeDetails(targetTabId);
      console.log(`New compose tab ${targetTabId} with identity ${details.identityId}`);
      this.applyStyleForIdentity(targetTabId, details.identityId);
    };
    setTimeout(applyStyle, 250);
  }

  async applyStyleForIdentity(tabId, identityId) {
    this.removeStyle(tabId);
    console.log(`Applying new style for identity ${identityId} to tab ${tabId}`);
    const code = await this.styleProvider(identityId);
    this.tabStyles.set(tabId, { identityId, code });
    browser.tabs.insertCSS(tabId, { code });
  }

  removeStyle(tabId) {
    if (!this.tabStyles.has(tabId)) {
      return;
    }
    console.log(`Clearing style for tab ${tabId}`);
    browser.tabs.removeCSS(tabId, { code: this.tabStyles.get(tabId).code });
    this.tabStyles.delete(tabId);
  }

  refreshAllWindows() {
    console.log("Refreshing all windows");
    this.tabStyles.forEach(
      (info, tabId) => this.applyStyleForIdentity(tabId, info.identityId)
    );
  }

}
