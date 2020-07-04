<template>
  <div class="login">
    <div><icon-logo class="icon" /><span>Find the smoker</span></div>
    <div @click="onLogin">
      <span><icon-google-logo /></span>
      Log in With Google
    </div>
    <form>
      <input type="text" name="id" />
      <input type="text" name="password" />
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconLogo from '@/assets/icons/logo.svg'
import IconGoogleLogo from '@/assets/icons/google_logo_48px.svg'

export default {
  name: 'login',
  components: {
    IconLogo,
    IconGoogleLogo
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
