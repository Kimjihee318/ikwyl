export default {
  namespaced: true,
  state: {
    // * Array has only item
    selectedDates: []
  },
  mutations: {
    setSelectedDates(state, payload) {
      if (!payload || payload.length === 0) return
      state.selectedDates = payload.map(d => d.date)
    }
  },
  actions: {}
}
