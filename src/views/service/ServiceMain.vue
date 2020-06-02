<template>
  <div class="main">
    <Chart :Canvas="canvas" :FloorInfo="floorInfo" :Unit="unit" :User="user" :DataItems="dataItems" />
    <img src="@/assets/ref.jpg" alt="reference" />
  </div>
</template>

<script>
import __C from '@/primitives/_constants_.js'
import _ChartData from '@/primitives/chartFloorPlan'
import Chart from '@/lib/d3/chart/floorPlan/SvgStructure.vue'
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
      return _ChartData.dataItems
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
