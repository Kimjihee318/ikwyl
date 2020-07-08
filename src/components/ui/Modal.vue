<template>
  <div>
    <div class="modal_wrap" @click="onClose"></div>
    <div class="modal" :style="modalStyle">
      <div class="modal_title type_english_font">
        <!-- <Close class="icon_close" @click="onClose" /> -->
        <slot name="slot_title"></slot>
      </div>
      <div class="modal_contents">
        <slot name="slot_contents"></slot>
      </div>
    </div>
  </div>
</template>
<script>
// import Close from '@/assets/icons/close-24px.svg'
export default {
  name: 'ui-modal',
  components: {
    // Close
  },
  props: {
    height: Number,
    start: Number,
    value: Boolean,
    width: Number
  },
  computed: {
    modalStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `translate(${-(this.width / 2) + this.start}px, ${-(this.height / 2)}px)`
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_modal.scss';
</style>
