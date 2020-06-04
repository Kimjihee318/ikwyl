<template>
  <div class="ui-card" :style="CardStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-card',
  props: {
    CardStyle: { type: Object, default: () => ({}) }
  }
}
</script>

<style lang="scss" scoped>
.ui-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba(192, 221, 255, 0.5);
  line-height: 1.8rem;
}
</style>
