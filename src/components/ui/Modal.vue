<template>
  <div>
    <div class="modal_wrap" @click="onClose"></div>
    <div class="modal" :style="modalStyle">
      <div class="modal_title">
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
    value: Boolean,
    width: Number,
    height: Number
  },
  computed: {
    modalStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `translate(${-(this.width / 2)}px, ${-(this.height / 2)}px)`
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
.modal_wrap {
  align-items: center;
  background-color: rgba(144, 144, 144, 0.5);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal {
  background-color: #ffffff;
  border-radius: 2px;
  color: #000000;
  left: 50%;
  position: fixed;
  top: 50%;

  &_title {
    height: 2rem;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    color: #000000;
    font-weight: bold;
  }
}
.icon_close {
  position: absolute;
  left: 31.4rem;
  top: 0.1rem;
}
</style>
