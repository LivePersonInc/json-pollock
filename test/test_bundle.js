
describe('json-pollock tests', function () {

  var pollockContainer = document.createElement('div');
  document.body.appendChild(pollockContainer);

  function addToBody(element) {
    pollockContainer.innerHTML = "";
    pollockContainer.appendChild(element);
    return pollockContainer;
  }

  var card = {
    "type": "vertical",
    "elements": [{
      "type": "image",
      "url": "assets/iphone-8-concept.jpg",
      "tooltip": "image tooltip",
      "caption": "this is a caption",      
      "accessibility": {
        "web": {
          "tabindex": "5"
        }
      },
      "click": {
        "actions": [{
          "type": "navigate",
          "name": "Navigate to store via image",
          "lo": 23.423423,
          "la": 2423423423
        }]
      }
    }, {
      "type": "text",
      "text": "product name (Title)",
      "tooltip": "text tooltip",
      "style": {
        "bold": true,
        "italic": true,
        "color": "red",
        "size": "large",
        "background-color": "green",
      },
    }, {
      "type": "button",
      "tooltip": "button tooltip",
      "title": "Add to cart",
      "alt": "alt text",
      "click": {
        "actions": [{
          "type": "link",
          "name": "add to cart",
          "uri": "http://example.jpg"
        }]
      },
      "style": {
        "bold": false,
        "italic": false,
        "color": "red",
        "size": 'medium',
        "background-color": "green",
      },
    },{
      "type": "map",
      "lo": 64.128597,
      "la": -21.896110,
      "tooltip": "map tooltip"
    },]
  };

  var carouselConf = {
    "type": "carousel",
    "padding": 10,
    "elements": [
      {
        "type": "vertical",
        "elements": [
          {
            "type": "text",
            "text": "1",
            "tooltip": "1",
            "rtl": false,
            "style": {
              "bold": false,
              "italic": false,
              "color": "#000000",
              "size": "large"
            }
          },
          {
            "type": "text",
            "text": "Twelve month plan BYO mobile",
            "tooltip": "Twelve month plan BYO mobile",
            "rtl": false,
            "style": {
              "bold": true,
              "italic": false,
              "color": "#000000"
            }
          },
          {
            "type": "button",
            "tooltip": "Choose a plan",
            "title": "Choose a plan",
            "click": {
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "ANOTHER_ONE_1"
                }
              ],
              "actions": [
                {
                  "type": "publishText",
                  "text": "SIM only plan"
                }
              ]
            }
          }
        ]
      },
      {
        "type": "vertical",
        "elements": [
          {
            "type": "text",
            "text": "2",
            "tooltip": "2",
            "rtl": false,
            "style": {
              "bold": false,
              "italic": false,
              "color": "#000000",
              "size": "large"
            }
          },
          {
            "type": "text",
            "text": "Two year plan leasing a mobile",
            "tooltip": "Two year plan leasing a mobile",
            "rtl": false,
            "style": {
              "bold": true,
              "italic": false,
              "color": "#000000"
            }
          },
          {
            "type": "button",
            "tooltip": "Choose a plan",
            "title": "Choose a plan",
            "click": {
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "ANOTHER_ONE_2"
                }
              ],
              "actions": [
                {
                  "type": "publishText",
                  "text": "Two year plan leasing a mobile"
                }
              ]
            }
          }
        ]
      },
      {
        "type": "vertical",
        "elements": [
          {
            "type": "text",
            "text": "3",
            "tooltip": "3",
            "rtl": false,
            "style": {
              "bold": false,
              "italic": false,
              "color": "#000000",
              "size": "large"
            }
          },
          {
            "type": "text",
            "text": "Two year plan with a mobile",
            "tooltip": "Two year plan with a mobile",
            "rtl": false,
            "style": {
              "bold": true,
              "italic": false,
              "color": "#000000"
            }
          },
          {
            "type": "button",
            "tooltip": "Choose a plan",
            "title": "Choose a plan",
            "click": {
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "ANOTHER_ONE_3"
                }
              ],
              "actions": [
                {
                  "type": "publishText",
                  "text": "Mobiles on a plan"
                }
              ]
            }
          }
        ]
      }
    ],
    "accessibility": {
      "web": {
        "aria-label": "Carousel"
      }
    }
  };

  describe('render basic elements', function () {

    var fragEl = null;
    var rooEl = null;

    before(function () {
      fragEl = JsonPollock.render(card);
      rooEl = addToBody(fragEl);
    });

    it('Root should be a DocumentFragment instance', function () {
      chai.expect(fragEl).to.be.instanceOf(DocumentFragment);
    });

    it('should expose public function', function () {
      chai.expect(JsonPollock.init).to.exist;
      chai.expect(JsonPollock.render).to.exist;
      chai.expect(JsonPollock.registerAction).to.exist;
      chai.expect(JsonPollock.unregisterAction).to.exist;
      chai.expect(JsonPollock.unregisterAllActions).to.exist;
      chai.expect(JsonPollock.version).to.exist;
      chai.expect(JsonPollock.validate).to.exist;
      chai.expect(JsonPollock.TEMPLATE_TYPES).to.exist;
    });

    it('All rendered elements should be wrapped with a div with a \'lp-json-pollock\' class', function () {
      chai.expect(rooEl.childNodes.length).to.equal(1);
      chai.expect(rooEl.childNodes[0].localName).to.equal('div');
      chai.expect(rooEl.childNodes[0].className).to.equal('lp-json-pollock');
    });

    it('A single container of type layout (horizontal/vertical) is allowed', function () {
      var wrapdiv = rooEl.childNodes[0];
      chai.expect(wrapdiv.childNodes.length).to.equal(1);
      chai.expect(wrapdiv.childNodes[0].localName).to.equal('div');
      chai.expect(wrapdiv.childNodes[0].className).to.equal('lp-json-pollock-layout lp-json-pollock-layout-vertical');
      chai.expect(wrapdiv.childNodes[0].childNodes.length).to.equal(4);
    });

    it('An element of type button should be created', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[2].localName).to.equal('div');
      chai.expect(layout.childNodes[2].className).to.equal('lp-json-pollock-element-button');
      chai.expect(layout.childNodes[2].childNodes[0].localName).to.equal('button');
      chai.expect(layout.childNodes[2].childNodes[0].title).to.equal('button tooltip');
      chai.expect(layout.childNodes[2].childNodes[0].textContent).to.equal('Add to cart');
    });

    it('Check for style generation of text element', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[1].childNodes[0].style).to.be.exist;
      chai.expect(layout.childNodes[1].childNodes[0].style.color).to.equal('red');
      chai.expect(layout.childNodes[1].childNodes[0].style.fontWeight).to.equal('bold');
      chai.expect(layout.childNodes[1].childNodes[0].style.fontSize).to.equal('17px');
      chai.expect(layout.childNodes[1].childNodes[0].style.fontStyle).to.equal('italic');
      chai.expect(layout.childNodes[1].childNodes[0].style.backgroundColor).to.not.equal('green');
      chai.expect(layout.childNodes[1].style.backgroundColor).to.equal('green');
    });

    it('Check for style generation of button element', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[2].childNodes[0].style).to.be.exist;
      chai.expect(layout.childNodes[2].childNodes[0].style.color).to.equal('red');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontWeight).to.equal('');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontSize).to.equal('13px');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontStyle).to.equal('');
      chai.expect(layout.childNodes[2].childNodes[0].style.backgroundColor).to.not.equal('green');
      chai.expect(layout.childNodes[2].style.backgroundColor).to.equal('green');
    });

    it('An element of type map should be created', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[3].localName).to.equal('div');
      chai.expect(layout.childNodes[3].className).to.equal('lp-json-pollock-element-map');
      chai.expect(layout.childNodes[3].title).to.equal('map tooltip');
    });

    it('An element of type text should be created', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[1].localName).to.equal('div');
      chai.expect(layout.childNodes[1].className).to.equal('lp-json-pollock-element-text');
      chai.expect(layout.childNodes[1].childNodes[0].localName).to.equal('span');
      chai.expect(layout.childNodes[1].childNodes[0].title).to.equal('text tooltip');
      chai.expect(layout.childNodes[1].childNodes[0].textContent).to.equal('product name (Title)');
    });
    it('An image element should contain appropriate alt attribute', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      var image = layout.childNodes[0].childNodes[1];
      chai.expect(image.getAttribute('alt')).to.equal('image tooltip');
    });
    it('An image element should contain a11y tabindex attribute', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      var image = layout.childNodes[0].childNodes[1];
      chai.expect(image.getAttribute('tabindex')).to.equal('5');
    });

    // special cases - we would like the onload and onerror callbacks to be called right after the load
    // therefore the test is async and we add the fargment to the DOM is the test itself
    it('An element of type image should be created', function (done) {
      fragEl = JsonPollock.render(card);
      var layout = fragEl.childNodes[0].childNodes[0];
      var image = layout.childNodes[0].childNodes[1];
      chai.expect(layout.childNodes[0].localName).to.equal('div');
      chai.expect(layout.childNodes[0].className).to.equal('lp-json-pollock-element-image loading');
      chai.expect(layout.childNodes[0].childNodes[0].localName).to.equal('span');
      chai.expect(layout.childNodes[0].childNodes[0].textContent).to.equal('this is a caption');
      chai.expect(layout.childNodes[0].childNodes[1].localName).to.equal('img');
      chai.expect(layout.childNodes[0].childNodes[1].src).to.contain('assets/iphone-8-concept.jpg');
      chai.expect(layout.childNodes[0].title).to.equal('image tooltip');
      var origOnload = image.onload;
      image.onload = function() {
        origOnload.apply(this);
        chai.expect(layout.childNodes[0].className).to.equal('lp-json-pollock-element-image');
        done();
      };
      addToBody(fragEl);
    });

    it('Image with wrong url should be created with error class', function (done) {
      var errImg = {
        "type": "image",
        "url": "http://example.jpg",        
        "click": {
          "actions": [{
            "type": "navigate",
            "name": "Navigate to store via image",
            "lo": 23.423423,
            "la": 2423423423
          }]
        }
      };

      fragEl = JsonPollock.render(errImg);
      var layout = fragEl.childNodes[0].childNodes[0];
      var image = layout.childNodes[0];
      chai.expect(layout.localName).to.equal('div');
      chai.expect(layout.className).to.equal('lp-json-pollock-element-image loading');
      chai.expect(layout.childNodes[0].localName).to.equal('img');
      chai.expect(layout.childNodes[0].src).to.contain('http://example.jpg/');
      chai.expect(layout.childNodes[0].getAttribute('role')).to.equal('presentation');
      var origOnError = image.onerror;
      image.onerror = function() {
        origOnError.apply(this);
        chai.expect(layout.className).to.equal('lp-json-pollock-element-image error');
        done();
      };
      addToBody(fragEl);
    });
  });

  describe('render rtl elements', function () {
    var rtlCard = {
      "type": "vertical",
      "elements": [{
        "type": "image",
        "url": "assets/iphone-8-concept.jpg",
        "tooltip": "image tooltip",
        "caption": "איזה יופי של תמונה",
        "rtl": true,
        "click": {
          "actions": [{
            "type": "navigate",
            "name": "Navigate to store via image",
            "lo": 23.423423,
            "la": 2423423423
          }]
        }
      }, {
        "type": "image",
        "url": "/wrong_url",
        "tooltip": "image tooltip",
        "caption": "איזה חרא של תמונה",
        "rtl": true,
        "click": {
          "actions": [{
            "type": "navigate",
            "name": "Navigate to store via image",
            "lo": 23.423423,
            "la": 2423423423
          }]
        }
      }, {
        "type": "text",
        "text": "אייפון 8",
        "tooltip": "text tooltip",
        "rtl": true,
        "style": {
          "bold": true,
          "italic": true,
          "color": "red",
          "size": "large"
        },
      }, {
        "type": "button",
        "tooltip": "button tooltip",
        "title": "קנה",
        "rtl": true,
        "click": {
          "actions": [{
            "type": "link",
            "name": "add to cart",
            "uri": "http://example.jpg"
          }]
        },
      },]
    }

    var fragEl = null;
    var rooEl = null;

    before(function () {
      fragEl = JsonPollock.render(rtlCard);
      rooEl = addToBody(fragEl);
    });

    function verifyRTL(el) {
      chai.expect(el.className).to.contain('direction-rtl');
      chai.expect(el.dir).to.equal('rtl');
    }

    it('image element should have dir=rtl and \'direction-rtl\' class', function (done) {
      // special case - we would like the onload callback to be called right after the load
      // therefore the test is async and we add the fargment to the DOM is the test itself
      fragEl = JsonPollock.render(rtlCard);
      var image = fragEl.childNodes[0].childNodes[0].childNodes[0];
      var origOnload = image.childNodes[1].onload;
      image.childNodes[1].onload = function() {
        origOnload.apply(this);
        verifyRTL(image);
        done();
      };
      addToBody(fragEl);
    });

    it('broken image element should still have dir=rtl and \'direction-rtl\' class', function (done) {
      // special case - we would like the onerror callback to be called right after the load
      // therefore the test is async and we add the fargment to the DOM is the test itself
      fragEl = JsonPollock.render(rtlCard);
      var image = fragEl.childNodes[0].childNodes[0].childNodes[1];
      var origOnError = image.childNodes[1].onerror;
      image.childNodes[1].onerror = function() {
        origOnError.apply(this);
        verifyRTL(image);
        done();
      };
      addToBody(fragEl);
    });

    it('text element should have dir=rtl and \'direction-rtl\' class', function () {
      var text = rooEl.childNodes[0].childNodes[0].childNodes[2];
      verifyRTL(text);
    });

    it('button element should have dir=rtl and \'direction-rtl\' class', function () {
      var btn = rooEl.childNodes[0].childNodes[0].childNodes[3];
      verifyRTL(btn);
    });

  });

  describe('render layout elements', function () {

    var rooEl = null;
    var firstLayout = null;
    var secondLayout = null;
    var textEl = null;

    it('Horizontal nested in Vertical', function () {

      var conf = {
        "type": "vertical",
        "elements": [{
          "type": "horizontal",
          "elements": [
            {
              "type": "text",
              "text": "foo"
            }
          ]
        }]
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      textEl = secondLayout.childNodes[0];

      chai.expect(firstLayout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-vertical');
      chai.expect(secondLayout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-horizontal');
      chai.expect(textEl.className).to.contain('lp-json-pollock-element-text');
    });

    it('Vertical nested in Horizontal', function () {

      var conf = {
        "type": "horizontal",
        "elements": [{
          "type": "vertical",
          "elements": [
            {
              "type": "text",
              "text": "foo"
            }
          ]
        }]
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
      textEl = secondLayout.childNodes[0];

      chai.expect(firstLayout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-horizontal');
      chai.expect(secondLayout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-vertical');
      chai.expect(textEl.className).to.contain('lp-json-pollock-element-text');
    });

    it('Vertical should have the appropriate WCAG attribute', function () {

      var conf = {
        "type": "vertical",
        "elements": [{
          "type": "text",
          "text": "Test text",
          "tooltip": "text tooltip"
        }],
        "accessibility": {
          "web": {
            "aria-label": "Vertical"
          }
        }
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

      var layout = rooEl.childNodes[0].childNodes[0];

      chai.expect(layout.getAttribute('aria-label')).to.equal('Vertical');
    });

    it('Horizontal should have the appropriate WCAG attribute', function () {

      var conf = {
        "type": "horizontal",
        "elements": [{
          "type": "text",
          "text": "Test text",
          "tooltip": "text tooltip"
        }],
        "accessibility": {
          "web": {
            "aria-label": "Horizontal"
          }
        }
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

      var layout = rooEl.childNodes[0].childNodes[0];

      chai.expect(layout.getAttribute('aria-label')).to.equal('Horizontal');
    });

    describe('massive content', function () {

      it('Horizontal layout with many elements - width must not exceeds parent layout', function () {

        var conf = {
          "type": "horizontal",
            "elements": [
              {
                "type": "text",
                "text": "foo1"
              },
              {
                "type": "text",
                "text": "foo2"
              },
              {
                "type": "text",
                "text": "foo3"
              },
              {
                "type": "text",
                "text": "foo4"
              },
              {
                "type": "text",
                "text": "foo5"
              },
              {
                "type": "text",
                "text": "foo6"
              },
              {
                "type": "text",
                "text": "foo7"
              },
              {
                "type": "text",
                "text": "foo7"
              },
              {
                "type": "text",
                "text": "foo8"
              },
              {
                "type": "text",
                "text": "foo9"
              },
              {
                "type": "text",
                "text": "foo10"
              },
              {
                "type": "image",
                "url": "http://example.jpg",
                "tooltip": "image tooltip",
                "click": {
                  "actions": [{
                    "type": "navigate",
                    "name": "Navigate to store via image",
                    "lo": 23423423,
                    "la": 2423423423
                  }]
                }
              },
              {
                "type": "image",
                "url": "http://example.jpg",
                "tooltip": "image tooltip",
                "click": {
                  "actions": [{
                    "type": "navigate",
                    "name": "Navigate to store via image",
                    "lo": 23423423,
                    "la": 2423423423
                  }]
                }
              },
              {
                "type": "button",
                "tooltip": "button tooltip",
                "title": "Add to cart",
                "click": {
                  "actions": [{
                    "type": "link",
                    "name": "add to cart",
                    "uri": "https://example.com"
                  }]
                }
              },
              {
                "type": "button",
                "tooltip": "button tooltip",
                "title": "Publish text",
                "click": {
                  "metadata": [{
                    "event": "PublishTextEvent"
                  }],
                  "actions": [{
                    "type": "publishText",
                    "text": "my text",
                  }]
                }
              }
            ]
        }

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        layout = rooEl.childNodes[0].childNodes[0];
        var layoutWidth = layout.offsetWidth;
        var elementsWidth = 0;
        Array.prototype.forEach.call(layout.childNodes, function (node) {
          elementsWidth += node.offsetWidth;
        });

        chai.expect(layout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-horizontal');
        chai.expect(elementsWidth).to.be.at.least(layoutWidth - 10);
        // chai.expect(elementsWidth).to.be.at.most(layoutWidth);
      });

      it('Vertical with very long text should wrap word', function () {

        var conf = {
          "type": "vertical",
          "elements": [{
            "type": "text",
            "text": "very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text...",
            "tooltip": "text tooltip"
          }]
        }

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        layout = rooEl.childNodes[0].childNodes[0];
        textEl = rooEl.childNodes[0].childNodes[0].childNodes[0];

        var layoutWidth = layout.offsetWidth;
        var layoutHeight = layout.offsetHeight;
        var textWidth = textEl.offsetWidth;
        var textHeight = textEl.offsetHeight;

        chai.expect(layout.className).to.contain('lp-json-pollock-layout lp-json-pollock-layout-vertical');
        chai.expect(textWidth).to.be.at.most(layoutWidth);
        chai.expect(textHeight).to.be.at.most(layoutHeight);
      });

    });

  });

  describe('render carousel', function(){

    const container = addToBody(JsonPollock.render(JSON.stringify(carouselConf)));
    const carouselRoot = container.children[0];
    const carouselRootWrapper = container.children[0].children[0];
    const carouselRootLayout = container.children[0].children[0];
    const carouselRight = container.children[0].children[0].children[1];
    const carouselLeft = container.children[0].children[0].children[2];
    const carouselListRoot =  carouselRootLayout.children[0];
    const card1 = carouselRootLayout.children[0].children[0];
    const card2 = carouselRootLayout.children[0].children[1];
    const card3 = carouselRootLayout.children[0].children[2];

    it('carousel root exist', function () {
      chai.expect(carouselRoot.className).to.contain('lp-json-pollock');
    });

    it('carousel wrapper root exist', function () {
      chai.expect(carouselRootWrapper.className).to.contain('lp-json-pollock-layout-carousel-wrapper');
    });

    it('carousel root layout exist', function () {
      chai.expect(carouselRootLayout.className).to.contain('lp-json-pollock-layout-carousel');
    });

    it('carousel arrow right exist', function () {
      chai.expect(carouselRight.className).to.contain('lp-json-pollock-layout-carousel-arrow');
    });

    it('carousel arrow right has type="button" attribute', function () {
      chai.expect(carouselRight.getAttribute('type')).to.be.equal('button');
    });

    it('carousel arrow right has aria-label attribute', function () {
      chai.expect(carouselRight.getAttribute('aria-label')).to.be.equal('Next');
    });

    it('carousel arrow right holds component action mark', function () {
      chai.expect(carouselRight.className).to.contain('lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow');
    });

    it('carousel arrow left exist', function () {
      chai.expect(carouselLeft.className).to.contain('lp-json-pollock-layout-carousel-arrow left');
    });

    it('carousel arrow left has type="button" attribute', function () {
      chai.expect(carouselLeft.getAttribute('type')).to.be.equal('button');
    });

    it('carousel arrow left has aria-label attribute', function () {
      chai.expect(carouselLeft.getAttribute('aria-label')).to.be.equal('Previous');
    });

    it('carousel arrow left holds component action mark', function () {
      chai.expect(carouselLeft.className).to.contain('lp-json-pollock-component-action lp-json-pollock-layout-carousel-arrow left');
    });

    it('carousel elements length equal to conf element length', function () {
      chai.expect(carouselRootLayout.children.length).to.be.equal(carouselConf.elements.length);
    });

    it('carousel elements are in the right order', function () {
      chai.expect(card1.children[0].innerText).to.be.equal('1');
      chai.expect(card2.children[0].innerText).to.be.equal('2');
      chai.expect(card3.children[0].innerText).to.be.equal('3');
    });

    it('carousel accessibility attrbs', function () {
      chai.expect(carouselListRoot.getAttribute('role')).to.be.equal('list');
      chai.expect(card1.getAttribute('role')).to.be.equal('listitem');
      chai.expect(card2.getAttribute('role')).to.be.equal('listitem');
      chai.expect(card3.getAttribute('role')).to.be.equal('listitem');
    });
    it('carousel root should have appropriate WCAG attribute', function () {
      chai.expect(carouselRootWrapper.getAttribute('aria-label')).to.be.equal('Carousel');
    });

  });

  describe('render list', function () {

    var conf = {
      "type": "list",
      "elements": [
        {
          "type": "text",
          "text": "The checklist"
        },
        {
          "type": "sectionList",
          "elements": [
            {
              "type": "section",
              "sectionID": "fruits",
              "elements": [
                {
                  "type": "checklist",
                  "elements": [
                    {
                      "type": "checkbox",
                      "text": "1",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_35"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "apples"
                          }
                        ]
                      },
                      "accessibility": {
                        "web": {
                          "aria-label": "Checkbox1"
                        }
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "2",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_32"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "bananas"
                          }
                        ]
                      },
                      "accessibility": {
                        "web": {
                          "aria-label": "Checkbox2"
                        }
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "3",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_36"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "avocados"
                          }
                        ]
                      },
                      "accessibility": {
                        "web": {
                          "aria-label": "Checkbox3"
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "buttonList",
          "elements": [
            {
              "type": "submitButton",
              "title": "submit",
              "disabled": false,
              "click": {
                "metadata": [
                  {
                    "type": "ExternalId",
                    "id": "submissionID"
                  }
                ],
                "actions": [
                  {
                    "type": "submitAsText",
                    "submit": true
                  }
                ]
              },
              "accessibility": {
                "web": {
                  "tabindex": "0"
                }
              }
            }
          ]
        }
      ]
    };

    const container = addToBody(JsonPollock.render(JSON.stringify(conf)));
    const listContainerRoot = container.children[0];
    const listRootLayout = container.children[0].children[0];
    const header = container.children[0].children[0].children[0];
    const sectionListLayout = container.children[0].children[0].children[1];
    const buttonListLayout = container.children[0].children[0].children[2];
    const sectionLayout = sectionListLayout.children[0];
    const checklistLayout = sectionLayout.children[0];

    it('container element exists', function () {
      chai.expect(listContainerRoot.className).to.contains('lp-json-pollock');
    });

    it('list wrapper root exist', function () {
      chai.expect(listRootLayout.className).to.contains('lp-json-pollock-layout-form');
    });

    it('header exist', function () {
      chai.expect(header.className).to.contains('lp-json-pollock-element-text');
    });

    it('sectionListLayout exist', function () {
      chai.expect(sectionListLayout.className).to.contains('lp-json-pollock-layout-sectionList');
    });

    it('buttonListLayout exist', function () {
      chai.expect(buttonListLayout.className).to.contains('lp-json-pollock-layout-buttonList');
    });

    it('section exist within sectionList', function () {
      chai.expect(sectionLayout.className).to.contains('lp-json-pollock-layout-section');
      chai.expect(sectionLayout.getAttribute('data-section-id')).to.equal('fruits');
    });

    it('checklist exists within section', function () {
      chai.expect(checklistLayout.className).to.contains('lp-json-pollock-layout-checklist');
    });

    it('checkbox exists within checklist', function () {
      chai.expect(checklistLayout.children.length).to.equal(3);
      chai.expect(checklistLayout.children[0].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklistLayout.children[1].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklistLayout.children[2].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklistLayout.children[0].innerText).to.equal('1');
      chai.expect(checklistLayout.children[1].innerText).to.equal('2');
      chai.expect(checklistLayout.children[2].innerText).to.equal('3');
    });

    it('a11y attributes exists within checklist', function () {
      var inputEl = checklistLayout.children[0].querySelector('.lp-json-pollock-element-checkbox-input');
      var labelEl = checklistLayout.children[0].querySelector('.lp-json-pollock-element-checkbox-label');
      var labels = checklistLayout.querySelectorAll('.lp-json-pollock-element-checkbox-label');
      chai.expect(inputEl).to.exist;
      chai.expect(inputEl.id).to.exist;
      chai.expect(labelEl).to.exist;
      chai.expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
      for (var i = 1; i <= labels.length; i++) {
        chai.expect(labels[i - 1].getAttribute('aria-label')).to.equal('Checkbox' + i);
      }
    });

    it('submitButton exist', function () {
      chai.expect(buttonListLayout.children[0].className).to.contains('lp-json-pollock-element-submit-button');
      chai.expect(buttonListLayout.children[0].children[0].disabled).to.equal(false);
    });

    it('submitButton should contain appropriate WCAG attribute', function () {
      chai.expect(buttonListLayout.children[0].children[0].getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('render list with multiple sections and multiple buttons', function () {

    var conf = {
      "type": "list",
      "elements": [
        {
          "type": "text",
          "text": "The checklist"
        },
        {
          "type": "sectionList",
          "elements": [
            {
              "type": "section",
              "sectionID": "fruits",
              "elements": [
                {
                  "type": "text",
                  "text": "The subheader"
                },
                {
                  "type": "checklist",
                  "elements": [
                    {
                      "type": "checkbox",
                      "text": "1",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_35"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "apples"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "2",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_32"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "bananas"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "3",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_36"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "avocados"
                          }
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "section",
              "sectionID": "fruits123",
              "elements": [
                {
                  "type": "text",
                  "text": "The subheader"
                },
                {
                  "type": "checklist",
                  "elements": [
                    {
                      "type": "checkbox",
                      "text": "01",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_35"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "apples"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "02",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_32"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "bananas"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "03",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_36"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "avocados"
                          }
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "buttonList",
          "elements": [
            {
              "type": "submitButton",
              "title": "submit",
              "disabled": false,
              "click": {
                "metadata": [
                  {
                    "type": "ExternalId",
                    "id": "submissionID"
                  }
                ],
                "actions": [
                  {
                    "type": "submitAsText",
                    "submit": true
                  }
                ]
              }
            },
            {
              "type": "button",
              "title": "Back",
              "click": {
                "metadata": [
                  {
                    "type": "ExternalId",
                    "id": "ANOTHER_ONE_20"
                  }
                ],
                "actions": [
                  {
                    "type": "publishText",
                    "text": "Back"
                  }
                ]
              }
            }
          ]
        }
      ]
    };

    const container = addToBody(JsonPollock.render(JSON.stringify(conf)));
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

    it('container element exists', function () {
      chai.expect(listContainerRoot.className).to.contains('lp-json-pollock');
    });

    it('list wrapper root exist', function () {
      chai.expect(listRootLayout.className).to.contains('lp-json-pollock-layout-form');
    });

    it('header exist', function () {
      chai.expect(header.className).to.contains('lp-json-pollock-element-text');
    });

    it('sectionListLayout exist', function () {
      chai.expect(sectionListLayout.className).to.contains('lp-json-pollock-layout-sectionList');
    });

    it('buttonListLayout exist', function () {
      chai.expect(buttonListLayout.className).to.contains('lp-json-pollock-layout-buttonList');
    });

    it('both sections exist within sectionList', function () {
      chai.expect(section1Layout.className).to.contains('lp-json-pollock-layout-section');
      chai.expect(section1Layout.getAttribute('data-section-id')).to.equal('fruits');
      chai.expect(section2Layout.className).to.contains('lp-json-pollock-layout-section');
      chai.expect(section2Layout.getAttribute('data-section-id')).to.equal('fruits123');
    });

    it('both section subheaders exists', function () {
      chai.expect(subheader1Layout.className).to.contains('lp-json-pollock-element-text');
      chai.expect(subheader2Layout.className).to.contains('lp-json-pollock-element-text');
    });

    it('both checklists exists within section', function () {
      chai.expect(checklist1Layout.className).to.contains('lp-json-pollock-layout-checklist');
      chai.expect(checklist2Layout.className).to.contains('lp-json-pollock-layout-checklist');
    });

    it('6 checkboxes exists within checklist', function () {
      chai.expect(checklist1Layout.children.length).to.equal(3);
      chai.expect(checklist1Layout.children[0].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[1].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[2].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[0].innerText).to.equal('1');
      chai.expect(checklist1Layout.children[1].innerText).to.equal('2');
      chai.expect(checklist1Layout.children[2].innerText).to.equal('3');

      chai.expect(checklist2Layout.children.length).to.equal(3);
      chai.expect(checklist2Layout.children[0].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist2Layout.children[1].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist2Layout.children[2].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist2Layout.children[0].innerText).to.equal('01');
      chai.expect(checklist2Layout.children[1].innerText).to.equal('02');
      chai.expect(checklist2Layout.children[2].innerText).to.equal('03');
    });

    it('submitButton exist', function () {
      chai.expect(buttonListLayout.children[0].className).to.contains('lp-json-pollock-element-submit-button');
      chai.expect(buttonListLayout.children[0].children[0].disabled).to.equal(false);
    });

    it('button exist', function () {
      chai.expect(buttonListLayout.children[1].className).to.contains('lp-json-pollock-element-button');
      chai.expect(buttonListLayout.children[1].children[0].type).to.equal('button');
    });
  });

  describe('render list with rtl and button disabled', function () {

    var conf = {
      "type": "list",
      "elements": [
        {
          "type": "text",
          "text": "The checklist"
        },
        {
          "type": "sectionList",
          "elements": [
            {
              "type": "section",
              "sectionID": "fruits",
              "elements": [
                {
                  "type": "text",
                  "text": "The subheader"
                },
                {
                  "type": "checklist",
                  "elements": [
                    {
                      "type": "checkbox",
                      "text": "1",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "rtl": true,
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_35"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "apples"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "2",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "rtl": true,
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_32"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "bananas"
                          }
                        ]
                      }
                    },
                    {
                      "type": "checkbox",
                      "text": "3",
                      "borderLine": true,
                      "borderColor": "#000000",
                      "rtl": true,
                      "click": {
                        "metadata": [
                          {
                            "type": "ExternalId",
                            "id": "ANOTHER_ONE_36"
                          }
                        ],
                        "actions": [
                          {
                            "type": "checked",
                            "publishText": "avocados"
                          }
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "buttonList",
          "elements": [
            {
              "type": "submitButton",
              "title": "submit",
              "disabled": true,
              "rtl": true,
              "click": {
                "metadata": [
                  {
                    "type": "ExternalId",
                    "id": "submissionID"
                  }
                ],
                "actions": [
                  {
                    "type": "submitAsText",
                    "submit": true
                  }
                ]
              }
            },
            {
              "type": "button",
              "title": "Back",
              "click": {
                "metadata": [
                  {
                    "type": "ExternalId",
                    "id": "ANOTHER_ONE_20"
                  }
                ],
                "actions": [
                  {
                    "type": "publishText",
                    "text": "Back"
                  }
                ]
              }
            }
          ]
        }
      ]
    };

    const container = addToBody(JsonPollock.render(JSON.stringify(conf)));
    const listContainerRoot = container.children[0];
    const listRootLayout = container.children[0].children[0];
    const header = container.children[0].children[0].children[0];
    const sectionListLayout = container.children[0].children[0].children[1];
    const buttonListLayout = container.children[0].children[0].children[2];
    const section1Layout = sectionListLayout.children[0];
    const subheader1Layout = section1Layout.children[0];
    const checklist1Layout = section1Layout.children[1];

    it('container element exists', function () {
      chai.expect(listContainerRoot.className).to.contains('lp-json-pollock');
    });

    it('3 checkboxes exists within checklist with rtl', function () {
      chai.expect(checklist1Layout.children.length).to.equal(3);
      chai.expect(checklist1Layout.children[0].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[0].children[1].children[1].className).to.contains('direction-rtl');
      chai.expect(checklist1Layout.children[0].children[1].children[1].dir).to.equal('rtl');
      chai.expect(checklist1Layout.children[1].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[1].children[1].children[1].className).to.contains('direction-rtl');
      chai.expect(checklist1Layout.children[1].children[1].children[1].dir).to.equal('rtl');
      chai.expect(checklist1Layout.children[2].className).to.contains('lp-json-pollock-element-checkbox');
      chai.expect(checklist1Layout.children[2].children[1].children[1].className).to.contains('direction-rtl');
      chai.expect(checklist1Layout.children[2].children[1].children[1].dir).to.equal('rtl');
      chai.expect(checklist1Layout.children[0].innerText).to.equal('1');
      chai.expect(checklist1Layout.children[1].innerText).to.equal('2');
      chai.expect(checklist1Layout.children[2].innerText).to.equal('3');
    });

    it('submitButton exist with rtl and disabled', function () {
      chai.expect(buttonListLayout.children[0].className).to.contains('lp-json-pollock-element-submit-button');
      chai.expect(buttonListLayout.children[0].className).to.contains('direction-rtl');
      chai.expect(buttonListLayout.children[0].dir).to.equal('rtl');
      chai.expect(buttonListLayout.children[0].children[0].disabled).to.equal(true);
    });

  });

  describe('border policy', function () {

    var rooEl = null;
    var firstLayout = null;
    var secondLayout = null;
    var simpleEl = null;

    function getStyle(elem, style) {
      return window.getComputedStyle(elem)[style];
    }

    it('Root vertical and horizontal layout should have a complete border', function () {

      var conf1 = {
        "type": "vertical",
        "elements": [{
          "type": "text",
          "text": "foo"
        }]
      }
      var conf2 = {
        "type": "horizontal",
        "elements": [{
          "type": "text",
          "text": "foo"
        }]
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf1)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      chai.expect(getStyle(firstLayout, 'border')).to.contain('1px solid');

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf2)));

      firstLayout = rooEl.childNodes[0].childNodes[0];
      chai.expect(getStyle(firstLayout, 'border')).to.contain('1px solid');
    });

    describe('First vertical and horizontal layout child should have no border', function () {

      it('horizontal with vertical as first child', function () {
        var conf = {
          "type": "horizontal",
          "elements": [
            {
              "type": "vertical",
              "elements": [{
                "type": "text",
                "text": "foo"
              }]
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
        chai.expect(getStyle(secondLayout, 'border')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderTop')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderRight')).to.contain('none');
      });

      it('vertical with horizontal as first child', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "horizontal",
              "elements": [{
                "type": "text",
                "text": "foo"
              }]
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        secondLayout = rooEl.childNodes[0].childNodes[0].childNodes[0];
        chai.expect(getStyle(secondLayout, 'border')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderTop')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(secondLayout, 'borderRight')).to.contain('none');
      });

      it('vertical with simple element (button) as first child', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "button",
              "tooltip": "button tooltip",
              "title": "Add to cart",
              "click": {
                "actions": [{
                  "type": "link",
                  "name": "add to cart",
                  "uri": "http://example.jpg"
                }]
              }
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
        chai.expect(getStyle(simpleEl, 'border')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

      it('horizontal with simple element (button) as first child', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "button",
              "tooltip": "button tooltip",
              "title": "Add to cart",
              "click": {
                "actions": [{
                  "type": "link",
                  "name": "add to cart",
                  "uri": "http://example.jpg"
                }]
              }
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
        chai.expect(getStyle(simpleEl, 'border')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });
      it('horizontal with simple element (button) as first child should contain WCAG attributes', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "button",
              "tooltip": "button tooltip",
              "title": "Add to cart",
              "click": {
                "actions": [{
                  "type": "link",
                  "name": "add to cart",
                  "uri": "http://example.jpg"
                }]
              }
            }
          ],
          "accessibility": {
            "web": {
              "role": "region",
              "aria-label": "Horizontal layout"
            }
          }
        };
        var rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));
        var contentWrapper = rooEl.querySelector('.lp-json-pollock-layout');
        chai.expect(contentWrapper.getAttribute('role')).to.equal('region');
        chai.expect(contentWrapper.getAttribute('aria-label')).to.equal('Horizontal layout');
      });
    });

    describe('Vertical layout\'s child with is not the first child should have a top border only', function () {

      it('Layout element as second child', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            },
            {
              "type": "horizontal",
              "elements": [
                {
                  "type": "button",
                  "tooltip": "button tooltip",
                  "title": "Add to cart",
                  "click": {
                    "actions": [{
                      "type": "link",
                      "name": "add to cart",
                      "uri": "http://example.jpg"
                    }]
                  }
                }
              ]
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('1px solid');
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

      it('simple element (button) as second child', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            },
            {
              "type": "button",
              "tooltip": "button tooltip",
              "title": "Add to cart",
              "click": {
                "actions": [{
                  "type": "link",
                  "name": "add to cart",
                  "uri": "http://example.jpg"
                }]
              }
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('1px solid');
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

      it('Execptional case - text element followd by a text element should have no border', function () {
        var conf = {
          "type": "vertical",
          "elements": [
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            },
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        chai.expect(getStyle(simpleEl, 'border')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

    });

    describe('Horizontal layout\'s child with is not the first child should have a left border only', function () {

      it('Layout element as second child', function () {
        var conf = {
          "type": "horizontal",
          "elements": [
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            },
            {
              "type": "horizontal",
              "elements": [
                {
                  "type": "button",
                  "tooltip": "button tooltip",
                  "title": "Add to cart",
                  "click": {
                    "actions": [{
                      "type": "link",
                      "name": "add to cart",
                      "uri": "http://example.jpg"
                    }]
                  }
                }
              ]
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('1px solid');
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

      it('simple element (button) as second child', function () {
        var conf = {
          "type": "horizontal",
          "elements": [
            {
              "type": "text",
              "text": "product name (Title)",
              "tooltip": "text tooltip"
            },
            {
              "type": "button",
              "tooltip": "button tooltip",
              "title": "Add to cart",
              "click": {
                "actions": [{
                  "type": "link",
                  "name": "add to cart",
                  "uri": "http://example.jpg"
                }]
              }
            }
          ]
        };

        rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

        simpleEl = rooEl.childNodes[0].childNodes[0].childNodes[1];
        chai.expect(getStyle(simpleEl, 'borderLeft')).to.contain('1px solid');
        chai.expect(getStyle(simpleEl, 'borderTop')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderBottom')).to.contain('none');
        chai.expect(getStyle(simpleEl, 'borderRight')).to.contain('none');
      });

    });

  });

  describe('render single element (no layout)', function () {

    var rooEl = null;
    var childEl = null;

    function singleElementTest(title, conf, assertionClass) {
      it(title + ' element' , function () {

        rooEl = addToBody(JsonPollock.render(conf));

        var wrapdiv = rooEl.childNodes[0];
        chai.expect(wrapdiv.localName).to.equal('div');
        chai.expect(wrapdiv.className).to.equal('lp-json-pollock lp-json-pollock-single-element');
        chai.expect(wrapdiv.childNodes.length).to.equal(1);

        childEl = wrapdiv.childNodes[0];
        chai.expect(childEl.className).to.contain(assertionClass);
      });
    }

    singleElementTest('Text',
    {
      "type": "text",
      "text": "product name (Title)",
      "tooltip": "text tooltip"
    },
    'lp-json-pollock-element-text');

    singleElementTest('Button',
    {
      "type": "button",
      "tooltip": "button tooltip",
      "title": "Add to cart",
      "click": {
        "actions": [{
          "type": "link",
          "name": "add to cart",
          "uri": "http://example.jpg"
        }]
      }
    },
    'lp-json-pollock-element-button');

    singleElementTest('Image',
    {
      "type": "image",
      "url": "http://example.jpg",
      "tooltip": "image tooltip",
      "click": {
        "actions": [{
          "type": "navigate",
          "name": "Navigate to store via image",
          "lo": 23.423423,
          "la": 2423423423
        }]
      }
    },
    'lp-json-pollock-element-image');

    singleElementTest('Map',
    {
      "type": "map",
      "lo": 64.128597,
      "la": -21.896110,
      "tooltip": "map tooltip"
    },
    'lp-json-pollock-element-map');

  });

  describe('special characters', function () {

    var rooEl = null;
    var childEl = null;

    it('special characters on text tooltip should be escaped', function () {
      var conf = {
        "type": "text",
        "text": "product name (Title)",
        "tooltip": "and & lt < gt > quot \"\n sqout ' slash / ssqout ` eq ="
      }

      rooEl = addToBody(JsonPollock.render(conf));

      childEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
      chai.expect(childEl.title).to.equal("and &amp; lt &lt; gt &gt; quot &quot;\n sqout &#39; slash &#x2F; ssqout &#x60; eq &#x3D;");
    });

    it('newline character on text content should be replaced with <br>', function () {
      var conf = {
        "type": "text",
        "text": "line1\nline2"
      }

      rooEl = addToBody(JsonPollock.render(conf));

      childEl = rooEl.childNodes[0].childNodes[0].childNodes[0];
      chai.expect(childEl.innerHTML).to.equal("line1<br>line2");
    });

  });

  describe('trigger actions', function () {

    var rooEl = null;
    var conf = null;

    //although most browser can deal with element.click() - phantomjs doesnt for some elements (e.g. img)
    //therefore this prehistoric method is needed
    function createClickEvent() {
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0);

      return event;
    }

    before(function () {
      conf = {
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://example.jpg",
          "tooltip": "image tooltip",
          "click": {
            "actions": [{
              "type": "navigate",
              "name": "Navigate to store via image",
              "lo": 23423423,
              "la": 2423423423
            }]
          }
        }, {
          "type": "button",
          "tooltip": "button tooltip",
          "title": "Add to cart",
          "click": {
            "actions": [{
              "type": "link",
              "name": "add to cart",
              "uri": "https://example.com",
              "target": "slideout"
            }]
          }
        },{
          "type": "button",
          "tooltip": "button tooltip",
          "title": "Publish text",
          "click": {
            "metadata": [{
              "event": "PublishTextEvent"
            }],
            "actions": [{
              "type": "publishText",
              "text": "my text",
            }]
          }
        },{
          "type": "button",
          "tooltip": "button tooltip",
          "title": "Publish text and link",
          "click": {
            "metadata": [{
              "event": "PublishTextEvent"
            }],
            "actions": [{
              "type": "publishText",
              "text": "my text",
            },{
              "type": "link",
              "name": "add to cart",
              "uri": "https://example.com",
              "ios": {
                "uri": "https://ios.example.com"
              },
              "android": {
                "uri": "https://android.example.com"
              },
              "web": {
                "uri": "https://web.example.com"
              },
              "target": "blank"
            }]
          }
        },{
          "type": "map",
          "lo": 64.128597,
          "la": -21.896110,
          "tooltip": "map tooltip"
        },{
          "type": "map",
          "lo": 64.128597,
          "la": -21.896110,
          "tooltip": "map tooltip",
          "click": {
            "actions": [{
              "type": "navigate",
              "name": "Navigate to store via map",
              "lo": 23423423,
              "la": 2423423423
            }]
          }
        },]
      }

      rooEl = addToBody(JsonPollock.render(conf));
    });

    it('Click on element with navigate action should trigger its registered callbacks', function () {
      var spy = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('navigate', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[0].childNodes[0].dispatchEvent(event);
      chai.expect(spy).to.have.been.calledWith({actionData: conf.elements[0].click.actions[0], uiEvent: event});
    });

    it('Click on element with link action should trigger its registered callbacks', function () {
      var spy = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('link', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(event);
      chai.expect(spy).to.have.been.calledWith({actionData: conf.elements[1].click.actions[0], uiEvent: event});
    });

    it('Click on element with publishText action should trigger its registered callbacks', function () {
      var spy = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('publishText', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[2].childNodes[0].dispatchEvent(event);
      chai.expect(spy).to.have.been.calledWith({actionData: conf.elements[2].click.actions[0], metadata: conf.elements[2].click.metadata, uiEvent: event});
    });

    it('Click on element with multiple actions should trigger its registered callbacks', function () {
      var spy1 = sinon.spy();
      var spy2 = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('publishText', spy1);
      JsonPollock.registerAction('link', spy2);
      rooEl.childNodes[0].childNodes[0].childNodes[3].childNodes[0].dispatchEvent(event);
      chai.expect(spy1).to.have.been.calledWith({actionData: conf.elements[3].click.actions[0], metadata: conf.elements[3].click.metadata, uiEvent: event});
      chai.expect(spy2).to.have.been.calledWith({actionData: conf.elements[3].click.actions[1], metadata: conf.elements[3].click.metadata, uiEvent: event});
    });

    it('Click on map element which has no actions definition should trigger window.open for google maps', function () {
      window.open = sinon.spy();
      rooEl.childNodes[0].childNodes[0].childNodes[4].dispatchEvent(createClickEvent());
      chai.expect(window.open).to.have.been.calledWith('https://www.google.com/maps/search/?api=1&query=-21.89611,64.128597');
    });

    it('Click on element with link action should not trigger its registered callbacks after unregister', function () {
        var spy = sinon.spy();
        JsonPollock.registerAction('link', spy);
        JsonPollock.unregisterAction('link');
        rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(createClickEvent());
        chai.expect(spy).to.have.callCount(0);
    });

    it('Click on element with link action should not trigger its registered callbacks after unregister all', function () {
        var spy = sinon.spy();
        JsonPollock.registerAction('link', spy);
        JsonPollock.unregisterAllActions();
        rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(createClickEvent());
        chai.expect(spy).to.have.callCount(0);
    });

    it('Click on map element which has actions definition should not trigger window.open for google maps', function () {
      window.open = sinon.spy();
      var spy1 = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('navigate', spy1);
      rooEl.childNodes[0].childNodes[0].childNodes[5].dispatchEvent(event);
      chai.expect(window.open).to.have.not.been.calledWith('https://www.google.com/maps/search/?api=1&query=64.128597,-21.89611');
      chai.expect(spy1).to.have.been.calledWith({actionData: conf.elements[5].click.actions[0], uiEvent: event});
    });

  });

  describe('trigger actions #2 - checkbox & submit button', function () {

    var rooEl = null;
    var conf = null;

    //although most browser can deal with element.click() - phantomjs doesnt for some elements (e.g. img)
    //therefore this prehistoric method is needed
    function createClickEvent() {
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0);

      return event;
    }

    before(function () {
      conf = {
        "type": "list",
        "elements": [
          {
            "type": "text",
            "text": "The checklist"
          },
          {
            "type": "sectionList",
            "elements": [
              {
                "type": "section",
                "sectionID": "fruits",
                "elements": [
                  {
                    "type": "checklist",
                    "elements": [
                      {
                        "type": "checkbox",
                        "text": "1",
                        "borderLine": true,
                        "borderColor": "#000000",
                        "click": {
                          "actions": [
                            {
                              "type": "checked",
                              "publishText": "apples"
                            }
                          ]
                        }
                      },
                      {
                        "type": "checkbox",
                        "text": "2",
                        "borderLine": true,
                        "borderColor": "#000000",
                        "click": {
                          "actions": [
                            {
                              "type": "checked",
                              "publishText": "bananas"
                            }
                          ]
                        }
                      },
                      {
                        "type": "checkbox",
                        "text": "3",
                        "borderLine": true,
                        "borderColor": "#000000",
                        "click": {
                          "actions": [
                            {
                              "type": "checked",
                              "publishText": "avocados"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "buttonList",
            "elements": [
              {
                "type": "submitButton",
                "title": "submit",
                "disabled": false,
                "click": {
                  "actions": [
                    {
                      "type": "submitAsText",
                      "submit": true
                    }
                  ]
                }
              }
            ]
          }
        ]
      };

      rooEl = addToBody(JsonPollock.render(conf));
    });

    it('Click on checkbox element with checked action should trigger its registered callbacks', function () {
      var spy = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('checked', spy);
      rooEl.querySelectorAll('.lp-json-pollock-element-checkbox-input')[0].dispatchEvent(event);
      chai.expect(spy).to.have.been.calledWith({
        actionData: conf.elements[1].elements[0].elements[0].elements[0].click.actions[0],
        uiEvent: event,
        groupID: conf.elements[1].elements[0].sectionID,
        formEl: rooEl.children[0].children[0]
      });
    });

    it('Click on submit element with checked action should trigger its registered callbacks', function () {
      var spy = sinon.spy();
      var event = createClickEvent();
      JsonPollock.registerAction('submitAsText', spy);
      rooEl.querySelectorAll('input[type=submit]')[0].dispatchEvent(event);
      chai.expect(spy).to.have.been.calledWith({
        actionData: conf.elements[2].elements[0].click.actions[0],
        uiEvent: event,
        formEl: rooEl.children[0].children[0]
      });
    });

  });

  describe('render json string', function () {

    var rooEl = null;

    before(function () {
      var conf = {
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://example.jpg",
          "tooltip": "image tooltip",
          "click": {
            "actions": [{
              "type": "navigate",
              "name": "Navigate to store via image",
              "lo": 23423423,
              "la": 2423423423
            }]
          }
        }, {
          "type": "text",
          "text": "product name (Title)",
          "tooltip": "text tooltip",
          "style": {
            "bold": true,
            "italic": true,
            "color": "red",
            "size": "large"
          },
        }, {
          "type": "button",
          "tooltip": "button tooltip",
          "title": "Add to cart",
          "click": {
            "actions": [{
              "type": "link",
              "name": "add to cart",
              "uri": "http://example.jpg",
              "target": "self"
            }]
          },
          "style": {
            "bold": false,
            "italic": false,
            "color": "red",
            "size": 'medium'
          },
        },]
      }

      rooEl = JsonPollock.render(JSON.stringify(conf));
    });

    it('DOM element exists', function () {
      chai.expect(rooEl).to.be.instanceOf(DocumentFragment);
    });
  });

  describe('Image element fail to load', function () {

    var rooEl = null;
    var imgDiv = null;
    var imgEl = null;

    before(function (done) {
      var conf = {
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://does_not_exists.jpg",
          "tooltip": "image tooltip",
          "click": {
            "actions": [{
              "type": "navigate",
              "name": "Navigate to store via image",
              "lo": 23423423,
              "la": 2423423423
            }]
          }
        }]
      }

      rooEl = addToBody(JsonPollock.render(JSON.stringify(conf)));

      imgDiv = rooEl.childNodes[0].childNodes[0].childNodes[0];
      imgEl = imgDiv.childNodes[0];
      var originalOnError = imgEl.onerror;
      imgEl.onerror = function () {
        originalOnError.call(imgEl);
        done();
      }
    });

    it('Image div should have error class', function () {
      chai.expect(imgDiv.className).to.contain('error');
    });

    it('Image div should have error message in title', function () {
      chai.expect(imgDiv.title).to.equal('fail to load image');
    });

    it('Image element should be hidden', function () {
      chai.expect(imgEl.style.display).to.equal('none');
    });

  });

  describe('configuration', function () {

    var rooEl = null;

    describe('if maxAllowedElements is configured to x only first x elements should be presented (incl. layout)', function () {
      before(function () {
        JsonPollock.init({ maxAllowedElements: 2 });
        rooEl = addToBody(JsonPollock.render(card));
      });

      after(function () {
        //reset
        JsonPollock.init({ maxAllowedElements: -1 });
      });

      it('All rendered elements should be wrapped with a div with a \'lp-json-pollock\' class', function () {
        chai.expect(rooEl.childNodes.length).to.equal(1);
        chai.expect(rooEl.childNodes[0].localName).to.equal('div');
        chai.expect(rooEl.childNodes[0].className).to.equal('lp-json-pollock');
      });

      it('A single container of type layout (horizontal/vertical) was created with a single child elemnt', function () {
        var wrapdiv = rooEl.childNodes[0];
        chai.expect(wrapdiv.childNodes.length).to.equal(1);
        chai.expect(wrapdiv.childNodes[0].localName).to.equal('div');
        chai.expect(wrapdiv.childNodes[0].className).to.equal('lp-json-pollock-layout lp-json-pollock-layout-vertical');
        chai.expect(wrapdiv.childNodes[0].childNodes.length).to.equal(1);
      });

      it('An element of type image should be created', function () {
        var layout = rooEl.childNodes[0].childNodes[0];
        chai.expect(layout.childNodes[0].localName).to.equal('div');
        chai.expect(layout.childNodes[0].className).to.contain('lp-json-pollock-element-image');  //it can also includes loading
        chai.expect(layout.childNodes[0].childNodes[1].localName).to.equal('img');
        chai.expect(layout.childNodes[0].childNodes[1].src).to.contain('assets/iphone-8-concept.jpg');
        chai.expect(layout.childNodes[0].title).to.equal('image tooltip');
      });

    });

  });

  describe('Negative tests', function () {

    var SCHEMA_VALIDATION_ERR = 'Schema validation error, see \'errors\' for more details';

    it('Wrong json representation trigger an error', function () {
      var wrongJson = '{"type": "vertical"';
      chai.expect(JsonPollock.render.bind(JsonPollock, wrongJson)).to.throw();  //json error
    });

    describe('Mandatory elements', function () {
      it('If element of type layout is lack of mandatory properties (elements) an invalid schema error should be triggered', function () {
        var verticalNoElements = {
          "type": "vertical"
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, verticalNoElements)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type text is lack of mandatory properties (text) an invalid schema error should be triggered', function () {
        var textNoText = {
          "type": "vertical",
          "elements": [{
            "type": "text",
            "tooltip": "text tooltip",
            "rtl": true
          }]
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, textNoText)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type button is lack of mandatory properties (title, action) an invalid schema error should be triggered', function () {
        var buttonNoTile = {
          "type": "vertical",
          "elements": [{
            "type": "button",
            "click": {
              "actions": [{
                "type": "navigate",
                "lo": 23423423,
                "la": 2423423423
              }]
            },
            "tooltip": "button tooltip",
            "rtl": true
          }]
        };

        var buttonNoAction = {
          "type": "vertical",
          "elements": [{
            "type": "button",
            "title": "Push Me!",
            "tooltip": "button tooltip",
            "rtl": true
          }]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, buttonNoTile)).to.throw(SCHEMA_VALIDATION_ERR);
        // uncomment once added to schema
        //chai.expect(JsonPollock.render.bind(JsonPollock, buttonNoAction)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type map is lack of mandatory properties (url) an invalid schema error should be triggered', function () {
        var mapNoLaLo = {
          "type": "map"
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, mapNoLaLo)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type image is lack of mandatory properties (url) an invalid schema error should be triggered', function () {
        var imageNoUrl = {
          "type": "vertical",
          "elements": [{
            "type": "image",
            "caption": "This is an example of image caption",
            "tooltip": "image tooltip",
            "rtl": true
          }]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, imageNoUrl)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type navigate is lack of mandatory properties (lo, la) an invalid schema error should be triggered', function () {
        var actionNoLo = {
          "type": "vertical",
          "elements": [{
            "type": "button",
            "title": "mytitle",
            "click": {
              "actions": [{
                "type": "navigate",
                "la": 2423423423
              }]
            },
            "tooltip": "button tooltip",
            "rtl": true
          }]
        };

        var actionNoLa = {
          "type": "vertical",
          "elements": [{
            "type": "button",
            "title": "mytitle",
            "click": {
              "actions": [{
                "type": "navigate",
                "lo": 2423423423
              }]
            },
            "tooltip": "button tooltip",
            "rtl": true
          }]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, actionNoLa)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type link is lack of mandatory properties (uri) an invalid schema error should be triggered', function () {
        var actionNoUri = {
          "type": "vertical",
          "elements": [{
            "type": "button",
            "title": "mytitle",
            "click": {
              "actions": [{
                "type": "link"
              }]
            },
            "tooltip": "button tooltip",
            "rtl": true
          }]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, actionNoUri)).to.throw(SCHEMA_VALIDATION_ERR);
      });


    });

    describe('list negative tests', function () {
      var conf = null;
      beforeEach(function () {
        conf = {
          "type": "list",
          "elements": [
            {
              "type": "text",
              "text": "header"
            },
            {
              "type": "sectionList",
              "elements": [
                {
                  "type": "section",
                  "sectionID": "fruits",
                  "elements": [
                    {
                      "type": "checklist",
                      "elements": [
                        {
                          "type": "checkbox",
                          "text": "1",
                          "borderLine": true,
                          "borderColor": "#000000",
                          "click": {
                            "metadata": [
                              {
                                "type": "ExternalId",
                                "id": "ANOTHER_ONE_35"
                              }
                            ],
                            "actions": [
                              {
                                "type": "checked",
                                "publishText": "apples"
                              }
                            ]
                          }
                        },
                        {
                          "type": "checkbox",
                          "text": "2",
                          "borderLine": true,
                          "borderColor": "#000000",
                          "click": {
                            "metadata": [
                              {
                                "type": "ExternalId",
                                "id": "ANOTHER_ONE_32"
                              }
                            ],
                            "actions": [
                              {
                                "type": "checked",
                                "publishText": "bananas"
                              }
                            ]
                          }
                        },
                        {
                          "type": "checkbox",
                          "text": "3",
                          "borderLine": true,
                          "borderColor": "#000000",
                          "click": {
                            "metadata": [
                              {
                                "type": "ExternalId",
                                "id": "ANOTHER_ONE_36"
                              }
                            ],
                            "actions": [
                              {
                                "type": "checked",
                                "publishText": "avocados"
                              }
                            ]
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "buttonList",
              "elements": [
                {
                  "type": "submitButton",
                  "title": "submit",
                  "disabled": false,
                  "click": {
                    "metadata": [
                      {
                        "type": "ExternalId",
                        "id": "submissionID"
                      }
                    ],
                    "actions": [
                      {
                        "type": "submitAsText",
                        "submit": true
                      }
                    ]
                  }
                },
                {
                  "type": "button",
                  "title": "mytitle",
                  "click": {
                    "actions": [{
                      "type": "link",
                      "uri": "www.example.com"
                    }]
                  },
                  "tooltip": "button tooltip",
                  "rtl": true
                }
              ]
            }
          ]
        }
      });

      it('list cannot have any random basic elements', function () {
        var list = {
          "type": "list",
          "elements": [
            {
              "type": "button",
              "title": "mytitle",
              "click": {
                "actions": [{
                  "type": "link",
                  "uri": "www.example.com"
                }]
              },
              "tooltip": "button tooltip",
              "rtl": true
            },
            {
              "type": "text",
              "text": "header"
            }
          ]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

      it('list must have header', function () {
        var list = cloneObject(conf);
        list.elements.splice(0, 1);
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('list elements cannot start with other element except a header', function () {
        var list = cloneObject(conf);
        var header = list.elements.splice(0, 1);
        list.elements.push(header);
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('list elements must have buttonList', function () {
        var list = cloneObject(conf);
        list.elements.splice(2, 1);
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('list elements must have sectionList', function () {
        var list = cloneObject(conf);
        list.elements.splice(1, 1);
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('sectionList elements cannot have other elements except sections', function () {
        var list = cloneObject(conf);
        list.elements[1].elements.push({
          "type": "text",
          "text": "hello"
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('section cannot start without subheaders start if the user wishes to have subheader', function () {
        var list = cloneObject(conf);
        list.elements[1].elements[0].elements.push({
            "type": "text",
            "text": "foo"
          });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('section cannot have other elements besides text and checklist', function () {
        var list = cloneObject(conf);
        list.elements[1].elements[0].elements.push({
          "type": "vertical",
          "elements": [{
            "type": "text",
            "text": "foo"
          },{
            "type": "blablabla",
            "text": "foo"
          }]
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('checklist cannot have other elements except checkboxes', function () {
        var list = cloneObject(conf);
        list.elements[1].elements[0].elements[0].elements.push({
          "type": "vertical",
          "elements": [{
            "type": "text",
            "text": "foo"
          },{
            "type": "blablabla",
            "text": "foo"
          }]
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('buttonList cannot start with other button besides submitButton', function () {
        var list = cloneObject(conf);
        var submitButton = list.elements[2].elements.splice(0, 1);
        list.elements[2].elements.push(submitButton);
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('buttonList cannot have other elements besides button and submitButton', function () {
        var list = cloneObject(conf);
        list.elements[2].elements.push({
          "type": "vertical",
          "elements": [{
            "type": "text",
            "text": "foo"
          },{
            "type": "blablabla",
            "text": "foo"
          }]
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('checkbox cannot have other actions besides checked', function () {
        var list = cloneObject(conf);
        list.elements[1].elements[0].elements[0].elements[0].click.actions.push({
          "type": "navigate",
          "lo": 2423423423,
          "la": 7897967267
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('submitButton cannot have other actions besides submitAsText', function () {
        var list = cloneObject(conf);
        list.elements[2].elements[0].click.actions.push({
          "type": "navigate",
          "lo": 2423423423,
          "la": 7897967267
        });
        chai.expect(JsonPollock.render.bind(JsonPollock, list)).to.throw(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Unrecognized elements', function () {
      it('If element is not recognized an invalid schema error should be triggered', function () {
        var json = {
          "type": "vertical",
          "elements": [{
              "type": "text",
              "text": "foo"
          },{
            "type": "blablabla",
            "text": "foo"
          }]
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, json)).to.throw(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Type checking', function () {

      describe('Click property of basic element', function () {

        it('actions must be of array type', function () {
          var actionsWithNonArrayVal = {
            "type": "vertical",
            "elements": [{
              "type": "button",
              "title": "mytitle",
              "click": {
                "actions": {
                  "type": "navigate",
                  "lo": 2423423423,
                  "la": 7897967267
                }
              },
              "tooltip": "button tooltip",
              "rtl": true
            }]
          };

          chai.expect(JsonPollock.render.bind(JsonPollock, actionsWithNonArrayVal)).to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

      describe('Action of type navigation', function () {

        it('lo value must be integer', function () {
          var navigateLoString = {
            "type": "vertical",
            "elements": [{
              "type": "button",
              "title": "mytitle",
              "click": {
                "actions": [{
                  "type": "navigate",
                  "lo": "2423423423",
                  "la": 7897967267
                }]
              },
              "tooltip": "button tooltip",
              "rtl": true
            }]
          };

          chai.expect(JsonPollock.render.bind(JsonPollock, navigateLoString)).to.throw(SCHEMA_VALIDATION_ERR);
        });

        it('la value must be integer', function () {
          var navigateLaString = {
            "type": "vertical",
            "elements": [{
              "type": "button",
              "title": "mytitle",
              "click": {
                "actions": [{
                  "type": "navigate",
                  "lo": 2423423423,
                  "la": "7897967267"
                }]
              },
              "tooltip": "button tooltip",
              "rtl": true
            }]
          };

          chai.expect(JsonPollock.render.bind(JsonPollock, navigateLaString)).to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

      describe('Action of type link', function () {

        it('uri format check according to rfc', function () {
          var linkWrongUriNoProtocol = {
            "type": "vertical",
            "elements": [{
              "type": "button",
              "title": "mytitle",
              "click": {
                "actions": [{
                  "type": "link",
                  "uri": "www.example.com"
                }]
              },
              "tooltip": "button tooltip",
              "rtl": true
            }]
          };

          chai.expect(JsonPollock.render.bind(JsonPollock, linkWrongUriNoProtocol)).to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

    });
  });

  describe('onAfterElementRendered hook', function () {
    it('expect onAfterElementRendered callback to be called for each element', function () {
      var spy = sinon.spy(function (element, tmpl) {
        return element;
      });
      JsonPollock.init({onAfterElementRendered: spy});
      JsonPollock.render(card);

      chai.expect(spy).to.have.been.callCount(5);
    });

    it('expect onAfterElementRendered callback to provide the given template type', function () {
      var json = {
        "type": "text",
        "text": "product name (Title)",
        "tooltip": "text tooltip"
      };
      var spy = sinon.spy(function (element, tmpl) {
        return element;
      });

      JsonPollock.init({onAfterElementRendered: spy});
      var element = JsonPollock.render(json);

      chai.expect(spy).to.have.been.calledWith(element.querySelector('.lp-json-pollock-element-text'), json);
    });

    it('expect onAfterElementRendered callback to provide manipilated element', function () {
      var json = {
        "type": "text",
        "text": "product name (Title)",
        "tooltip": "text tooltip"
      };
      var spy = sinon.spy(function (element, tmpl) {
        element.classList.add('my-custom-class');
        return element;
      });

      JsonPollock.init({onAfterElementRendered: spy});
      var element = JsonPollock.render(json);

      chai.expect(element.querySelector('.lp-json-pollock-element-text').className).to.contain('my-custom-class');
    });

    it('expect element not to be rendered if was not returned by onAfterElementRendered', function () {
      var json = {
        "type": "text",
        "text": "product name (Title)",
        "tooltip": "text tooltip"
      };
      var spy = sinon.spy(function (element, tmpl) {
        if (tmpl.type === 'text') {
          return null;
        }
        return element;
      });

      JsonPollock.init({onAfterElementRendered: spy});
      var element = JsonPollock.render(json);

      chai.expect(element.querySelector('.lp-json-pollock-element-text')).to.not.exist;
    });

  });

  describe('validate function', function () {

    var SCHEMA_VALIDATION_ERR = 'Schema validation error, see \'errors\' for more details';
    var SCHEMA_VALIDATION_INPT_ERR = 'JsonPollock::validte - input is not an object';

    it('expect validate function not to throw error for valid json', function () {
      var jsonOK = {
        "type": "text",
        "text": "product name (Title)",
        "tooltip": "text tooltip"
      };

      chai.expect(JsonPollock.validate.bind(JsonPollock, jsonOK)).to.not.throw(SCHEMA_VALIDATION_ERR);
    });

    it('expect validate function to throw error for non valid json', function () {
      
      var jsonBAD = {
        "type": "text",        
        "tooltip": "text tooltip"
      };
      
      chai.expect(JsonPollock.validate.bind(JsonPollock, jsonBAD)).to.throw(SCHEMA_VALIDATION_ERR);
    });

    it('expect validate function to throw error non json input', function () {
      
      var jsonBAD = JSON.stringify({
        "type": "text",        
        "tooltip": "text tooltip"
      });
      
      chai.expect(JsonPollock.validate.bind(JsonPollock, jsonBAD)).to.throw(SCHEMA_VALIDATION_INPT_ERR);
    });

  })

  describe('render carousel in ltr direction', function() {

    var carouselListRoot;
    var carouselRight;
    var carouselLeft;

    before(function (done) {
      const conteiner = addToBody(JsonPollock.render(JSON.stringify(carouselConf)));
      const carouselRootLayout = conteiner.children[0].children[0];
      carouselRight = conteiner.children[0].children[0].children[1];
      carouselLeft = conteiner.children[0].children[0].children[2];
      carouselListRoot = carouselRootLayout.children[0];

      setTimeout(function () {
        done();
      }, 0);
    });


    it('arrow should be rendered properly for ltr direction', function () {
      chai.expect(window.getComputedStyle(carouselLeft).visibility).to.be.equal('hidden');
      chai.expect(window.getComputedStyle(carouselRight).visibility).to.be.equal('visible');

    });

    it('carousel should move to the right', function (done) {
      const prevLeft = window.getComputedStyle(carouselListRoot).left;
      carouselRight.click();

      setTimeout(function () {
        const left = window.getComputedStyle(carouselListRoot).left;
        chai.expect(left).to.be.below(prevLeft);
        done();
      }, 100);
    });
  });

  describe('render carousel in rtl direction', function() {

    var carouselListRoot;
    var carouselRight;
    var carouselLeft;

    before(function (done) {
      const css = 'body * {direction: rtl; text-align: right}';
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');

      head.appendChild(style);
      style.appendChild(document.createTextNode(css));

      const conteiner = addToBody(JsonPollock.render(JSON.stringify(carouselConf)));
      const carouselRootLayout = conteiner.children[0].children[0];
      carouselRight = conteiner.children[0].children[0].children[1];
      carouselLeft = conteiner.children[0].children[0].children[2];
      carouselListRoot = carouselRootLayout.children[0];

      setTimeout(function () {
        done();
      }, 0);
    })

    it('arrow should be rendered properly for rtl direction', function () {
      chai.expect(window.getComputedStyle(carouselLeft).visibility).to.be.equal('visible');
      chai.expect(window.getComputedStyle(carouselRight).visibility).to.be.equal('hidden');
    });

    it('carousel should move to the left', function (done) {
      const prevLeft = window.getComputedStyle(carouselListRoot).left;
      carouselLeft.click();

      setTimeout(function () {
        const left = window.getComputedStyle(carouselListRoot).left;
        chai.expect(left).to.be.below(prevLeft);
        done();
      }, 100);
    });
  });

});
