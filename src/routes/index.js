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
      redirect: '/main',
      children: [
        {
          path: 'main', // * 그냥 자식 path는 '/' 붙여주지 않음
          name: 'main',
          component: () => import('@/views/service/ServiceMain.vue'),
        },
      ],
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
