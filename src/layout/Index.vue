<template>
  <div class="layout">
    <!-- <Header class="header" /> -->
    <Lnb class="lnb" />
    <router-view class="contents"></router-view>
    <!-- <Footer class="footer" /> -->
  </div>
</template>

<script>
// import Header from './Header'
import Lnb from './Lnb'
// import Footer from './Footer'

export default {
  name: 'index',
  components: {
    // Header,
    Lnb,
    // Footer,
  },
}
</script>
<style lang="scss">
.layout {
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 20rem;
    height: 3rem;

    border-bottom: 1px solid #c0ddff;
  }
  .contents {
    position: absolute;
    top: 3rem;
    right: 0;
    bottom: 3rem;
    left: 20rem;
  }
  .lnb {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 20rem;

    padding: 1rem;
    border-right: 1px solid #c0ddff;
  }
  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 20rem;
    height: 3rem;

    border-top: 1px solid #c0ddff;
  }
}
</style>
