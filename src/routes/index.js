import Vue from 'vue'
import VueRouter from 'vue-router'
import __C from '@/primitives/_constants_'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Index.vue'),
      meta: {
        requiresAuth: true
      },
      redirect: '/main',
      children: [
        {
          path: 'main', // * 그냥 자식 path는 '/' 붙여주지 않음
          name: 'main',
          component: () => import('@/views/service/ServiceMain.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/service/ServiceLogin.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/userinfo',
      component: () => import('@/views/service/ServiceUserInfo.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setshs',
      component: () => import('@/views/system/SystemSetSHS.vue'),
      meta: {
        // !FIXME SYSTEM ADMIN REQUIRED
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))

  if (to.meta.requiresAuth && !account) return next({ name: 'login' })
  next()
})

export default router
