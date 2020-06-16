import { mapState } from 'vuex'
import __C from '@/primitives/_constants_.js'
import _ChartFloorData from '@/primitives/chartFloorPlan'
import _ChartColumnData from '@/primitives/chartColumnPlan'
import _ChartStackedData from '@/primitives/chartStacked'
import _ChartTimeData from '@/primitives/chartTime'
import Calendar from '@/components/ui/Calendar.vue'
import ChartColumn from '@/lib/d3/chart/columnPlan/SvgColStructure'
import ChartFloor from '@/lib/d3/chart/floorPlan/SvgFloorStructure.vue'
import ChartStack from '@/lib/d3/chart/stack/StackedChart.vue'
import ChartTime from '@/lib/d3/chart/time/TimeChart.vue'
import UiCard from '@/components/ui/Card.vue'

export default {
  components: {
    Calendar,
    ChartColumn,
    ChartFloor,
    ChartStack,
    ChartTime,
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
    columnDataItems() {
      return _ChartColumnData.dataItems
    },
    columnUnit() {
      return _ChartColumnData.unit
    },
    floorCanvas() {
      return _ChartFloorData.canvas
    },
    floorDataItems() {
      return _ChartFloorData.dataItems
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
    },
    stackedCanvas() {
      return _ChartStackedData.canvas
    },
    stackedChart() {
      return _ChartStackedData.chart
    },
    stackedCircle() {
      return _ChartStackedData.circle
    },
    stackedDataItems() {
      return _ChartStackedData.dataItems[0]
    },
    timeCanvas() {
      return _ChartTimeData.canvas
    },
    timeCircle() {
      return _ChartTimeData.circle
    },
    timeChart() {
      return _ChartTimeData.chart
    },
    timeDataItems() {
      return _ChartTimeData.dataItems
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
