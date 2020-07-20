export default {
  namespaced: true,
  state: {
    window: {
      width: 0,
      height: 0
    },
    isResidence: ''
  },
  mutations: {
    handleResize(state) {
      state.window.width = window.innerWidth
      state.window.height = window.innerHeight
    },
    setPath(state, payload) {
      state.routePath = payload
    }
  },
  actions: {}
}
