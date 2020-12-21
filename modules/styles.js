/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Styles {

  constructor(defaultColor) {
    this.defaultColor = defaultColor;
  }

  getStyle(styleId, color) {
    return "html { min-height: 100%; box-sizing: border-box; }"
      + this.getDecorationCss(styleId, color);
  }

  get all() {
    return [
      { key: 'all-sides', label: 'All sides' },
      { key: 'top-and-bottom', label: 'Top and bottom border' },
      { key: 'top', label: 'Top border' },
      { key: 'left-side-gradient', label: 'Gradient on the left side' },
      { key: 'background-top-right-gradient', label: 'Gradient in the top-right corner' },
      { key: 'background-four-corners-gradient', label: 'Gradient in the four corners' },
      { key: 'background-bottom-gradient', label: 'Gradient at the bottom' },
      { key: 'background', label: 'Background color' },
    ];
  }

  getDecorationCss(styleId, color) {
    if (!color) {
      return `html { border: 10px dashed ${this.defaultColor}; }`;
    }

    switch (styleId) {
      case "all-sides":
        return `html { border: 10px solid ${color}; }`;
      case "top-and-bottom":
        return `html { border-top: 10px solid ${color}; border-bottom: 10px solid ${color}; }`;
      case "top":
        return `html { border-top: 10px solid ${color}; }`;
      case "left-side-gradient":
        return `html { border-left: 10px solid ${color}; border-image: linear-gradient(to bottom, ${color}, transparent 66%) 1 100%;`;
      case "background":
        return `body { background: ${color}; }`;
      case "background-top-right-gradient":
        return `body { background-image: linear-gradient(to bottom left, ${color}, transparent 20%); background-attachment: fixed; }`;
      case "background-four-corners-gradient":
        return `body { background-image:
          linear-gradient( 45deg, ${color}, transparent 10%),
          linear-gradient(135deg, ${color}, transparent 10%),
          linear-gradient(225deg, ${color}, transparent 10%),
          linear-gradient(315deg, ${color}, transparent 10%);
          background-attachment: fixed; }`;
      case "background-bottom-gradient":
        return `body { background-image: linear-gradient(to top, ${color}, transparent 20%); background-attachment: fixed; }`;
      default:
        return `html { border: 0.75rem dashed ${this.defaultColor}; }`;
    }
  }

}
