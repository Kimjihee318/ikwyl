<template>
  <div :id="localId" class="wrap__svg"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'surrounding-plan',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) },
    Rect: { type: Object, default: () => ({}) },
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
    this.localId = `${this.id || 'Surrounding_Structure'}__${this.safeId('')}`
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      if (!this.ready2draw4SurroundingStructure()) return
      this.clear()
      this.drawCanvas()
      this.drawColumnPlan()
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap__svg {
  padding: 0;
  display: flex;
}
</style>
