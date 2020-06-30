import __F from '@/primitives/_function_'
import reportApi from '@/service/service.report'

export default {
  namespaced: true,
  state: {
    dailySHS: [{ date: '', id: null, quantity: null, user: '' }],
    joinedSHSWithUserInfo: []
  },
  mutations: {
    setDailySHS(state, payload) {
      payload.forEach((d, i) => {
        let date = new Date(d.date)
        payload[i].date = date
        payload[i].formateddate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      })
      // TODO NESTED MAKING!
      let result = payload.reduce((c, v) => {
        c[v.formateddate] = c[v.formateddate] || [] //Init if company property does not exist
        c[v.formateddate].push(v) //Add employee property with null value
        return c
      }, {})
      state.dailySHS = result
    },
    setDailySHSItem(state, { key, idx, property, value }) {
      console.log('TEST MODEL', state.dailySHS[key][idx])
      state.dailySHS[key][idx][property] = value
    },
    setJoinedSHS(state, payload) {
      state.joinedSHSWithUserInfo = payload
    }
  },
  actions: {
    // * [ SHS ]
    async getReportFromServer({ rootState, commit }) {
      try {
        let useremail = { useremail: rootState.account.email }
        await reportApi.getReport(useremail, res => {
          let formattedData = __F.obj2Lowercase(res.data)
          commit('setDailySHS', formattedData)
        })
        return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async putReport2Server(vuex, userData) {
      try {
        let res = await reportApi.putReport(userData, null)
        if (res) return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async upReport2Server({ state }, { key, idx }) {
      console.log(`TEST UP REPORT`, state.dailySHS[key][idx])
      let changed = state.dailySHS[key][idx]
      let data = {
        id: changed.id,
        quantity: changed.quantity
      }
      try {
        let res = await reportApi.upReport(data, null)
        if (res) return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async delReport2Server({ state }, { key, idx }) {
      try {
        let selected = state.dailySHS[key][idx]
        let id = {
          id: selected.id
        }
        console.log(id)
        let res = await reportApi.delReport(id, null)
        if (res) return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },

    // * [ USER JOIN SHS ]
    async getJoinedSHSFromServer({ commit }) {
      try {
        await reportApi.getJoinedSHS(res => {
          let formattedData = __F.obj2Lowercase(res.data)
          commit('setJoinedSHS', formattedData)
        })
        return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    }
  }
}
