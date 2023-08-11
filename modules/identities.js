/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Identities {

  forEach(callback) {
    return this.identities
      .then(identities => identities.forEach(callback));
  }

  get identities() {
    return browser.accounts.list()
      .then(accounts => this._flattenToList(accounts, "identities"));
  }

  get ids() {
    return this.identities
      .then(identities => identities.map(i => i.id));
  }

  _flattenToList(objects, attribute) {
    return objects.reduce((list, x) => list.concat(x[attribute]), []);
  }

}
