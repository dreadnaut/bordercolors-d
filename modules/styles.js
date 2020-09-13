/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Styles {

  constructor(defaultColor) {
    this.defaultColor = defaultColor;
  }

  getStyle(styleId, color) {
    return "html { min-height: 100%; box-sizing: border-box; "
      + this.getHtmlStyle(styleId, color) + "}";
  }

  getHtmlStyle(styleId, color) {
    switch (styleId) {
      case "top-only":
        return this.topOnly(color);
      default:
        return this.undefinedStyle();
    }
  }

  topOnly(color) {
    return color
      ? `border-top: 10px solid ${color};`
      : `border-top: 10px dashed ${this.defaultColor};`
  }

  undefinedStyle() {
    return `border: 0.75rem dashed ${this.defaultColor};`
  }

}
