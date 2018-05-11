import 'whatwg-fetch';

const FETCH_API = 'https://api.github.com/gists';

class Gist {
  constructor(name, content, url) {
    this.name = name;
    this.content = content;
    this.url = url;
  }
}

const load = gistId => fetch(`${FETCH_API}/${gistId}`)
          .then(res => res.json())
          .then((gist) => {
            const files = gist.files && Object.keys(gist.files);
            if (files && files.length) {
              const file = gist.files[files[0]];
              return new Gist(file.filename, file.content, gist.html_url);
            }
            return null;
          });

export default {
  load,
};
