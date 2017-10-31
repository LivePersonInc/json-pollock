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
