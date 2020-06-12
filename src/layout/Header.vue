<template>
  <div class="header">
    <div class="header_user_info"></div>
    <div class="header_user_btn_logout" @click="onLogout">logout</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
export default {
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['logout']),
    onLogout() {
      this.logout()
      this.$router.push({ path: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  &_user {
    &_btn_logout {
      padding: 0.3rem;
      border: 1px solid #dfdfdf;
    }
  }
}</style
>>
