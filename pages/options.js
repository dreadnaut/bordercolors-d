/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Identities } from "../modules/identities.js";
import { Settings } from "../modules/settings.js";
import { Styles } from "../modules/styles.js";
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

async function renderStyle(style) {
  const isChecked = style.key == await settings.style;

  const template = new Template('styleTemplate');
  template.slot('label').innerText = style.label;
  template.slot('radio').value = style.key;
  if (isChecked) {
    template.slot('radio').checked = true;
  }
  template.slot('radio').addEventListener(
    'change',
    event => settings.setStyle(event.target.value)
  );
  return template.element;
}

function initialize() {
  const identities = new Identities();
  const colorSelectors = document.getElementById('colorSelectors');

  identities.forEach(
    identity => renderIdentity(identity)
      .then(item => colorSelectors.appendChild(item))
  );

  const styles = new Styles();
  const styleSelectors = document.getElementById('styleSelectors');

  styles.all.forEach(
    style => renderStyle(style)
      .then(item => styleSelectors.appendChild(item))
  )
}

document.addEventListener("DOMContentLoaded", initialize);
