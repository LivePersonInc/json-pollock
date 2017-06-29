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
      divEl.className = 'lp-json-pollock-element-text';
      if (config.rtl) {
        divEl.className += ' direction-rtl';
      }
      divEl.innerHTML = `<span style="${Utils.styleToCss(config.style)}" title="${config.tooltip || ''}" aria-label="${config.tooltip || ''}">${config.text}</span>`;
      return divEl;
    });

    this.set('button', (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-button';

      if (config.rtl) {
        divEl.className += ' direction-rtl';
      }

      const btnEl = document.createElement('button');
      btnEl.textContent = config.title;

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
        divEl.innerHTML += `<div>${config.caption}</div`;
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

    this.set('vertical', (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-vertical';
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
