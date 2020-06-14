import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import router from '@/routes/index'
import accountApi from '@/service/service.account'

const ACCOUNT = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))

export default {
  namespaced: true,
  state: {
    user: ACCOUNT ? ACCOUNT.user.displayName : '',
    token: ACCOUNT ? ACCOUNT.token : '',
    email: ACCOUNT ? ACCOUNT.user.email : '',
    userInfo: {
      address: '',
      buildingname: '',
      buildingno: '',
      floor: '',
      unit: '',
      maxfloor: ''
    },
    userInfoIdx: null
  },
  mutations: {
    setUserInfoItem(state, payload) {
      let key = Object.keys(payload)
      if (key.length === 0) return
      state.userInfo[key[0]] = payload[key[0]]
    },
    setIdx(state, payload) {
      state.userInfoIdx = payload
    }
  },
  actions: {
    async addUserInfo2Server({ state }) {
      try {
        let userData = JSON.parse(JSON.stringify(state.userInfo))
        userData.user = state.user
        userData.useremail = state.email
        await accountApi.addUserInfo(userData, res => {
          state.userInfoIdx = res.idx
        })
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async getUserInfoFromServer({ commit, state }, callback) {
      let userEmail = { useremail: state.email }
      await accountApi.getUserInfo(userEmail, res => {
        let formattedObj = __F.obj2Lowercase(res.data)
        commit('setIdx', formattedObj.id)
        state.userInfo = formattedObj
        if (callback) callback(formattedObj)
      })
    },
    async login() {
      await accountApi.setAccount2LocalStorage(() => {
        if (!ACCOUNT) return
        ACCOUNT.isNewUser ? router.push({ path: '/userinfo' }) : router.push({ path: '/main' })
      })
    },
    async logout() {
      await accountApi.delAccount2LocalStorage(({ isEmpty }) => {
        if (isEmpty) console.log('GOOD')
      })
    },
    async upUserInfo2Server({ state }) {
      try {
        let userData = JSON.parse(JSON.stringify(state.userInfo))
        userData.id = state.userInfoIdx
        // ! FIX ME | user email property를 보내지 않고 오류가 없는지 확인 하지 못함
        // userData.user = state.user
        await accountApi.postUserInfo(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    }
  }
}
