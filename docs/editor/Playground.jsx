import React, { useState, useCallback, useEffect } from 'react';
import { NoSSR, } from 'rspress/runtime';
import { Link, Button, Tab, Tabs } from 'rspress/theme';
import { usePageData } from '@rspress/core/runtime';
import { Editor } from '@rspress/plugin-playground/web'; // Removed Runner as it wasn't used
import { SnackbarProvider } from 'notistack';
import _defaultJsonData from '../../assets/json-templates/defaultContent.json'; // Renamed import
import { JsonPollockDemo } from './JsonPollockDemo';

// Static list of example JSON files we know exist in the /examples/ directory
const exampleFiles = [
  'accordion_select.json',
  'buttons.json',
  'card.json',
  'card_no_validation.json',
  'card_scroll.json',
  'carousel.json',
  'carousel_maps.json',
  'carousel_no_validation.json',
  'checklist.json',
  'horizontal_layout.json',
  'single_element.json',
  'styling.json',
  'tabs.json',
];

function useDirection(props) {
  const { page } = usePageData();
  const { frontmatter = {} } = page;
  const { playgroundDirection } = frontmatter;

  if (props.direction) {
    return props.direction;
  }
  if (playgroundDirection) {
    return playgroundDirection;
  }
  try {
    // eslint-disable-next-line no-undef
    return __PLAYGROUND_DIRECTION__;
  } catch (e) {
    // ignore
  }
  return 'horizontal';
}

export default function Playground(props) {
  const {
    code: codeProp,
    language,
    className = '',
    direction: directionProp,
    editorPosition,
    renderChildren,
    ...rest
  } = props;

  const direction = useDirection(props);
  const [code, setCode] = useState(JSON.stringify(_defaultJsonData, null, 4)); // Start with default JSON, stringified
  const [parsedJson, setParsedJson] = useState(_defaultJsonData); // State for the parsed JSON object
  const [maxElements, setMaxElements] = useState(10); // Keep max elements state

  // Update parsedJson whenever code changes and is valid
  useEffect(() => {
    try {
      setParsedJson(JSON.parse(code));
    } catch (e) {
      // If JSON is invalid, don't update the parsed version
      // console.error("Invalid JSON in editor:", e);
    }
  }, [code]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode); // Update the string state directly
  }, []);

  const loadExample = useCallback(async (fileName) => {
    try {
      // Construct the URL path relative to the public root
      // Rspress usually serves content from the root or a specific base path.
      // Assuming 'examples' is served at the root. Adjust if needed.
      const response = await fetch(`${import.meta.env.BASE_URL}examples/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setCode(JSON.stringify(jsonData, null, 4)); // Update editor with fetched JSON
    } catch (error) {
      console.error(`Error loading example ${fileName}:`, error);
      // Optionally show an error to the user
    }
  }, []);

  const handleMaxElementsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxElements(isNaN(value) ? 0 : value);
  };


  const useReverseLayout =
    direction === 'horizontal' && editorPosition === 'left';

  const classNames = [
    'rspress-playground',
    `rspress-playground-${direction}`,
    `rspress-playground-reverse-${useReverseLayout ? 'y' : 'n'}`,
    `h-80p`, // Consider if this height class is still desired
    className,
  ].join(' ');

  return (
    <NoSSR>
      <div>
        <div className='flex flex-1 justify-end items-center p-3'>
          <label className='justify-start'>Examples: </label>
          {exampleFiles.map((fileName) =>
            <button
              key={fileName}
              onClick={() => loadExample(fileName)}
              className='rspress-nav-menu-item text-sm font-medium rounded-md mx-1.5 px-3 py-2'
            >
              {fileName.replace('.json', '')}
            </button>
          )}
        </div>

        {/* <Tabs onChange={(i) => loadExample(exampleFiles[i])}>
          {exampleFiles.map((fileName) => (
            <Tab label={fileName.replace('.json', '')}></Tab>
          ))}
        </Tabs> */}

        <div className={classNames} {...rest}>
          <SnackbarProvider>
            {/* Pass the parsed JSON state */}
            <JsonPollockDemo json={parsedJson} maxAllowedElements={maxElements} />
            <Editor
              value={code} // Editor value is the string state
              onChange={handleCodeChange} // Update string state on change
              language={'json'} // Force JSON language
            />
            {renderChildren?.(props, code, direction, parsedJson)}
          </SnackbarProvider>
        </div>
      </div>
    </NoSSR>
  );
}
