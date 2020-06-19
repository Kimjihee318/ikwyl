import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import router from '@/routes/index'
import accountApi from '@/service/service.account'

console.log('ACCOUNT STORE IN')
let ACCOUNT = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
console.log('[STORE ACCOUNT]', ACCOUNT)
export default {
  namespaced: true,
  state: {
    email: ACCOUNT ? ACCOUNT.user.email : '',
    permission: __C.FULL_ACCESS_PERMISSION.SERVICE,
    token: ACCOUNT ? ACCOUNT.token : '',
    user: ACCOUNT ? ACCOUNT.user.displayName : '',
    userInfo: {
      address: '',
      buildingname: '',
      buildingno: '',
      floor: '',
      maxunitno: '',
      maxfloor: '',
      unit: ''
    },
    userInfoIdx: null
  },
  mutations: {
    setPermissionState(state, payload) {
      if (!payload.ISPERMISSION) return
      state.permission = __C.FULL_ACCESS_PERMISSION.SYSTEM
    },
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
    // * [ LOGIN / LOGOUT ]
    async login({ state }) {
      await accountApi.setAccount2LocalStorage(() => {
        let getAccount = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
        ACCOUNT = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
        console.log(`[GET ACCOUNT]`, getAccount)
        console.log(`[ACCOUNT]`, ACCOUNT)
        console.log(`[1]`, state)
        if (!ACCOUNT) return
        ACCOUNT.isNewUser ? router.push({ path: '/userinfo' }) : router.push({ path: '/main' })
      })
      console.log(`[2]`, state)
    },
    async logout() {
      await accountApi.delAccount2LocalStorage(({ isEmpty }) => {
        if (isEmpty) console.log('GOOD')
      })
    },
    // * [ PERMISSION ]
    async getUserPermissionFromServer({ state, commit }) {
      let email = {
        useremail: state.email
      }
      await accountApi.getUserPermission(email, res => {
        commit('setPermissionState', res.data[0])
      })
    },
    // * [ USER INFO ]
    async getUserInfoFromServer({ commit, state }, callback) {
      let userEmail = { useremail: state.email }
      await accountApi.getUserInfo(userEmail, res => {
        let formattedObj = __F.obj2Lowercase(res.data)
        commit('setIdx', formattedObj.id)
        state.userInfo = formattedObj
        if (callback) callback(formattedObj)
      })
    },
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
