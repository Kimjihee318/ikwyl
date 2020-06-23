import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/routes'
import { sync } from 'vuex-router-sync'
import '@/assets/style/index.scss'

// console.log(oAuth)
Vue.config.productionTip = false

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
