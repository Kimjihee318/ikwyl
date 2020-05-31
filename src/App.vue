<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html {
  // font-size: 10px;
}
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #000000;
  color: #c0ddff;
  // bg: #1b39e7 #e9f9f8
  // font: #cce8ff #b1d4ec
}
</style>
