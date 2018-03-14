// @flow

import Utils from './Utils';
/*eslint-disable */
const Events = require('Chronosjs/dist/min/Events');
/*eslint-enable */

export default class ElementRendererProvider {

  elements: Object;
  events: Events;

  constructor(events: Events) {
    this.elements = {};
    this.events = events;

    /*
    predefined renderes
    */
    this.set('text', (config): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      const tooltip = config.tooltip ? Utils.escapeHtml(config.tooltip) : '';
      divCarouselWrapper.className = 'lp-json-pollock-element-text';
      if (config.rtl) {
        divCarouselWrapper.dir = 'rtl';
        divCarouselWrapper.className += ' direction-rtl';
      }
      divCarouselWrapper.innerHTML = `<span style="${Utils.styleToCss(config.style)}" title="${tooltip}" aria-label="${tooltip}">${Utils.normalizeHtmlText(config.text)}</span>`;
      return divCarouselWrapper;
    });

    this.set('button', (config): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      divCarouselWrapper.className = 'lp-json-pollock-element-button';

      if (config.rtl) {
        divCarouselWrapper.dir = 'rtl';
        divCarouselWrapper.className += ' direction-rtl';
      }

      const btnEl = document.createElement('button');
      btnEl.innerHTML = Utils.normalizeHtmlText(config.title);

      if (config.tooltip) {
        btnEl.title = config.tooltip;
        btnEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        btnEl.style.cssText = Utils.styleToCss(config.style);
      }

      if (config.click && config.click.actions) {
        btnEl.onclick = this.wrapAction(config.click);
      }

      divCarouselWrapper.appendChild(btnEl);

      return divCarouselWrapper;
    });

    this.set('image', (config): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      divCarouselWrapper.className = 'lp-json-pollock-element-image loading';

      if (config.rtl) {
        divCarouselWrapper.dir = 'rtl';
        divCarouselWrapper.className += ' direction-rtl';
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
        divCarouselWrapper.innerHTML += `<div>${config.caption}</div>`;
      }

      imgEl.onload = () => {
        divCarouselWrapper.className = 'lp-json-pollock-element-image';
      };

      imgEl.onerror = () => {
        divCarouselWrapper.className = 'lp-json-pollock-element-image error';
        divCarouselWrapper.title = 'fail to load image';
        imgEl.style.display = 'none';
      };

      if (config.click && config.click.actions) {
        imgEl.onclick = this.wrapAction(config.click);
      }
      divCarouselWrapper.appendChild(imgEl);

      return divCarouselWrapper;
    });

    this.set('map', (config): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      divCarouselWrapper.className = 'lp-json-pollock-element-map';

      if (config.tooltip) {
        divCarouselWrapper.title = config.tooltip;
        divCarouselWrapper.setAttribute('aria-label', config.tooltip);
      }

      if (config.style) {
        divCarouselWrapper.style.cssText = Utils.styleToCss(config.style);
      }

      if (config.click && config.click.actions) {
        divCarouselWrapper.onclick = this.wrapAction(config.click);
      } else {
        // navigate to the location
        divCarouselWrapper.onclick = () => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${config.lo},${config.la}`, '_blank');
        };
      }
      return divCarouselWrapper;
    });

    this.set('vertical', (): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      divCarouselWrapper.className = 'lp-json-pollock-layout lp-json-pollock-layout-vertical';
      return divCarouselWrapper;
    });

    this.set('carousel', (config): HTMLElement => {
      const ELEMENT_DEFAULT_SIZE = 200;
      const DEFAULT_SPACING = 10;
      const PARSE_DECIMAL = 10;
      const arrowRight = document.createElement('div');
      const arrowLeft = document.createElement('div');

      const divCarouselWrapper = document.createElement('div');
      (divCarouselWrapper: any).afterRender = () => {
        if (divCarouselWrapper.childNodes.length) {
          for (let itemCounter = 0;
               itemCounter < divCarouselWrapper.childNodes.length;
               itemCounter += 1) {
            const node = divCarouselWrapper.childNodes[itemCounter];
            if (itemCounter === 0) {
              (node: any).style['margin-right'] = `${config.padding / 2}px`;
            } else if (itemCounter === (divCarouselWrapper.childNodes.length - 1)) {
              (node: any).style['margin-left'] = `${config.padding / 2}px`;
            } else {
              (node: any).style.margin = `0 ${config.padding / 2}px`;
            }
          }
          arrowRight.className = 'layout-carousel-arrow';
          arrowLeft.className = 'layout-carousel-arrow left';

          const carousel = divCarouselWrapper.cloneNode(true);
          while ((divCarouselWrapper: any).hasChildNodes()) {
            (divCarouselWrapper: any).removeChild(divCarouselWrapper.lastChild);
          }

          divCarouselWrapper.className = 'lp-json-pollock-layout-carousel-wrapper';

          const singleItemWidth = ELEMENT_DEFAULT_SIZE + config.padding;
          const totalWidth = carousel.childNodes.length * singleItemWidth;
          carousel.style.width = `${totalWidth}px`;
          carousel.className = 'lp-json-pollock-layout-carousel';

          divCarouselWrapper.appendChild(carousel);
          divCarouselWrapper.appendChild(arrowRight);
          divCarouselWrapper.appendChild(arrowLeft);
          setTimeout(() => {
            /* check if the viewport width is bigger then the carousel div
             * => remove the arrows */
            if (divCarouselWrapper.offsetWidth > carousel.offsetWidth + DEFAULT_SPACING) {
              (arrowLeft: any).style.visibility = 'hidden';
              (arrowRight: any).style.visibility = 'hidden';
            }
          }, 0);

          arrowRight.onclick = () => {
            let currentPos = 0;
            if ((carousel: any).style.left !== '') {
              currentPos = parseInt((carousel: any).style.left, PARSE_DECIMAL);
            }
            /* when click on the right arrow the carousel div will shift to the left */
            let nextLeft = currentPos - ELEMENT_DEFAULT_SIZE - (config.padding);
            (arrowLeft: any).style.visibility = 'visible';
            (arrowRight: any).style.visibility = 'visible';
            /* check if the the viewport width is bigger then the carousel width + the next "Left"
             * value => shift the carousel div to its rightest point */
            if (divCarouselWrapper.offsetWidth > carousel.offsetWidth + nextLeft) {
              nextLeft = -(carousel.offsetWidth - divCarouselWrapper.offsetWidth) - DEFAULT_SPACING;
              (arrowRight: any).style.visibility = 'hidden';
            }
            (carousel: any).style.left = `${nextLeft}px`;
          };
          arrowLeft.onclick = () => {
            let currentPos = 0;
            if ((carousel: any).style.left !== '') {
              currentPos = parseInt((carousel: any).style.left, PARSE_DECIMAL);
            }
            let nextLeft = currentPos + ELEMENT_DEFAULT_SIZE;
            (arrowRight: any).style.visibility = 'visible';
            if (nextLeft >= 0) {
              nextLeft = 0;
              (arrowLeft: any).style.visibility = 'hidden';
              (arrowRight: any).style.visibility = 'visible';
            }
            (carousel: any).style.left = `${nextLeft}px`;
          };
        }
      };
      return divCarouselWrapper;
    });

    this.set('horizontal', (): HTMLElement => {
      const divCarouselWrapper = document.createElement('div');
      divCarouselWrapper.className = 'lp-json-pollock-layout lp-json-pollock-layout-horizontal';
      (divCarouselWrapper: any).afterRender = () => {
        if (divCarouselWrapper.childNodes.length) {
          const percentage = 100 / divCarouselWrapper.childNodes.length;
          Array.prototype.forEach.call(divCarouselWrapper.childNodes, (node) => {
            const n = node;
            (n: any).style.width = `${percentage}%`;
          });
        }
      };
      return divCarouselWrapper;
    });
  }

  get(type: string): Function {
    return this.elements[type];
  }

  set(type: string, render: Function) {
    this.elements[type] = render;
  }

  wrapAction(clickData: Object): Function {
    return () => {
      if (clickData.actions instanceof Array) {
        clickData.actions.forEach((actionData) => {
          this.events.trigger({
            eventName: actionData.type,
            data: {
              actionData,
              metadata: clickData.metadata,
            },
          });
        });
      }
    };
  }
}
