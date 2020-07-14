import Vue from 'vue'
import VueRouter from 'vue-router'
import __C from '@/primitives/_constants_'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
          path: 'main', // * 그냥 자식 path는 '/' 붙여주지 않음 redirect에만 / 붙여줌
          name: 'main',
          component: () => import('@/views/service/ServiceMain.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'residenceinfo',
          name: 'residenceinfo',
          component: () => import('@/components/form/FormUserInfo.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'system',
          name: 'system',
          redirect: '/system/userinfo',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'userinfo',
              name: 'sys_userinfo',
              component: () => import('@/views/system/SystemUserInfoBoard.vue'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'dailyshs',
              name: 'dailyshs',
              component: () => import('@/views/system/SystemSHSBoard.vue'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'residence',
              name: 'residence',
              component: () => import('@/views/system/SystemResidence.vue'),
              meta: {
                requiresAuth: true
              }
            }
          ]
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
      // beforeEnter(from, to, next) {
      //   const account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
      //   if (account) return next('/')
      //   next()
      // }
    },
    // {
    //   path: '/userinfo',
    //   component: () => import('@/views/service/ServiceUserInfo.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    { path: '/404', component: () => import('@/views/service/Service404.vue') },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  let account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
  console.log('AUTH CHECK ', account, '/', to.meta.requiresAuth && !account)
  if (to.meta.requiresAuth && !account) {
    next({ path: '/login' })
    return
  }
  next()
})

export default router
