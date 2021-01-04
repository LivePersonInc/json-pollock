import 'whatwg-fetch';
import 'babel-polyfill';
import { get, isString, isObject } from 'lodash';

const GITHUB_API = 'https://api.github.com';
const PROXY_API = 'https://json-pollock-service.herokuapp.com/api';

const STORAGE_KEYS = {
  GITHUB_TOKEN: 'jsonPollockPlaygroundGithubToken',
  GITHUB_USER: 'GithubUser',
  GIST_PREFIX: 'jsonPollockPlayground',
};

class Gist {
  constructor(name, content, url, ownerId) {
    this.name = name;
    this.content = content;
    this.url = url;
    this.isGist = true;
    this.ownerId = ownerId;
  }
}

const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.GITHUB_TOKEN, token);
};

const getToken = () => localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);

const queryGitHubAPI = (path, storageKeyOrOptions, fallbackToProxy) => {
  const token = getToken();
  if (!token && !fallbackToProxy) return Promise.reject(new Error('Token not found'));

  let storageObj;
  let storageStr;

  if (isString(storageKeyOrOptions)) {
    storageStr = localStorage.getItem(`${STORAGE_KEYS.GIST_PREFIX}_${storageKeyOrOptions}`);
  }

  if (storageStr) {
    storageObj = JSON.parse(storageStr);
  }
  const options = { 'Access-Control-Allow-Origin': '*' };

  if (token) {  // tkoen is required for any non-get request, as of these configurations.
    options.headers = { Authorization: `token ${token}` };

    if (storageObj) {
      options.headers['If-None-Match'] = storageObj.etag;
    }

    if (isObject(storageKeyOrOptions)) {
      options.method = storageKeyOrOptions.method;
      options.body = JSON.stringify(storageKeyOrOptions.body);
      options.headers['Content-Type'] = 'application/json';
    }
  }

  const serviceUrl = token ? GITHUB_API : PROXY_API;

  return fetch(`${serviceUrl}/${path}`, options)
    .then((res) => {
      if (res.status === 304) { // not changed
        return storageObj;
      }

      if (res.status === 200) {
        const etag = res.headers.get('Etag');
        return res.json().then((json) => {
          if (isString(storageKeyOrOptions)) {
            localStorage.setItem(`${STORAGE_KEYS.GIST_PREFIX}_${storageKeyOrOptions}`, JSON.stringify({ ...json, etag }));
          }
          return json;
        });
      }

      return res.json().then(err => ({ ...err, error: true }));
    });
};

const getUserDetails = () => queryGitHubAPI('user', STORAGE_KEYS.GITHUB_USER).then(res => (res.error ? '' : res));

const loadGist = (gistId, filename) =>
  queryGitHubAPI(`gists/${gistId}`, gistId, true)
    .then((gist) => {
      const files = gist.files && Object.keys(gist.files);
      if (files && files.length) {
        const file = filename && gist.files[filename] ?
          gist.files[filename] :
          gist.files[files[0]];
        return new Gist(file.filename, file.content, gist.html_url, get(gist, 'owner.id'));
      }
      return gist;
    });

const saveGist = (gistId, filename, content) => queryGitHubAPI(`gists/${gistId}`, {
  method: 'PATCH',
  body: {
    files: { [filename]: {
      content: JSON.stringify(content),
    } },
  },
}).then((gist) => {
  const files = gist.files && Object.keys(gist.files);
  if (files && files.length) {
    const file = filename && gist.files[filename] ?
      gist.files[filename] :
      gist.files[files[0]];
    return new Gist(file.filename, file.content, gist.html_url, get(gist, 'owner.id'));
  }
  return gist;
});

const createGist = (filename, content) => queryGitHubAPI('gists', {
  method: 'POST',
  body: {
    files: { [filename]: {
      content: JSON.stringify(content),
    } },
  },
}).then(gist => gist);

export default {
  loadGist,
  saveGist,
  createGist,
  saveToken,
  getToken,
  getUserDetails,
};
