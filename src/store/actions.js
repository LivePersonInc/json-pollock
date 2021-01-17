import GitHubHelper from '../GitHubHelper';

export default {
  loadUser({ commit }) {
    return GitHubHelper.getUserDetails()
    .then((userDetails) => {
      if (userDetails) {
        commit('setUser', userDetails);
        return GitHubHelper.loadGists().then(gists => commit('setUserGists', gists));
      }
      return undefined;
    });
  },
};
