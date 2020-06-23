<template>
  <div class="ui_card" :style="CardStyle">
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
