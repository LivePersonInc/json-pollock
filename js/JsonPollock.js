// @flow
import ElementRendererProvider from './ElementRendererProvider';
import Utils from './Utils';

/*eslint-disable */
const Events = require('chronosjs/dist/min/Events');
/*eslint-enable */

class JsonPollockError extends Error {

  errors: ?Array<Object>;

  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

export default class JsonPollock {

  static TEMPLATE_TYPES: Object = ElementRendererProvider.TYPES;

  provider: ElementRendererProvider;
  events: Events;
  currentNumOfElements: number;
  maxAllowedElements: number;
  schemaValidator: any; // do not change to real type (SchemaValidator)
                        // as this dependency should be injected
  onAfterElementRendered: Function;

  constructor(validator: any) {
    this.events = new Events({ cloneEventData: true, appName: 'json-pollock' });
    this.provider = new ElementRendererProvider(this.events);
    this.maxAllowedElements = 50;
    this.schemaValidator = validator;
  }

  init(config: Object) {
    if (!config) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'maxAllowedElements')) {
      if (!isNaN(config.maxAllowedElements) && config.maxAllowedElements > 0) {
        this.maxAllowedElements = config.maxAllowedElements;
      } else {
        this.maxAllowedElements = 50;
      }
    }
    if (typeof config.onAfterElementRendered === 'function') {
      this.onAfterElementRendered = config.onAfterElementRendered;
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
      if (this.onAfterElementRendered) {
        element = this.onAfterElementRendered(element, elJson);
      }
      if (element) {
        parent.appendChild(element);
        if (Array.isArray(elJson.elements)) {
          elJson.elements.forEach((elementConf) => {
            currentNumOfElements += 1;
            this.renderElement(elementConf, element, currentNumOfElements);
          });
        }
        if (element.afterRender) {
          element.afterRender.call(element, elJson, parent);
        }
      }
    }
  }

  render(json: Object|string): DocumentFragment {
    let jsonObj: Object;
    if (Utils.isString(json)) {
      // This will throws an error if fails
      jsonObj = JSON.parse((json: any));
    } else {
      jsonObj = (json: any);
    }
    this.validate(jsonObj);
    const frag = document.createDocumentFragment();
    const divEl = document.createElement('div');
    divEl.className = 'lp-json-pollock';
    if (!Utils.isLayout(jsonObj.type)) {
      divEl.className += ' lp-json-pollock-single-element';
    }
    frag.appendChild(divEl);
    this.renderElement(jsonObj, divEl);
    return frag;
  }

  validate(json: Object) {
    if (Utils.isObject(json)) {
      if (this.schemaValidator) {
        const validation = this.schemaValidator.validate(json);
        if (!validation.valid) {
          throw new JsonPollockError('Schema validation error, see \'errors\' for more details', validation.errors);
        }
      }
    } else {
      throw new JsonPollockError('JsonPollock::validte - input is not an object');
    }
  }

  registerAction(actionName: string, callback: Function) {
    this.events.bind({
      eventName: actionName,
      func: (EventData) => {
        callback(EventData);
      },
    });
  }

  unregisterAction(actionName: string) {
    this.events.unbind({
      eventName: actionName,
    });
  }

  unregisterAllActions() {
    this.events.unbind({});
  }

  registerElement(elementType: string, render: Function) {
    this.provider.set(elementType, render);
  }
}
