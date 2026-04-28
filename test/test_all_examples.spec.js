import { JSDOM } from 'jsdom';
import { mockFetchJsonFiles } from './utils/mockFetch';
import { getExampleFiles } from './utils/getExampleFiles'; // __examplesdir is no longer needed here

describe('integrated tests: render examples files', () => {
  const examples = getExampleFiles();
  // eslint-disable-next-line no-unused-vars
  const _examples = [['accordion_select.html', './examples/accordion_select.html']];
  // -----------------------------------------------------------------------------
  // ITERATE
  test.each(examples)('renders example file: %s', async (fileName, filePath) => {
    let dom;

    try {
      dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously', // execute scripts in the HTML
        resources: 'usable', // load subresources like scripts
        url: `file://${filePath}`,
        pretendToBeVisual: true,
        beforeParse: (_window) => {
          // inject the mock fetch into the JSDOM window
          _window.fetch = mockFetchJsonFiles;
          _window.alert = (message) => {
            console.log(`ALERT (mocked): ${message}`);
          };
        },
      });

      // wait for scripts to potentially execute and content to render
      await new Promise((resolve) => setTimeout(resolve, 200));

      // -----------------------------------------------------------------------
      // ASSERT

      const jsonPollockWrapper = dom.window.document.querySelector('.lp-json-pollock');

      expect(jsonPollockWrapper).toBeDefined();
      expect(jsonPollockWrapper).toBeInTheDocument();
      expect(jsonPollockWrapper).toHaveClass('lp-json-pollock');

      if (!fileName.includes('single')) {
        const layoutEl = dom.window.document.getElementsByClassName('lp-json-pollock-layout')[0];
        expect(jsonPollockWrapper).toContainElement(layoutEl);
      }
    } catch (e) {
      console.error(`Error processing file ${fileName}:`, e);
      // fail the test explicitly if JSDOM loading fails
      throw e;
    } finally {
      if (dom && dom.window) {
        // clean up the JSDOM instance
        dom.window.close();
      }
    }
  });
});
