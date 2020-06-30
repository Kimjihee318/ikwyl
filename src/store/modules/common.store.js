export default {
  namespaced: true,
  state: {
    lnb: {
      modalOpened: false
    }
  },
  mutations: {
    setModalOpened(state, payload) {
      state.lnb.modalOpened = payload
    }
  },
  actions: {}
}
