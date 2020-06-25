<template>
  <div :id="localId" class="svg_wrapper"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'column-side-plan',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) },
    Scale: { type: Object, default: () => ({}) },
    Unit: { type: Object, default: () => ({}) },
    UserInfo: { type: Object, default: () => ({}) },
    // Database
    DataItems: { type: Array, default: () => [] }
  },
  data: () => ({
    needsSecondSvg: true
  }),
  created() {
    this.localId = `${this.id || 'Floor_Structure'}__${this.safeId('')}`
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      if (!this.ready2draw()) return
      this.clear()
      // this.initData()
      this.drawCanvas()
      this.drawColumnPlan()
    }
  }
}
</script>
<style lang="scss" scoped>
.svg_wrapper {
  padding: 0;
}
</style>
