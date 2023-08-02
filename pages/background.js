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


//
// Set up an onMessageEternal listener to provide an API for other
// addons to query Border Color D's configuration.
//
// Currently, only a command to request a mapping of identity id's and
// their color is implemented.
//
// Other addons can query it like so:
// let ret = await browser.runtime.sendMessage("bordercolors-d@addonsdev.mozilla.org",
//                                             {command: "getAllIdentitiesColors"});
//
browser.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if(request.command === "getAllIdentitiesColors") {
    const identities = new Identities();
    const settings = new Settings();

    return new Promise((resolve, reject) => {
      var identitiesIds = [];
      var identitiesColors = [];

      identities.forEach(identity => {
        identitiesIds.push(identity.id);
        identitiesColors.push(settings.getIdentityColor(identity.id));
      }).then(x => {
        Promise.all(identitiesColors).then(colors => {
          let idColorsMap = [];
          for (const [index, color] of colors.entries()) {
            let id = identitiesIds[index];
            idColorsMap[id] = color;
          }

          resolve({
            command: "getAllIdentitiesColors",
            data: idColorsMap
          });
        });
      });
    });

    return false;
  }
});
