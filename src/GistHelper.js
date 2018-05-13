import 'whatwg-fetch';

const FETCH_API = 'https://api.github.com/gists';

const STORAGE_KEYS = {
  GITHUB_TOKEN: 'jsonPollockPlaygroundGithubToken',
};
// 'If-None-Match': 'W/"43328bbba367b98abc408d9861881e42"'

class Gist {
  constructor(name, content, url) {
    this.name = name;
    this.content = content;
    this.url = url;
    this.isGist = true;
  }
}

const load = (gistId, token) => {
  const storedGist = localStorage.getItem(gistId);
  if (storedGist) return {};
  return fetch(`${FETCH_API}/${gistId}`, { headers: { Authorization: `token ${token}` } })
          .then(res => res.json())
          .then((gist) => {
            const files = gist.files && Object.keys(gist.files);
            if (files && files.length) {
              const file = gist.files[files[0]];
              return new Gist(file.filename, file.content, gist.html_url);
            }
            return gist;
          });
};

const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.GITHUB_TOKEN, token);
};

const getToken = () => localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);

export default {
  load,
  saveToken,
  getToken,
};
