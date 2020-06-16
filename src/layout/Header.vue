<template>
  <div class="header">
    <div class="header_user_info"></div>
    <!-- <div class="header_user_btn_onLoad" @click="onLoad">{{ user }}</div> -->
    <div class="header_user_btn_logout" @click="onLogout">Logout</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
export default {
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user'])
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['logout']),

    onLoad() {
      // userinfo page
    },
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
