/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Identities } from "../modules/identities.js";
import { Settings } from "../modules/settings.js";
import { Template } from "../modules/template.js";

const settings = new Settings();

async function renderIdentity(identity) {
  const color = await settings.getIdentityColor(identity.id);
  const label = `${identity.name} <${identity.email}>`;
  const updateIdentity =
    event => settings.setIdentityColor(identity.id, event.target.value)

  const template = new Template('identityTemplate');
  template.slot('address').innerText = label;
  if (!color) {
    template.slot('address').classList.add('not-yet-defined');
  }
  template.slot('color').value = color || settings.fallbackColor;
  template.slot('color').addEventListener('change', updateIdentity);
  return template.element;
}

function initialize() {
  const identities = new Identities();
  const selectors = document.getElementById('colorSelectors');

  identities.forEach(
    identity => renderIdentity(identity).then(item => selectors.appendChild(item))
  );
}

document.addEventListener("DOMContentLoaded", initialize);
