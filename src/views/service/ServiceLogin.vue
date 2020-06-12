<template>
  <div class="login">
    <div @click="onLogin">GOOGLE LOGIN</div>
    <form>
      <input type="text" name="id" />
      <input type="text" name="password" />
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import __C from '@/primitives/_constants_'

export default {
  name: 'login',
  created() {},
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['login']),
    async onLogin() {
      await this.login()
    }
  }
}
</script>

<style></style>
