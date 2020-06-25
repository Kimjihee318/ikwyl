<template>
  <div :id="localId" class="chart_floor"></div>
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
    BackgroundItem: { type: Array, default: () => [] },
    Unit: { type: Object, default: () => ({}) },
    UserInfo: { type: Object, default: () => ({}) },

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
@import '@/assets/style/ui/_chartFloor.scss';
</style>
