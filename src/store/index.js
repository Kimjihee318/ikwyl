import Vue from 'vue'
import Vuex from 'vuex'

// * modules
import account from './modules/account.store'
import report from './modules/report.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    report
  }
})
