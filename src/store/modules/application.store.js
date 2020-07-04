export default {
  namespaced: true,
  state: {
    window: {
      width: 0,
      height: 0
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
