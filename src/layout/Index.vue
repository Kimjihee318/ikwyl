<template>
  <div class="layout">
    <Header class="layout_header" />
    <Lnb class="layout_lnb" />
    <router-view class="layout_contents"></router-view>
    <Footer class="layout_footer" />
  </div>
</template>

<script>
import Header from './Header'
import Lnb from './Lnb.vue'
import Footer from './Footer'

export default {
  name: 'index',
  components: {
    Header,
    Lnb,
    Footer
  }
}
</script>
<style lang="scss"></style>
