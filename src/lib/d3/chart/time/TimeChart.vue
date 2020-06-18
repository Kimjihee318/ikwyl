<template>
  <div :id="localId"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'sh-smoking-time',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) },
    Chart: { type: Object, default: () => ({}) },
    Circle: { type: Object, default: () => ({}) },
    // Database
    DataItems: { type: Array, default: () => [] }
  },
  created() {
    this.localId = `${this.id || 'Time'}__${this.safeId('')}`
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
      this.drawTimeChart()
    }
  }
}
</script>
