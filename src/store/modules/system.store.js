// import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import systemApi from '@/service/service.system'

export default {
  namespaced: true,
  state: {
    isSystemMod: false, // ! 새로고침시 system 버튼으로 변경되는 부분 수정
    dailySHS: null,
    userInfoList: null
  },
  mutations: {
    setSysMod(state, payload) {
      state.isSystemMod = payload
    },
    setDailySHS(state, payload) {
      state.dailySHS = payload
    },
    setUserInfo(state, payload) {
      state.userInfoList = payload
    }
  },
  actions: {
    // * [ SH SMOKE ]
    async getSHSFromServer({ commit }) {
      try {
        await systemApi.getSHS(res => {
          let formattedData = __F.obj2Lowercase(res.data)
          commit('setDailySHS', formattedData)
        })
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async addSHS2Server(vuex, userData) {
      try {
        await systemApi.putSHS(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async upSHS2Server(userData) {
      try {
        await systemApi.upSystem(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },

    // * [ LIST SH SMOKE ]
    async addSHSList2Server(vuex, userData) {
      try {
        await systemApi.addSHSList(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    // * [ SH SMOKE ]
    async deleteSHS(vuex, data) {
      try {
        await systemApi.delSHS(data, res => console.log(res))
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    // async upSHS2Server(userData) {
    //   try {
    //     await systemApi.upSystem(userData, null)
    //   } catch (err) {
    //     console.log('[AXIOS ERROR]', err)
    //   }
    // },

    // * [ USER INFO ]
    async getUserInfoListFromServer({ commit }) {
      try {
        let res = await systemApi.getUserInfoList(res => {
          let formattedData = __F.obj2Lowercase(res.data)
          commit('setUserInfo', formattedData)
        })
        if (res) return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async addUserInfo2Server(vuex, userData) {
      try {
        await systemApi.putSHS(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    }
  }
}
