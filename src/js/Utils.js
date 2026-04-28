const LAYOUT_TYPES = ['vertical', 'horizontal', 'carousel'];

export default {
  /**
   * @param {Object} style
   * @return {string}
   */
  styleToCss(style) {
    let cssStr = '';

    if (style) {
      if (style.color) {
        cssStr += `color:${style.color};`;
      }

      if (style['background-color']) {
        cssStr += `background-color:${style['background-color']};`;
      }

      if (style.bold) {
        cssStr += 'font-weight:bold;';
      }

      if (style.italic) {
        cssStr += 'font-style:italic;';
      }

      if (style.size) {
        cssStr += `font-size:${this.sizeToPx(style.size)}px;`;
      }
      if (style.fill) {
        // change color for svg's
        cssStr += `fill:${style.fill};`;
      }
    }

    return cssStr;
  },

  /**
   * @param {Object} style
   * @return {string}
   */
  styleToBorder(style) {
    let cssStr = '';
    if (style) {
      if (style['border-color']) {
        cssStr += `border-color: ${style['border-color']};`;
      }
      if (style['border-radius']) {
        cssStr += `border-radius: ${style['border-radius']}px;`;
      }
    }
    return cssStr;
  },

  /**
   * @param {Object} style
   * @return {string}
   */
  styleToButton(style) {
    let cssStr = '';
    if (style) {
      if (style.size) {
        cssStr += `width: ${this.buttonSizeToPx(style.size)}px; height: ${this.buttonSizeToPx(style.size)}px;`;
      }
    }
    return cssStr;
  },

  /**
   * @param {string} originalStyle
   * @param {string} prop
   * @return {Object}
   */
  extractFromStyles(originalStyle, prop) {
    let style = originalStyle;
    const extractedStyleIndex = style.indexOf(prop);
    let extractedStyle = '';
    if (extractedStyleIndex > -1) {
      extractedStyle = style.substr(
        extractedStyleIndex,
        style.indexOf(';', extractedStyleIndex) - (extractedStyleIndex - 1),
      );
      style = style.replace(extractedStyle, ''); // remove extractedStyle from the originalStyle
    }
    return {
      extractedStyle,
      style,
    };
  },

  /**
   * @param {string} size
   * @return {number}
   */
  sizeToPx(size) {
    switch (size) {
      case 'small':
        return 11;
      case 'medium':
        return 13;
      case 'large':
        return 17;
      default:
        return 13;
    }
  },

  /**
   * @param {string} size
   * @return {number}
   */
  buttonSizeToPx(size) {
    switch (size) {
      case 'small':
        return 27;
      case 'medium':
        return 36;
      case 'large':
        return 45;
      default:
        return 36;
    }
  },

  /**
   * @param {Object} config
   * @param {string[]} params
   */
  validateParameters(config, ...params) {
    if (!config.type) {
      throw new Error('Missing configuration: type');
    }

    params.forEach((param) => {
      if (config[param] === undefined) {
        throw new Error(
          `Missing configuration: ${param} is a mandatory for element of type ${config.type}`,
        );
      }
    });
  },

  /**
   *
   *
   * @param {*} val
   * @return {boolean}
   */
  isString(val) {
    return val instanceof String || typeof val === 'string';
  },

  /**
   *
   *
   * @param {*} val
   * @return {boolean}
   */
  isObject(val) {
    return val !== null && typeof val === 'object';
  },

  /**
   *
   *
   * @param {string} type
   * @return {boolean}
   */
  isLayout(type) {
    return LAYOUT_TYPES.indexOf(type) >= 0;
  },

  /**
   *
   *
   * @param {string} text
   * @return {string}
   */
  normalizeHtmlText(text) {
    let normalized = text;
    if (text) {
      normalized = normalized.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    }
    return normalized;
  },

  /**
   *
   *
   * @param {string} text
   * @return {string}
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    };

    return text.replace(/[&<>"'`=/]/g, (s) => map[s]);
  },

  /**
   * @param {string} html - representing a single element
   * @return {HTMLElement}
   */
  htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
  },

  /**
   * @param {HTMLElement} el
   * @param {string} className
   * @return {boolean}
   */
  hasClass(el, className) {
    if (el.classList && el.classList.contains) {
      return el.classList.contains(className);
    }
    return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
  },

  /**
   * @param {HTMLElement} el
   * @param {string} className
   */
  addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!this.hasClass(el, className)) {
      el.className += ` ${className}`;
    }
  },

  /**
   * @param {HTMLElement} el
   * @param {string} className
   */
  removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (this.hasClass(el, className)) {
      const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
      el.className = el.className.replace(reg, ' ');
    }
  },

  generateRandomId() {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  },

  /**
   *
   *
   * @param {HTMLElement} el
   * @param {*} attributes
   */
  appendAttributesFromObject(el, attributes) {
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
      el.setAttribute(key, attributes[key]);
    });
  },
};
