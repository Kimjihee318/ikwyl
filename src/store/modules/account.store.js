import __C from '@/primitives/_constants_'
import router from '@/routes/index'
import accountApi from '@/service/service.account'

let account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
export default {
  namespaced: true,
  state: {
    // * #### FIX ####
    user: 'jihee',
    token: null,
    email: '',
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
      return !!account.token && account.token.length !== 0 ? true : false
    }
  },
  mutations: {
    setToken(state) {
      state.token = account.token
    },
    setUser(state) {
      state.user = account.user.displayName
    },
    setEmail(state) {
      state.email = account.user.email
    }
  },
  actions: {
    async googleAuth({ commit }) {
      await accountApi.setAccount2LocalStorage(() => {
        if (account.token) {
          router.push({ path: '/main' })
        }
        commit('setToken')
        commit('setUser')
        commit('setEmail')
      })
    }
  }
}
