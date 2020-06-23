export default {
  namespaced: true,
  state: {
    window: {
      width: null,
      height: null
    }
  },
  mutations: {
    handleResize(state) {
      state.window.width = window.innerWidth
      state.window.height = window.innerHeight
    }
  },
  actions: {}
}
