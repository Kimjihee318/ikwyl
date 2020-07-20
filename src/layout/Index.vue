<template>
  <div class="layout">
    <Header class="layout_header" />
    <Lnb class="layout_lnb" />
    <router-view class="layout_contents"> </router-view>
  </div>
</template>

<script>
import Header from './Header'
import Lnb from './Lnb.vue'

export default {
  name: 'index',
  components: {
    Header,
    Lnb
  }
}
</script>
<style lang="scss"></style>
