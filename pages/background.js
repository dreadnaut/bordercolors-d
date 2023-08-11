/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Api } from "../modules/api.js";
import { Settings } from "../modules/settings.js";
import { StyleSwitcher } from "../modules/styleswitcher.js";
import { Styles } from "../modules/styles.js";
import { Identities } from "../modules/identities.js";

console.info("Hello there, I'm BorderColors-D!");

const identities = new Identities();
const settings = new Settings();


// Apply styles to compose windows

const styleProvider = new Styles(settings.fallbackColor);

const styleSwitcher = new StyleSwitcher(
  async identityId => styleProvider
    .getStyle(
      await settings.style,
      await settings.size,
      await settings.getIdentityColor(identityId)
    )
);

settings.onChange(styleSwitcher.refreshAllWindows.bind(styleSwitcher));


// Listen for messages from other extensions

const api = new Api(identities, settings);

messenger.runtime.onMessageExternal.addListener(api.processMessage.bind(api));
