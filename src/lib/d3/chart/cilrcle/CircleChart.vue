<template>
  <div :id="localId"></div>
</template>

<script>
import CommonMixin from './importers'

export default {
  name: 'sh-smoking-stack',
  mixins: [CommonMixin],
  props: {
    id: String,

    // Chart Data
    Canvas: { type: Object, default: () => ({}) },
    Chart: { type: Object, default: () => ({}) },
    Rect: { type: Object, default: () => ({}) },
    SelectedDate: { type: Date },
    // Database
    DataItems: { type: Array, default: () => [] }
  },
  created() {
    this.localId = `${this.id || 'Stacked'}__${this.safeId('')}`
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      if (!this.ready2draw4NoDataItems()) return
      this.clear()
      // this.initData()
      this.drawCanvas()
      this.drawCircle()
    }
  }
}
</script>
<style lang="scss" scoped>
svg {
  cursor: pointer;
}
</style>
