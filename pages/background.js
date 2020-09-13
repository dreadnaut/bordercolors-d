/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Settings } from "../modules/settings.js";
import { StyleSwitcher } from "../modules/styleswitcher.js";
import { Styles } from "../modules/styles.js";
import { Identities } from "../modules/identities.js";

console.info("Hello there, I'm BorderColors-D!");

const settings = new Settings();

settings.onFirstLoad(() => {
  console.info("This is the first time BorderColors-D starts, look for legacy settings");
  new Identities().forEach(migrateIdentity);
  settings.firstLoadComplete();
});

async function migrateIdentity(identity) {
  const label = `${identity.name} <${identity.email}>`;
  const pref = `extensions.borderColors-D.colors.${label}`;
  const color = await messenger.LegacyPrefs.get(pref, "");
  if (color) {
    console.log(`Migrating legacy preference: ${label} → ${color}`);
    settings.setIdentityColor(identity.id, color);
  }
}

const styleProvider = new Styles(settings.fallbackColor);

new StyleSwitcher(
  async identityId => styleProvider
    .getStyle(settings.style, await settings.getIdentityColor(identityId))
);
