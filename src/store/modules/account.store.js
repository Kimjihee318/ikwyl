export default {
  namespaced: true,
  state: {
    // * #### FIX ####
    user: '깜찍이',
    userInfo: {
      address: '',
      buildingName: '마곡 경동 미르웰',
      buildingNo: 101,
      unit: 1001,
    },
    // * #### FIX ####
  },
  getters: {
    isAuthenticated() {
      // * #### FIX ####
      return true
    },
  },
  mutations: {},
  actions: {},
}
