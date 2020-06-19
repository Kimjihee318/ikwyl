<template>
  <div :id="localId" class="floor_chart"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'floor-plan',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) },
    FloorInfo: { type: Object, default: () => ({}) },
    BackgroundItem: { type: Array, default: () => [] },
    Unit: { type: Object, default: () => ({}) },
    User: String,
    // Database
    DataItems: { type: Array, default: () => [] }
  },
  created() {
    this.localId = `${this.id || 'Floor_Structure'}__${this.safeId('')}`
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      if (!this.ready2draw4FloorStructure()) return
      this.clear()
      // this.initData()
      this.drawCanvas()
      this.drawFloor()
    }
  }
}
</script>
<style lang="scss" scoped>
.floor_chart {
  margin-bottom: 0.5rem;
}
</style>
