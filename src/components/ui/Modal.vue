<template>
  <div>
    <div class="modal_wrap" @click="onClose"></div>
    <div class="modal">
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
    value: Boolean
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
  height: 30rem;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-16.5rem, -15rem);
  width: 33rem;

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
