// @flow
// import jsonschema from 'jsonschema';
import ElementRendererProvider from './ElementRendererProvider';
/*eslint-disable */
const Events = require('Chronosjs/dist/min/Events');
/*eslint-enable */

export default class LPJsonPollock {

  provider: ElementRendererProvider;
  events: Events;
  currentNumOfElements: number;
  maxAllowedElements: number;

  constructor() {
    this.events = new Events({ cloneEventData: true });
    this.provider = new ElementRendererProvider(this.events);
    this.maxAllowedElements = 50;
  }

  init(config: Object) {
    if (!config) {
      return;
    }
    if (!isNaN(config.maxAllowedElements)) {
      this.maxAllowedElements = config.maxAllowedElements;
    }
  }

  renderElement(elJson: Object, parent: HTMLElement, numOfElements: number = 0) {
    if (numOfElements >= this.maxAllowedElements) {
      return;
    }
    let currentNumOfElements = numOfElements;
    const elementRenderer = this.provider.get(elJson.type);
    let element: HTMLElement;
    if (elementRenderer) {
      element = elementRenderer(elJson);
      if (element) {
        parent.appendChild(element);
        if (Array.isArray(elJson.elements)) {
          elJson.elements.forEach((elementConf) => {
            currentNumOfElements += 1;
            this.renderElement(elementConf, element, currentNumOfElements);
          });
        }
      }
    }
  }

  render(json: Object): DocumentFragment {
    // TODO: once jsonschems is available replace validation with jsonschema.Validator();
    const frag = document.createDocumentFragment();
    const divEl = document.createElement('div');
    divEl.className = 'lp-json-pollock';
    frag.appendChild(divEl);
    this.renderElement(json, divEl);
    return frag;
  }

  registerAction(actionName: string, callback: Function) {
    this.events.bind({
      eventName: actionName,
      func: (EventData) => {
        callback(EventData);
      },
    });
  }

  registerElement(elementType: string, render: Function) {
    this.provider.set(elementType, render);
  }
}
