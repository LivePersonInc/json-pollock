import 'whatwg-fetch';
import 'babel-polyfill';
import { get } from 'lodash';

const GITHUB_API = 'https://api.github.com';

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

const queryGitHubAPI = (token, path, storageKey) => {
  const storageStr = localStorage.getItem(`${STORAGE_KEYS.GIST_PREFIX}_${storageKey}`);
  let storageObj;
  if (storageStr) {
    storageObj = JSON.parse(storageStr);
  }
  const options = { headers: { Authorization: `token ${token}` } };
  if (storageObj) {
    options.headers['If-None-Match'] = storageObj.etag;
  }

  return fetch(`${GITHUB_API}/${path}`, options)
    .then((res) => {
      if (res.status === 304) { // not changed
        return storageObj;
      }

      if (res.status === 200) {
        const etag = res.headers.get('Etag');
        return res.json().then((json) => {
          if (storageKey) {
            localStorage.setItem(`${STORAGE_KEYS.GIST_PREFIX}_${storageKey}`, JSON.stringify({ ...json, etag }));
          }
          return json;
        });
      }

      return res.json().then(err => ({ ...err, error: true }));
    });
};

const getUserDetails = token => queryGitHubAPI(token, 'user', STORAGE_KEYS.GITHUB_USER).then(res => (res.error ? '' : res));

const loadGist = (gistId, filename, token) =>
  queryGitHubAPI(token, `gists/${gistId}`, gistId)
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


const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.GITHUB_TOKEN, token);
};

const getToken = () => localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);

export default {
  loadGist,
  saveToken,
  getToken,
  getUserDetails,
};
