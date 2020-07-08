<template>
  <div class="comp__login">
    <div class="logo">
      <icon-logo class="icon" />
      <div>Find The Smoker</div>
    </div>
    <div class="wrap__login">
      <div class="title">Log in</div>
      <div class="button_google_login" @click="onLogin('google')">
        <icon-google-logo class="icon" />
        <span>Log in With Google</span>
        <span></span>
      </div>
      <div class="divider">OR</div>
      <form class="form_login">
        <input v-model="id" name="id" placeholder="Email" type="text" />
        <input v-model="password" name="password" placeholder="Password" type="password" />
        <button @click="onLogin('server')">Login</button>
      </form>
    </div>
    <div class="copyright">
      Copyrightⓒ 2020 JIHEE KIM All rights reserved.
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconGoogleLogo from '@/assets/icons/google_logo_48px.svg'
import IconLogo from '@/assets/icons/logo.svg'

export default {
  name: 'login',
  components: {
    IconGoogleLogo,
    IconLogo
  },
  data: () => ({
    id: 'visitor',
    password: '1234'
  }),
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['googleLogin', 'serverLogin']),
    async onLogin(type) {
      try {
        if (type === 'google') {
          await this.googleLogin()
        } else {
          let data = {
            id: this.id,
            password: this.password
          }
          await this.serverLogin(data)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_login.scss';
</style>
