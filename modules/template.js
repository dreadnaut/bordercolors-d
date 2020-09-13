/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Template {

  constructor(templateId) {
    this.node = document.getElementById(templateId)
      .content.firstElementChild.cloneNode(true);
  }

  slot(key) {
    return this.node.querySelector(`[data-key="${key}"]`);
  }

  get element() {
    return this.node;
  }

}
