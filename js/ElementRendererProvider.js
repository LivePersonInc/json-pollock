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
      const ELEMENT_DEFAULT_SIZE = 200;
      const DEFAULT_SPACING = 10;
      const PARSE_DECIMAL = 10;
      const arrowRight = document.createElement('div');
      const arrowLeft = document.createElement('div');

      const divEl = document.createElement('div');
      (divEl: any).afterRender = () => {
        if (divEl.childNodes.length) {
          for (let itemCounter = 0; itemCounter < divEl.childNodes.length; itemCounter += 1) {
            const node = divEl.childNodes[itemCounter];
            if (itemCounter === 0) {
              (node: any).style['margin-right'] = `${config.padding / 2}px`;
            } else if (itemCounter === (divEl.childNodes.length - 1)) {
              (node: any).style['margin-left'] = `${config.padding / 2}px`;
            } else {
              (node: any).style.margin = `0 ${config.padding / 2}px`;
            }
          }
          arrowRight.className = 'layout-carousel-arrow';
          arrowLeft.className = 'layout-carousel-arrow left';

          const carousel = divEl.cloneNode(true);
          while ((divEl: any).hasChildNodes()) {
            (divEl: any).removeChild(divEl.lastChild);
          }

          divEl.className = 'lp-json-pollock-layout-carousel-wrapper';

          const singleItemWidth = ELEMENT_DEFAULT_SIZE + config.padding;
          const totalWidth = carousel.childNodes.length * singleItemWidth;
          carousel.style.width = `${totalWidth}px`;
          carousel.className = 'lp-json-pollock-layout-carousel';

          divEl.appendChild(carousel);
          divEl.appendChild(arrowRight);
          divEl.appendChild(arrowLeft);
          setTimeout(() => {
            if (divEl.clientWidth > carousel.clientWidth + DEFAULT_SPACING) {
              (arrowLeft: any).style.visibility = 'hidden';
              (arrowRight: any).style.visibility = 'hidden';
            }
          }, 0);

          arrowRight.onclick = () => {
            let currentPos = 0;
            if ((carousel: any).style.left !== '') {
              currentPos = parseInt((carousel: any).style.left, PARSE_DECIMAL);
            }
            let nextLeft = currentPos - ELEMENT_DEFAULT_SIZE - (config.padding);
            (arrowLeft: any).style.visibility = 'visible';
            (arrowRight: any).style.visibility = 'visible';
            if (divEl.clientWidth > carousel.clientWidth + nextLeft) {
              nextLeft = -(carousel.clientWidth - divEl.clientWidth) - DEFAULT_SPACING;
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
      return divEl;
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
