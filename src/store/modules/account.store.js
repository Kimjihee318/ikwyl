export default {
  namespaced: true,
  state: {
    // * #### FIX ####
    user: 'jihee',
    userInfo: {
      address: '',
      buildingName: 'RICH CASTLE',
      buildingNo: 101,
      floor: 9,
      unit: 901
      // should added Top Floor
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
