import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Index.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/service/ServiceLogin.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters['account/isAuthenticated']
  console.log(isAuthenticated)
  if (to.meta.requiresAuth && !isAuthenticated) return next({ name: 'login' })
  next()
})

export default router
