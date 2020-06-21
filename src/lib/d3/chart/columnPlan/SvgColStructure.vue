<template>
  <div :id="localId"></div>
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
    FloorInfo: { type: Object, default: () => ({}) },
    Scale: { type: Object, default: () => ({}) },
    Unit: { type: Object, default: () => ({}) },
    // ! FIX : realtime monitor에 user 없음
    User: String,
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
      if (!this.ready2draw()) return
      this.clear()
      // this.initData()
      this.drawCanvas()
      this.drawColumnPlan()
    }
  }
}
</script>
