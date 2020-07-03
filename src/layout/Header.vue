<template>
  <div class="header">
    <div class="logo" @click="home"><icon-logo class="icon" /><span>Find the smoker</span></div>
    <!-- <div class="header_user_btn_onLoad" @click="onLoad">{{ user }}</div> -->
    <div class="btn logout type_text" @click="onLogout">logout</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconLogo from '@/assets/icons/logo.svg'

export default {
  components: {
    IconLogo
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user'])
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['logout']),
    home() {
      this.$router.push({ path: '/' })
    },
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
  // color: $black;

  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  .logout {
    background-color: $blue_light;
    border: 1px solid $blue_alpha01;
    border-radius: $border_radius;
    color: $blue_bg;
    cursor: pointer;
    font-weight: 500;
    line-height: 1.5rem;
    padding: 0 1rem 0 1rem;
    &:hover {
      background-color: $blue_normal;
    }
  }
  .logo {
    align-items: center;
    cursor: pointer;
    display: flex;
    width: 100%;
    .icon {
      margin-right: 1rem;
    }
    span {
      // background-color: $orange_point;
      color: $white;
      font-size: 1.3rem;
      font-weight: 400;
      text-transform: uppercase;
    }
  }
}
</style>
