<template>
  <div class="comp__login">
    <div class="logo">
      <icon-logo class="icon" />
      <div>Find The Smoker</div>
    </div>
    <div class="wrap__login">
      <div class="title">Log in</div>
      <div class="button_google_login" @click="onLogin">
        <icon-google-logo class="icon" />
        <span>Log in With Google</span>
        <span></span>
      </div>
      <div class="divider">OR</div>
      <form class="form_login">
        <input name="id" placeholder="Email" type="text" />
        <input name="password" placeholder="Password" type="password" />
        <button>Login</button>
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
  created() {},
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['login']),
    async onLogin() {
      await this.login()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_login.scss';
</style>
