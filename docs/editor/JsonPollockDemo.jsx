/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export, no-unused-vars */
import React, { useEffect } from 'react';
import { NoSSR } from 'rspress/runtime';
import { useSnackbar } from 'notistack';
import '../../dist/json-pollock.min.css';
import JsonPollock from '../../src/index';
// import JsonPollock from '../../dist/json-pollock.bundle.min'; // INFO: if you need to test importing bundled UMD after build

function JsonPollockDemo(props) {
  const {
    className = '',
    direction: directionProp,
    json: jsonData,
    maxAllowedElements,
    ...rest
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const config = {
    maxAllowedElements: maxAllowedElements || 10
  }

  useEffect(() => {
    const container = document.getElementById('json-pollock-container');
    if (!container) {
      return;
    }
    JsonPollock.init(config);
    [
      'publishText',
      'navigate',
      'link',
    ].forEach((event) => {
      JsonPollock.unregisterAction(event);
      JsonPollock.registerAction(event, (data) => {
        const msg = `"${event}" event fired!`;
        console.info(msg, data);
        enqueueSnackbar(`${msg} ${JSON.stringify(data)}`, { variant: 'default' });
      });
    });
    try {
      const fragment = JsonPollock.render(jsonData);
      container.children?.length
        ? container.replaceChild(fragment, container.firstChild)
        : container.appendChild(fragment);
    } catch (e) {
      const msg = `JsonPollock.render errored with: ${e.message}`
      console.error(msg);
      console.log(e.errors);
      enqueueSnackbar(msg , { variant: 'error' });
    }
  }, [jsonData]);

  return (
    <div className={`rspress-playground-runner ${className}`} {...rest}>
      <div id="json-pollock-container" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

export { JsonPollockDemo };
