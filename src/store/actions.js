import GithubService from '@/services//GithubService';

export default {
  loadUser({ commit }) {
    return GithubService.getUserDetails()
    .then((userDetails) => {
      if (userDetails) {
        commit('setUser', userDetails);
        return GithubService.loadGists().then(gists => commit('setUserGists', gists));
      }
      return undefined;
    });
  },
};
