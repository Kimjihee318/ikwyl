<template>
  <div :id="localId"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'user-image',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) }
  },
  created() {
    this.localId = `${this.id || 'User_Image'}__${this.safeId('')}`
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      this.clear()
      this.drawCanvas()
      this.drawUserImage()
    }
  }
}
</script>
<style lang="scss" scoped></style>
