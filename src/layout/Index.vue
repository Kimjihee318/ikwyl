<template>
  <div class="layout">
    <!-- <Header class="header" /> -->
    <Lnb class="layout_lnb" />
    <router-view class="layout_contents"></router-view>
    <!-- <Footer class="footer" /> -->
  </div>
</template>

<script>
// import Header from './Header'
import Lnb from './Lnb.vue'
// import Footer from './Footer'

export default {
  name: 'index',
  components: {
    // Header,
    Lnb
    // Footer,
  }
}
</script>
<style lang="scss">
.layout {
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 23rem;
    height: 3rem;

    border-bottom: 1px solid #c0ddff;
  }
  &_contents {
    position: absolute;
    // top: 3rem;
    top: 0;
    right: 0;
    bottom: 3rem;
    left: 23rem;
  }
  &_lnb {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 23rem;

    padding: 1rem;
    border-right: 1px solid #c0ddff;
  }
  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 23rem;
    height: 3rem;

    border-top: 1px solid #c0ddff;
  }
}
</style>
