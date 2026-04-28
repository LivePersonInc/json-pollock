/* eslint-disable no-unused-vars */
const jsonPollockInstance = require('../dist/json-pollock.bundle.no_validation.min');

describe('json-pollock tests - no validation bundle', () => {
  beforeEach(() => {
    jsonPollockInstance.init({ maxAllowedElements: 100 });
  });

  it('should expose public function', () => {
    expect(jsonPollockInstance.init).toBeDefined();
    expect(jsonPollockInstance.render).toBeDefined();
    expect(jsonPollockInstance.registerAction).toBeDefined();
    expect(jsonPollockInstance.unregisterAction).toBeDefined();
    expect(jsonPollockInstance.unregisterAllActions).toBeDefined();
    expect(jsonPollockInstance.validate).not.toBeDefined();
  });

  describe('Wrong schema tests should not trigger validation error', () => {
    const SCHEMA_VALIDATION_ERR = "Schema validation error, see 'errors' for more details";

    it('Wrong json representation should trigger an error', () => {
      const wrongJson = '{"type": "vertical"';
      expect(() => jsonPollockInstance.render(wrongJson)).toThrow(); //json error
    });

    describe('Mandatory elements', () => {
      it('If element of type layout is lack of mandatory properties (elements) an invalid schema error should not be triggered', () => {
        const verticalNoElements = {
          type: 'vertical',
        };
        expect(() => jsonPollockInstance.render(verticalNoElements)).not.toThrow(
          SCHEMA_VALIDATION_ERR,
        );
      });

      it('If element of type text is lack of mandatory properties (text) an invalid schema error should not be triggered', () => {
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
        expect(() => jsonPollockInstance.render(textNoText)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type button is lack of mandatory properties (title, action) an invalid schema error should not be triggered', () => {
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

        expect(() => jsonPollockInstance.render(buttonNoTile)).not.toThrow(SCHEMA_VALIDATION_ERR);
        // uncomment once added to schema
        //expect(() => jsonPollockInstance.render(buttonNoAction)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type map is lack of mandatory properties (url) an invalid schema error should not be triggered', () => {
        const mapNoLaLo = {
          type: 'map',
        };

        expect(() => jsonPollockInstance.render(mapNoLaLo)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If element of type image is lack of mandatory properties (url) an invalid schema error should not be triggered', () => {
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

        expect(() => jsonPollockInstance.render(imageNoUrl)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type navigate is lack of mandatory properties (lo, la) an invalid schema error should not be triggered', () => {
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

        expect(() => jsonPollockInstance.render(actionNoLa)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });

      it('If action of type link is lack of mandatory properties (uri) an invalid schema error should not be triggered', () => {
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

        expect(() => jsonPollockInstance.render(actionNoUri)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Unrecognized elements', () => {
      it('If element is not recognized an invalid schema error should not be triggered', () => {
        const textNoText = {
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
        expect(() => jsonPollockInstance.render(textNoText)).not.toThrow(SCHEMA_VALIDATION_ERR);
      });
    });

    describe('Type checking', () => {
      describe('Click property of basic element', () => {
        it('actions are on the wrong type', () => {
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

          expect(() => jsonPollockInstance.render(actionsWithNonArrayVal)).not.toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });
      });

      describe('Action of type navigation', () => {
        it('lo value is not integer', () => {
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

          expect(() => jsonPollockInstance.render(navigateLoString)).not.toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });

        it('la value is not integer', () => {
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

          expect(() => jsonPollockInstance.render(navigateLaString)).not.toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });
      });

      describe('Action of type link', () => {
        it('uri format not according to rfc', () => {
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

          expect(() => jsonPollockInstance.render(linkWrongUriNoProtocol)).not.toThrow(
            SCHEMA_VALIDATION_ERR,
          );
        });
      });
    });
  });
});
