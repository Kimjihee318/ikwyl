export default {
  namespaced: true,
  state: {
    // * #### FIX ####
    user: 'jihee',
    userInfo: {
      address: '',
      buildingName: 'RICH CASTLE',
      buildingNo: 101,
      unit: 901
    }
    // * #### FIX ####
  },
  getters: {
    isAuthenticated() {
      // * #### FIX ####
      return true
    }
  },
  mutations: {},
  actions: {}
}
