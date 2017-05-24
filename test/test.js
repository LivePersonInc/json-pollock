
describe('json-pollock tests', function () {

  describe('render basic elements', function () {

    var rooEl = null;

    before(function () {
      var conf = {
        "id": "04e7cd9a-40e7-440e-884a-82ca6af574e9",
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://example.jpg",
          "tooltip": "image tooltip",
          "action": {
            "type": "navigate",
            "id": "98446950-2f54-4594-b89b-1d60a9fdda49",
            "name": "Navigate to store via image",
            "lo": 23423423,
            "la": 2423423423
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
          "action": {
            "type": "link",
            "id": "febf3237-f7d9-44bc-a17f-fc8abdfb0f25",
            "name": "add to cart",
            "uri": "http://example.jpg",
            "ios": {
              "uri": "specific uri for iOS"
            },
            "android": {
              "uri": "specific uri for Android"
            },
            "web": {
              "uri": "specific uri for Web"
            }
          },
          "style": {
            "bold": false,
            "italic": false,
            "color": "red",
            "size": 'medium'
          },
        },]
      }

      rooEl = JsonPollock.render(conf);
    });

    it('Root should be a DocumentFragment instance', function () {
      chai.expect(rooEl).to.be.instanceOf(DocumentFragment);
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
      chai.expect(wrapdiv.childNodes[0].className).to.equal('lp-json-pollock-layout-vertical');
      chai.expect(wrapdiv.childNodes[0].childNodes.length).to.equal(3);
    });

    it('An element of type image should be created', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[0].localName).to.equal('div');
      chai.expect(layout.childNodes[0].className).to.contain('lp-json-pollock-element-image');  //it can also includes loading
      chai.expect(layout.childNodes[0].childNodes[0].localName).to.equal('img');
      chai.expect(layout.childNodes[0].childNodes[0].src).to.equal('http://example.jpg/');
      chai.expect(layout.childNodes[0].childNodes[0].title).to.equal('image tooltip');
    });

    it('An element of type text should be created', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[1].localName).to.equal('div');
      chai.expect(layout.childNodes[1].className).to.equal('lp-json-pollock-element-text');
      chai.expect(layout.childNodes[1].childNodes[0].localName).to.equal('span');
      chai.expect(layout.childNodes[1].childNodes[0].title).to.equal('text tooltip');
      chai.expect(layout.childNodes[1].childNodes[0].textContent).to.equal('product name (Title)');
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
    });

    it('Check for style generation of button element', function () {
      var layout = rooEl.childNodes[0].childNodes[0];
      chai.expect(layout.childNodes[2].childNodes[0].style).to.be.exist;
      chai.expect(layout.childNodes[2].childNodes[0].style.color).to.equal('red');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontWeight).to.equal('');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontSize).to.equal('13px');
      chai.expect(layout.childNodes[2].childNodes[0].style.fontStyle).to.equal('');
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
        "id": "04e7cd9a-40e7-440e-884a-82ca6af574e9",
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://example.jpg",
          "tooltip": "image tooltip",
          "action": {
            "type": "navigate",
            "id": "98446950-2f54-4594-b89b-1d60a9fdda49",
            "name": "Navigate to store via image",
            "lo": 23423423,
            "la": 2423423423
          }
        }, {
          "type": "button",
          "tooltip": "button tooltip",
          "title": "Add to cart",
          "action": {
            "type": "link",
            "id": "febf3237-f7d9-44bc-a17f-fc8abdfb0f25",
            "name": "add to cart",
            "uri": "https://example.com",
            "ios": {
              "uri": "specific uri for iOS"
            },
            "android": {
              "uri": "specific uri for Android"
            },
            "web": {
              "uri": "specific uri for Web"
            }
          },
        },]
      }

      rooEl = JsonPollock.render(conf);
    });

    it('Click on element with navigate action ahould trigger its registered callbacks', function () {
      var spy = sinon.spy();
      JsonPollock.registerAction('navigate', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[0].childNodes[0].dispatchEvent(createClickEvent());
      chai.expect(spy).to.have.been.calledWith(conf.elements[0].action);
    });

    it('Click on element with link action ahould trigger its registered callbacks', function () {
      var spy = sinon.spy();
      JsonPollock.registerAction('link', spy);
      rooEl.childNodes[0].childNodes[0].childNodes[1].childNodes[0].dispatchEvent(createClickEvent());
      chai.expect(spy).to.have.been.calledWith(conf.elements[1].action);
    });

  });

  describe('render json string', function () {

    var rooEl = null;

    before(function () {
      var conf = {
        "id": "04e7cd9a-40e7-440e-884a-82ca6af574e9",
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://example.jpg",
          "tooltip": "image tooltip",
          "action": {
            "type": "navigate",
            "id": "98446950-2f54-4594-b89b-1d60a9fdda49",
            "name": "Navigate to store via image",
            "lo": 23423423,
            "la": 2423423423
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
          "action": {
            "type": "link",
            "id": "febf3237-f7d9-44bc-a17f-fc8abdfb0f25",
            "name": "add to cart",
            "uri": "http://example.jpg",
            "ios": {
              "uri": "specific uri for iOS"
            },
            "android": {
              "uri": "specific uri for Android"
            },
            "web": {
              "uri": "specific uri for Web"
            }
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
        "id": "04e7cd9a-40e7-440e-884a-82ca6af574e9",
        "type": "vertical",
        "elements": [{
          "type": "image",
          "url": "http://does_not_exists.jpg",
          "tooltip": "image tooltip",
          "action": {
            "type": "navigate",
            "id": "98446950-2f54-4594-b89b-1d60a9fdda49",
            "name": "Navigate to store via image",
            "lo": 23423423,
            "la": 2423423423
          }
        }]
      }

      rooEl = JsonPollock.render(JSON.stringify(conf));
      imgDiv = rooEl.children[0].children[0].children[0];
      imgEl = imgDiv.children[0];
      var originalOnError = imgEl.onerror;
      imgEl.onerror = function() {
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
});
