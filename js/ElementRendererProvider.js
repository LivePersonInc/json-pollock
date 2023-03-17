// @flow

import Utils from './Utils';
/*eslint-disable */
const Events = require('chronosjs/dist/min/Events');
/*eslint-enable */

const TYPES = {
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  MAP: 'map',
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  CAROUSEL: 'carousel',
  SUBMITBUTTON: 'submitButton',
  CHECKBOX: 'checkbox',
  CHECKLIST: 'checklist',
  LIST: 'list',
  SECTION: 'section',
  SECTIONLIST: 'sectionList',
  BUTTONLIST: 'buttonList',
};

const DATA_SECTION_ID_ATTR = 'data-section-id';

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
      const textEl = document.createElement('span');
      const tooltip = config.tooltip ? Utils.escapeHtml(config.tooltip) : '';
      divEl.className = 'lp-json-pollock-element-text';
      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }
      const style = Utils.styleToCss(config.style);
      const splitedStyle = Utils.extractFromStyles(style, 'background-color');
      divEl.setAttribute('style', splitedStyle.extractedStyle);
      textEl.innerHTML = Utils.normalizeHtmlText(config.text);
      textEl.setAttribute('style', splitedStyle.style);
      textEl.setAttribute('title', tooltip);
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(textEl, config.accessibility.web);
      } else {
        // Backward compatibility
        textEl.setAttribute('aria-label', tooltip);
      }
      divEl.appendChild(textEl);
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

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(btnEl, config.accessibility.web);
      }

      if (config.click && config.click.actions) {
        btnEl.onclick = this.wrapAction(config.click);
      }

      if (config.class !== 'button') {
        if (config.style) {
          const style = Utils.styleToCss(config.style);
          const splitedStyle = Utils.extractFromStyles(style, 'background-color');
          btnEl.style.cssText = splitedStyle.style;
          divEl.setAttribute('style', splitedStyle.extractedStyle);
        }

        divEl.appendChild(btnEl);
      } else {
        const divBt = document.createElement('div');
        divBt.className = 'lp-json-pollock-element-button-button';
        Utils.addClass(divBt, 'class-button');
        if (config.style) {
          const style = Utils.styleToCss(config.style);
          const splitedStyle = Utils.extractFromStyles(style, 'background-color');
          btnEl.style.cssText = splitedStyle.style;
          divBt.setAttribute('style', splitedStyle.extractedStyle);
          const borderStyle = Utils.styleToBorder(config.style);
          if (borderStyle !== '') {
            divBt.setAttribute('style', `${splitedStyle.extractedStyle} ${borderStyle}`);
          }
        }

        divBt.appendChild(btnEl);
        divEl.appendChild(divBt);
      }

      return divEl;
    });

    this.set(TYPES.SUBMITBUTTON, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-submit-button';

      if (config.rtl) {
        divEl.dir = 'rtl';
        Utils.addClass(divEl, 'direction-rtl');
      }

      const sbtEl = document.createElement('input');
      sbtEl.type = 'submit';
      sbtEl.value = Utils.normalizeHtmlText(config.title);

      if (config.disabled) {
        sbtEl.disabled = true;
        sbtEl.classList.add('lp-json-pollock-element-submit-button-disabled');
      }
      if (config.tooltip) {
        sbtEl.title = config.tooltip;
        sbtEl.setAttribute('aria-label', config.tooltip);
      }
      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');
        divEl.setAttribute('style', splitedStyle.extractedStyle);
        sbtEl.style.cssText = splitedStyle.style;
      }
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(sbtEl, config.accessibility.web);
      }

      if (config.click && config.click.actions) {
        sbtEl.onclick = this.wrapAction(config.click, true);
      }

      divEl.appendChild(sbtEl);

      return divEl;
    });

    this.set(TYPES.CHECKBOX, (config): HTMLElement => {
      const randomId = Utils.generateRandomId();
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-checkbox';
      const checkEl = document.createElement('input');
      const normalizedText = Utils.normalizeHtmlText(config.text);
      checkEl.type = 'checkbox';
      checkEl.className = 'lp-json-pollock-element-checkbox-input';
      checkEl.id = randomId;

      const labelEl = document.createElement('label');
      labelEl.className = 'lp-json-pollock-element-checkbox-label';
      labelEl.innerHTML += normalizedText;
      labelEl.setAttribute('for', randomId);
      if (config.rtl) {
        labelEl.dir = 'rtl';
        Utils.addClass(labelEl, 'direction-rtl');
      }
      if (config.tooltip) {
        labelEl.title = config.tooltip;
        labelEl.setAttribute('aria-label', config.tooltip);
      }

      if (config.borderLine) {
        const borderEl = document.createElement('div');
        borderEl.className = 'lp-json-pollock-border-element';
        if (config.borderColor) {
          borderEl.style.borderColor = config.borderColor;
        }
        divEl.appendChild(borderEl);
      }

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(labelEl, config.accessibility.web);
      }

      const chkboxWrapdivEl = document.createElement('div');
      chkboxWrapdivEl.className = 'lp-json-pollock-element-checkbox-wrapper';
      if (config.rtl) {
        chkboxWrapdivEl.dir = 'rtl';
        Utils.addClass(chkboxWrapdivEl, 'direction-rtl');
      }
      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');
        labelEl.style.cssText = style;
        chkboxWrapdivEl.setAttribute('style', splitedStyle.extractedStyle);
      }

      chkboxWrapdivEl.appendChild(checkEl);
      chkboxWrapdivEl.appendChild(labelEl);
      divEl.appendChild(chkboxWrapdivEl);

      (divEl: any).afterRender = (elJson, parent) => {
        const checkBoxEl = divEl.getElementsByTagName('input')[0];
        if (elJson.click && elJson.click.actions) {
          checkBoxEl.onclick = this.wrapAction(elJson.click, false,
            parent.parentElement.getAttribute(DATA_SECTION_ID_ATTR));
        }
      };
      return divEl;
    });

    this.set(TYPES.CHECKLIST, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-checklist';
      divEl.setAttribute('role', 'group');
      if (config.padding) {
        const padding = config.padding;
        (divEl: any).style.margin = `${padding / 2}px 0px`;
      }

      return divEl;
    });

    this.set(TYPES.SECTION, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-section';

      if (config.padding) {
        const padding = config.padding;
        (divEl: any).style.margin = `${padding / 2}px 0px`;
      }
      if (config.sectionID) {
        divEl.setAttribute(DATA_SECTION_ID_ATTR, config.sectionID);
      }
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      }

      return divEl;
    });

    this.set(TYPES.SECTIONLIST, (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-sectionList';
      return divEl;
    });

    this.set(TYPES.BUTTONLIST, (): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout-buttonList';
      return divEl;
    });

    this.set(TYPES.LIST, (): HTMLElement => {
      const formEl = document.createElement('form');
      formEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-form';
      (formEl: any).afterRender = () => {
        const allInputElArr = formEl.querySelectorAll('input');
        if (allInputElArr.length > 0) {
          for (let i = 0; i < allInputElArr.length; i += 1) {
            const inputEl = allInputElArr[i];
            if (inputEl.onclick) {
              const funcToCall = inputEl.onclick;
              inputEl.onclick = (event) => {
                funcToCall.call(this, event, formEl);
              };
            }
          }
        }

        // in form, the type button needs to be added so that the browser does not
        // interpret button elements as submit button and trigger page refresh
        const allBtnElArr = formEl.querySelectorAll('button');
        if (allBtnElArr.length > 0) {
          for (let i = 0; i < allBtnElArr.length; i += 1) {
            const btnEl = allBtnElArr[i];
            if (!btnEl.getAttribute('type')) {
              btnEl.setAttribute('type', 'button');
            }
          }
        }
      };
      return formEl;
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
      if (config.tooltip && config.tooltip.length) {
        divEl.title = config.tooltip;
      }
      if (config.alt && config.alt.length) {
        imgEl.setAttribute('alt', config.alt);
      } else {
        imgEl.setAttribute('alt', '');
        imgEl.setAttribute('role', 'presentation');
      }
      if (config.style) {
        imgEl.style.cssText = Utils.styleToCss(config.style);
      }
      if (config.caption) {
        divEl.innerHTML += `<span>${config.caption}</span>`;
      }
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(imgEl, config.accessibility.web);
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

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      } else if (!config.accessibility.web.tabindex) {
        divEl.setAttribute("tabindex", "0");
        divEl.addEventListener("keyup", function(event) {
          event.preventDefault();
          if (event.keyCode === 13 || event.keyCode === 32) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${config.la},${config.lo}`, '_blank');
          }
        })
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

    this.set(TYPES.VERTICAL, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-vertical';
      if (config.border === 'borderLess') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-borderLess');
      } else if (config.border === 'dropShadow') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-dropShadow');
      }
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      }
      return divEl;
    });

    this.set(TYPES.CAROUSEL, (config): HTMLElement => {
      const defaultPadding = 0;
      const padding = config.padding || defaultPadding;
      let nextLeft = 0;
      const arrowLeft = document.createElement('button');
      const arrowRight = document.createElement('button');
      const divCarouselWrapper = document.createElement('div');
      const a11yDiv = document.createElement('div');
      const carousel = document.createElement('div');
      const carouselOffsetChangedEventName = 'carouselOffsetChange';
      let carouselItemIndex = 0;
      let isRTLDirection = false;
      let cards;

      arrowLeft.setAttribute('type', 'button');
      arrowLeft.setAttribute('aria-label', 'Previous');
      arrowRight.setAttribute('type', 'button');
      arrowRight.setAttribute('aria-label', 'Next');
      a11yDiv.setAttribute('aria-live', 'polite');
      a11yDiv.setAttribute('aria-atomic', 'true');
      arrowLeft.innerHTML = '<svg aria-hidden="true" class="lp-json-pollock-layout-carousel-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14"><path d="M0 0 L2 0 L9 7 L2 14 L0 14 L0 13 L6 7 L0 1"/></svg>';
      arrowRight.innerHTML = '<svg aria-hidden="true" class="lp-json-pollock-layout-carousel-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14"><path d="M0 0 L2 0 L9 7 L2 14 L0 14 L0 13 L6 7 L0 1"/></svg>';
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divCarouselWrapper, config.accessibility.web);
      }

      function setShowingCard(event) {
        if (!cards || !cards[carouselItemIndex]) {
          return;
        }
        nextLeft = `${-1 * cards[carouselItemIndex].offsetLeft}px`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `

        // Right align the last card in the carousel
        if (carouselItemIndex === cards.length - 1) {
          nextLeft = `${-1 * (cards[carouselItemIndex].offsetLeft - (divCarouselWrapper.offsetWidth - cards[carouselItemIndex].offsetWidth))}px`;
        }

        if (this && this.events) {
          this.events.trigger({
            eventName: carouselOffsetChangedEventName,
            data: {
              offset: nextLeft,
              prevOffset: (carousel: any).style.left,
              uiEvent: event,
            },
          });
        }

        (carousel: any).style.left = nextLeft;
      }

      function addA11yLabel() {
        const arrowLabel = `Item ${carouselItemIndex + 1} of ${cards.length}`;
        a11yDiv.setAttribute('aria-label', arrowLabel);
      }

      function rightArrowClicked(event) {
        if (carouselItemIndex === cards.length - 1) {
          carouselItemIndex = 0;
        } else {
          carouselItemIndex += 1;
        }
        addA11yLabel();
        setShowingCard.call(this, event);
      }
      function leftArrowClicked(event) {
        if (carouselItemIndex === 0) {
          carouselItemIndex = cards.length - 1;
        } else {
          carouselItemIndex -= 1;
        }
        addA11yLabel();
        setShowingCard.call(this, event);
      }
      function findCardIndex(element) {
        if (!element) return undefined;
        const index = element.getAttribute('data-carousel-index');
        if (index) {
          return index;
        }
        return findCardIndex(element.parentNode);
      }
      function cardFocus(event) {
        const element = event.target;
        const cardIndex = findCardIndex(element);

        if (!cardIndex) {
          return;
        }

        divCarouselWrapper.scrollLeft = 0;
        // if the currently focused card is not the carouselItem being shown, show the focused card
        if (cardIndex && carouselItemIndex !== parseInt(cardIndex, 10)) {
          carouselItemIndex = parseInt(cardIndex, 10);
          setShowingCard.call(this, event);
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
            (node: any).setAttribute('data-carousel-index', itemCounter);   // Add an index reference for faster lookup on focus changes
            (node: any).setAttribute('role', 'listitem');
          }

          arrowRight.className = 'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow';
          arrowLeft.className = 'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow left';

          /* create carousel wrapper */
          while ((divCarouselWrapper: any).hasChildNodes()) {
            (carousel: any).insertBefore(divCarouselWrapper.lastChild, carousel.firstChild);
          }

          divCarouselWrapper.appendChild(carousel);
          carousel.className = 'lp-json-pollock-layout-carousel';
          divCarouselWrapper.setAttribute('aria-label', 'Carousel with buttons');
          divCarouselWrapper.className = 'lp-json-pollock-layout-carousel-wrapper';
          (carousel: any).setAttribute('role', 'list');
          divCarouselWrapper.appendChild(arrowLeft);
          divCarouselWrapper.appendChild(arrowRight);
          divCarouselWrapper.appendChild(carousel);
          divCarouselWrapper.appendChild(a11yDiv);
          /* TODO: find other trigger. */
          setTimeout(() => {
            /* check if the viewport width is bigger then the carousel div
             * => remove the arrows */
            if (divCarouselWrapper.offsetWidth > carousel.offsetWidth) {
              (arrowLeft: any).style.visibility = 'hidden';
              (arrowRight: any).style.visibility = 'hidden';
            }
            // Set up card reference for carousel
            cards = carousel.children;
            isRTLDirection = window.getComputedStyle(arrowRight).direction === 'rtl';

            if (isRTLDirection) {
              arrowLeft.style.visibility = 'visible';
              arrowRight.style.visibility = 'visible';
              carouselItemIndex = cards.length - 1;
              cards = [].slice.call(cards, 0).reverse();
              nextLeft = `${-1 * (cards[carouselItemIndex].offsetLeft - (divCarouselWrapper.offsetWidth - cards[carouselItemIndex].offsetWidth))}px`;
              (carousel: any).style.left = nextLeft;
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

    this.set(TYPES.HORIZONTAL, (config): HTMLElement => {
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-layout lp-json-pollock-layout-horizontal';
      if (config.border === 'borderLess') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-borderLess');
      } else if (config.border === 'dropShadow') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-dropShadow');
      } else if ((config.borderLine !== undefined && config.borderLine === false) && config.border !== 'border') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-borderLess');
      }
      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      }
      (divEl: any).afterRender = () => {
        if (divEl.childNodes.length) {
          const percentages = config.percentages;
          let percentage = 100 / divEl.childNodes.length;
          // If percentages array not cover all nodes, calculate the rest of the nodes percentage
          if (percentages && percentages.length > 0
              && percentages.length < divEl.childNodes.length) {
            const totalPercentagesInArray = percentages.reduce((a, b) => a + b, 0);
            percentage = (100 - totalPercentagesInArray) /
              (divEl.childNodes.length - percentages.length);
          }
          Array.prototype.forEach.call(divEl.childNodes, (node, index) => {
            const n = node;
            const nodePercentage = (percentages && percentages[index]) || percentage;
            (n: any).style.width = `${nodePercentage}%`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
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

  wrapAction(clickData: Object, preventDefault?: boolean, groupID?: String): Function {
    return (event, formEl) => {
      if (preventDefault && event && event.preventDefault) {
        event.preventDefault();
      }
      if (clickData.actions instanceof Array) {
        clickData.actions.forEach((actionData) => {
          const dataObj: { [key: string]: any } = {
            actionData,
            metadata: clickData.metadata,
            uiEvent: event,
          };
          if (groupID) {
            dataObj.groupID = groupID;
          }
          if (formEl) {
            dataObj.formEl = formEl;
          }

          this.events.trigger({
            eventName: actionData.type,
            data: dataObj,
          });
        });
      }
    };
  }
}
