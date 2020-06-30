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
    Rect: { type: Object, default: () => ({}) },
    Unit: { type: Object, default: () => ({}) },
    UserInfo: { type: Object, default: () => ({}) },

    // Database
    DataItems: { type: Array, default: () => [] }
  },
  computed: {
    isUserFloor() {
      if (!this.BackgroundItem || !this.BackgroundItem[0]) return false
      let floor = this.BackgroundItem[0].unit.toString().split('')
      return this.UserInfo.floor === (floor.length < 4 ? +floor[0] : +(floor[0] + floor[1]))
    }
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
      this.$emit('labelVisible', this.isUserFloor)
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
