<template>
  <div class="layout">
    <Header class="header" />
    <Lnb class="lnb" />
    <router-view></router-view>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from './Header'
import Lnb from './Lnb'
import Footer from './Footer'

export default {
  name: 'index',
  components: {
    Header,
    Lnb,
    Footer,
  },
}
</script>
<style lang="scss">
.layout {
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 14rem;
    height: 3rem;

    border-bottom: 1px solid #b2d3f4;
  }
  .lnb {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 14rem;

    border-right: 1px solid #b2d3f4;
  }
  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 14rem;
    height: 3rem;

    border-top: 1px solid #b2d3f4;
  }
}
</style>
