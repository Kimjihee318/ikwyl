import { mapState } from 'vuex'
import __C from '@/primitives/_constants_.js'
import _ChartFloorData from '@/primitives/chartFloorPlan'
import _ChartColumnData from '@/primitives/chartColumnPlan'
import Calendar from '@/components/ui/Calendar.vue'
import ChartColumn from '@/lib/d3/chart/columnPlan/SvgColStructure'
import ChartFloor from '@/lib/d3/chart/floorPlan/SvgFloorStructure.vue'
import UiCard from '@/components/ui/Card.vue'

export default {
  components: {
    Calendar,
    ChartColumn,
    ChartFloor,
    UiCard
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),
    columnCanvas() {
      return _ChartColumnData.canvas
    },
    columnFloorInfo() {
      return _ChartColumnData.floorInfo
    },
    columnUnit() {
      return _ChartColumnData.unit
    },
    floorCanvas() {
      return _ChartFloorData.canvas
    },
    floorFloorInfo() {
      return _ChartFloorData.floorInfo
    },
    floorUnit() {
      return _ChartFloorData.unit
    },
    propStyle() {
      return {
        marginBottom: `${0.75}rem`
      }
    }
  },
  methods: {
    styleCard(item) {
      return {
        backgroundColor: `${item.floor === this.userInfo.floor ? _ChartFloorData.canvas.CanvasBgPointColor : null}`,
        height: `${_ChartFloorData.canvas.CanvasHeight}px`
      }
    }
  }
}
