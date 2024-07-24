export const state = () => ({
  loggedIn: false,
  token: ''
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.loggedIn = !!token;
  }
};

export const actions = {
  login({ commit }, token) {
    commit('SET_TOKEN', token);
    localStorage.setItem('authToken', token);
  },
  logout({ commit }) {
    commit('SET_TOKEN', '');
    localStorage.removeItem('authToken');
  }
};
