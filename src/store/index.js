import Vue from 'vue'
import Vuex from 'vuex'

// * modules
import account from './modules/account.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  }
})
