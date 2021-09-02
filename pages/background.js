/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Settings } from "../modules/settings.js";
import { StyleSwitcher } from "../modules/styleswitcher.js";
import { Styles } from "../modules/styles.js";
import { Identities } from "../modules/identities.js";

console.info("Hello there, I'm BorderColors-D!");

const settings = new Settings();

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
