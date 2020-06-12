// import __C from '@/primitives/_constants_'
import reportApi from '@/service/service.report'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addReport2Server() {
      try {
        await reportApi.addReport(userData, null)
      } catch (err) {
        console.log('[AXIOS ERROR]', err)
      }
    }
  }
}
