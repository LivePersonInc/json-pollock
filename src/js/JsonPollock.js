import { EventEmitter } from 'eventemitter3';
import ElementRendererProvider from './ElementRendererProvider';
import Utils from './Utils';

class JsonPollockError extends Error {
  /** @type Array<object>; */
  errors = [];

  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

export default class JsonPollock {
  static TEMPLATE_TYPES = ElementRendererProvider.TYPES;

  /** @type {ElementRendererProvider} */
  provider;
  /** @type {EventEmitter} */
  events;
  /** @type {number} */
  currentNumOfElements;
  /** @type {number} */
  maxAllowedElements;
  /** @type {{  validate: (json: any) => { valid: boolean, errors?: any[] | undefined }} */
  schemaValidator;
  /** @type {Function} */
  onAfterElementRendered;

  constructor(validator) {
    this.events = new EventEmitter('json-pollock');
    this.provider = new ElementRendererProvider(this.events);
    this.maxAllowedElements = 50;
    this.schemaValidator = validator;
  }

  /**
   * @param {Object} config - The configuration object.
   * @param {number} [config.maxAllowedElements] - The maximum number of elements allowed.
   * @param {Function} [config.onAfterElementRendered]
   */
  init(config) {
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

  /**
   * @param {Object} elJson
   * @param {HTMLElement} parent
   * @param {number} [numOfElements=0]
   * @return {*}
   */
  renderElement(elJson, parent, numOfElements = 0) {
    if (numOfElements > this.maxAllowedElements) {
      return;
    }
    let currentNumOfElements = numOfElements;
    const elementRenderer = this.provider.get(elJson.type);
    /** @type {HTMLElement | undefined} */
    let element;
    if (elementRenderer) {
      element = elementRenderer(elJson);
      if (this.onAfterElementRendered) {
        element = this.onAfterElementRendered(element, elJson);
      }
      if (element) {
        parent.appendChild(element);
        if (Array.isArray(elJson.elements)) {
          elJson.elements.forEach((elementConf) => {
            // Create the element for the current elementConf
            const childElementRenderer = this.provider.get(elementConf.type);
            let childElement;
            if (childElementRenderer) {
              childElement = childElementRenderer(elementConf);
              // Check if the child element is the container
              if (!childElement.classList.contains('lp-json-pollock-layout')) {
                currentNumOfElements += 1;
              }
              this.renderElement(elementConf, element, currentNumOfElements);
            }
          });
        }
        if (element.afterRender) {
          element.afterRender.call(element, elJson, parent);
        }
      }
    }
  }

  /**
   * @param {(Object|string)} json
   * @return {DocumentFragment}
   */
  render(json) {
    let jsonObj;
    if (Utils.isString(json)) {
      // This will throws an error if fails
      jsonObj = JSON.parse(json);
    } else {
      jsonObj = json;
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

  /**
   * @param {Object} json
   */
  validate(json) {
    if (Utils.isObject(json)) {
      if (this.schemaValidator) {
        const validation = this.schemaValidator.validate(json);
        if (!validation.valid) {
          throw new JsonPollockError(
            "Schema validation error, see 'errors' for more details",
            validation.errors,
          );
        }
      }
    } else {
      throw new JsonPollockError('JsonPollock::validte - input is not an object');
    }
  }

  /**
   * @param {string} actionName
   * @param {Function} callback
   */
  registerAction(actionName, callback) {
    this.events.on(actionName, (eventData) => callback(eventData));
  }

  /**
   * @param {string} actionName
   */
  unregisterAction(actionName) {
    this.events.removeListener(actionName);
  }

  unregisterAllActions() {
    this.events.removeAllListeners();
  }

  /**
   * @param {string} elementType
   * @param {Function} render
   */
  registerElement(elementType, render) {
    this.provider.set(elementType, render);
  }
}
