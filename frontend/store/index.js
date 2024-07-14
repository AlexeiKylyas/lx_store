export const state = () => ({
  auth: {
    loggedIn: false,
    user: null
  }
})

export const mutations = {
  login(state, user) {
    state.auth.loggedIn = true
    state.auth.user = user
  },
  logout(state) {
    state.auth.loggedIn = false
    state.auth.user = null
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    // Здесь можно выполнить запрос к API для проверки данных пользователя
    // Пример:
    // const response = await this.$axios.post('/api/login', { username, password })
    // const user = response.data.user
    // commit('login', user)

    // Для примера просто авторизуем пользователя с любыми данными
    commit('login', { username })
  },
  logout({ commit }) {
    commit('logout')
  }
}
