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
  CAROUSELSELECT: 'carouselSelect',
  ACCORDIONSELECT: 'accordionSelect',
  SUBMITBUTTON: 'submitButton',
  CHECKBOX: 'checkbox',
  CHECKLIST: 'checklist',
  LIST: 'list',
  SECTION: 'section',
  SECTIONLIST: 'sectionList',
  BUTTONLIST: 'buttonList',
  TABS: 'tabs',
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

      if (config.subtitle) {
        const btnElSubtitle = document.createElement('span');
        btnElSubtitle.className = 'lp-json-pollock-element-button-subtitle';
        btnElSubtitle.innerHTML = Utils.normalizeHtmlText(config.subtitle);
        btnEl.appendChild(btnElSubtitle);
      }


      if (config.tooltip) {
        btnEl.title = config.tooltip;
        btnEl.setAttribute('aria-label', config.tooltip);
      }

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(btnEl, config.accessibility.web);
      }

      function findJsonPollockParent(element: any): HTMLDivElement | typeof undefined {
        if (!element) {
          return undefined;
        }

        const matches = element.classList.contains('lp-json-pollock');
        if (matches) {
          return element;
        }

        return findJsonPollockParent(element.parentNode);
      }

      const clickData = config.click;

      if (clickData && clickData.actions) {
        btnEl.onclick = (event, formEl) => {
          const newMetadata = [];

          if (config.ref) {
            const jsonPollockElement = findJsonPollockParent(btnEl);

            if (!jsonPollockElement) {
              throw new Error('Cannot find root element selected!');
            }

            let selector;

            switch (config.ref.type) {
              case 'carouselSelect':
                selector = `[data-carousel-name=${config.ref.name}] [data-selected]`;
                break;

              case 'accordionSelect':
                selector = `[data-accordion-name=${config.ref.name}] [data-accordion-body][data-selected]`;
                break;

              default:
                throw new Error(`Invalid config ref type is used for the button! Type: ${config.ref.type}`);
            }

            const selectedNodes = Array.from(jsonPollockElement.querySelectorAll(selector));

            if (selectedNodes.length === 0) {
              throw new Error('No items has selected!');
            }

            const selectedCardsMetadata = selectedNodes
              .map(node => JSON.parse(node.getAttribute('data-metadata') || '[]'))
              .reduce((accumulator, currentMeta) => [...accumulator, ...currentMeta], []);

            newMetadata.push(...selectedCardsMetadata);
          }

          return this.wrapAction({ ...clickData, metadata: newMetadata })(event, formEl);
        };
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
      const accessibilityWeb = config.accessibility && config.accessibility.web;
      const divEl = document.createElement('div');
      divEl.className = 'lp-json-pollock-element-map';

      if (config.tooltip) {
        divEl.title = config.tooltip;
        divEl.setAttribute('aria-label', config.tooltip);
      }

      if (config.style) {
        divEl.style.cssText = Utils.styleToCss(config.style);
      }

      if (accessibilityWeb) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      }
      if (!accessibilityWeb || !accessibilityWeb.tabindex) {
        divEl.setAttribute('tabindex', '0');
      }
      divEl.onkeydown = (event) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          window.open(`https://www.google.com/maps/search/?api=1&query=${config.la},${config.lo}`, '_blank');
        }
      };

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
      if (config.scroll === 'enable') {
        Utils.addClass(divEl, 'lp-json-pollock-layout-vertical-scroll');

        if (config.style && config.style.size) {
          const { size } = config.style;
          let height = 100;

          if (size === 'medium') {
            height = 300;
          } else if (size === 'large') {
            height = 500;
          }

          divEl.setAttribute('style', `height: ${height}px`);
        } else {
          divEl.setAttribute('style', `height: ${100}px`);
        }
      }

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(divEl, config.accessibility.web);
      }
      if (config.metadata) {
        divEl.setAttribute('data-metadata', JSON.stringify(config.metadata));
      }
      return divEl;
    });

    this.set(TYPES.TABS, (config): HTMLElement => {
      const { elements } = config;
      const divEl = document.createElement('div');
      const headerEl = document.createElement('div');
      divEl.appendChild(headerEl);

      let custom = '';
      let customActive = '';
      let customHover = '';
      let currentStyle = '';

      if (config.style) {
        const color = config.style.color;
        const bgColor = config.style['background-color'];
        const colorActive = config.style['color-active'];
        const bgColorActive = config.style['background-color-active'];
        const colorHover = config.style['color-hover'];
        const bgColorHover = config.style['background-color-hover'];
        let borderWidth = 1;

        if (config.style.size) {
          if (config.style.size === 'small') {
            borderWidth = 1;
          } else if (config.style.size === 'medium') {
            borderWidth = 2;
          } else if (config.style.size === 'large') {
            borderWidth = 3;
          }
        }

        custom += color ? `color: ${color}; ` : '';
        custom += color ? `border-bottom: ${borderWidth}px solid ${color}; ` : '';
        custom += bgColor ? `background-color: ${bgColor}; ` : '';

        customActive += colorActive ? `color: ${colorActive}; ` : '';
        customActive += colorActive ? `border-bottom: ${borderWidth}px solid ${colorActive}; ` : '';
        customActive += bgColorActive ? `background-color: ${bgColorActive}; ` : '';

        customHover += colorHover ? `color: ${colorHover}; ` : '';
        customHover += colorHover ? `border-bottom: ${borderWidth}px solid ${colorHover}; ` : '';
        customHover += bgColorHover ? `background-color: ${bgColorHover}; ` : '';
      }

      const openTab = (evt) => {
        const children = divEl.children;
        const buttons = children[0].children;

        const panels = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < children.length; i++) {
          panels.push(children[i]);
        }

        if (panels.length) {
          panels.forEach((panel) => {
            // eslint-disable-next-line no-param-reassign
            panel.style.display = 'none';
          });
        }

        if (!evt) {
          if (custom && customActive) {
            buttons[0].style.cssText = customActive;
            currentStyle = customActive;
          } else {
            buttons[0].className += ' active';
          }
          panels[0].style.display = 'block';
          return;
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          if (custom && customActive) {
            // eslint-disable-next-line no-param-reassign
            button.style.cssText = custom;
          } else {
            // eslint-disable-next-line no-param-reassign
            button.className = button.className.replace(' active', '');
          }
        }

        if (custom && customActive) {
          // eslint-disable-next-line no-param-reassign
          evt.currentTarget.style.cssText = customActive;
          currentStyle = customActive;
        } else {
          // eslint-disable-next-line no-param-reassign
          evt.currentTarget.className += ' active';
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i].style.cssText.trim().toLowerCase() === customActive.trim().toLowerCase()
            && customActive) {
            panels[i].style.display = 'block';
          } else if (buttons[i].className.includes('active')) {
            panels[i].style.display = 'block';
          }
        }
      };

      headerEl.className = 'lp-json-pollock-element-tab';
      elements.forEach((card) => {
        const { tag } = card;
        const btnEl = document.createElement('button');
        btnEl.className = 'lp-json-pollock-element-tab-button';
        if (config.style && config.style.size) {
          btnEl.className += ` lp-json-pollock-element-tab-button-size-${config.style.size}`;
        } else {
          btnEl.className += ' lp-json-pollock-element-tab-button-size-small';
        }

        if (custom) {
          btnEl.style.cssText = custom;
        }

        if (customHover) {
          currentStyle = btnEl.style.cssText;
          btnEl.addEventListener('mouseover', () => {
            currentStyle = btnEl.style.cssText;
            btnEl.style.cssText = customHover;
          }, false);

          btnEl.addEventListener('mouseout', () => {
            btnEl.style.cssText = currentStyle;
          }, false);
        }

        btnEl.id = tag;
        btnEl.textContent = tag;
        btnEl.onclick = (event) => {
          openTab.call(this, event);
        };
        headerEl.appendChild(btnEl);
      });

      (divEl: any).afterRender = () => {
        openTab();
      };

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

      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');
        let arrowBtnStyle = `${splitedStyle.extractedStyle}`;
        // Change color to border:
        const borderStyle = Utils.styleToBorder(config.style);
        if (borderStyle !== '') {
          arrowBtnStyle += ` ${borderStyle}`;
        }
        // Change size to button:
        const buttonSize = Utils.styleToButton(config.style);
        if (buttonSize !== '') {
          arrowBtnStyle += ` ${buttonSize}`;
        }
        // Set all defined style attributes on the button itself
        // Set extractedStyle (in this case background-color) specifically on the button itself
        arrowRight.setAttribute('style', `${arrowBtnStyle}`);
        arrowLeft.setAttribute('style', `${arrowBtnStyle}`);
        // Add style to image directly:
        const svgChildArrowRight = arrowRight.querySelector('.lp-json-pollock-layout-carousel-arrow-icon');
        const svgChildArrowLeft = arrowLeft.querySelector('.lp-json-pollock-layout-carousel-arrow-icon');
        if (svgChildArrowRight) { // right arrow image
          svgChildArrowRight.setAttribute('style', splitedStyle.style);
        }
        if (svgChildArrowLeft) { // left arrow image
          svgChildArrowLeft.setAttribute('style', splitedStyle.style);
        }
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

    this.set(TYPES.CAROUSELSELECT, (config): HTMLElement => {
      const defaultPadding = 0;
      const padding = config.padding || defaultPadding;

      const carouselWrapper = document.createElement('div');
      const carousel = document.createElement('div');

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(carouselWrapper, config.accessibility.web);
      }

      function findCardParent(element: any): HTMLDivElement | typeof undefined {
        if (!element || element.tagName === 'BUTTON') {
          return undefined;
        }

        const index = element.getAttribute('data-carousel-index');
        if (index !== null) {
          return element;
        }

        return findCardParent(element.parentNode);
      }

      function toggleCardSelect(element: HTMLDivElement, selected: boolean) {
        if (selected) {
          element.setAttribute('data-selected', 'true');
          element.classList.add('lp-json-pollock-layout-selected');

          if (config.style && config.style['border-color-selected']) {
            // eslint-disable-next-line no-param-reassign
            element.style.borderColor = config.style['border-color-selected'];
          }
        } else {
          element.removeAttribute('data-selected');
          element.classList.remove('lp-json-pollock-layout-selected');
          // eslint-disable-next-line no-param-reassign
          element.style.borderColor = '';
        }
      }

      /**
       * @param {MouseEvent} event
       * */
      function cardClick(event: MouseEvent) {
        const element = event.target;
        const cardParent = findCardParent(element);

        if (cardParent) {
          if (config.selectMode.type === 'single' && cardParent.parentNode) {
            Array
              .from((cardParent.parentNode: any).querySelectorAll('[data-carousel-index][data-selected]'))
              .filter((carouselElement: HTMLDivElement) => carouselElement !== cardParent)
              .forEach((carouselElement: HTMLDivElement) => {
                toggleCardSelect(carouselElement, false);
              });
          }

          toggleCardSelect(cardParent, cardParent.dataset.selected !== 'true');
        }
      }

      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');

        carousel.style.cssText = splitedStyle.style;
        carousel.setAttribute('style', splitedStyle.extractedStyle);
      }

      /**
       * Render logic
       * */
      (carouselWrapper: any).afterRender = () => {
        const carouselItemsCount = carouselWrapper.children.length;

        if (carouselItemsCount) {
          for (let itemCounter = 0;
               itemCounter < carouselItemsCount;
               itemCounter += 1) {
            const carouselElement: HTMLDivElement =
              (carouselWrapper.children[itemCounter]: any);

            carouselElement.addEventListener('click', cardClick.bind(this), true);
            carouselElement.style.margin = `0 ${padding / 2}px`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
            carouselElement.setAttribute('data-carousel-index', itemCounter.toString());   // Add an index reference for faster lookup on focus changes
            carouselElement.setAttribute('role', 'listitem');
          }

          /* create carousel wrapper */
          while (carouselWrapper.hasChildNodes() && carouselWrapper.lastChild) {
            carousel.insertBefore(carouselWrapper.lastChild, carousel.firstChild);
          }

          carousel.className = 'lp-json-pollock-layout-carousel lp-json-pollock-layout-carousel-select';

          carouselWrapper.className = 'lp-json-pollock-layout-carousel-wrapper';
          carouselWrapper.appendChild(carousel);
          carouselWrapper.setAttribute('data-carousel-name', config.selectMode.name);
        }
      };

      return carouselWrapper;
    });

    this.set(TYPES.ACCORDIONSELECT, (config): HTMLElement => {
      const defaultPadding = 0;
      const padding = config.padding || defaultPadding;

      const accordionWrapper = document.createElement('div');
      const accordion = document.createElement('div');

      const arrowElement = Utils.htmlToElement('<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14"><path d="M0 0 L2 0 L9 7 L2 14 L0 14 L0 13 L6 7 L0 1"/></svg>');

      if (config.accessibility && config.accessibility.web) {
        Utils.appendAttributesFromObject(accordionWrapper, config.accessibility.web);
      }

      function findTabParent(element: any): HTMLDivElement | typeof undefined {
        const index = element.getAttribute('data-accordion-index');
        if (index !== null) {
          return element;
        }

        return findTabParent(element.parentNode);
      }

      function toggleTabSelect(element: HTMLInputElement, selected: boolean) {
        if (selected) {
          element.removeAttribute('data-selected');
          // eslint-disable-next-line no-param-reassign
          element.checked = false;
        } else {
          element.setAttribute('data-selected', 'true');
          // eslint-disable-next-line no-param-reassign
          element.checked = true;
        }
      }

      function toggleBodySelect(element: HTMLDivElement, selected: boolean) {
        if (selected) {
          element.removeAttribute('data-selected');
        } else {
          element.setAttribute('data-selected', 'true');
        }
      }

      function toggleBodyOpen(element: HTMLDivElement, selected: boolean) {
        if (selected) {
          element.setAttribute('data-open', 'true');
          element.classList.remove('lp-json-pollock-layout-accordion-folded');
        } else {
          element.setAttribute('data-open', 'false');
          element.classList.add('lp-json-pollock-layout-accordion-folded');
        }
      }

      function toggleArrowOpen(element: HTMLElement, selected: boolean) {
        if (selected) {
          element.classList.add('open');
          element.classList.remove('close');
        } else {
          element.classList.add('close');
          element.classList.remove('open');
        }
      }

      /**
       * @param {MouseEvent} event
       * */
      function accordionClick(event: MouseEvent) {
        const element: HTMLElement = (event.target: any);
        const isCheckboxClicked = element.tagName === 'INPUT';
        const tabParent = findTabParent(element);

        if (!tabParent) {
          return;
        }

        const checkboxElement: HTMLInputElement = (tabParent.querySelector('.lp-json-pollock-layout-accordion-checkbox'): any);
        const headerElement: HTMLDivElement = (tabParent.querySelector('.lp-json-pollock-layout-accordion-header'): any);
        const bodyElement: HTMLDivElement = (tabParent.querySelector('.lp-json-pollock-layout-accordion'): any);
        const headerArrowElement: HTMLElement = (tabParent.querySelector('.lp-json-pollock-layout-accordion-arrow'): any);

        if (isCheckboxClicked) {
          if (!checkboxElement || !bodyElement) {
            return;
          }

          const selected = checkboxElement.dataset.selected === 'true';

          toggleTabSelect(checkboxElement, selected);
          toggleBodySelect(bodyElement, selected);
          return;
        }

        if (!headerElement || !bodyElement) {
          return;
        }

        const isOpen = bodyElement.dataset.open === 'true';

        toggleBodyOpen(bodyElement, !isOpen);
        toggleArrowOpen(headerArrowElement, !isOpen);
      }

      if (config.style) {
        const style = Utils.styleToCss(config.style);
        const splitedStyle = Utils.extractFromStyles(style, 'background-color');

        accordion.style.cssText = splitedStyle.style;
        accordion.setAttribute('style', splitedStyle.extractedStyle);
      }

    /**
     * Render logic
     * */
      (accordionWrapper: any).afterRender = () => {
        const accordionItemsCount = accordionWrapper.children.length;

        if (accordionItemsCount) {
          for (let itemCounter = 0;
             itemCounter < accordionItemsCount;
             itemCounter += 1) {
            const accordionElement: HTMLDivElement =
            (accordionWrapper.children[0]: any);
            const accordionTitleConfig = config.titles[itemCounter];

            const accordionTabElement = document.createElement('section');
            const accordionHeaderElement = document.createElement('div');
            const accordionCheckboxElement = document.createElement('input');
            const accordionTitleElement = document.createElement('h3');
            const accordionAdditionalElement = document.createElement('span');
            const accordionArrowElement = arrowElement.cloneNode(true);

            accordionTabElement.classList.add('lp-json-pollock-layout-accordion-tab');
            accordionHeaderElement.classList.add('lp-json-pollock-layout-accordion-header');
            accordionCheckboxElement.classList.add('lp-json-pollock-layout-accordion-checkbox');
            accordionTitleElement.classList.add('lp-json-pollock-layout-accordion-title');
            accordionAdditionalElement.classList.add('lp-json-pollock-layout-accordion-additional');
            accordionArrowElement.classList.add('lp-json-pollock-layout-accordion-arrow', 'close');

            accordionElement.classList.add('lp-json-pollock-layout-accordion-folded');
            accordionElement.classList.add('lp-json-pollock-layout-accordion');
            accordionElement.setAttribute('data-open', 'false');
            accordionElement.setAttribute('data-accordion-body', '');

            accordionCheckboxElement.type = 'checkbox';
            accordionTitleElement.innerText = accordionTitleConfig.name;

            if (accordionTitleConfig.additional) {
              accordionAdditionalElement.innerText = accordionTitleConfig.additional;
            }

            accordionHeaderElement.addEventListener('click', accordionClick.bind(this), true);

            accordionTabElement.style.margin = `0 ${padding / 2}px`; // this comment is due to a bug in VSCode js editor :( otherwise ut shows the code below as a comment `
            accordionTabElement.setAttribute('data-accordion-index', itemCounter.toString());   // Add an index reference for faster lookup on focus changes
            accordionTabElement.setAttribute('role', 'listitem');

            accordionHeaderElement.appendChild(accordionCheckboxElement);
            accordionHeaderElement.appendChild(accordionTitleElement);
            accordionHeaderElement.appendChild(accordionAdditionalElement);
            accordionHeaderElement.appendChild(accordionArrowElement);

            accordionTabElement.appendChild(accordionHeaderElement);
            accordionTabElement.appendChild(accordionElement);
            accordionWrapper.appendChild(accordionTabElement);
          }

          /* create accordion wrapper */
          while (accordionWrapper.hasChildNodes() && accordionWrapper.lastChild) {
            accordion.insertBefore(accordionWrapper.lastChild, accordion.firstChild);
          }

          accordion.className = 'lp-json-pollock-layout-accordion lp-json-pollock-layout-accordion-select';

          accordionWrapper.className = 'lp-json-pollock-layout-accordion-wrapper';
          accordionWrapper.appendChild(accordion);
          accordionWrapper.setAttribute('data-accordion-name', config.selectMode.name);
        }
      };

      return accordionWrapper;
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
      if (config.metadata) {
        divEl.setAttribute('data-metadata', JSON.stringify(config.metadata));
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
