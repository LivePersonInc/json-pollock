// @flow

import Utils from './Utils';
/*eslint-disable */
const Events = require('Chronosjs/dist/min/Events');
/*eslint-enable */

const TYPES = {
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  MAP: 'map',
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  CAROUSEL: 'carousel',
  SUBMIT: 'submit',
  CHECKBOX: 'checkbox',
  CHECKLIST: 'checklist',
  FORMLIST: 'formList',
};

export default class ElementRendererProvider {

  static TYPES: Object = TYPES;

  elements: Object;
  events: Events;

  constructor(events: Events) {
    this.elements = {};
    this.events = events;

    /*
    predefined renderes
    */
    this.set(TYPES.TEXT, (config): HTMLElement => {
      const divEl = document.createElement('div');
      const tooltip = config.tooltip ? Utils.escapeHtml(config.tooltip) : '';
      divEl.className = 'lp-json-pollock-element-text';
      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }
      const style = Utils.styleToCss(config.style);
      const splitedStyle = Utils.extractFromStyles(style, 'background-color');
      divEl.setAttribute('style', splitedStyle.extractedStyle);
      divEl.innerHTML = `<span style="${splitedStyle.style}" title="${tooltip}" aria-label="${tooltip}">${Utils.normalizeHtmlText(config.text)}</span>`;
      return divEl;
    });

    this.set(TYPES.BUTTON, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-button';

      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }

      const btnEl = document.createElement('button');
      btnEl.innerHTML = Utils.normalizeHtmlText(config.title);

      if (config.tooltip) {
        btnEl.title = config.tooltip;
        btnEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');
        divEl.setAttribute('style', splitedStyle.extractedStyle);
        btnEl.style.cssText = splitedStyle.style;
      }

      if (config.click && config.click.actions) {
        btnEl.onclick = this.wrapAction(config.click);
      }

      divEl.appendChild(btnEl);

