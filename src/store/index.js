import Vue from 'vue'
import Vuex from 'vuex'

// * modules
import account from './modules/account.store'
import application from './modules/application.store'
import report from './modules/report.store'
import system from './modules/system.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    application,
    report,
    system
  }
})
