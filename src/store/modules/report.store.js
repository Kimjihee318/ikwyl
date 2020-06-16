import __F from '@/primitives/_function_'
import reportApi from '@/service/service.report'

export default {
  namespaced: true,
  state: {
    dailySHS: [{ date: '', id: null, quantity: null, user: '' }],
    joinedDataUserInfoNSHS: []
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
    setDailySHSItem(state, { idx, property, value }) {
      state.dailySHS[idx][property] = value
    },
    setJoinedSHS(state, payload) {
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
          console.log(`[getReportFromServer]`)
        })
        return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async putReport2Server(vuex, userData) {
      try {
        await reportApi.putReport(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async upReport2Server(userData) {
      try {
        await reportApi.upReport(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },
    async delReport2Server(id) {
      try {
        await reportApi.delReport(id, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    },

    // * [ USER JOIN SHS ]
    async getJoinedReportFromServer({ commit }) {
      try {
        await reportApi.getJoinedReport(res => {
          let formattedData = __F.obj2Lowercase(res.data)
          commit('setJoinedSHS', formattedData)
          console.log(`[getReportFromServer]`)
        })
        return true
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    }
  }
}
