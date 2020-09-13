/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Identities {

  forEach(callback) {
    return browser.accounts.list()
      .then(accounts => this._flattenToList(accounts, "identities"))
      .then(identities => identities.forEach(callback));
  }

  _flattenToList(objects, attribute) {
    return objects.reduce((list, x) => list.concat(x[attribute]), []);
  }

}
