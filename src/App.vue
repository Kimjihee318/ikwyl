<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import __C from '@/primitives/_constants_'
export default {
  name: 'App',
  created() {
    // console.log(`[APP]`, localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
    if (!localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT)) return
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html {
  // font-size: 10px;
  background-color: #0f1333;
}
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  color: #c0ddff;
  // bg: #1b39e7 #e9f9f8
  // font: #cce8ff #b1d4ec
}
svg {
  fill: #ffffff;
}
</style>
