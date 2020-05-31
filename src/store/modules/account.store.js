export default {
  namespaced: true,
  state: {
    // * #### FIX ####
    user: 'jiheekim',
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
      return false
    },
  },
  mutations: {},
  actions: {},
}
