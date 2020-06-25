export default {
  namespaced: true,
  state: {
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
