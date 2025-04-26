/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Api {

  constructor(identities, settings) {
    this.identities = identities;
    this.settings = settings;
  }

  processMessage(message, sender) {
    switch (message?.command) {
      case 'colors.all':
        return this.identities.ids
          .then(ids => this.settings.getColorsFor(ids));
      case 'colors.get':
        return this.settings.getIdentityColor(message.identity);
      default:
        return false;
    }
  }

}
