export default {
  setJson(state, json) {
    state.json = json;
  },
  setJsonValid(state, bool) {
    state.jsonValid = bool;
  },
  setSchemaValid(state, bool) {
    state.schemaValid = bool;
  },
  setEdited(state, bool) {
    state.edited = bool;
  },
  setLoading(state, val) {
    state.loading = val;
  },
  setJsonSelectionPath(state, val) {
    state.jsonSelectionPath = val;
  },
  setGist(state, gistObj) {
    if (gistObj) {
      state.gist.name = gistObj.name;
      state.gist.url = gistObj.url;
      state.gist.id = gistObj.id;
      state.gist.ownerId = gistObj.ownerId;
    }
  },
  setMessage(state, msg) {
    if (msg) {
      state.message = msg;
    }
  },
  setToken(state, token) {
    if (token) {
      state.token = token;
    }
  },
  removeToken(state) {
    state.token = '';
  },
  setUser(state, user) {
    if (user) {
      state.user = user;
    }
  },
  setUserGists(state, userGists) {
    if (userGists) {
      state.userGists = userGists;
    }
  },
  removeUser(state) {
    state.user = '';
  },
  removeUserGists(state) {
    state.userGists = [];
  },
  addAction(state, action) {
    if (action) {
      state.actions.push(action);
    }
  },
  clearActions(state) {
    state.actions = [];
  },
};
