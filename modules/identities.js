/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Identities {

  forEach(callback) {
    console.debug('BorderColors-D: listing identities');
    browser.accounts.list()
      .then(accounts => this._debug_logging(accounts))

    return browser.accounts.list()
      .then(accounts => this._flattenToList(accounts, "identities"))
      .then(identities => identities.forEach(callback));
  }

  _flattenToList(objects, attribute) {
    return objects.reduce((list, x) => list.concat(x[attribute]), []);
  }

  _debug_logging(accounts) {
    console.debug(`BorderColors-D: ---- we have found ${accounts.length} accounts ----`);
    accounts.forEach(this._log_identities);
    console.debug('BorderColors-D: ---- done listing the accounts we found ----');
  }

  _log_identities(account) {
    console.debug(`BorderColors-D: found account "${account.id}", ${account.type}`);
    const anonymized_identities = account.identities.map(
      identity => `${identity.id}:${identity.email.replace(/[^.@]/g, 'x')}`
    )
    console.debug(`BorderColors-D: identities for ${account.id}:`, anonymized_identities);
  }

}
