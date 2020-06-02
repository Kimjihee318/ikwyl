<template>
  <div class="main">
    <Chart
      v-for="(dataItem, i) in dataItems"
      :key="`chart__${i}`"
      :Canvas="canvas"
      :FloorInfo="floorInfo"
      :Unit="unit"
      :User="user"
      :DataItems="dataItem"
    />
  </div>
</template>

<script>
import __C from '@/primitives/_constants_.js'
import _ChartData from '@/primitives/chartFloorPlan'
import Chart from '@/lib/d3/chart/floorPlan/SvgFloorStructure.vue'
import { mapState } from 'vuex'
export default {
  name: 'main-page',
  components: {
    Chart
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user']),
    canvas() {
      return _ChartData.canvas
    },
    dataItems() {
      return _ChartData.dataItems.reverse()
    },
    floorInfo() {
      return _ChartData.floorInfo
    },
    unit() {
      return _ChartData.unit
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 1rem;
}
</style>
