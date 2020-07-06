<template>
  <div class="comp__404">
    <div class="logo" @click="home">
      <icon-logo class="icon" />
      <div>Find The Smoker</div>
    </div>
    <div class="wrap__content">
      <div class="title">404</div>
      <div class="content">Page not found</div>
    </div>
  </div>
</template>

<script>
import IconLogo from '@/assets/icons/logo.svg'

export default {
  name: 'fourofour',
  components: {
    IconLogo
  },
  methods: {
    home() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_404.scss';
</style>