      return divEl;
    });

    this.set(TYPES.SUBMIT, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-submit-button';

      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }

      const btnEl = document.createElement('button');
      btnEl.innerHTML = Utils.normalizeHtmlText(config.title);

      if (config.tooltip) {
        btnEl.title = config.tooltip;
        btnEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');
        divEl.setAttribute('style', splitedStyle.extractedStyle);
        btnEl.style.cssText = splitedStyle.style;
      }

      if (config.click && config.click.actions) {
        btnEl.onclick = this.wrapAction(config.click);
      }

      divEl.appendChild(btnEl);

      return divEl;
    });

    this.set(TYPES.CHECKBOX, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-checkbox';

      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }

      const labelEl = document.createElement('label');
      const checkEl = document.createElement('input');
      const tmp = config;
      checkEl.type = 'checkbox';
      checkEl.name = config.name;
      checkEl.value = config.value;
      checkEl.className = 'lp-json-pollock-element-checkbox-input';
      labelEl.appendChild(checkEl);

      labelEl.className = 'lp-json-pollock-element-checkbox-label';
      labelEl.innerHTML += Utils.normalizeHtmlText(config.text);

      if (config.rtl) {
        labelEl.dir = 'rtl';
        Utils.addClass(labelEl, 'direction-rtl');
      }
      if (config.tooltip) {
        labelEl.title = config.tooltip;
        labelEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        labelEl.style.cssText = Utils.styleToCss(config.style);
      }
      const borderEl = document.createElement('div');
      borderEl.className = 'lp-json-pollock-border-element';
      divEl.appendChild(borderEl);
      divEl.appendChild(labelEl);

      (divEl: any).afterRender = () => {
        const checkBoxEl = divEl.getElementsByTagName('input')[0];
        if (tmp.click && tmp.click.actions) {
          checkBoxEl.onclick = this.wrapAction(tmp.click);
        }
      };
      return divEl;
    });

    this.set(TYPES.CHECKLIST, (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-checklist';
      return divEl;
    });

    this.set(TYPES.FORMLIST, (): HTMLElement => {
      const divEl = document.createElement('form');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-form';
      return divEl;
    });

    this.set(TYPES.IMAGE, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-image loading';

      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }

      const imgEl = document.createElement('img');

      imgEl.src = config.url;
      if (config.tooltip) {
        imgEl.title = config.tooltip;
        imgEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        imgEl.style.cssText = Utils.styleToCss(config.style);
      }

      if (config.caption) {
        divEl.innerHTML += `<span>${config.caption}</span>`;
      }

      imgEl.onload = () => {
        Utils.removeClass(divEl, 'loading');
      };

      imgEl.onerror = () => {
        Utils.removeClass(divEl, 'loading');
        Utils.addClass(divEl, 'error');
        divEl.title = 'fail to load image';
        imgEl.style.display = 'none';
      };

      if (config.click && config.click.actions) {
        imgEl.onclick = this.wrapAction(config.click);
      }
      divEl.appendChild(imgEl);

      return divEl;
    });

    this.set(TYPES.MAP, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-map';

      if (config.tooltip) {
        divEl.title = config.tooltip;
        divEl.setAttribute('aria-label', config.tooltip);
      }

      if (config.style) {
        divEl.style.cssText = Utils.styleToCss(config.style);
      }

      if (config.click && config.click.actions) {
        divEl.onclick = this.wrapAction(config.click);
      } else {
        // navigate to the location
        divEl.onclick = () => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${config.la},${config.lo}`, '_blank');
        };
      }
      return divEl;
    });

    this.set(TYPES.VERTICAL, (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-vertical';
      return divEl;
    });

    this.set(TYPES.CAROUSEL, (config): HTMLElement => {
      const defaultPadding = 0;
      const padding = config.padding || defaultPadding;
      const CARD_DEFAULT_WIDTH = 180;
      const PARSE_DECIMAL = 10;
      const BORDER_WIDTH = 2;
      let nextLeft = 0;
      let currentPos = 0;
      const arrowRight = document.createElement('div');
      const arrowLeft = document.createElement('div');
      const divCarouselWrapper = document.createElement('div');
      const carousel = document.createElement('div');
      const carouselOffsetChangedEventName = 'carouselOffsetChange';
      function rightArrowClicked(event) {
        currentPos = 0;
        if (nextLeft === 0) {
          this.events.trigger({
            eventName: carouselOffsetChangedEventName,
            data: {
              offset: nextLeft,
              prevOffset: currentPos,
              uiEvent: event,
            },
          });
        }
        if ((carousel: any).style.left !== '') {
          currentPos = parseInt((carousel: any).style.left, PARSE_DECIMAL);
        }
        /* when click on the right arrow the carousel div will shift to the left */
        nextLeft = currentPos - CARD_DEFAULT_WIDTH - (padding) - BORDER_WIDTH;
        (arrowLeft: any).style.visibility = 'visible';
        (arrowRight: any).style.visibility = 'visible';
        /* check if the the viewport width is bigger then the carousel width + the next "Left"
         * value => shift the carousel div to its rightest point */
        if (divCarouselWrapper.offsetWidth > carousel.offsetWidth + nextLeft) {
          nextLeft = -((carousel.offsetWidth + padding)
            - divCarouselWrapper.offsetWidth);
          (arrowRight: any).style.visibility = 'hidden';
        }
        (carousel: any).style.left = `${nextLeft}px`;
      }
      function leftArrowClicked(event) {
        currentPos = 0;
        if ((carousel: any).style.left !== '') {
          currentPos = parseInt((carousel: any).style.left, PARSE_DECIMAL);
        }
        nextLeft = currentPos + CARD_DEFAULT_WIDTH + padding + BORDER_WIDTH;
        (arrowRight: any).style.visibility = 'visible';
        if (nextLeft >= 0) {
          nextLeft = 0;
          (arrowLeft: any).style.visibility = 'hidden';
          (arrowRight: any).style.visibility = 'visible';
        }
        if (nextLeft === 0) {
          this.events.trigger({
            eventName: carouselOffsetChangedEventName,
            data: {
              offset: nextLeft,
              prevOffset: currentPos,
              uiEvent: event,
            },
          });
        }
        (carousel: any).style.left = `${nextLeft}px`;// this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
      }
      function findCardRoot(element) {
        if (element.className.indexOf('lp-json-pollock-layout') > -1) {
          return element;
        }
        return findCardRoot(element.parentNode);
      }
      function cardFocus(event) {
        const element = event.target;
        const cardRoot = findCardRoot(element);
        divCarouselWrapper.scrollLeft = 0;
        const divCarouselWrapperBoundaries = divCarouselWrapper.getBoundingClientRect();
        const cardBoundaries = cardRoot.getBoundingClientRect();
        // check if the container card is Exceeding the carousel wrapper.
        if (divCarouselWrapperBoundaries.left > cardBoundaries.left) {
          leftArrowClicked.call(this, event);
        } else if (divCarouselWrapperBoundaries.right < cardBoundaries.right) {
          rightArrowClicked.call(this, event);
        }
      }
      (divCarouselWrapper: any).afterRender = () => {
        if (divCarouselWrapper.childNodes.length) {
          for (let itemCounter = 0;
               itemCounter < divCarouselWrapper.childNodes.length;
               itemCounter += 1) {
            const node = divCarouselWrapper.childNodes[itemCounter];
            // add card focus event
            (node: any).addEventListener('focus', cardFocus.bind(this), true);
            (node: any).style.margin = `0 ${padding / 2}px`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
          }

          arrowRight.className = 'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow';
          arrowLeft.className = 'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow left';

          /* create carousel wrapper */
          while ((divCarouselWrapper: any).hasChildNodes()) {
            (carousel: any).insertBefore(divCarouselWrapper.lastChild, carousel.firstChild);
          }

          divCarouselWrapper.appendChild(carousel);
          /* calculate carousel static width */
          let middleItemsWidth = 0;
          const cornerItemsWidth = (2 * (CARD_DEFAULT_WIDTH + BORDER_WIDTH)) + padding;
          if (carousel.childNodes.length > 2) {
            middleItemsWidth = (carousel.childNodes.length - 2) *
              (BORDER_WIDTH + CARD_DEFAULT_WIDTH + padding);
          }
          const totalWidth = cornerItemsWidth + middleItemsWidth;
          carousel.style.width = `${totalWidth}px`;
          carousel.className = 'lp-json-pollock-layout-carousel';
          divCarouselWrapper.className = 'lp-json-pollock-layout-carousel-wrapper';

          divCarouselWrapper.appendChild(carousel);
          divCarouselWrapper.appendChild(arrowRight);
          divCarouselWrapper.appendChild(arrowLeft);
          /* TODO: find other trigger. */
          setTimeout(() => {
            /* check if the viewport width is bigger then the carousel div
             * => remove the arrows */
            if (divCarouselWrapper.offsetWidth > carousel.offsetWidth) {
              (arrowLeft: any).style.visibility = 'hidden';
              (arrowRight: any).style.visibility = 'hidden';
            }
          }, 0);
          arrowRight.onclick = (event) => {
            rightArrowClicked.call(this, event);
          };
          arrowLeft.onclick = (event) => {
            leftArrowClicked.call(this, event);
          };
        }
      };
      return divCarouselWrapper;
    });

    this.set(TYPES.HORIZONTAL, (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-horizontal';
      (divEl: any).afterRender = () => {
        if (divEl.childNodes.length) {
          const percentage = 100 / divEl.childNodes.length;
          Array.prototype.forEach.call(divEl.childNodes, (node) => {
            const n = node;
            (n: any).style.width = `${percentage}%`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
          });
        }
      };
      return divEl;
    });
  }

  get(type: string): Function {
    return this.elements[type];
  }

  set(type: string, render: Function) {
    this.elements[type] = render;
  }

  wrapAction(clickData: Object): Function {
    return (event) => {
      if (clickData.actions instanceof Array) {
        clickData.actions.forEach((actionData) => {
          this.events.trigger({
            eventName: actionData.type,
            data: {
              actionData,
              metadata: clickData.metadata,
              uiEvent: event,
            },
          });
        });
      }
    };
  }
}
