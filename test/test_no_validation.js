
describe('json-pollock tests - no validation bundle', function () {

  var pollockContainer = document.createElement('div');
  document.body.appendChild(pollockContainer);

  function addToBody(element) {
    pollockContainer.innerHTML = "";
    pollockContainer.appendChild(element);
    return pollockContainer;
  }

  describe('Wrong schema tests should not trigger validation error', function () {

    var SCHEMA_VALIDATION_ERR = 'Schema validation error, see \'errors\' for more details';

    it('Wrong json representation should trigger an error', function () {
      var wrongJson = '{"type": "vertical"';
      chai.expect(JsonPollock.render.bind(JsonPollock, wrongJson)).to.throw();  //json error
    });

    describe('Mandatory elements', function () {
      it('If element of type layout is lack of mandatory properties (elements) an invalid schema error should not be triggered', function () {
        var verticalNoElements = {
          "type": "vertical"
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, verticalNoElements)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type text is lack of mandatory properties (text) an invalid schema error should not be triggered', function () {
        var textNoText = {
          "type": "vertical",
          "elements": [{
            "type": "text",
            "tooltip": "text tooltip",
            "rtl": true
          }]
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, textNoText)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type button is lack of mandatory properties (title, action) an invalid schema error should not be triggered', function () {
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

        chai.expect(JsonPollock.render.bind(JsonPollock, buttonNoTile)).not.to.throw(SCHEMA_VALIDATION_ERR);
        // uncomment once added to schema
        //chai.expect(JsonPollock.render.bind(JsonPollock, buttonNoAction)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type map is lack of mandatory properties (url) an invalid schema error should not be triggered', function () {
        var mapNoLaLo = {
          "type": "map"
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, mapNoLaLo)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type image is lack of mandatory properties (url) an invalid schema error should not be triggered', function () {
        var imageNoUrl = {
          "type": "vertical",
          "elements": [{
            "type": "image",
            "caption": "This is an example of image caption",
            "tooltip": "image tooltip",
            "rtl": true
          }]
        };

        chai.expect(JsonPollock.render.bind(JsonPollock, imageNoUrl)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type navigate is lack of mandatory properties (lo, la) an invalid schema error should not be triggered', function () {
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

        chai.expect(JsonPollock.render.bind(JsonPollock, actionNoLa)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type link is lack of mandatory properties (uri) an invalid schema error should not be triggered', function () {
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

        chai.expect(JsonPollock.render.bind(JsonPollock, actionNoUri)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });


    });

    describe('Unrecognized elements', function () {    
      it('If element is not recognized an invalid schema error should not be triggered', function () {
        var textNoText = {
          "type": "vertical",
          "elements": [{      
              "type": "text",
              "text": "foo"            
          },{      
            "type": "blablabla",
            "text": "foo"            
          }]
        };
        chai.expect(JsonPollock.render.bind(JsonPollock, textNoText)).not.to.throw(SCHEMA_VALIDATION_ERR);
      });
    });


    describe('Type checking', function () {

      describe('Click property of basic element', function () {

        it('actions are on the wrong type', function () {
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

          chai.expect(JsonPollock.render.bind(JsonPollock, actionsWithNonArrayVal)).not.to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

      describe('Action of type navigation', function () {

        it('lo value is not integer', function () {
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

          chai.expect(JsonPollock.render.bind(JsonPollock, navigateLoString)).not.to.throw(SCHEMA_VALIDATION_ERR);
        });

        it('la value is not integer', function () {
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

          chai.expect(JsonPollock.render.bind(JsonPollock, navigateLaString)).not.to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

      describe('Action of type link', function () {

        it('uri format not according to rfc', function () {
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

          chai.expect(JsonPollock.render.bind(JsonPollock, linkWrongUriNoProtocol)).not.to.throw(SCHEMA_VALIDATION_ERR);
        });

      });

    });

  });

});
