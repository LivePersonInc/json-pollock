import 'whatwg-fetch';
import 'babel-polyfill';
import { get, isString, isObject, startsWith, keys, find, chain } from 'lodash';

const GITHUB_API = 'https://api.github.com';
const PROXY_API = 'https://json-pollock-service.herokuapp.com/api';

const STORAGE_KEYS = {
  GITHUB_TOKEN: 'jsonPollockPlaygroundGithubToken',
  GITHUB_USER: 'GithubUser',
  GIST_PREFIX: 'jsonPollockPlayground',
};

const FILENAME_PREFIX = 'Json_pollock_playground';

class Gist {
  constructor(id, name, content, url, ownerId) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.url = url;
    this.isGist = true;
    this.ownerId = ownerId;
  }
}

const toGistObject = (gist, filename) => {
  const files = keys(gist.files);
  if (files && files.length) {
    const queryFilename = startsWith(filename, FILENAME_PREFIX) ? filename : `${FILENAME_PREFIX}.${filename}`;
    const file = filename && gist.files[queryFilename] ?
      gist.files[queryFilename] :
      gist.files[find(files, f => startsWith(f, FILENAME_PREFIX)) || files[0]];
    const gistFilename = startsWith(file.filename, FILENAME_PREFIX) ?
      file.filename.slice(FILENAME_PREFIX.length + 1) :
      file.filename;
    return new Gist(gist.id, gistFilename, file.content || undefined, gist.html_url, get(gist, 'owner.id'));
  }
  return undefined;
};

const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.GITHUB_TOKEN, token);
};

const deleteToken = () => {
  localStorage.removeItem(STORAGE_KEYS.GITHUB_TOKEN);
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

const loadGists = () =>
  queryGitHubAPI('gists')
    .then(gists =>
      chain(gists).filter(gist => !!chain(gist.files)
                .keys(gist.files)
                .filter(file => startsWith(file, FILENAME_PREFIX))
                .value().length)
      .map(gist => toGistObject(gist)).value());

const loadGist = (gistId, filename) =>
  queryGitHubAPI(`gists/${gistId}`, gistId, true)
    .then((gist) => {
      const gistObj = toGistObject(gist, filename);
      if (gistObj) {
        return gistObj;
      }
      return gist;
    });

const saveGist = (gistId, filename, content) => queryGitHubAPI(`gists/${gistId}`, {
  method: 'PATCH',
  body: {
    files: { [`${FILENAME_PREFIX}.${filename}`]: {
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
    files: { [`${FILENAME_PREFIX}.${filename}`]: {
      content: JSON.stringify(content),
    } },
  },
}).then(gist => gist);

export default {
  loadGist,
  loadGists,
  saveGist,
  createGist,
  saveToken,
  deleteToken,
  getToken,
  getUserDetails,
};
