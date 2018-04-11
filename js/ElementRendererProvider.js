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
      const divEl = document.createElement('div');
      const tooltip = config.tooltip ? Utils.escapeHtml(config.tooltip) : '';
      divEl.className = 'lp-json-pollock-element-text';
      if (config.rtl) {
        divEl.dir = 'rtl';
        divEl.className += ' direction-rtl';
      }
      divEl.innerHTML = `<span style="${Utils.styleToCss(config.style)}" title="${tooltip}" aria-label="${tooltip}">${Utils.normalizeHtmlText(config.text)}</span>`;
      return divEl;
    });

    this.set('button', (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-button';

      if (config.rtl) {
        divEl.dir = 'rtl';
        divEl.className += ' direction-rtl';
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

      divEl.appendChild(btnEl);

      return divEl;
    });

    this.set('image', (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-image loading';

      if (config.rtl) {
        divEl.dir = 'rtl';
        divEl.className += ' direction-rtl';
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
        divEl.innerHTML += `<div>${config.caption}</div>`;
      }

      imgEl.onload = () => {
        divEl.className = 'lp-json-pollock-element-image';
      };

      imgEl.onerror = () => {
        divEl.className = 'lp-json-pollock-element-image error';
        divEl.title = 'fail to load image';
        imgEl.style.display = 'none';
      };

      if (config.click && config.click.actions) {
        imgEl.onclick = this.wrapAction(config.click);
      }
      divEl.appendChild(imgEl);

      return divEl;
    });

    this.set('map', (config): HTMLElement => {
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
          window.open(`https://www.google.com/maps/search/?api=1&query=${config.lo},${config.la}`, '_blank');
        };
      }
      return divEl;
    });

    this.set('vertical', (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-vertical';
      return divEl;
    });

    this.set('carousel', (config): HTMLElement => {
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
      (divCarouselWrapper: any).afterRender = () => {
        if (divCarouselWrapper.childNodes.length) {
          for (let itemCounter = 0;
               itemCounter < divCarouselWrapper.childNodes.length;
               itemCounter += 1) {
            const node = divCarouselWrapper.childNodes[itemCounter];
            (node: any).style.margin = `0 ${padding / 2}px`;
          }

          arrowRight.className = 'lp-json-pollock-layout-carousel-arrow';
          arrowLeft.className = 'lp-json-pollock-layout-carousel-arrow left';

          /* create carousel wrapper */
          while ((divCarouselWrapper: any).hasChildNodes()) {
            (carousel: any).appendChild(divCarouselWrapper.lastChild);
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
          };
          arrowLeft.onclick = (event) => {
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
            (carousel: any).style.left = `${nextLeft}px`;
          };
        }
      };
      return divCarouselWrapper;
    });

    this.set('horizontal', (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-horizontal';
      (divEl: any).afterRender = () => {
        if (divEl.childNodes.length) {
          const percentage = 100 / divEl.childNodes.length;
          Array.prototype.forEach.call(divEl.childNodes, (node) => {
            const n = node;
            (n: any).style.width = `${percentage}%`;
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
