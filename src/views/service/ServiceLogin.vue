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
import __C from '@/primitives/_constants_'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  created() {},
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['googleAuth']),
    async onLogin() {
      await this.googleAuth()
    }
  }
}
</script>

<style></style>
