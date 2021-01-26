export default {
  json: state => state.json,
  loading: state => state.loading,
  gist: state => state.gist,
  token: state => state.token,
  message: state => state.message,
  user: state => state.user,
  userGists: state => state.userGists,
  jsonValid: state => state.jsonValid,
  schemaValid: state => state.schemaValid,
  edited: state => state.edited,
  actions: state => state.actions,
  jsonSelectionPath: state => state.jsonSelectionPath,
};
