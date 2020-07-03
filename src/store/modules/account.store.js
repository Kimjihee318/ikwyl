import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import router from '@/routes/index'
import accountApi from '@/service/service.account'

let ACCOUNT = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
console.log(`START STORE`, ACCOUNT)
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
    setAccount(state, payload) {
      state.email = payload.user.email
      state.token = payload.user.token
      state.user = payload.user.displayName
    },
    setIdx(state, payload) {
      state.userInfoIdx = payload
    },
    setPermissionState(state, payload) {
      if (!payload || !payload.ISPERMISSION) {
        state.permission = __C.FULL_ACCESS_PERMISSION.SERVICE
        return
      }
      state.permission = __C.FULL_ACCESS_PERMISSION.SYSTEM
    },
    setUserInfo(state, { key, value }) {
      state.userInfo[key] = value
    },
    setUserInfoItem(state, payload) {
      let key = Object.keys(payload)
      if (key.length === 0) return
      state.userInfo[key[0]] = payload[key[0]]
    }
  },
  actions: {
    // * [ LOGIN / LOGOUT ]
    async login({ commit }) {
      await accountApi.setAccount2LocalStorage(res => {
        commit('setAccount', res)
        ACCOUNT = res
        if (!ACCOUNT) return
        ACCOUNT.isNewUser ? router.push({ path: '/userinfo' }) : router.push({ path: '/main' })
      })
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
        commit('setPermissionState', res.data.length === 0 ? null : res.data[0])
      })
    },
    // * [ USER INFO ]
    async getUserInfoFromServer({ commit, state }, callback) {
      console.log(`[GET USER INFO]`)
      let userEmail = { useremail: state.email }
      await accountApi.getUserInfo(userEmail, res => {
        let mode
        mode = res.data.length === 0 ? __C.FORM.EDIT_MODE_NEW : __C.FORM.EDIT_MODE_READ
        if (callback) callback(mode)
        if (res.data.length === 0) return
        let formattedObj = __F.obj2Lowercase(res.data)
        commit('setIdx', formattedObj.id)
        state.userInfo = formattedObj
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
