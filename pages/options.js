/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

import { Identities } from "../modules/identities.js";
import { Settings } from "../modules/settings.js";
import { Styles } from "../modules/styles.js";
import { Template } from "../modules/template.js";

// Workaround to show options in the Add-ons Manager
// See https://bugzilla.mozilla.org/show_bug.cgi?id=1641577
window.browser = window.browser.extension.getBackgroundPage().browser;

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

function renderStyle(style, isChecked) {
  const template = new Template('styleTemplate');
  template.slot('radio').value = style;
  template.slot('label').innerText =
    browser.i18n.getMessage('style-' + style);

  template.slot('radio').checked = isChecked;
  template.slot('radio').addEventListener(
    'change',
    event => settings.setStyle(event.target.value)
  );
  return template.element;
}

function renderSize(size, isChecked) {
  const template = new Template('sizeTemplate');
  template.slot('radio').value = size;
  template.slot('label').innerText =
    browser.i18n.getMessage('size-' + size);

  template.slot('radio').checked = isChecked;
  template.slot('radio').addEventListener(
    'change',
    event => settings.setSize(event.target.value)
  );
  return template.element;
}

async function initialize() {
  // generate one color select for each identity
  const identities = new Identities();
  const colorSelectors = document.getElementById('colorSelectors');

  identities.forEach(
    identity => renderIdentity(identity)
      .then(item => colorSelectors.appendChild(item))
  );

  // generate radio buttons for styles
  const styles = new Styles();
  const styleSelectors = document.getElementById('styleSelectors');
  const currentStyle = await settings.style;

  styles.all
    .map(style => renderStyle(style, style == currentStyle))
    .map(item => styleSelectors.appendChild(item));

  // generate radio buttons for effect sizes
  const sizeSelectors = document.getElementById('sizeSelectors');
  const currentSize = await settings.size;

  settings.sizes
    .map(size => renderSize(size, size == currentSize))
    .map(item => sizeSelectors.appendChild(item));

  // inject localised strings in the options page
  for (const node of document.querySelectorAll('[data-i18n]')) {
    node.innerText = browser.i18n.getMessage(node.dataset.i18n)
      || `⚠ No translation for "${node.dataset.i18n}"`;
  }
}

document.addEventListener("DOMContentLoaded", initialize);
