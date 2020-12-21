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
    const width = { small: '3px', medium: '6px', large: '10px' }[size];
    return `html { border: ${width} solid ${color}; }`;
  }

  styleTopAndBottom(color, size) {
    const width = { small: '3px', medium: '6px', large: '10px' }[size];
    return `html {
      border-top: ${width} solid ${color};
      border-bottom: ${width} solid ${color};
    }`;
  }

  styleTop(color, size) {
    const width = { small: '3px', medium: '6px', large: '10px' }[size];
    return `html { border-top: ${width} solid ${color}; }`;
  }

  styleLeftSideGradient(color, size) {
    const width = { small: '5px', medium: '10px', large: '15px' }[size];
    return `html {
      border-left: ${width} solid ${color};
      border-image: linear-gradient(to bottom, ${color}, transparent 66%) 1 100%;
    }`;
  }

  styleBackground(color, size) {
    return `body { background: ${color}; }`;
  }

  styleBackgroundTopRightGradient(color, size) {
    const width = { small: '5%', medium: '10%', large: '20%' }[size];
    return `body {
      background-image: linear-gradient(to bottom left, ${color}, transparent ${width});
      background-attachment: fixed;
    }`;
  }

  styleBackgroundFourCornersGradient(color, size) {
    const width = { small: '3%', medium: '6%', large: '10%' }[size];
    return `body {
      background-image:
        linear-gradient( 45deg, ${color}, transparent ${width}),
        linear-gradient(135deg, ${color}, transparent ${width}),
        linear-gradient(225deg, ${color}, transparent ${width}),
        linear-gradient(315deg, ${color}, transparent ${width});
      background-attachment: fixed;
    }`;
  }

  styleBackgroundBottomGradient(color, size) {
    const width = { small: '5%', medium: '10%', large: '20%' }[size];
    return `body {
      background-image: linear-gradient(to top, ${color}, transparent ${width});
      background-attachment: fixed;
    }`;
  }

}
