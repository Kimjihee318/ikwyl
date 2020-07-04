<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import __C from '@/primitives/_constants_'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  created() {
    // if (!localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT)) return
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  watch: {},
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations(__C.STORE.NAMESPACE.APPLICATION, ['handleResize'])
  }
}
</script>
<style lang="scss">
@import '@/assets/style/ui/_app.scss';
</style>
