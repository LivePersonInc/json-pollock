/* eslint-disable no-unused-vars */
const jsonPollockInstance = require('../dist/json-pollock.bundle.min');
import { JSDOM } from 'jsdom';

describe('json-pollock tests', () => {
  let pollockContainer;
  let dom;

  function addToBody(element) {
    pollockContainer.innerHTML = '';
    pollockContainer.appendChild(element);
    return pollockContainer;
  }

  beforeAll(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    global.navigator = dom.window.navigator;

    pollockContainer = document.createElement('div');
    document.body.appendChild(pollockContainer);
  });

  beforeEach(() => {
    // jsonPollockInstance = new JsonPollock(); // TODO: actually, we don't have this class exported in bundle
    jsonPollockInstance.init({ maxAllowedElements: 100 });
  });

  afterAll(() => {
    delete global.document;
    delete global.window;
    delete global.navigator;
  });

  const card = {
    type: 'vertical',
    elements: [
      {
        type: 'image',
        url: 'assets/iphone-8-concept.jpg',
        tooltip: 'image tooltip',
        alt: 'image alt',
        caption: 'this is a caption',
        accessibility: {
          web: {
            tabindex: '5',
          },
        },
        click: {
          actions: [
            {
              type: 'navigate',
              name: 'Navigate to store via image',
              lo: 23.423423,
              la: 2423423423,
            },
          ],
        },
      },
      {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
        style: {
          bold: true,
          italic: true,
          color: 'red',
          size: 'large',
          'background-color': 'green',
        },
      },
      {
        type: 'button',
        tooltip: 'button tooltip',
        title: 'Add to cart',
        alt: 'alt text',
        click: {
          actions: [
            {
              type: 'link',
              name: 'add to cart',
              uri: 'http://example.jpg',
            },
          ],
        },
        style: {
          bold: false,
          italic: false,
          color: 'red',
          size: 'medium',
          'background-color': 'green',
        },
      },
      {
        type: 'map',
        lo: 64.128597,
        la: -21.89611,
        tooltip: 'map tooltip',
      },
      {
        type: 'image',
        url: 'assets/iphone-8-concept.jpg',
        tooltip: 'image tooltip',
        alt: '',
        caption: 'this is a caption',
        accessibility: {
          web: {
            tabindex: '5',
          },
        },
      },
    ],
  };

  const carouselConf = {
    type: 'carousel',
    padding: 10,
    elements: [
      {
        type: 'vertical',
        elements: [
          {
            type: 'text',
            text: '1',
            tooltip: '1',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Twelve month plan BYO mobile',
            tooltip: 'Twelve month plan BYO mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_1',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'SIM only plan',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'vertical',
        elements: [
          {
            type: 'text',
            text: '2',
            tooltip: '2',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Two year plan leasing a mobile',
            tooltip: 'Two year plan leasing a mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_2',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'Two year plan leasing a mobile',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'vertical',
        elements: [
          {
            type: 'text',
            text: '3',
            tooltip: '3',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Two year plan with a mobile',
            tooltip: 'Two year plan with a mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_3',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'Mobiles on a plan',
                },
              ],
            },
          },
        ],
      },
    ],
    accessibility: {
      web: {
        'aria-label': 'Carousel',
      },
    },
  };

  const carouselSelectConf = {
    type: 'carouselSelect',
    padding: 10,
    selectMode: {
      name: 'test-carousel-multi-select',
      type: 'multiple', // "single" // selected items - which user has been selected
    },
    style: {
      'border-color-selected': 'red',
    },
    elements: [
      {
        type: 'vertical',
        metadata: [
          {
            type: 'ExternalCardId',
            id: 'ANOTHER_ONE_1',
          },
        ],
        elements: [
          {
            type: 'text',
            text: 'a',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Twelve month plan BYO mobile',
            tooltip: 'Twelve month plan BYO mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_1',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'SIM only plan',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'vertical',
        metadata: [
          {
            type: 'ExternalCardId',
            id: 'ANOTHER_ONE_2',
          },
        ],
        elements: [
          {
            type: 'text',
            text: 'b',
            tooltip: 'Swap plan',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Two year plan leasing a mobile',
            tooltip: 'Two year plan leasing a mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_2',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'Two year plan leasing a mobile',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'vertical',
        metadata: [
          {
            type: 'ExternalCardId',
            id: 'ANOTHER_ONE_3',
          },
        ],
        elements: [
          {
            type: 'text',
            text: 'c',
            tooltip: 'Mobiles on a plan',
            rtl: false,
            style: {
              bold: false,
              italic: false,
              color: '#000000',
              size: 'large',
            },
          },
          {
            type: 'text',
            text: 'Two year plan with a mobile',
            tooltip: 'Two year plan with a mobile',
            rtl: false,
            style: {
              bold: true,
              italic: false,
              color: '#000000',
            },
          },
          {
            type: 'button',
            tooltip: 'Choose a plan',
            title: 'Choose a plan',
            click: {
              metadata: [
                {
                  type: 'ExternalId',
                  id: 'ANOTHER_ONE_3',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'Mobiles on a plan',
                },
              ],
            },
          },
        ],
      },
      {
        type: 'button',
        title: 'Submit selected',
        ref: {
          type: 'carouselSelect',
          name: 'test-carousel-multi-select',
        },
        click: {
          metadata: [
            {
              type: 'ExternalId',
              id: 'ANOTHER_ONE_3',
            },
          ],
          actions: [
            {
              type: 'publishText',
              text: 'Mobiles on a plan',
            },
          ],
        },
      },
    ],
  };

  const vulnerableContent = {
    type: 'vertical',
    elements: [
      {
        type: 'image',
        url: 'assets/iphone-8-concept.jpg',
        tooltip: 'image tooltip',
        alt: 'image alt',
        caption: 'this is a caption',
        accessibility: {
          web: {
            tabindex: '5',
          },
        },
        click: {
          actions: [
            {
              type: 'navigate',
              name: 'Navigate to store via image',
              lo: 23.423423,
              la: 2423423423,
            },
          ],
        },
      },
      {
        type: 'text',
        text: '<i\u0000 onmouseover=alert(1); style="padding: 100px; background: red;" \u000aea>jjj<b>Test bold</b>',
        tooltip: 'text tooltip',
        style: {
          bold: true,
          italic: true,
          color: 'red',
          size: 'large',
          'background-color': 'green',
        },
      },
      {
        type: 'button',
        tooltip: 'button tooltip',
        title:
          '<i\u0000 onmouseover=alert(1); style="padding: 100px; background: red;" \u000aea>jjj',
        alt: 'alt text',
        click: {
          actions: [
            {
              type: 'link',
              name: 'add to cart',
              uri: 'http://example.jpg',
            },
          ],
        },
        style: {
          bold: false,
          italic: false,
          color: 'red',
          size: 'medium',
          'background-color': 'green',
        },
      },
      {
        type: 'map',
        lo: 64.128597,
        la: -21.89611,
        tooltip: 'map tooltip',
      },
      {
        type: 'image',
        url: 'assets/iphone-8-concept.jpg',
        tooltip: 'image tooltip',
        alt: '',
        caption: 'this is a caption',
        accessibility: {
          web: {
            tabindex: '5',
          },
        },
      },
    ],
  };

  it('should expose public function', () => {
    expect(jsonPollockInstance.init).toBeDefined();
    expect(jsonPollockInstance.render).toBeDefined();
    expect(jsonPollockInstance.registerAction).toBeDefined();
    expect(jsonPollockInstance.unregisterAction).toBeDefined();
    expect(jsonPollockInstance.unregisterAllActions).toBeDefined();
    expect(jsonPollockInstance.validate).toBeDefined();
  });

  describe('render basic elements', () => {
    let fragEl;
    let rooEl;

    beforeAll(() => {
      fragEl = jsonPollockInstance.render(card);
      rooEl = addToBody(fragEl);
    });

    it('Root should be a DocumentFragment instance', () => {
      expect(fragEl).toBeInstanceOf(DocumentFragment);
    });

    it('should expose public function', () => {
      expect(jsonPollockInstance.init).toBeDefined();
      expect(jsonPollockInstance.render).toBeDefined();
      expect(jsonPollockInstance.registerAction).toBeDefined();
      expect(jsonPollockInstance.unregisterAction).toBeDefined();
      expect(jsonPollockInstance.unregisterAllActions).toBeDefined();
      expect(jsonPollockInstance.validate).toBeDefined();
    });

    it("All rendered elements should be wrapped with a div with a 'lp-json-pollock' class", () => {
      expect(rooEl.childNodes.length).toBe(1);
      expect(rooEl.childNodes[0].localName).toBe('div');
      expect(rooEl.childNodes[0].className).toBe('lp-json-pollock');
    });

    it('A single container of type layout (horizontal/vertical) is allowed', () => {
      const wrapdiv = rooEl.childNodes[0];
      expect(wrapdiv.childNodes.length).toBe(1);
      expect(wrapdiv.childNodes[0].localName).toBe('div');
      expect(wrapdiv.childNodes[0].className).toBe(
        'lp-json-pollock-layout lp-json-pollock-layout-vertical',
      );
      expect(wrapdiv.childNodes[0].childNodes.length).toBe(5);
    });

    it('An element of type button should be created', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.childNodes[2].localName).toBe('div');
      expect(layout.childNodes[2].className).toBe('lp-json-pollock-element-button');
      expect(layout.childNodes[2].childNodes[0].localName).toBe('button');
      expect(layout.childNodes[2].childNodes[0].title).toBe('button tooltip');
      expect(layout.childNodes[2].childNodes[0].textContent).toBe('Add to cart');
    });

    it('Check for style generation of text element', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.childNodes[1].childNodes[0].style).toBeDefined();
      expect(layout.childNodes[1].childNodes[0].style.color).toBe('red');
      expect(layout.childNodes[1].childNodes[0].style.fontWeight).toBe('bold');
      expect(layout.childNodes[1].childNodes[0].style.fontSize).toBe('17px');
      expect(layout.childNodes[1].childNodes[0].style.fontStyle).toBe('italic');
      expect(layout.childNodes[1].childNodes[0].style.backgroundColor).not.toBe('green');
      expect(layout.childNodes[1].style.backgroundColor).toBe('green');
    });

    it('Check for style generation of button element', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.childNodes[2].childNodes[0].style).toBeDefined();
      expect(layout.childNodes[2].childNodes[0].style.color).toBe('red');
      expect(layout.childNodes[2].childNodes[0].style.fontWeight).toBe('');
      expect(layout.childNodes[2].childNodes[0].style.fontSize).toBe('13px');
      expect(layout.childNodes[2].childNodes[0].style.fontStyle).toBe('');
      expect(layout.childNodes[2].childNodes[0].style.backgroundColor).not.toBe('green');
      expect(layout.childNodes[2].style.backgroundColor).toBe('green');
    });

    it('An element of type map should be created', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.childNodes[3].localName).toBe('div');
      expect(layout.childNodes[3].className).toBe('lp-json-pollock-element-map');
      expect(layout.childNodes[3].title).toBe('map tooltip');
    });

    it('An element of type text should be created', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.childNodes[1].localName).toBe('div');
      expect(layout.childNodes[1].className).toBe('lp-json-pollock-element-text');
      expect(layout.childNodes[1].childNodes[0].localName).toBe('span');
      expect(layout.childNodes[1].childNodes[0].title).toBe('text tooltip');
      expect(layout.childNodes[1].childNodes[0].textContent).toBe('product name (Title)');
    });

    it('An image element should contain appropriate alt attribute', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      const image = layout.childNodes[0].childNodes[1];
      expect(image.getAttribute('alt')).toBe('image alt');
    });

    it('An image element without an alt should contain presentation role attribute', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      const image = layout.childNodes[4].childNodes[1];
      expect(image.getAttribute('role')).toBe('presentation');
    });

    it('An image element should contain a11y tabindex attribute', () => {
      const layout = rooEl.childNodes[0].childNodes[0];
      const image = layout.childNodes[0].childNodes[1];
      expect(image.getAttribute('tabindex')).toBe('5');
    });

    xit('An element of type image should be created', (done) => {
      const mockImage = {
        onload: null,
        onerror: null,
        src: '',
      };
      global.Image = jest.fn(() => mockImage); // Mock the Image constructor

      fragEl = jsonPollockInstance.render(card);
      const layout = fragEl.childNodes[0].childNodes[0];
      const imageContainer = layout.childNodes[0];
      const imgElement = imageContainer.childNodes[1];

      expect(layout.childNodes[0].localName).toBe('div');
      expect(layout.childNodes[0].className).toContain('lp-json-pollock-element-image');
      expect(layout.childNodes[0].className).toContain('loading');
      expect(layout.childNodes[0].childNodes[0].localName).toBe('span');
      expect(layout.childNodes[0].childNodes[0].textContent).toBe('this is a caption');
      expect(imgElement.localName).toBe('img');
      expect(imgElement.src).toContain('assets/iphone-8-concept.jpg');
      expect(imgElement.alt).toBe('image alt');
      expect(imageContainer.title).toBe('image tooltip');

      // Simulate image loading
      mockImage.onload();
      expect(layout.childNodes[0].className).toBe('lp-json-pollock-element-image');
      done();
    });

    xit('Image with wrong url should be created with error class', (done) => {
      const errImg = {
        type: 'image',
        url: 'http://example.jpg',
        click: {
          actions: [
            {
              type: 'navigate',
              name: 'Navigate to store via image',
              lo: 23.423423,
              la: 2423423423,
            },
          ],
        },
      };

      fragEl = jsonPollockInstance.render(errImg);
      const layout = fragEl.childNodes[0].childNodes[0];
      const image = layout.childNodes[0];

      expect(layout.localName).toBe('div');
      expect(layout.className).toContain('lp-json-pollock-element-image');
      expect(layout.className).toContain('loading');
      expect(layout.childNodes[0].localName).toBe('img');
      expect(layout.childNodes[0].src).toContain('http://example.jpg/');
      expect(layout.childNodes[0].getAttribute('role')).toBe('presentation');

      const origOnError = image.childNodes[0].onerror;
      image.childNodes[0].onerror = function () {
        if (origOnError) {
          origOnError.apply(this);
        }
        expect(layout.className).toBe('lp-json-pollock-element-image error'); // TODO: will help later with error image
        done();
      };
      addToBody(fragEl);
    });
  });

  describe('render rtl elements', () => {
    const rtlCard = {
      type: 'vertical',
      elements: [
        {
          type: 'image',
          url: 'assets/iphone-8-concept.jpg',
          tooltip: 'image tooltip',
          alt: 'image alt',
          caption: 'first image',
          rtl: true,
          click: {
            actions: [
              {
                type: 'navigate',
                name: 'Navigate to store via image',
                lo: 23.423423,
                la: 2423423423,
              },
            ],
          },
        },
        {
          type: 'image',
          url: '/wrong_url',
          tooltip: 'image tooltip',
          alt: 'image alt',
          caption: 'secund image',
          rtl: true,
          click: {
            actions: [
              {
                type: 'navigate',
                name: 'Navigate to store via image',
                lo: 23.423423,
                la: 2423423423,
              },
            ],
          },
        },
        {
          type: 'text',
          text: 'אייפון 8',
          tooltip: 'text tooltip',
          rtl: true,
          style: {
            bold: true,
            italic: true,
            color: 'red',
            size: 'large',
          },
        },
        {
          type: 'button',
          tooltip: 'button tooltip',
          title: 'קנה',
          rtl: true,
          click: {
            actions: [
              {
                type: 'link',
                name: 'add to cart',
                uri: 'http://example.jpg',
              },
            ],
          },
        },
      ],
    };

    let fragEl;
    let rooEl;

    beforeAll(() => {
      fragEl = jsonPollockInstance.render(rtlCard);
      rooEl = addToBody(fragEl);
    });

    function verifyRTL(el) {
      expect(el.className).toContain('direction-rtl');
      expect(el.dir).toBe('rtl');
    }

    xit("image element should have dir=rtl and 'direction-rtl' class", (done) => {
      fragEl = jsonPollockInstance.render(rtlCard);
      const image = fragEl.childNodes[0].childNodes[0].childNodes[0];
      const origOnload = image.childNodes[1].onload;
      image.childNodes[1].onload = function () {
        if (origOnload) {
          origOnload.apply(this);
        }
        verifyRTL(image);
        done();
      };
      addToBody(fragEl);
    });

    xit("broken image element should still have dir=rtl and 'direction-rtl' class", (done) => {
      fragEl = jsonPollockInstance.render(rtlCard);
      const image = fragEl.childNodes[0].childNodes[0].childNodes[1];
      const origOnError = image.childNodes[1].onerror;
      image.childNodes[1].onerror = function () {
        if (origOnError) {
          origOnError.apply(this);
        }
        verifyRTL(image);
        done();
      };
      addToBody(fragEl);
    });

    it("text element should have dir=rtl and 'direction-rtl' class", () => {
      const text = rooEl.childNodes[0].childNodes[0].childNodes[2];
      verifyRTL(text);
    });

    it("button element should have dir=rtl and 'direction-rtl' class", () => {
      const btn = rooEl.childNodes[0].childNodes[0].childNodes[3];
      verifyRTL(btn);
    });
  });

  describe('render layout elements', () => {
    let rooEl;
    let firstLayout;
    let secondLayout;
    let textEl;

    it('Horizontal nested in Vertical', () => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'horizontal',
            elements: [
              {
                type: 'text',
                text: 'foo',
              },
            ],
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      textEl = secondLayout.childNodes[0];

      expect(firstLayout.className).toContain(
        'lp-json-pollock-layout lp-json-pollock-layout-vertical',
      );
      expect(secondLayout.className).toContain(
        'lp-json-pollock-layout lp-json-pollock-layout-horizontal',
      );
      expect(textEl.className).toContain('lp-json-pollock-element-text');
    });

    it('Vertical nested in Horizontal', () => {
      const conf = {
        type: 'horizontal',
        elements: [
          {
            type: 'vertical',
            elements: [
              {
                type: 'text',
                text: 'foo',
              },
            ],
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      textEl = secondLayout.childNodes[0];

      expect(firstLayout.className).toContain(
        'lp-json-pollock-layout lp-json-pollock-layout-horizontal',
      );
      expect(secondLayout.className).toContain(
        'lp-json-pollock-layout lp-json-pollock-layout-vertical',
      );
      expect(textEl.className).toContain('lp-json-pollock-element-text');
    });

    it('Vertical should have the appropriate WCAG attribute', () => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'text',
            text: 'Test text',
            tooltip: 'text tooltip',
          },
        ],
        accessibility: {
          web: {
            'aria-label': 'Vertical',
          },
        },
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      const layout = rooEl.childNodes[0].childNodes[0];

      expect(layout.getAttribute('aria-label')).toBe('Vertical');
    });

    it('Horizontal should have the appropriate WCAG attribute', () => {
      const conf = {
        type: 'horizontal',
        elements: [
          {
            type: 'text',
            text: 'Test text',
            tooltip: 'text tooltip',
          },
        ],
        accessibility: {
          web: {
            'aria-label': 'Horizontal',
          },
        },
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      const layout = rooEl.childNodes[0].childNodes[0];

      expect(layout.getAttribute('aria-label')).toBe('Horizontal');
    });

    it('Vertical should have the scroll with default size', () => {
      const conf = {
        type: 'vertical',
        scroll: 'enable',
        elements: [
          {
            type: 'text',
            text: 'Test text',
            tooltip: 'text tooltip',
          },
        ],
        accessibility: {
          web: {
            'aria-label': 'Vertical',
          },
        },
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.style.cssText).toBe('height: 100px;');
      expect(layout.className).toContain('lp-json-pollock-layout-vertical-scroll');
    });

    it('Vertical should have the scroll with medium size', () => {
      const conf = {
        type: 'vertical',
        scroll: 'enable',
        style: {
          size: 'medium',
        },
        elements: [
          {
            type: 'text',
            text: 'Test text',
            tooltip: 'text tooltip',
          },
        ],
        accessibility: {
          web: {
            'aria-label': 'Vertical',
          },
        },
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.style.cssText).toBe('height: 300px;');
      expect(layout.className).toContain('lp-json-pollock-layout-vertical-scroll');
    });

    it('Vertical should have the scroll with large size', () => {
      const conf = {
        type: 'vertical',
        scroll: 'enable',
        style: {
          size: 'large',
        },
        elements: [
          {
            type: 'text',
            text: 'Test text',
            tooltip: 'text tooltip',
          },
        ],
        accessibility: {
          web: {
            'aria-label': 'Vertical',
          },
        },
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      const layout = rooEl.childNodes[0].childNodes[0];
      expect(layout.style.cssText).toBe('height: 500px;');
      expect(layout.className).toContain('lp-json-pollock-layout-vertical-scroll');
    });
    describe('massive content', () => {
      it('Horizontal layout with many elements - width must not exceeds parent layout', () => {
        const conf = {
          type: 'horizontal',
          elements: [
            {
              type: 'text',
              text: 'foo1',
            },
            {
              type: 'text',
              text: 'foo2',
            },
            {
              type: 'text',
              text: 'foo3',
            },
            {
              type: 'text',
              text: 'foo4',
            },
            {
              type: 'text',
              text: 'foo5',
            },
            {
              type: 'text',
              text: 'foo6',
            },
            {
              type: 'text',
              text: 'foo7',
            },
            {
              type: 'text',
              text: 'foo7',
            },
            {
              type: 'text',
              text: 'foo8',
            },
            {
              type: 'text',
              text: 'foo9',
            },
            {
              type: 'text',
              text: 'foo10',
            },
            {
              type: 'image',
              url: 'http://example.jpg',
              tooltip: 'image tooltip',
              alt: 'image alt',
              click: {
                actions: [
                  {
                    type: 'navigate',
                    name: 'Navigate to store via image',
                    lo: 23423423,
                    la: 2423423423,
                  },
                ],
              },
            },
            {
              type: 'image',
              url: 'http://example.jpg',
              tooltip: 'image tooltip',
              alt: 'image alt',
              click: {
                actions: [
                  {
                    type: 'navigate',
                    name: 'Navigate to store via image',
                    lo: 23423423,
                    la: 2423423423,
                  },
                ],
              },
            },
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'https://example.com',
                  },
                ],
              },
            },
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Publish text',
              click: {
                metadata: [
                  {
                    event: 'PublishTextEvent',
                  },
                ],
                actions: [
                  {
                    type: 'publishText',
                    text: 'my text',
                  },
                ],
              },
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        const layout = rooEl.childNodes[0].childNodes[0];
        const layoutWidth = layout.offsetWidth;
        let elementsWidth = 0;
        Array.prototype.forEach.call(layout.childNodes, (node) => {
          elementsWidth += node.offsetWidth;
        });

        expect(layout.className).toContain(
          'lp-json-pollock-layout lp-json-pollock-layout-horizontal',
        );
        expect(elementsWidth).toBeGreaterThanOrEqual(layoutWidth - 10);
      });

      it('Vertical with very long text should wrap word', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text...',
              tooltip: 'text tooltip',
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        const layout = rooEl.childNodes[0].childNodes[0];
        textEl = rooEl.childNodes[0].childNodes[0].childNodes[0];

        const layoutWidth = layout.offsetWidth;
        const layoutHeight = layout.offsetHeight;
        const textWidth = textEl.offsetWidth;
        const textHeight = textEl.offsetHeight;

        expect(layout.className).toContain(
          'lp-json-pollock-layout lp-json-pollock-layout-vertical',
        );
        expect(textWidth).toBeLessThanOrEqual(layoutWidth);
        expect(textHeight).toBeLessThanOrEqual(layoutHeight);
      });
    });
  });

  describe('render tabs elements', () => {
    const conf = {
      type: 'vertical',
      elements: [
        {
          type: 'tabs',
          elements: [
            {
              type: 'vertical',
              tag: 'Tab1',
              elements: [
                {
                  type: 'text',
                  text: '1',
                },
              ],
            },
            {
              type: 'vertical',
              tag: 'Tab2',
              elements: [
                {
                  type: 'text',
                  text: '2',
                },
              ],
            },
          ],
        },
      ],
    };

    pollockContainer = document.createElement('div');
    document.body.appendChild(pollockContainer);

    const container = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));
    const rootEl = container.children[0];
    const verticalEl = rootEl.children[0];
    const rootTabEl = verticalEl.children[0];
    const tabButtonsEl = rootTabEl.children[0];
    const tabButton1 = tabButtonsEl.children[0];
    const tabButton2 = tabButtonsEl.children[1];
    const tabPannelEl1 = rootTabEl.children[1];
    const tabPannelEl2 = rootTabEl.children[2];

    it('tabs root exist', () => {
      expect(rootEl.className).toContain('lp-json-pollock');
    });

    it('tabs wrapper root exist', () => {
      expect(rootTabEl.className).toBe('');
    });

    it('button wrapper root exist', () => {
      expect(tabButtonsEl.className).toContain('lp-json-pollock-element-tab');
    });

    it('button 1 must be active', () => {
      expect(tabButton1.className).toContain('active');
    });

    it('button 2 must not be active', () => {
      expect(tabButton2.className).not.toContain('active');
    });

    it('pannel 1 must be visible', () => {
      expect(tabPannelEl1.style.cssText).toBe('display: block;');
    });

    it('pannel 2 must be hidden', () => {
      // Corrected assertion
      expect(tabPannelEl2.style.cssText).toBe('display: none;');
    });
  });
  //
  describe('render carousel', () => {
    const container = addToBody(jsonPollockInstance.render(JSON.stringify(carouselConf)));
    const carouselRoot = container.children[0];
    const carouselRootWrapper = container.children[0].children[0];
    const carouselRootLayout = container.children[0].children[0];
    const carouselRight = carouselRootLayout.children[1];
    const carouselLeft = carouselRootLayout.children[0];
    const carouselListRoot = carouselRootLayout.children[2];

    const card1 = carouselRootLayout.children[2].children[0];
    const card2 = carouselRootLayout.children[2].children[1];
    const card3 = carouselRootLayout.children[2].children[2];

    it('carousel root exist', () => {
      expect(carouselRoot.className).toContain('lp-json-pollock');
    });

    it('carousel wrapper root exist', () => {
      expect(carouselRootWrapper.className).toContain('lp-json-pollock-layout-carousel-wrapper');
    });

    it('carousel root layout exist', () => {
      expect(carouselRootLayout.className).toContain('lp-json-pollock-layout-carousel');
    });

    it('carousel has aria-label', () => {
      expect(carouselRootLayout.getAttribute('aria-label')).toBe('Carousel with buttons');
    });

    it('carousel arrow right exist', () => {
      expect(carouselRight.className).toContain('lp-json-pollock-layout-carousel-arrow');
    });

    it('carousel arrow right has type="button" attribute', () => {
      expect(carouselRight.getAttribute('type')).toBe('button');
    });

    it('carousel arrow right has aria-label attribute', () => {
      expect(carouselRight.getAttribute('aria-label')).toBe('Next');
    });

    it('carousel arrow right holds component action mark', () => {
      expect(carouselRight.className).toContain(
        'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow',
      );
    });

    it('carousel arrow left exist', () => {
      expect(carouselLeft.className).toContain('lp-json-pollock-layout-carousel-arrow left');
    });

    it('carousel arrow left has type="button" attribute', () => {
      expect(carouselLeft.getAttribute('type')).toBe('button');
    });

    it('carousel arrow left has aria-label attribute', () => {
      expect(carouselLeft.getAttribute('aria-label')).toBe('Previous');
    });

    it('carousel arrow left holds component action mark', () => {
      expect(carouselLeft.className).toContain(
        'lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow left',
      );
    });

    it('carousel elements length equal to conf element length', () => {
      expect(carouselRootLayout.children[2].children.length).toBe(carouselConf.elements.length);
    });

    xit('carousel elements are in the right order', () => {
      console.log(card1.children);
      expect(card1.children[0].innerText).toBe('1');
      expect(card2.children[0].innerText).toBe('2');
      expect(card3.children[0].innerText).toBe('3');
    });

    it('carousel accessibility attrbs', () => {
      expect(carouselListRoot.getAttribute('role')).toBe('list');
      expect(card1.getAttribute('role')).toBe('listitem');
      expect(card2.getAttribute('role')).toBe('listitem');
      expect(card3.getAttribute('role')).toBe('listitem');
    });
  });

  describe('render carousel select', () => {
    const container = addToBody(jsonPollockInstance.render(JSON.stringify(carouselSelectConf)));
    const carouselRoot = container.children[0];
    const carouselRootWrapper = carouselRoot.children[0];
    const carouselRootLayout = carouselRootWrapper.children[0];
    const card1 = carouselRootLayout.children[0];
    const card2 = carouselRootLayout.children[1];
    const card3 = carouselRootLayout.children[2];

    it('carousel root exist', () => {
      expect(carouselRoot.className).toContain('lp-json-pollock');
    });

    it('carousel wrapper root exist', () => {
      expect(carouselRootWrapper.className).toContain('lp-json-pollock-layout-carousel-wrapper');
    });

    it('carousel root layout exist', () => {
      expect(carouselRootLayout.className).toContain('lp-json-pollock-layout-carousel');
    });

    it('carousel elements length equal to conf element length', () => {
      expect(carouselRootLayout.children.length).toBe(carouselSelectConf.elements.length);
    });

    it('carousel elements are in the right order', () => {
      expect(card1.getAttribute('data-carousel-index')).toBe('0');
      expect(card2.getAttribute('data-carousel-index')).toBe('1');
      expect(card3.getAttribute('data-carousel-index')).toBe('2');
    });

    it('carousel accessibility attrbs', () => {
      expect(card1.getAttribute('role')).toBe('listitem');
      expect(card2.getAttribute('role')).toBe('listitem');
      expect(card3.getAttribute('role')).toBe('listitem');
    });
  });

  describe('render list', () => {
    const conf = {
      type: 'list',
      elements: [
        {
          type: 'text',
          text: 'The checklist',
        },
        {
          type: 'sectionList',
          elements: [
            {
              type: 'section',
              sectionID: 'fruits',
              elements: [
                {
                  type: 'checklist',
                  elements: [
                    {
                      type: 'checkbox',
                      text: '1',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_35',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'apples',
                          },
                        ],
                      },
                      accessibility: {
                        web: {
                          'aria-label': 'Checkbox1',
                        },
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '2',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_32',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'bananas',
                          },
                        ],
                      },
                      accessibility: {
                        web: {
                          'aria-label': 'Checkbox2',
                        },
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '3',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_36',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'avocados',
                          },
                        ],
                      },
                      accessibility: {
                        web: {
                          'aria-label': 'Checkbox3',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'buttonList',
          elements: [
            {
              type: 'submitButton',
              title: 'submit',
              disabled: false,
              click: {
                metadata: [
                  {
                    type: 'ExternalId',
                    id: 'submissionID',
                  },
                ],
                actions: [
                  {
                    type: 'submitAsText',
                    submit: true,
                  },
                ],
              },
              accessibility: {
                web: {
                  tabindex: '0',
                },
              },
            },
          ],
        },
      ],
    };

    const container = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));
    const listContainerRoot = container.children[0];
    const listRootLayout = container.children[0].children[0];
    const header = container.children[0].children[0].children[0];
    const sectionListLayout = container.children[0].children[0].children[1];
    const buttonListLayout = container.children[0].children[0].children[2];
    const sectionLayout = sectionListLayout.children[0];
    const checklistLayout = sectionLayout.children[0];

    it('container element exists', () => {
      expect(listContainerRoot.className).toContain('lp-json-pollock');
    });

    it('list wrapper root exist', () => {
      expect(listRootLayout.className).toContain('lp-json-pollock-layout-form');
    });

    it('header exist', () => {
      expect(header.className).toContain('lp-json-pollock-element-text');
    });

    it('sectionListLayout exist', () => {
      expect(sectionListLayout.className).toContain('lp-json-pollock-layout-sectionList');
    });

    it('buttonListLayout exist', () => {
      expect(buttonListLayout.className).toContain('lp-json-pollock-layout-buttonList');
    });

    it('section exist within sectionList', () => {
      expect(sectionLayout.className).toContain('lp-json-pollock-layout-section');
      expect(sectionLayout.getAttribute('data-section-id')).toBe('fruits');
    });

    it('checklist exists within section', () => {
      expect(checklistLayout.className).toContain('lp-json-pollock-layout-checklist');
    });

    it('checkbox exists within checklist', () => {
      expect(checklistLayout.children.length).toBe(3);
      expect(checklistLayout.children[0].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklistLayout.children[1].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklistLayout.children[2].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklistLayout.children[0].textContent).toBe('1');
      expect(checklistLayout.children[1].textContent).toBe('2');
      expect(checklistLayout.children[2].textContent).toBe('3');
    });

    it('a11y attributes exists within checklist', () => {
      const inputEl = checklistLayout.children[0].querySelector(
        '.lp-json-pollock-element-checkbox-input',
      );
      const labelEl = checklistLayout.children[0].querySelector(
        '.lp-json-pollock-element-checkbox-label',
      );
      const labels = checklistLayout.querySelectorAll('.lp-json-pollock-element-checkbox-label');
      expect(inputEl).toBeDefined();
      expect(inputEl.id).toBeDefined();
      expect(labelEl).toBeDefined();
      expect(labelEl.getAttribute('for')).toBe(inputEl.id);
      for (let i = 1; i <= labels.length; i++) {
        expect(labels[i - 1].getAttribute('aria-label')).toBe('Checkbox' + i);
      }
    });

    it('submitButton exist', () => {
      expect(buttonListLayout.children[0].className).toContain(
        'lp-json-pollock-element-submit-button',
      );
      expect(buttonListLayout.children[0].children[0].disabled).toBe(false);
    });

    it('submitButton should contain appropriate WCAG attribute', () => {
      expect(buttonListLayout.children[0].children[0].getAttribute('tabindex')).toBe('0');
    });
  });

  describe('render list with multiple sections and multiple buttons', () => {
    const conf = {
      type: 'list',
      elements: [
        {
          type: 'text',
          text: 'The checklist',
        },
        {
          type: 'sectionList',
          elements: [
            {
              type: 'section',
              sectionID: 'fruits',
              elements: [
                {
                  type: 'text',
                  text: 'The subheader',
                },
                {
                  type: 'checklist',
                  elements: [
                    {
                      type: 'checkbox',
                      text: '1',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_35',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'apples',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '2',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_32',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'bananas',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '3',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_36',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'avocados',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'section',
              sectionID: 'fruits123',
              elements: [
                {
                  type: 'text',
                  text: 'The subheader',
                },
                {
                  type: 'checklist',
                  elements: [
                    {
                      type: 'checkbox',
                      text: '01',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_35',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'apples',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '02',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_32',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'bananas',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '03',
                      borderLine: true,
                      borderColor: '#000000',
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_36',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'avocados',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'buttonList',
          elements: [
            {
              type: 'submitButton',
              title: 'submit',
              disabled: false,
              click: {
                metadata: [
                  {
                    type: 'ExternalId',
                    id: 'submissionID',
                  },
                ],
                actions: [
                  {
                    type: 'submitAsText',
                    submit: true,
                  },
                ],
              },
            },
            {
              type: 'button',
              title: 'Back',
              click: {
                metadata: [
                  {
                    type: 'ExternalId',
                    id: 'ANOTHER_ONE_20',
                  },
                ],
                actions: [
                  {
                    type: 'publishText',
                    text: 'Back',
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    const container = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));
    const listContainerRoot = container.children[0];
    const listRootLayout = container.children[0].children[0];
    const header = container.children[0].children[0].children[0];
    const sectionListLayout = container.children[0].children[0].children[1];
    const buttonListLayout = container.children[0].children[0].children[2];
    const section1Layout = sectionListLayout.children[0];
    const section2Layout = sectionListLayout.children[1];
    const subheader1Layout = section1Layout.children[0];
    const subheader2Layout = section2Layout.children[0];
    const checklist1Layout = section1Layout.children[1];
    const checklist2Layout = section2Layout.children[1];

    it('container element exists', () => {
      expect(listContainerRoot.className).toContain('lp-json-pollock');
    });

    it('list wrapper root exist', () => {
      expect(listRootLayout.className).toContain('lp-json-pollock-layout-form');
    });

    it('header exist', () => {
      expect(header.className).toContain('lp-json-pollock-element-text');
    });

    it('sectionListLayout exist', () => {
      expect(sectionListLayout.className).toContain('lp-json-pollock-layout-sectionList');
    });

    it('buttonListLayout exist', () => {
      expect(buttonListLayout.className).toContain('lp-json-pollock-layout-buttonList');
    });

    it('both sections exist within sectionList', () => {
      expect(section1Layout.className).toContain('lp-json-pollock-layout-section');
      expect(section1Layout.getAttribute('data-section-id')).toBe('fruits');
      expect(section2Layout.className).toContain('lp-json-pollock-layout-section');
      expect(section2Layout.getAttribute('data-section-id')).toBe('fruits123');
    });

    it('both section subheaders exists', () => {
      expect(subheader1Layout.className).toContain('lp-json-pollock-element-text');
      expect(subheader2Layout.className).toContain('lp-json-pollock-element-text');
    });

    it('both checklists exists within section', () => {
      expect(checklist1Layout.className).toContain('lp-json-pollock-layout-checklist');
      expect(checklist2Layout.className).toContain('lp-json-pollock-layout-checklist');
    });

    it('6 checkboxes exists within checklist', () => {
      expect(checklist1Layout.children.length).toBe(3);
      expect(checklist1Layout.children[0].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[1].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[2].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[0].textContent).toBe('1');
      expect(checklist1Layout.children[1].textContent).toBe('2');
      expect(checklist1Layout.children[2].textContent).toBe('3');

      expect(checklist2Layout.children.length).toBe(3);
      expect(checklist2Layout.children[0].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist2Layout.children[1].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist2Layout.children[2].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist2Layout.children[0].textContent).toBe('01');
      expect(checklist2Layout.children[1].textContent).toBe('02');
      expect(checklist2Layout.children[2].textContent).toBe('03');
    });

    it('submitButton exist', () => {
      expect(buttonListLayout.children[0].className).toContain(
        'lp-json-pollock-element-submit-button',
      );
      expect(buttonListLayout.children[0].children[0].disabled).toBe(false);
    });

    it('button exist', () => {
      expect(buttonListLayout.children[1].className).toContain('lp-json-pollock-element-button');
      expect(buttonListLayout.children[1].children[0].type).toBe('button');
    });
  });

  describe('render list with rtl and button disabled', () => {
    const conf = {
      type: 'list',
      elements: [
        {
          type: 'text',
          text: 'The checklist',
        },
        {
          type: 'sectionList',
          elements: [
            {
              type: 'section',
              sectionID: 'fruits',
              elements: [
                {
                  type: 'text',
                  text: 'The subheader',
                },
                {
                  type: 'checklist',
                  elements: [
                    {
                      type: 'checkbox',
                      text: '1',
                      borderLine: true,
                      borderColor: '#000000',
                      rtl: true,
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_35',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'apples',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '2',
                      borderLine: true,
                      borderColor: '#000000',
                      rtl: true,
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_32',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'bananas',
                          },
                        ],
                      },
                    },
                    {
                      type: 'checkbox',
                      text: '3',
                      borderLine: true,
                      borderColor: '#000000',
                      rtl: true,
                      click: {
                        metadata: [
                          {
                            type: 'ExternalId',
                            id: 'ANOTHER_ONE_36',
                          },
                        ],
                        actions: [
                          {
                            type: 'checked',
                            publishText: 'avocados',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'buttonList',
          elements: [
            {
              type: 'submitButton',
              title: 'submit',
              disabled: true,
              rtl: true,
              click: {
                metadata: [
                  {
                    type: 'ExternalId',
                    id: 'submissionID',
                  },
                ],
                actions: [
                  {
                    type: 'submitAsText',
                    submit: true,
                  },
                ],
              },
            },
            {
              type: 'button',
              title: 'Back',
              click: {
                metadata: [
                  {
                    type: 'ExternalId',
                    id: 'ANOTHER_ONE_20',
                  },
                ],
                actions: [
                  {
                    type: 'publishText',
                    text: 'Back',
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    const container = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));
    const listContainerRoot = container.children[0];
    const listRootLayout = container.children[0].children[0];
    const header = container.children[0].children[0].children[0];
    const sectionListLayout = container.children[0].children[0].children[1];
    const buttonListLayout = container.children[0].children[0].children[2];
    const section1Layout = sectionListLayout.children[0];
    const subheader1Layout = section1Layout.children[0];
    const checklist1Layout = section1Layout.children[1];

    it('container element exists', () => {
      expect(listContainerRoot.className).toContain('lp-json-pollock');
    });

    it('3 checkboxes exists within checklist with rtl', () => {
      expect(checklist1Layout.children.length).toBe(3);
      expect(checklist1Layout.children[0].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[0].children[1].children[1].className).toContain(
        'direction-rtl',
      );
      expect(checklist1Layout.children[0].children[1].children[1].dir).toBe('rtl');
      expect(checklist1Layout.children[1].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[1].children[1].children[1].className).toContain(
        'direction-rtl',
      );
      expect(checklist1Layout.children[1].children[1].children[1].dir).toBe('rtl');
      expect(checklist1Layout.children[2].className).toContain('lp-json-pollock-element-checkbox');
      expect(checklist1Layout.children[2].children[1].children[1].className).toContain(
        'direction-rtl',
      );
      expect(checklist1Layout.children[2].children[1].children[1].dir).toBe('rtl');
      expect(checklist1Layout.children[0].textContent).toBe('1');
      expect(checklist1Layout.children[1].textContent).toBe('2');
      expect(checklist1Layout.children[2].textContent).toBe('3');
    });

    it('submitButton exist with rtl and disabled', () => {
      expect(buttonListLayout.children[0].className).toContain(
        'lp-json-pollock-element-submit-button',
      );
      expect(buttonListLayout.children[0].className).toContain('direction-rtl');
      expect(buttonListLayout.children[0].dir).toBe('rtl');
      expect(buttonListLayout.children[0].children[0].disabled).toBe(true);
    });
  });

  xdescribe('border policy', () => {
    let rooEl;
    let firstLayout;
    let secondLayout;
    let simpleEl;
    let secundButton;

    function getStyle(elem, style) {
      return window.getComputedStyle(elem)[style];
    }

    it('Root vertical and horizontal layout should have a complete border', () => {
      const conf1 = {
        type: 'vertical',
        elements: [
          {
            type: 'text',
            text: 'foo',
          },
        ],
      };
      const conf2 = {
        type: 'horizontal',
        elements: [
          {
            type: 'text',
            text: 'foo',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf1)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toContain('1px solid');

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf2)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toContain('1px solid');
    });

    it('Vertical with borderLess should have no borders', () => {
      const conf = {
        type: 'vertical',
        border: 'borderLess',
        elements: [
          {
            type: 'button',
            title: 'Back',
          },
          {
            type: 'button',
            title: 'Back',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toBe('none'); // Changed from contain to toBe

      secundButton = firstLayout.childNodes[1];
      expect(getStyle(secundButton, 'border-top')).toBe('none'); // Changed from contain to toBe
    });

    it('Vertical with dropShadow should have shadow with no outline borders', () => {
      const conf = {
        type: 'vertical',
        border: 'dropShadow',
        elements: [
          {
            type: 'button',
            title: 'Back',
          },
          {
            type: 'button',
            title: 'Back',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toBe('none'); // Changed from contain to toBe
      // expect(getStyle(firstLayout, 'filter')).toContain('drop-shadow(rgb(170, 170, 170) 0px 5px 5px'); // not running on test old browser

      secundButton = firstLayout.childNodes[1];
      expect(getStyle(secundButton, 'border-top')).toContain('1px solid');
    });

    it('horizontal with borderLine = false should have no borders', () => {
      const conf = {
        type: 'horizontal',
        borderLine: false,
        elements: [
          {
            type: 'button',
            title: 'Back',
          },
          {
            type: 'button',
            title: 'Back',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toBe('none'); // Changed from contain to toBe

      secundButton = firstLayout.childNodes[1];
      expect(getStyle(secundButton, 'border-left')).toBe('none'); // Changed from contain to toBe
    });

    it('horizontal with border = borderLess should have no borders', () => {
      const conf = {
        type: 'horizontal',
        border: 'borderLess',
        elements: [
          {
            type: 'button',
            title: 'Back',
          },
          {
            type: 'button',
            title: 'Back',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toBe('none'); // Changed from contain to toBe

      secundButton = firstLayout.childNodes[1];
      expect(getStyle(secundButton, 'border-left')).toBe('none'); // Changed from contain to toBe
    });

    it('horizontal with border = dropShadow should have no borders', () => {
      const conf = {
        type: 'horizontal',
        border: 'dropShadow',
        elements: [
          {
            type: 'button',
            title: 'Back',
          },
          {
            type: 'button',
            title: 'Back',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      expect(getStyle(firstLayout, 'border')).toBe('none'); // Changed from contain to toBe
      // expect(getStyle(firstLayout, 'filter')).toContain('drop-shadow(rgb(170, 170, 170) 0px 5px 5px'); // not running on test old browser

      secundButton = firstLayout.childNodes[1];
      // expect(getStyle(secundButton, 'border-left')).toContain('1px solid'); // not running on test old browser
    });

    xdescribe('First vertical and horizontal layout child should have no border', () => {
      it('horizontal with vertical as first child', () => {
        const conf = {
          type: 'horizontal',
          elements: [
            {
              type: 'vertical',
              elements: [
                {
                  type: 'text',
                  text: 'foo',
                },
              ],
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
        // Not working on old browser, need to upgrade the test env.
        expect(getStyle(secondLayout, 'border')).toBe('none');
        expect(getStyle(secondLayout, 'borderLeft')).toBe('none');
        expect(getStyle(secondLayout, 'borderTop')).toBe('none');
        expect(getStyle(secondLayout, 'borderBottom')).toBe('none');
        expect(getStyle(secondLayout, 'borderRight')).toBe('none');
      });

      it('vertical with horizontal as first child', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'horizontal',
              elements: [
                {
                  type: 'text',
                  text: 'foo',
                },
              ],
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
        expect(getStyle(secondLayout, 'border')).toBe('none');
        expect(getStyle(secondLayout, 'borderLeft')).toBe('none');
        expect(getStyle(secondLayout, 'borderTop')).toBe('none');
        expect(getStyle(secondLayout, 'borderBottom')).toBe('none');
        expect(getStyle(secondLayout, 'borderRight')).toBe('none');
      });

      it('vertical with simple element (button) as first child', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'http://example.jpg',
                  },
                ],
              },
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
        expect(getStyle(simpleEl, 'border')).toBe('none');
        expect(getStyle(simpleEl, 'borderLeft')).toBe('none');
        expect(getStyle(simpleEl, 'borderTop')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });

      it('horizontal with simple element (button) as first child', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'http://example.jpg',
                  },
                ],
              },
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
        expect(getStyle(simpleEl, 'border')).toBe('none');
        expect(getStyle(simpleEl, 'borderLeft')).toBe('none');
        expect(getStyle(simpleEl, 'borderTop')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });

      it('horizontal with simple element (button) as first child should contain WCAG attributes', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'http://example.jpg',
                  },
                ],
              },
            },
          ],
          accessibility: {
            web: {
              role: 'region',
              'aria-label': 'Horizontal layout',
            },
          },
        };
        const rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));
        const contentWrapper = rooEl.querySelector('.lp-json-pollock-layout');
        expect(contentWrapper.getAttribute('role')).toBe('region');
        expect(contentWrapper.getAttribute('aria-label')).toBe('Horizontal layout');
      });
    });

    xdescribe("Vertical layout's child with is not the first child should have a top border only", () => {
      it('Layout element as second child', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
            {
              type: 'horizontal',
              elements: [
                {
                  type: 'button',
                  tooltip: 'button tooltip',
                  title: 'Add to cart',
                  click: {
                    actions: [
                      {
                        type: 'link',
                        name: 'add to cart',
                        uri: 'http://example.jpg',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        expect(getStyle(simpleEl, 'borderTop')).toContain('1px solid');
        expect(getStyle(simpleEl, 'borderLeft')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });

      it('simple element (button) as second child', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'http://example.jpg',
                  },
                ],
              },
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        expect(getStyle(simpleEl, 'borderTop')).toContain('1px solid');
        expect(getStyle(simpleEl, 'borderLeft')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });

      it('Exceptional case - text element followd by a text element should have no border', () => {
        const conf = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        expect(getStyle(simpleEl, 'border')).toBe('none');
        expect(getStyle(simpleEl, 'borderLeft')).toBe('none');
        expect(getStyle(simpleEl, 'borderTop')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });
    });

    xdescribe("Horizontal layout's child with is not the first child should have a left border only", () => {
      it('Layout element as second child', () => {
        const conf = {
          type: 'horizontal',
          elements: [
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
            {
              type: 'horizontal',
              elements: [
                {
                  type: 'button',
                  tooltip: 'button tooltip',
                  title: 'Add to cart',
                  click: {
                    actions: [
                      {
                        type: 'link',
                        name: 'add to cart',
                        uri: 'http://example.jpg',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        expect(getStyle(simpleEl, 'borderLeft')).toContain('1px solid');
        expect(getStyle(simpleEl, 'borderTop')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });

      it('simple element (button) as second child', () => {
        const conf = {
          type: 'horizontal',
          elements: [
            {
              type: 'text',
              text: 'product name (Title)',
              tooltip: 'text tooltip',
            },
            {
              type: 'button',
              tooltip: 'button tooltip',
              title: 'Add to cart',
              click: {
                actions: [
                  {
                    type: 'link',
                    name: 'add to cart',
                    uri: 'http://example.jpg',
                  },
                ],
              },
            },
          ],
        };

        rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        expect(getStyle(simpleEl, 'borderLeft')).toContain('1px solid');
        expect(getStyle(simpleEl, 'borderTop')).toBe('none');
        expect(getStyle(simpleEl, 'borderBottom')).toBe('none');
        expect(getStyle(simpleEl, 'borderRight')).toBe('none');
      });
    });
  });

  xdescribe('render button element by class', () => {
    let rooEl;
    let buttonLayout;
    let innerButton;
    let buttonEl;

    function getStyle(elem, style) {
      return window.getComputedStyle(elem)[style];
    }

    it('button with class text', () => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Add to cart',
            click: {
              actions: [
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'http://example.jpg',
                },
              ],
            },
            class: 'text',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      buttonLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      expect(buttonLayout.className).toContain('lp-json-pollock-element-button');
      buttonEl = buttonLayout.childNodes[0];
      expect(buttonEl.nodeName).toBe('BUTTON');
      expect(getStyle(buttonEl, 'border')).toBe('2px outset buttonface');
      expect(buttonEl.localName).toBe('button');
      expect(buttonEl.title).toBe('button tooltip');
      expect(buttonEl.textContent).toBe('Add to cart');
    });

    it('button with class button', () => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Add to cart',
            click: {
              actions: [
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'http://example.jpg',
                },
              ],
            },
            class: 'button',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      buttonLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      expect(buttonLayout.className).toContain('lp-json-pollock-element-button');
      innerButton = buttonLayout.childNodes[0];
      expect(innerButton.className).toContain('class-button');
      expect(innerButton.className).toContain('lp-json-pollock-element-button-button');
      expect(getStyle(innerButton, 'border')).toContain('');
      expect(getStyle(innerButton, 'border-radius')).toContain('50px');
      buttonEl = innerButton.childNodes[0];
      expect(buttonEl.nodeName).toBe('BUTTON');
      expect(getStyle(buttonEl, 'border')).toBe('none');
      expect(buttonEl.localName).toBe('button');
      expect(buttonEl.title).toBe('button tooltip');
      expect(buttonEl.textContent).toBe('Add to cart');
    });

    it('button with class button and style', () => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Add to cart',
            style: {
              'background-color': 'red',
              color: '#fff',
              'border-radius': 10,
              'border-color': '#0000ff',
            },
            click: {
              actions: [
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'http://example.jpg',
                },
              ],
            },
            class: 'button',
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      buttonLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      expect(buttonLayout.className).toContain('lp-json-pollock-element-button');
      innerButton = buttonLayout.childNodes[0];
      expect(innerButton.className).toContain('class-button');
      expect(innerButton.className).toContain('lp-json-pollock-element-button-button');
      expect(getStyle(innerButton, 'border')).toContain('1px solid');
      expect(getStyle(innerButton, 'border-radius')).toContain('10px');
      expect(getStyle(innerButton, 'border-color')).toContain('rgb(0, 0, 255)');
      expect(getStyle(innerButton, 'background-color')).toContain('rgb(255, 0, 0)');
      buttonEl = innerButton.childNodes[0];
      expect(buttonEl.nodeName).toBe('BUTTON');
      expect(getStyle(buttonEl, 'border')).toBe('none');
      expect(buttonEl.localName).toBe('button');
      expect(buttonEl.title).toBe('button tooltip');
      expect(buttonEl.textContent).toBe('Add to cart');
      expect(getStyle(buttonEl, 'color')).toContain('rgb(255, 255, 255)');
    });
  });

  describe('render single element (no layout)', () => {
    let rooEl;
    let childEl;

    function singleElementTest(title, conf, assertionClass) {
      it(title + ' element', () => {
        rooEl = addToBody(jsonPollockInstance.render(conf));

        const wrapdiv = rooEl.childNodes[0];
        expect(wrapdiv.localName).toBe('div');
        expect(wrapdiv.className).toBe('lp-json-pollock lp-json-pollock-single-element');
        expect(wrapdiv.childNodes.length).toBe(1);

        childEl = wrapdiv.childNodes[0];
        expect(childEl.className).toContain(assertionClass);
      });
    }

    singleElementTest(
      'Text',
      {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
      },
      'lp-json-pollock-element-text',
    );

    singleElementTest(
      'Button',
      {
        type: 'button',
        tooltip: 'button tooltip',
        title: 'Add to cart',
        click: {
          actions: [
            {
              type: 'link',
              name: 'add to cart',
              uri: 'http://example.jpg',
            },
          ],
        },
      },
      'lp-json-pollock-element-button',
    );

    singleElementTest(
      'Image',
      {
        type: 'image',
        url: 'http://example.jpg',
        tooltip: 'image tooltip',
        alt: 'image alt',
        click: {
          actions: [
            {
              type: 'navigate',
              name: 'Navigate to store via image',
              lo: 23.423423,
              la: 2423423423,
            },
          ],
        },
      },
      'lp-json-pollock-element-image',
    );

    singleElementTest(
      'Map',
      {
        type: 'map',
        lo: 64.128597,
        la: -21.89611,
        tooltip: 'map tooltip',
      },
      'lp-json-pollock-element-map',
    );
  });

  describe('special characters', () => {
    let rooEl;
    let childEl;

    it('special characters on text tooltip should be escaped', () => {
      const conf = {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'and & lt < gt > quot "\n sqout \' slash / ssqout ` eq =',
      };

      rooEl = addToBody(jsonPollockInstance.render(conf));

      childEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
      expect(childEl.title).toBe(
        'and &amp; lt &lt; gt &gt; quot &quot;\n' +
          ' sqout &#39; slash &#x2F; ssqout &#x60; eq &#x3D;',
      );
    });

    it('newline character on text content should be replaced with <br>', () => {
      const conf = {
        type: 'text',
        text: 'line1\nline2',
      };

      rooEl = addToBody(jsonPollockInstance.render(conf));

      childEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
      expect(childEl.innerHTML).toBe('line1<br>line2');
    });
  });

  xdescribe('trigger actions', () => {
    let rooEl;
    let conf;

    //although most browser can deal with element.click() - phantomjs doesnt for some elements (e.g. img)
    //therefore this prehistoric method is needed
    function createClickEvent() {
      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0);

      return event;
    }

    beforeAll(() => {
      conf = {
        type: 'vertical',
        elements: [
          {
            type: 'image',
            url: 'http://example.jpg',
            tooltip: 'image tooltip',
            alt: 'image alt',
            click: {
              actions: [
                {
                  type: 'navigate',
                  name: 'Navigate to store via image',
                  lo: 23423423,
                  la: 2423423423,
                },
              ],
            },
          },
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Add to cart',
            click: {
              actions: [
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'https://example.com',
                  target: 'slideout',
                },
              ],
            },
          },
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Publish text',
            click: {
              metadata: [
                {
                  event: 'PublishTextEvent',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'my text',
                },
              ],
            },
          },
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Publish text and link',
            click: {
              metadata: [
                {
                  event: 'PublishTextEvent',
                },
              ],
              actions: [
                {
                  type: 'publishText',
                  text: 'my text',
                },
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'https://example.com',
                  ios: {
                    uri: 'https://ios.example.com',
                  },
                  android: {
                    uri: 'https://android.example.com',
                  },
                  web: {
                    uri: 'https://web.example.com',
                  },
                  target: 'blank',
                },
              ],
            },
          },
          {
            type: 'map',
            lo: 64.128597,
            la: -21.89611,
            tooltip: 'map tooltip',
          },
          {
            type: 'map',
            lo: 64.128597,
            la: -21.89611,
            tooltip: 'map tooltip',
            click: {
              actions: [
                {
                  type: 'navigate',
                  name: 'Navigate to store via map',
                  lo: 23423423,
                  la: 2423423423,
                },
              ],
            },
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(conf));
    });

    it('Click on element with navigate action should trigger its registered callbacks', () => {
      const spy = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('navigate', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[0].childNodes[0].dispatchEvent(event);
      expect(spy).toHaveBeenCalledWith({
        actionData: conf.elements[0].click.actions[0],
        uiEvent: event,
      });
    });

    it('Click on element with link action should trigger its registered callbacks', () => {
      const spy = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('link', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(event);
      expect(spy).toHaveBeenCalledWith({
        actionData: conf.elements[1].click.actions[0],
        uiEvent: event,
      });
    });

    it('Click on element with publishText action should trigger its registered callbacks', () => {
      const spy = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('publishText', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[2].childNodes[0].dispatchEvent(event);
      expect(spy).toHaveBeenCalledWith({
        actionData: conf.elements[2].click.actions[0],
        metadata: conf.elements[2].click.metadata,
        uiEvent: event,
      });
    });

    it('Click on element with multiple actions should trigger its registered callbacks', () => {
      const spy1 = jest.fn();
      const spy2 = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('publishText', spy1);
      jsonPollockInstance.registerAction('link', spy2);
      rooEl.childNodes[0].childNodes[0].childNodes[3].childNodes[0].dispatchEvent(event);
      expect(spy1).toHaveBeenCalledWith({
        actionData: conf.elements[3].click.actions[0],
        metadata: conf.elements[3].click.metadata,
        uiEvent: event,
      });
      expect(spy2).toHaveBeenCalledWith({
        actionData: conf.elements[3].click.actions[1],
        metadata: conf.elements[3].click.metadata,
        uiEvent: event,
      });
    });

    it('Click on map element which has no actions definition should trigger window.open for google maps', () => {
      window.open = jest.fn();
      rooEl.childNodes[0].childNodes[0].childNodes[4].dispatchEvent(createClickEvent());
      expect(window.open).toHaveBeenCalledWith(
        'https://www.google.com/maps/search/?api=1&query=-21.89611,64.128597',
      );
    });

    it('Click on element with link action should not trigger its registered callbacks after unregister', () => {
      const spy = jest.fn();
      jsonPollockInstance.registerAction('link', spy);
      jsonPollockInstance.unregisterAction('link');
      rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(
        createClickEvent(),
      );
      expect(spy).not.toHaveBeenCalled();
    });

    it('Click on element with link action should not trigger its registered callbacks after unregister all', () => {
      const spy = jest.fn();
      jsonPollockInstance.registerAction('link', spy);
      jsonPollockInstance.unregisterAllActions();
      rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(
        createClickEvent(),
      );
      expect(spy).not.toHaveBeenCalled();
    });

    it('Click on map element which has actions definition should not trigger window.open for google maps', () => {
      window.open = jest.fn();
      const spy1 = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('navigate', spy1);
      rooEl.childNodes[0].childNodes[0].childNodes[5].dispatchEvent(event);
      expect(window.open).not.toHaveBeenCalledWith(
        'https://www.google.com/maps/search/?api=1&query=64.128597,-21.89611',
      );
      expect(spy1).toHaveBeenCalledWith({
        actionData: conf.elements[5].click.actions[0],
        uiEvent: event,
      });
    });
  });

  xdescribe('trigger actions #2 - checkbox & submit button', () => {
    let rooEl;
    let conf;

    //although most browser can deal with element.click() - phantomjs doesnt for some elements (e.g. img)
    //therefore this prehistoric method is needed
    function createClickEvent() {
      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0);

      return event;
    }

    beforeAll(() => {
      conf = {
        type: 'list',
        elements: [
          {
            type: 'text',
            text: 'The checklist',
          },
          {
            type: 'sectionList',
            elements: [
              {
                type: 'section',
                sectionID: 'fruits',
                elements: [
                  {
                    type: 'checklist',
                    elements: [
                      {
                        type: 'checkbox',
                        text: '1',
                        borderLine: true,
                        borderColor: '#000000',
                        click: {
                          actions: [
                            {
                              type: 'checked',
                              publishText: 'apples',
                            },
                          ],
                        },
                      },
                      {
                        type: 'checkbox',
                        text: '2',
                        borderLine: true,
                        borderColor: '#000000',
                        click: {
                          actions: [
                            {
                              type: 'checked',
                              publishText: 'bananas',
                            },
                          ],
                        },
                      },
                      {
                        type: 'checkbox',
                        text: '3',
                        borderLine: true,
                        borderColor: '#000000',
                        click: {
                          actions: [
                            {
                              type: 'checked',
                              publishText: 'avocados',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'buttonList',
            elements: [
              {
                type: 'submitButton',
                title: 'submit',
                disabled: false,
                click: {
                  actions: [
                    {
                      type: 'submitAsText',
                      submit: true,
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(conf));
    });

    it('Click on checkbox element with checked action should trigger its registered callbacks', () => {
      const spy = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('checked', spy);
      rooEl.querySelectorAll('.lp-json-pollock-element-checkbox-input')[0].dispatchEvent(event);
      expect(spy).toHaveBeenCalledWith({
        actionData: conf.elements[1].elements[0].elements[0].elements[0].click.actions[0],
        uiEvent: event,
        groupID: conf.elements[1].elements[0].sectionID,
        formEl: rooEl.children[0].children[0],
      });
    });
    it('Click on submit element with checked action should trigger its registered callbacks', () => {
      const spy = jest.fn();
      const event = createClickEvent();
      jsonPollockInstance.registerAction('submitAsText', spy);
      rooEl.querySelectorAll('input[type=submit]')[0].dispatchEvent(event);
      expect(spy).toHaveBeenCalledWith({
        actionData: conf.elements[2].elements[0].click.actions[0],
        uiEvent: event,
        formEl: rooEl.children[0].children[0],
      });
    });
  });

  describe('render json string', () => {
    let rooEl;

    beforeAll(() => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'image',
            url: 'http://example.jpg',
            tooltip: 'image tooltip',
            alt: 'image alt',
            click: {
              actions: [
                {
                  type: 'navigate',
                  name: 'Navigate to store via image',
                  lo: 23423423,
                  la: 2423423423,
                },
              ],
            },
          },
          {
            type: 'text',
            text: 'product name (Title)',
            tooltip: 'text tooltip',
            style: {
              bold: true,
              italic: true,
              color: 'red',
              size: 'large',
            },
          },
          {
            type: 'button',
            tooltip: 'button tooltip',
            title: 'Add to cart',
            click: {
              actions: [
                {
                  type: 'link',
                  name: 'add to cart',
                  uri: 'http://example.jpg',
                  target: 'self',
                },
              ],
            },
            style: {
              bold: false,
              italic: false,
              color: 'red',
              size: 'medium',
            },
          },
        ],
      };

      rooEl = jsonPollockInstance.render(JSON.stringify(conf));
    });

    it('DOM element exists', () => {
      expect(rooEl).toBeInstanceOf(DocumentFragment);
    });
  });

  xdescribe('Image element fail to load', () => {
    let rooEl;
    let imgDiv;
    let imgEl;

    beforeAll((done) => {
      const conf = {
        type: 'vertical',
        elements: [
          {
            type: 'image',
            url: 'http://does_not_exists.jpg',
            tooltip: 'image tooltip',
            click: {
              actions: [
                {
                  type: 'navigate',
                  name: 'Navigate to store via image',
                  lo: 23423423,
                  la: 2423423423,
                },
              ],
            },
          },
        ],
      };

      rooEl = addToBody(jsonPollockInstance.render(JSON.stringify(conf)));

      imgDiv = rooEl.childNodes[0].childNodes[0].childNodes[0];
      imgEl = imgDiv.childNodes[0];
      const originalOnError = imgEl.onerror;
      imgEl.onerror = function () {
        if (originalOnError) {
          originalOnError.call(imgEl);
        }
        done();
      };
    });

    it('Image div should have error class', () => {
      expect(imgDiv.className).toContain('error');
    });

    it('Image div should have error message in title', () => {
      expect(imgDiv.title).toBe('fail to load image');
    });

    it('Image element should be hidden', () => {
      expect(imgEl.style.display).toBe('none');
    });
  });

  describe('configuration', () => {
    let rooEl;

    describe('if maxAllowedElements is configured to x only first x elements should be presented (incl. layout)', () => {
      beforeAll(() => {
        jsonPollockInstance.init({ maxAllowedElements: 1 });
        rooEl = addToBody(jsonPollockInstance.render(card));
      });

      afterAll(() => {
        //reset
        jsonPollockInstance.init({ maxAllowedElements: -1 });
      });

      it("All rendered elements should be wrapped with a div with a 'lp-json-pollock' class", () => {
        expect(rooEl.childNodes.length).toBe(1);
        expect(rooEl.childNodes[0].localName).toBe('div');
        expect(rooEl.childNodes[0].className).toBe('lp-json-pollock');
      });

      it('A single container of type layout (horizontal/vertical) was created with a single child elemnt', () => {
        const wrapdiv = rooEl.childNodes[0];
        expect(wrapdiv.childNodes.length).toBe(1);
        expect(wrapdiv.childNodes[0].localName).toBe('div');
        expect(wrapdiv.childNodes[0].className).toBe(
          'lp-json-pollock-layout lp-json-pollock-layout-vertical',
        );
        expect(wrapdiv.childNodes[0].childNodes.length).toBe(1);
      });

      it('An element of type image should be created', () => {
        const layout = rooEl.childNodes[0].childNodes[0];
        expect(layout.childNodes[0].localName).toBe('div');
        expect(layout.childNodes[0].className).toContain('lp-json-pollock-element-image'); //it can also includes loading
        expect(layout.childNodes[0].childNodes[1].localName).toBe('img');
        expect(layout.childNodes[0].childNodes[1].src).toContain('assets/iphone-8-concept.jpg');
        expect(layout.childNodes[0].title).toBe('image tooltip');
      });
    });
  });

  xdescribe('Negative tests', () => {
    const SCHEMA_VALIDATION_ERR = "Schema validation error, see 'errors' for more details";

    it('Wrong json representation trigger an error', () => {
      const wrongJson = '{"type": "vertical"';
      expect(() => jsonPollockInstance.render(wrongJson)).toThrow(); //json error
    });

    describe('Mandatory elements', () => {
      it('If element of type layout is lack of mandatory properties (elements) an invalid schema error should be triggered', () => {
        const verticalNoElements = {
          type: 'vertical',
        };
        expect(() => jsonPollockInstance.render(verticalNoElements)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type text is lack of mandatory properties (text) an invalid schema error should be triggered', () => {
        const textNoText = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              tooltip: 'text tooltip',
              rtl: true,
            },
          ],
        };
        expect(() => jsonPollockInstance.render(textNoText)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type button is lack of mandatory properties (title, action) an invalid schema error should be triggered', () => {
        const buttonNoTile = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              click: {
                actions: [
                  {
                    type: 'navigate',
                    lo: 23423423,
                    la: 2423423423,
                  },
                ],
              },
              tooltip: 'button tooltip',
              rtl: true,
            },
          ],
        };

        const buttonNoAction = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              title: 'Push Me!',
              tooltip: 'button tooltip',
              rtl: true,
            },
          ],
        };

        expect(() => jsonPollockInstance.render(buttonNoTile)).toThrow(SCHEMA_VALIDATION_ERR);
        // uncomment once added to schema
        //expect(() => jsonPollockInstance.render(buttonNoAction)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type map is lack of mandatory properties (url) an invalid schema error should be triggered', () => {
        const mapNoLaLo = {
          type: 'map',
        };

        expect(() => jsonPollockInstance.render(mapNoLaLo)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type image is lack of mandatory properties (url) an invalid schema error should be triggered', () => {
        const imageNoUrl = {
          type: 'vertical',
          elements: [
            {
              type: 'image',
              caption: 'This is an example of image caption',
              tooltip: 'image tooltip',
              rtl: true,
            },
          ],
        };

        expect(() => jsonPollockInstance.render(imageNoUrl)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type navigate is lack of mandatory properties (lo, la) an invalid schema error should be triggered', () => {
        const actionNoLo = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              title: 'mytitle',
              click: {
                actions: [
                  {
                    type: 'navigate',
                    la: 2423423423,
                  },
                ],
              },
              tooltip: 'button tooltip',
              rtl: true,
            },
          ],
        };

        const actionNoLa = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              title: 'mytitle',
              click: {
                actions: [
                  {
                    type: 'navigate',
                    lo: 2423423423,
                  },
                ],
              },
              tooltip: 'button tooltip',
              rtl: true,
            },
          ],
        };

        expect(() => jsonPollockInstance.render(actionNoLa)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type link is lack of mandatory properties (uri) an invalid schema error should be triggered', () => {
        const actionNoUri = {
          type: 'vertical',
          elements: [
            {
              type: 'button',
              title: 'mytitle',
              click: {
                actions: [
                  {
                    type: 'link',
                  },
                ],
              },
              tooltip: 'button tooltip',
              rtl: true,
            },
          ],
        };

        expect(() => jsonPollockInstance.render(actionNoUri)).toThrow(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('list negative tests', () => {
      let conf;
      beforeEach(() => {
        conf = {
          type: 'list',
          elements: [
            {
              type: 'text',
              text: 'header',
            },
            {
              type: 'sectionList',
              elements: [
                {
                  type: 'section',
                  sectionID: 'fruits',
                  elements: [
                    {
                      type: 'checklist',
                      elements: [
                        {
                          type: 'checkbox',
                          text: '1',
                          borderLine: true,
                          borderColor: '#000000',
                          click: {
                            metadata: [
                              {
                                type: 'ExternalId',
                                id: 'ANOTHER_ONE_35',
                              },
                            ],
                            actions: [
                              {
                                type: 'checked',
                                publishText: 'apples',
                              },
                            ],
                          },
                        },
                        {
                          type: 'checkbox',
                          text: '2',
                          borderLine: true,
                          borderColor: '#000000',
                          click: {
                            metadata: [
                              {
                                type: 'ExternalId',
                                id: 'ANOTHER_ONE_32',
                              },
                            ],
                            actions: [
                              {
                                type: 'checked',
                                publishText: 'bananas',
                              },
                            ],
                          },
                        },
                        {
                          type: 'checkbox',
                          text: '3',
                          borderLine: true,
                          borderColor: '#000000',
                          click: {
                            metadata: [
                              {
                                type: 'ExternalId',
                                id: 'ANOTHER_ONE_36',
                              },
                            ],
                            actions: [
                              {
                                type: 'checked',
                                publishText: 'avocados',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'buttonList',
              elements: [
                {
                  type: 'submitButton',
                  title: 'submit',
                  disabled: false,
                  click: {
                    metadata: [
                      {
                        type: 'ExternalId',
                        id: 'submissionID',
                      },
                    ],
                    actions: [
                      {
                        type: 'submitAsText',
                        submit: true,
                      },
                    ],
                  },
                },
                {
                  type: 'button',
                  title: 'mytitle',
                  click: {
                    actions: [
                      {
                        type: 'link',
                        uri: 'www.example.com',
                      },
                    ],
                  },
                  tooltip: 'button tooltip',
                  rtl: true,
                },
              ],
            },
          ],
        };
      });

      it('list cannot have any random basic elements', () => {
        const list = {
          type: 'list',
          elements: [
            {
              type: 'button',
              title: 'mytitle',
              click: {
                actions: [
                  {
                    type: 'link',
                    uri: 'www.example.com',
                  },
                ],
              },
              tooltip: 'button tooltip',
              rtl: true,
            },
            {
              type: 'text',
              text: 'header',
            },
          ],
        };

        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

      it('list must have header', () => {
        const list = cloneObject(conf);
        list.elements.splice(0, 1);
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('list elements cannot start with other element except a header', () => {
        const list = cloneObject(conf);
        const header = list.elements.splice(0, 1);
        list.elements.push(header);
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('list elements must have buttonList', () => {
        const list = cloneObject(conf);
        list.elements.splice(2, 1);
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('list elements must have sectionList', () => {
        const list = cloneObject(conf);
        list.elements.splice(1, 1);
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('sectionList elements cannot have other elements except sections', () => {
        const list = cloneObject(conf);
        list.elements[1].elements.push({
          type: 'text',
          text: 'hello',
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('section cannot start without subheaders start if the user wishes to have subheader', () => {
        const list = cloneObject(conf);
        list.elements[1].elements[0].elements.push({
          type: 'text',
          text: 'foo',
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('section cannot have other elements besides text and checklist', () => {
        const list = cloneObject(conf);
        list.elements[1].elements[0].elements.push({
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'foo',
            },
            {
              type: 'blablabla',
              text: 'foo',
            },
          ],
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('checklist cannot have other elements except checkboxes', () => {
        const list = cloneObject(conf);
        list.elements[1].elements[0].elements[0].elements.push({
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'foo',
            },
            {
              type: 'blablabla',
              text: 'foo',
            },
          ],
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('buttonList cannot start with other button besides submitButton', () => {
        const list = cloneObject(conf);
        const submitButton = list.elements[2].elements.splice(0, 1);
        list.elements[2].elements.push(submitButton);
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('buttonList cannot have other elements besides button and submitButton', () => {
        const list = cloneObject(conf);
        list.elements[2].elements.push({
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'foo',
            },
            {
              type: 'blablabla',
              text: 'foo',
            },
          ],
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('checkbox cannot have other actions besides checked', () => {
        const list = cloneObject(conf);
        list.elements[1].elements[0].elements[0].elements[0].click.actions.push({
          type: 'navigate',
          lo: 2423423423,
          la: 7897967267,
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('submitButton cannot have other actions besides submitAsText', () => {
        const list = cloneObject(conf);
        list.elements[2].elements[0].click.actions.push({
          type: 'navigate',
          lo: 2423423423,
          la: 7897967267,
        });
        expect(() => jsonPollockInstance.render(list)).toThrow(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Unrecognized elements', () => {
      it('If element is not recognized an invalid schema error should be triggered', () => {
        const json = {
          type: 'vertical',
          elements: [
            {
              type: 'text',
              text: 'foo',
            },
            {
              type: 'blablabla',
              text: 'foo',
            },
          ],
        };
        expect(() => jsonPollockInstance.render(json)).toThrow(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Type checking', () => {
      describe('Click property of basic element', () => {
        it('actions must be of array type', () => {
          const actionsWithNonArrayVal = {
            type: 'vertical',
            elements: [
              {
                type: 'button',
                title: 'mytitle',
                click: {
                  actions: {
                    type: 'navigate',
                    lo: 2423423423,
                    la: 7897967267,
                  },
                },
                tooltip: 'button tooltip',
                rtl: true,
              },
            ],
          };

          expect(() => jsonPollockInstance.render(actionsWithNonArrayVal)).toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });
      });

      describe('Action of type navigation', () => {
        it('lo value must be integer', () => {
          const navigateLoString = {
            type: 'vertical',
            elements: [
              {
                type: 'button',
                title: 'mytitle',
                click: {
                  actions: [
                    {
                      type: 'navigate',
                      lo: '2423423423',
                      la: 7897967267,
                    },
                  ],
                },
                tooltip: 'button tooltip',
                rtl: true,
              },
            ],
          };

          expect(() => jsonPollockInstance.render(navigateLoString)).toThrow(SCHEMA_VALIDATION_ERR);
        });

        it('la value must be integer', () => {
          const navigateLaString = {
            type: 'vertical',
            elements: [
              {
                type: 'button',
                title: 'mytitle',
                click: {
                  actions: [
                    {
                      type: 'navigate',
                      lo: 2423423423,
                      la: '7897967267',
                    },
                  ],
                },
                tooltip: 'button tooltip',
                rtl: true,
              },
            ],
          };

          expect(() => jsonPollockInstance.render(navigateLaString)).toThrow(SCHEMA_VALIDATION_ERR);
        });
      });

      describe('Action of type link', () => {
        it('uri format check according to rfc', () => {
          const linkWrongUriNoProtocol = {
            type: 'vertical',
            elements: [
              {
                type: 'button',
                title: 'mytitle',
                click: {
                  actions: [
                    {
                      type: 'link',
                      uri: 'www.example.com',
                    },
                  ],
                },
                tooltip: 'button tooltip',
                rtl: true,
              },
            ],
          };

          expect(() => jsonPollockInstance.render(linkWrongUriNoProtocol)).toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });
      });
    });
  });

  describe('onAfterElementRendered hook', () => {
    it('expect onAfterElementRendered callback to be called for each element', () => {
      const spy = jest.fn((element, tmpl) => {
        return element;
      });
      jsonPollockInstance.init({ onAfterElementRendered: spy });
      jsonPollockInstance.render(card);

      expect(spy).toHaveBeenCalledTimes(6);
    });

    it('expect onAfterElementRendered callback to provide the given template type', () => {
      const json = {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
      };
      const spy = jest.fn((element, tmpl) => {
        return element;
      });

      jsonPollockInstance.init({ onAfterElementRendered: spy });
      const element = jsonPollockInstance.render(json);

      expect(spy).toHaveBeenCalledWith(
        element.querySelector('.lp-json-pollock-element-text'),
        json,
      );
    });

    it('expect onAfterElementRendered callback to provide manipilated element', () => {
      const json = {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
      };
      const spy = jest.fn((element, tmpl) => {
        element.classList.add('my-custom-class');
        return element;
      });

      jsonPollockInstance.init({ onAfterElementRendered: spy });
      const element = jsonPollockInstance.render(json);

      expect(element.querySelector('.lp-json-pollock-element-text').className).toContain(
        'my-custom-class',
      );
    });

    it('expect element not to be rendered if was not returned by onAfterElementRendered', () => {
      const json = {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
      };
      const spy = jest.fn((element, tmpl) => {
        if (tmpl.type === 'text') {
          return null;
        }
        return element;
      });

      jsonPollockInstance.init({ onAfterElementRendered: spy });
      const element = jsonPollockInstance.render(json);

      expect(element.querySelector('.lp-json-pollock-element-text')).toBeNull();
    });
  });

  describe('validate function', () => {
    const SCHEMA_VALIDATION_ERR = "Schema validation error, see 'errors' for more details";
    const SCHEMA_VALIDATION_INPT_ERR = 'JsonPollock::validte - input is not an object';

    it('expect validate function not to throw error for valid json', () => {
      const jsonOK = {
        type: 'text',
        text: 'product name (Title)',
        tooltip: 'text tooltip',
      };

      expect(() => jsonPollockInstance.validate(jsonOK)).not.toThrow(SCHEMA_VALIDATION_ERR);
    });

    // it('expect validate function to throw error for non valid json', () => {
    //   const jsonBAD = {
    //     type: 'text',
    //     tooltip: 'text tooltip',
    //   };
    //
    //   expect(() => jsonPollockInstance.validate(jsonBAD)).toThrow(SCHEMA_VALIDATION_ERR);
    // });

    it('expect validate function to throw error non json input', () => {
      const jsonBAD = JSON.stringify({
        type: 'text',
        tooltip: 'text tooltip',
      });

      expect(() => jsonPollockInstance.validate(jsonBAD)).toThrow(SCHEMA_VALIDATION_INPT_ERR);
    });
  });

  describe('Vulnerable content must be sanitized', () => {
    let container;
    beforeAll((done) => {
      container = addToBody(jsonPollockInstance.render(vulnerableContent));
      setTimeout(() => {
        done();
      }, 0);
    });

    it('rendered HTML should not contain vulnerability', (done) => {
      expect(container.innerHTML).not.toContain('onmouseover');
      done();
    });
  });

  // FIXME: fix immediatelly after migration
  xdescribe('render carousel in ltr direction', function () {
    let carouselListRoot;
    let carouselRight;
    let carouselLeft;

    beforeAll((done) => {
      const conteiner = addToBody(jsonPollockInstance.render(JSON.stringify(carouselConf)));
      const carouselRootLayout = conteiner.children[0].children[0];
      carouselRight = carouselRootLayout.children[0];
      carouselLeft = carouselRootLayout.children[1];
      carouselListRoot = carouselRootLayout.children[2];

      setTimeout(() => {
        done();
      }, 0);
    });

    it('arrow should be rendered properly for ltr direction', () => {
      expect(window.getComputedStyle(carouselLeft).visibility).toBe('hidden');
      expect(window.getComputedStyle(carouselRight).visibility).toBe('visible');
    });

    it('carousel should move to the right', (done) => {
      const prevLeft = window.getComputedStyle(carouselListRoot).left;
      carouselRight.click();

      setTimeout(() => {
        const left = window.getComputedStyle(carouselListRoot).left;
        expect(Number.parseFloat(left)).toBeLessThan(Number.parseFloat(prevLeft)); // Compare parsed floats
        done();
      }, 100);
    });
  });

  // FIXME: fix immediatelly after migration
  xdescribe('render carousel in rtl direction', function () {
    let carouselListRoot;
    let carouselRight;
    let carouselLeft;

    beforeAll((done) => {
      const css = 'body * {direction: rtl; text-align: right}';
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');

      head.appendChild(style);
      style.appendChild(document.createTextNode(css));

      const conteiner = addToBody(jsonPollockInstance.render(JSON.stringify(carouselConf)));
      const carouselRootLayout = conteiner.children[0].children[0];
      carouselRight = conteiner.children[0].children[0].children[1];
      carouselLeft = conteiner.children[0].children[0].children[2];
      carouselListRoot = carouselRootLayout.children[0];

      setTimeout(() => {
        done();
      }, 0);
    });

    it('arrow should be rendered properly for rtl direction', () => {
      expect(window.getComputedStyle(carouselLeft).visibility).toBe('visible');
      expect(window.getComputedStyle(carouselRight).visibility).toBe('hidden');
    });

    it('carousel should move to the left', (done) => {
      const prevLeft = window.getComputedStyle(carouselListRoot).left;
      carouselLeft.click();

      setTimeout(() => {
        const left = window.getComputedStyle(carouselListRoot).left;
        expect(Number.parseFloat(left)).toBeLessThan(Number.parseFloat(prevLeft)); // Compare parsed floats
        done();
      }, 100);
    });
  });
});
