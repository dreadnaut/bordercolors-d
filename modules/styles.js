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

  get all() {
    return [
      { key: 'all-sides', label: 'All sides' },
      { key: 'top-and-bottom', label: 'Top and bottom border' },
      { key: 'top', label: 'Top border' },
      { key: 'left-side-gradient', label: 'Gradient on the left side' },
      { key: 'background-top-right-gradient', label: 'Gradient in the top-right corner' },
      { key: 'background-bottom-gradient', label: 'Gradient at the bottom' },
      { key: 'background', label: 'Background color' },
    ];
  }

  getHtmlStyle(styleId, color) {
    const borderStyle = color 
      ? `solid ${color}`
      : `dashed ${this.defaultColor}`;

    color = color || this.defaultColor;

    switch (styleId) {
      case "all-sides":
        return `border: 10px ${borderStyle};`;
      case "top-and-bottom":
        return `border-top: 10px ${borderStyle}; border-bottom: 10px ${borderStyle};`;
      case "top":
        return `border-top: 10px ${borderStyle};`;
      case "left-side-gradient":
        return `border-left: 10px ${borderStyle}; border-image: linear-gradient(to bottom, ${color}, white 50%) 1 100%;`;
      case "background":
        return `background: ${color};`;
      case "background-top-right-gradient":
        return `background: linear-gradient(to bottom left, ${color}, transparent 20%);`;
      case "background-bottom-gradient":
        return `background: linear-gradient(to top, ${color}, white 20%);`;
      default:
        return `border: 0.75rem dashed ${this.defaultColor};`
    }
  }

}
