/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Styles {

  constructor(defaultColor) {
    this.defaultColor = defaultColor;
  }

  getStyle(styleId, color, backgroundColor) {
    const bodyBackground = backgroundColor ? "body { background: transparent; } " : "";

    return bodyBackground + "html { min-height: 100%; box-sizing: border-box; "
      + this.getHtmlStyle(styleId, color, backgroundColor) + "}";
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

  getHtmlStyle(styleId, color, backgroundColor) {
    const defaultBackground = backgroundColor ? `background: ${backgroundColor};` : "";
    const borderStyle = color 
      ? `solid ${color}`
      : `dashed ${this.defaultColor}`;

    color = color || this.defaultColor;
    backgroundColor = backgroundColor || 'transparent';

    switch (styleId) {
      case "all-sides":
        return `${defaultBackground} border: 10px ${borderStyle};`;
      case "top-and-bottom":
        return `${defaultBackground} border-top: 10px ${borderStyle}; border-bottom: 10px ${borderStyle};`;
      case "top":
        return `${defaultBackground} border-top: 10px ${borderStyle};`;
      case "left-side-gradient":
        return `${defaultBackground} border-left: 10px ${borderStyle}; border-image: linear-gradient(to bottom, ${color}, ${backgroundColor} 50%) 1 100%;`;
      case "background":
        return `background: ${color};`;
      case "background-top-right-gradient":
        return `background: linear-gradient(to bottom left, ${color}, ${backgroundColor} 20%);`;
      case "background-bottom-gradient":
        return `background: linear-gradient(to top, ${color}, ${backgroundColor} 20%);`;
      default:
        return `${defaultBackground} border: 0.75rem dashed ${this.defaultColor};`
    }
  }

}
