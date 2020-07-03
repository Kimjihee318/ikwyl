export default {
  namespaced: true,
  state: {
    window: {
      width: window.innerWidth,
      height: window.innerHeight
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
