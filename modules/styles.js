/**
 * BorderColors-D - https://github.com/dreadnaut/bordercolors-d/
 */

export class Styles {

  constructor(defaultColor) {
    this.defaultColor = defaultColor;
  }

  getStyle(styleId, size, color) {
    return "html { min-height: 100%; box-sizing: border-box; }"
      + this.getDecorationCss(styleId, size, color);
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

  getDecorationCss(styleId, size, color) {
    if (!color) {
      return this.styleFallback(this.defaultColor);
    }

    switch (styleId) {
      case "all-sides":
        return this.styleAllSides(color, size);
      case "top-and-bottom":
        return this.styleTopAndBottom(color, size);
      case "top":
        return this.styleTop(color, size);
      case "left-side-gradient":
        return this.styleLeftSideGradient(color, size);
      case "background":
        return this.styleBackground(color, size);
      case "background-top-right-gradient":
        return this.styleBackgroundTopRightGradient(color, size);
      case "background-four-corners-gradient":
        return this.styleBackgroundFourCornersGradient(color, size);
      case "background-bottom-gradient":
        return this.styleBackgroundBottomGradient(color, size);
      default:
        return this.styleFallback(color);
    }
  }

  styleFallback(color) {
    return `html { border: 10px dashed ${color}; }`;
  }

  styleAllSides(color, size) {
    return `html { border: 10px solid ${color}; }`;
  }

  styleTopAndBottom(color, size) {
    return `html {
      border-top: 10px solid ${color};
      border-bottom: 10px solid ${color};
    }`;
  }

  styleTop(color, size) {
    return `html { border-top: 10px solid ${color}; }`;
  }

  styleLeftSideGradient(color, size) {
    return `html {
      border-left: 10px solid ${color};
      border-image: linear-gradient(to bottom, ${color}, transparent 66%) 1 100%;
    }`;
  }

  styleBackground(color, size) {
    return `body { background: ${color}; }`;
  }

  styleBackgroundTopRightGradient(color, size) {
    return `body {
      background-image: linear-gradient(to bottom left, ${color}, transparent 20%);
      background-attachment: fixed;
    }`;
  }

  styleBackgroundFourCornersGradient(color, size) {
    return `body {
      background-image:
        linear-gradient( 45deg, ${color}, transparent 10%),
        linear-gradient(135deg, ${color}, transparent 10%),
        linear-gradient(225deg, ${color}, transparent 10%),
        linear-gradient(315deg, ${color}, transparent 10%);
      background-attachment: fixed;
    }`;
  }

  styleBackgroundBottomGradient(color, size) {
    return `body {
      background-image: linear-gradient(to top, ${color}, transparent 20%);
      background-attachment: fixed;
    }`;
  }

}
