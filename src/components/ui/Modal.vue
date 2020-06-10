<template>
  <div class="modal">
    <div class="modal_title">
      <Close class="icon_close" @click="onClose" />
      <slot name="slot_title"></slot>
    </div>
    <div class="modal_contents">
      <slot name="slot_contents"></slot>
    </div>
    <!-- <div class="modal_btn">
      <div @click="onUpload">Upload</div>
    </div> -->
  </div>
</template>
<script>
import Close from '@/assets/icons/close-24px.svg'
export default {
  name: 'ui-modal',
  components: {
    Close
  },
  props: {
    value: Boolean
  },
  methods: {
    onClose() {
      this.$emit('input', false)
    }
    // onUpload() {
    //   this.$emit('update')
    // }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: relative;
  width: 33rem;
  height: 20rem;
  background-color: #ffffff;
  border-radius: 2px;

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
