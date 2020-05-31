<template>
  <div>
    <div class="logo"><Logo /></div>
    <div class="account_info">
      <div>{{ user }}</div>
      <div>{{ userInfo.buildingName }}</div>
      <div>{{ `${userInfo.buildingNo}동 ${userInfo.unit}호` }}</div>
    </div>
    <div class="fileter"></div>
  </div>
</template>

<script>
import Logo from '../assets/icons/smoke_free-24px.svg'
import __C from '@/primitives/_constants_.js'
import { mapState } from 'vuex'

export default {
  name: 'left-navigation-bar',
  components: {
    Logo,
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),
  },
  // components: { }
}
</script>
<style lang="scss" scoped></style>
